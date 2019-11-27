import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import AsyncPaginate from "react-select-async-paginate";
import { Formik } from "formik";
import URI from "urijs";
import {
    Button,
    Card,
    Dimmer,
    Grid,
    Page,
    List,
    Form,
    FormTextInput,
    FormCard
} from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";
import { endpoints } from "./url";
import { fetchJSON, lineWrap, downloadByPoll as checkDownload } from "./util";
import defaultStrings from "./DetectorPage.strings";
import "./App.css";

const fetchTasks = async page => {
    let url = new URI(endpoints.tasks);
    url.addSearch("page", page);
    return await fetchJSON(url.toString(), "GET");
};

const filterTasksByName = async searchString => {
    let url = new URI(endpoints.tasks);
    url.addSearch("name", searchString);
    return await fetchJSON(url.toString(), "GET");
};

const loadAndSearchTasks = async (search, options, { page }) => {
    let filteredOptions;
    let hasMore;
    let curTasks;
    let curOptions;
    let nextPage;
    if (!search) {
        curTasks = await fetchTasks(page);
        curOptions = curTasks.results.map(task => {
            return {
                value: task.id,
                label: `${task.id} + ${task.name}`
            };
        });
        // backend's returned count is the total # of entries
        hasMore = curTasks.count > options.length + curOptions.length;
        nextPage = page + 1;
    } else {
        curTasks = await filterTasksByName(search.toLowerCase());
        curOptions = curTasks.results.map(task => {
            return {
                value: task.id,
                label: `${task.id} + ${task.name}`
            };
        });
        hasMore = false;
        nextPage = page;
    }
    filteredOptions = curOptions;
    return {
        options: filteredOptions,
        hasMore: hasMore,
        additional: {
            page: nextPage
        }
    };
};

const reactSelectTablerStyles = {
    control: (provided, state) => ({
        ...provided,
        border: "1px solid rgba(0, 40, 100, 0.12)",
        borderRadius: "3px"
    }),
    placeholder: (provided, state) => ({
        ...provided,
        opacity: "0.6"
    })
};

const TrainingConfig = ({ trainingConfig, values, errors, ...rest }) => {
    let requireds = trainingConfig.required;
    let optionals = trainingConfig.optional;

    let requiredFields = requireds.map((item, index) => {
        values.required[item] = "";
        return (
            <FormTextInput
                isRequired
                key={index}
                name={item}
                type="text"
                label={item}
                value={values && values.required[item]}
                error={errors && errors.required[item]}
                {...rest}
            />
        );
    });

    let optionalFields = Object.entries((item, index) => {
        values.optional[item[0]] = "";
        return (
            <FormTextInput
                key={index}
                name={item[0]}
                type="text"
                label={item[0]}
                placeholder={item[1]}
                value={values && values.optional[item[0]]}
                error={errors && errors.optional[item[0]]}
                {...rest}
            />
        );
    });

    if (requireds.length + Object.keys(optionals).length > 0) {
        return (
            <Form.FieldSet>
                {requiredFields}
                {optionalFields}
            </Form.FieldSet>
        );
    }
};

const NewDetectorForm = props => {
    const {
        action,
        method,
        onSubmit,
        onChange,
        onBlur,
        values,
        strings = {},
        errors
    } = props;
    let history = useHistory();
    const [availableDnnTypes, setAvailableDnnTypes] = useState(null);
    const [trainingConfigLoading, setTrainingConfigLoading] = useState(false);
    // form values. Set as a state variable as we're updating it
    // both from default values of the backend and user input
    const [formInitialValues, setFormInitialValues] = useState({
        name: "",
        dnnType: null,
        tasks: [],
        trainingConfig: {}
    });

    // get supported dnn types
    const fetchAvailableDnnTypes = () => {
        fetchJSON(endpoints.detectorDnnTypes, "GET").then(resp => {
            let types = JSON.parse(resp);
            let typeOptions = types.map(item => ({
                value: item[0],
                label: item[1]
            }));
            setAvailableDnnTypes(typeOptions);
        });
    };

    // fetch training configuration of currently selected dnn type
    const updateTrainingConfig = (selectedOption, curFormValues) => {
        if (selectedOption != null) {
            let dnnTypeString = selectedOption.value;
            setTrainingConfigLoading(true);
            fetchJSON(
                URI.joinPaths(endpoints.dnnTrainingConfigs, dnnTypeString),
                "GET"
            )
                .then(resp => {
                    let trainingConfigs = JSON.parse(resp);
                    // populate form value to include training configs
                    setFormInitialValues({
                        ...curFormValues,
                        dnnType: selectedOption,
                        trainingConfig: trainingConfigs
                    });
                })
                .finally(() => {
                    setTrainingConfigLoading(false);
                });
        }
    };

    useEffect(() => {
        fetchAvailableDnnTypes();
    }, []);

    return availableDnnTypes == null ? (
        <Dimmer active loader />
    ) : (
        <Formik
            enableReinitialize={true}
            initialValues={formInitialValues}
            validate={values => {
                let errors = {};
                if (!values.name) {
                    errors.name = "Required";
                }
                if (values.tasks.length == 0) {
                    errors.tasks = "Required";
                }
                if (!values.dnnType) {
                    errors.activeDnnType = "Required";
                }
                console("validate values: " + JSON.stringify(values));
                return errors;
            }}
            onSubmit={(
                values,
                { setSubmitting /* setErrors, setValues and other goodies */ }
            ) => {
                setSubmitting(true);
                let tasks_id = values.tasks.map(item => item.value);
                let data = {
                    name: values.name,
                    dnn_type: values.dnnType.value,
                    train_config: JSON.stringify(values.trainingConfig),
                    train_set: {
                        name: values.name + "-trainset",
                        tasks_id: tasks_id
                    }
                };
                console.log(data);
                fetchJSON(endpoints.detectors, "POST", data).then(resp => {
                    history.push(endpoints.uiDetector);
                });
            }}
            render={({
                values,
                errors,
                handleChange,
                handleSubmit,
                isSubmitting
            }) =>
                isSubmitting ? (
                    <Dimmer active loader />
                ) : (
                    <FormCard
                        buttonText={
                            strings.buttonText || defaultStrings.buttonText
                        }
                        title={strings.title || defaultStrings.title}
                        onSubmit={handleSubmit}
                    >
                        <FormTextInput
                            name="name"
                            label={
                                strings.nameLabel || defaultStrings.nameLabel
                            }
                            placeholder={
                                strings.namePlaceholder ||
                                defaultStrings.namePlaceholder
                            }
                            value={values && values.name}
                            error={errors && errors.name}
                            onSubmit={handleSubmit}
                            onChange={handleChange}
                        />
                        <Form.Group label={"Training Videos"}>
                            <AsyncPaginate
                                styles={reactSelectTablerStyles}
                                debounceTimeout={300}
                                value={values.tasks}
                                initialOptions={[]}
                                loadOptions={loadAndSearchTasks}
                                isMulti
                                closeMenuOnSelect={false}
                                additional={{
                                    page: 1
                                }}
                                onChange={selectedOption => {
                                    handleChange(selectedOption);
                                    // need to pass in values here as prevValues
                                    // in the state does not have the most
                                    // updated form data, which is kept in values
                                    setFormInitialValues({
                                        ...values,
                                        tasks: selectedOption
                                    });
                                }}
                                onSubmit={handleSubmit}
                            />
                            {errors && errors.tasks && (
                                <span className="tabler-invalid-feedback">
                                    {errors.tasks}
                                </span>
                            )}
                        </Form.Group>
                        <Form.Group label={"Detector Types"}>
                            <Select
                                name="DNN Types"
                                styles={reactSelectTablerStyles}
                                options={availableDnnTypes}
                                value={values.dnnType}
                                isLoading={trainingConfigLoading}
                                isSearchable={true}
                                onChange={selectedOption => {
                                    handleChange(selectedOption);
                                    // need to pass in values here as prevValues
                                    // in the state does not have the most
                                    // updated form data, which is kept in values
                                    updateTrainingConfig(
                                        selectedOption,
                                        values
                                    );
                                }}
                                onSubmit={handleSubmit}
                            />
                            {errors && errors.activeDnnType && (
                                <span className="tabler-invalid-feedback">
                                    {errors.activeDnnType}
                                </span>
                            )}
                        </Form.Group>
                        {Object.keys(values.trainingConfig).length > 0 && (
                            <Form.FieldSet>
                                {Object.entries(values.trainingConfig).map(
                                    ([k, v], index) => (
                                        <Form.Group label={k} key={index}>
                                            <Form.Input
                                                isRequired
                                                name={`trainingConfig.${k}`}
                                                type="text"
                                                value={
                                                    values &&
                                                    values.trainingConfig &&
                                                    values.trainingConfig[k]
                                                }
                                                error={
                                                    errors &&
                                                    errors.trainingConfig &&
                                                    errors.trainingConfig[k]
                                                }
                                                onChange={handleChange}
                                                onSubmit={handleSubmit}
                                            />
                                        </Form.Group>
                                    )
                                )}
                            </Form.FieldSet>
                        )}
                    </FormCard>
                )
            }
        />
    );
};

export { NewDetectorForm };
