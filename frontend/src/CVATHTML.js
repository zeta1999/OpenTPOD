import React from 'react';
function SettingWindow() {
    return `<div id="settingsWindow" class="modal hidden">
        <div id="settingsWindowContent" class="modal-content">
            <div id="playerSettings" style="width: 48%; height: 90%; float: left;">
                <center> <label class="semiBold h1"> Player Settings </label> </center>
                <table style="border-collapse: separate; border-spacing: 10px; overflow-y: auto;" class="regular">
                    <tr>
                        <td> <label> Player Step </label> </td>
                        <td> <input type="number" min="1" max="100" value="10" id="playerStep" class="regular h2" /> </td>
                    </tr>
                    <tr>
                        <td> <label> Player Speed </label> </td>
                        <td>
                            <select id="speedSelect" class="regular h3">
                                <option value="1"> 1 FPS </option>
                                <option value="2"> 5 FPS </option>
                                <option value="3"> 12 FPS </option>
                                <option value="4" selected> 25 FPS </option>
                                <option value="5"> 50 FPS </option>
                                <option value="6"> 100 FPS </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td> <label> Reset Zoom </label> </td>
                        <td> <input type="checkbox" id="resetZoomBox" class="settingsBox" /> </td>
                    </tr>
                    <tr>
                        <td> <label> Grid Size </label> </td>
                        <td> <input type="number" min="5" max="1000" value="100" id="playerGridSizeInput" class="regular h2" /> </td>
                    </tr>
                    <tr>
                        <td> <label> Grid Opacity </label> </td>
                        <td> <input type="range" min="0" max="5" value="0" id="playerGridOpacityInput" class="regular h2" /> </td>
                    </tr>
                    <tr>
                        <td> <label> Grid Stroke </label> </td>
                        <td>
                            <select id="playerGridStrokeInput" class="regular h2">
                                <option value="black"> Black </option>
                                <option value="red"> Red </option>
                                <option value="green"> Green </option>
                                <option value="blue"> Blue </option>
                                <option value="white" selected> White </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td> <label for="playerBrightnessRange"> Brightness: </label> </td>
                        <td> <input type="range" min="50" max="200" value="100" id="playerBrightnessRange" /> </td>
                    </tr>
                    <tr>
                        <td> <label for="playerContrastRange"> Contrast: </label> </td>
                        <td> <input type="range" min="50" max="200" value="100" id="playerContrastRange" /> </td>
                    </tr>
                    <tr>
                        <td> <label for="playerSaturationRange"> Saturation: </label> </td>
                        <td> <input type="range" min="0" max="300" value="100" id="playerSaturationRange" /> </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <button id="resetPlayerFilterButton" class="regular h1"> Reset Color Settings </button>
                        </td>
                    </tr>
                </table>
            </div>

            <div id="otherSettigns" style="width: 48%; height: 90%; float: left;">
                <center> <label class="semiBold h1"> Other Settings </label> </center>
                <table style="border-collapse: separate; border-spacing: 10px; overflow-y: auto;" class="regular">
                    <tr>
                        <td> <label> Show All Interpolation Tracks </label> </td>
                        <td> <input type="checkbox" id="showAllInterBox" class="settingsBox" /> </td>
                    </tr>
                    <tr >
                        <td> <label> AAM Zoom Margin </label> </td>
                        <td> <input type="range" min="0" max="1000" value="100" id="aamZoomMargin" /> </td>
                    </tr>
                    <tr>
                        <td> <label> Enable Auto Saving </label> </td>
                        <td> <input type="checkbox" id="autoSaveBox" class="settingsBox" /> </td>
                    </tr>
                    <tr>
                        <td> <label> Auto Saving Interval (Min) </label> </td>
                        <td> <input type="number" id="autoSaveTime" style="width: 3em" min="5" max="60" value="15" class="regular h2" /> </td>
                    </tr>
                    <tr>
                        <td> <label> Rotate All Images </label> </td>
                        <td> <input type="checkbox" id="rotateAllImages" class="settingsBox" /> </td>
                    </tr>
                </table>
            </div>

            <center>
                <button id="closeSettignsButton" class="regular h1" style="margin-top: 15px;"> Close </button>
            </center>
        </div>
    </div>`
};

function HelpWindow() {
    return `<div id="helpWindow" class="modal hidden">
        <div id="helpWindowContent" class="modal-content">
            <div style="width: 100%; height: 90%; overflow-y: auto;">
                <div class="selectable">
                    <label class="h1 semiBold"> Shortkeys: </label>
                    <br />
                    <table class="regular" id="shortkeyHelpTable"> </table>
                    <label class="h1 semiBold">
                        <br /> Hints:
                        <br />
                    </label>
                    <label class="regular"> - Hold MOUSEWHEEL in order to move frame (during drawing for example). </label>
                    <br />
                    <label class="regular"> - Hold CTRL key when track highlighted and fix it. </label>
                    <br />
                    <label class="regular"> - Hold CTRL key when paste shape from buffer for multiple pasting. </label>
                    <br />
                    <label class="h1 semiBold">
                        <br /> Filter Help:
                        <br />
                    </label>
                    <label class="regular">
                        Filter Format: label[property operator"value"] (USE LOWER CASE ONLY)
                        <br /> Label is a type of bounding box (car, person, etc). Use"*" for any label.
                        <br /> Property is a limited set of values: id, type, lock, occluded, attr.
                     </label>
                </div>
            </div>
            <center> <button id="closeHelpButton" class="regular h1" style="margin-top: 15px;"> Close </button> </center>
        </div>
    </div>`
}

function Player() {
    return `<div id="player">
        <div id="playerFrame">
            <div id="rotationWrapper">
                <svg id="frameLoadingAnim" style="width: 100%; height: 100%;" class="hidden">
                    <circle r="30" cx="50%" cy="50%" id="frameLoadingAnimation" />
                </svg>
                <svg id="frameContent"> </svg>
                <svg id="frameText"> </svg>
                <svg id="frameBackground"> </svg>
                <svg id="frameGrid" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="playerGridPattern" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path id="playerGridPath" d="M 1000 0 L 0 0 0 1000" fill="none" stroke="white" opacity="0" stroke-width="2" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#playerGridPattern)" />
                </svg>

                <ul id="shapeContextMenu" class='custom-menu' oncontextmenu="return false;">
                    <li action="object_url"> Copy Object URL </li>
                    <li action="change_color"> Change Color </li>
                    <li action="remove_shape"> Remove Shape </li>
                    <li action="switch_occluded"> Switch Occluded </li>
                    <li action="switch_lock"> Switch Lock </li>
                    <li class="interpolationItem" action="split_track"> Split </li>
                    <li class="polygonItem" action="drag_polygon"> Enable Dragging </li>
                </ul>

                <ul id="playerContextMenu" class='custom-menu' oncontextmenu="return false;">
                    <li action="job_url"> Copy Job URL </li>
                    <li action="frame_url"> Copy Frame URL </li>
                </ul>

                <ul id="pointContextMenu" class='custom-menu' oncontextmenu="return false;">
                    <li action="remove_point"> Remove </li>
                </ul>
            </div>
        </div>
        <div id="playerPanel">
            <svg id="firstButton" class="playerButton">
                <polygon points="100,0 100,80 75,60 75,80 50,60, 50,80 0,40 50,0 50,20 75,0 75,20" transform="scale(0.4)" />
            </svg>
            <svg id="multiplePrevButton" class="playerButton">
                <polygon points="100,0 100,80 75,60 75,80 25,40 75,0 75,20" transform="scale(0.4)" />
            </svg>

            <svg id="prevButton" class="playerButton">
                <polygon points="90,20 90,60 50,60 50,80 10,40 50,0 50,20" transform="scale(0.4)" />
            </svg>

            <svg id="playButton" class="playerButton">
                <polygon points="35,0 35,80 85,40" transform="scale(0.4)" />
            </svg>

            <svg id="pauseButton" class="playerButton hidden">
                <rect x="25" y="0" width="20" height="80" transform="scale(0.4)" />
                <rect x="65" y="0" width="20" height="80" transform="scale(0.4)" />
            </svg>

            <svg id="nextButton" class="playerButton">
                <polygon points="10,20 10,60 50,60 50,80 90,40 50,0 50,20" transform="scale(0.4)" />
            </svg>

            <svg id="multipleNextButton" class="playerButton">
                <polygon points="1,1 1,80 25,60 25,80 75,40 25,0 25,20" transform="scale(0.4)" />
            </svg>

            <svg id="lastButton" class="playerButton">
                <polygon points="1,1 1,80 25,60 25,80 50,60 50,80 100,40 50,0 50,20 25,0 25,20" transform="scale(0.4)" />
            </svg>
            <input type="range" id="playerProgress" />
        </div>
    </div>`
}

// replacement for playertoolbar and action menu
function RevisedPlayerToolBar() {
    return `
        <div style="width: 100%; height: 100%;" >
            <button class="regular h2" id="undoButton" disabled> &#x27F2; </button>
            <button class="regular h2" id="redoButton" disabled> &#10227; </button>
            <label id="propagateLabel" class="regular h2" style="margin-left: 15px;"> Propagation </label>
            <input type="number" id="propagateFramesInput" style="width: 3em" min="1" max="10000" value="50" class="regular h2" />
            <label class="regular h2" style="margin-left: 15px;"> Rotation </label>
            <button class="regular h2" id="clockwiseRotation" title="Clockwise rotation"> &#10227; </button>
            <button class="regular h2" id="counterClockwiseRotation" title="Counter clockwise rotation"> &#10226; </button>
            <div style="float: right;">
                <label class="regular h2"> Frame </label>
                <input class="regular h2" style="width: 3.5em;" type="number" id="frameNumber" />
            </div>
            <select id="downloadAnnotationButton" class="semiBold h2" style="text-align-last: center;">
                <option selected disabled> Dump Annotation </option>
            </select>
            <select id="uploadAnnotationButton" class="semiBold h2" style="text-align-last: center;">
                    <option selected disabled> Upload Annotation </option>
            </select>
            <button id="removeAnnotationButton" class="semiBold h2"> Remove Annotation </button>
            <button id="fullScreenButton" class="semiBold h2"> Fullscreen Player </button>
            <button id="helpButton" class="semiBold h2"> Help </button>
            <br/>
            <button id="saveButton" class="semiBold h2"> Save Work </button>
            <input type="file" id="annotationFileSelector" style="display: none" />
            <center> <label class="semiBold h2"> Statistic </label> </center>
            <div style="text-align: center; max-height: 250px; overflow: auto; display: block;">
                <table id="annotationStatisticTable" cellspacing="3" cellpadding="3">
                    <tr class="semiBold">
                        <td> Label </td>
                        <td colspan="2"> Boxes </td>
                        <td colspan="2"> Points </td>
                        <td> Manually </td>
                        <td> Interpolated </td>
                        <td> Total </td>
                    </tr>
                </table>
            </div>
        </div>
    `
}


function PlayerToolBar() {
    return `
        <div style="margin-top: 20px">
        <br/>
            <button id="menuButton" class="regular h2"> Open Menu </button>
            <label id="filterLabel" class="regular h2" style="margin-left: 50px"> Filter: </label>
            <datalist id="filterSubmitList" style="display: none;"> </datalist>
            <input type="text" list="filterSubmitList" id="filterInputString" class="regular h2" placeholder='car[attr/model=/"mazda"' />
            <button id="resetFilterButton" class="regular h2"> Reset </button>
            <button class="regular h2" id="undoButton" disabled> &#x27F2; </button>
            <select id="filterSelect" size="2" class="regular" style="overflow: hidden; width: 15%; top: 0.5em; position: relative;" disabled>
                <option id="lastUndoText" title="Undo Action" selected> None </option>
                <option id="lastRedoText" title="Redo Action"> None </option>
            </select>
            <button class="regular h2" id="redoButton" disabled> &#10227; </button>
            <label id="propagateLabel" class="regular h2" style="margin-left: 15px;"> Propagation </label>
            <input type="number" id="propagateFramesInput" style="width: 3em" min="1" max="10000" value="50" class="regular h2" />
            <label class="regular h2" style="margin-left: 15px;"> Rotation </label>
            <button class="regular h2" id="clockwiseRotation" title="Clockwise rotation"> &#10227; </button>
            <button class="regular h2" id="counterClockwiseRotation" title="Counter clockwise rotation"> &#10226; </button>
            <div style="float: right;">
                <label class="regular h2"> Frame </label>
                <input class="regular h2" style="width: 3.5em;" type="number" id="frameNumber" />
            </div>
            <table id="fillOptionTable" class="regular" cellpadding="20">
                <tr>
                    <td style="width: auto;">
                        <div style="float: left;">
                            <label class="semiBold"> Fill Opacity: </label>
                        </div>
                        <div style="float: left; margin-left: 1em;">
                            <input type="range" min="-1" max="1" step="0.2" value="0" id="fillOpacityRange" /> </div>
                    </td>
                    <td style="width: auto;">
                        <div style="float: left;">
                            <label class="semiBold"> Selected Fill Opacity: </label>
                        </div>
                        <div style="float: left; margin-left: 1em;">
                            <input type="range" min="0" max="1" value="0.2" step="0.2" id="selectedFillOpacityRange" /> </div>
                    </td>
                    <td style="width: auto;">
                        <div style="float: left;">
                            <label class="semiBold"> Black Stroke: </label>
                        </div>
                        <div style="float: left; margin-left: 1em;">
                            <input type="checkbox" id="blackStrokeCheckbox" class="settingsBox" /> </div>
                    </td>
                    <td style="width: auto;">
                        <div style="float: left;">
                            <label class="semiBold"> Color by: </label>
                        </div>
                        <div style="float: left; margin-left: 10px;">
                            <label style="margin-right: 10px;"> Instance </label>
                            <input type="radio" name="colorByRadio" id="colorByInstanceRadio" checked class="settingsBox" />
                        </div>
                        <div style="float: left; margin-left: 10px;">
                            <label style="margin-right: 10px;"> Group </label>
                            <input type="radio" name="colorByRadio" id="colorByGroupRadio" class="settingsBox" />
                        </div>
                        <div style="float: left; margin-left: 10px;">
                            <label style="margin-right: 10px;"> Label </label>
                            <input type="radio" name="colorByRadio" id="colorByLabelRadio" class="settingsBox" />
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    `
}

function ActionMenu() {
    return `<div id="annotationMenu" class="hidden regular">
        <center style="float:left; width: 28%; height: 100%;" id="engineMenuButtons">
            <select id="downloadAnnotationButton" class="menuButton semiBold h2" style="text-align-last: center;">
                <option selected disabled> Dump Annotation </option>
            </select>

            <select id="uploadAnnotationButton" class="menuButton semiBold h2" style="text-align-last: center;">
                    <option selected disabled> Upload Annotation </option>
            </select>
            <button id="removeAnnotationButton" class="menuButton semiBold h2"> Remove Annotation </button>
            <button id="settingsButton" class="menuButton semiBold h2"> Settings </button>
            <button id="fullScreenButton" class="menuButton semiBold h2"> Fullscreen Player </button>
            <button id="switchAAMButton" class="menuButton semiBold h2"> Switch AAM </button>
            <button id="helpButton" class="menuButton semiBold h2"> Help </button>
            <button id="saveButton" class="menuButton semiBold h2"> Save Work </button>
            <input type="file" id="annotationFileSelector" style="display: none" />
        </center>
        <div style="float:left; width: 70%; height: 100%; text-align: left;" class="selectable">
            <center>
                <label id="statTaskName" class="semiBold h2"> </label>  <br />
                <center>
                    <select id="statTaskStatus" class="regular h2" style="outline: none; border-radius: 10px; background:#B0C4DE; border: 1px solid black;">
                        {/* {% for status in status_list %}
                            <option value="{{status}}"> {{status}} </option>
                        {% endfor %} */}
                    </select>
                </center>
            </center>
            <center>
                <table style="width: 100%">
                    <tr>
                        <td style="width: 20%;">
                            <label class="regular h2"> Frames: </label>
                            <label id="statFrames" class="regular h2"> </label>
                        </td>
                        <td style="width: 15%;">
                            <label class="regular h2"> Overlap: </label>
                            <label id="statOverlap" class="regular h2"> </label>
                        </td>
                        <td style="width: 15%;">
                            <label class="regular h2"> Z-Order: </label>
                            <label id="statZOrder" class="regular h2"> </label>
                        </td>
                        <td style="width: 15%;">
                            <label class="regular h2"> Flipped: </label>
                            <label id="statFlipped" class="regular h2"> </label>
                        </td>
                    </tr>
                </table>
            </center>
            <center> <label class="semiBold h2"> Segment Statistic </label> </center>
            <div style="text-align: center; max-height: 250px; overflow: auto; display: block;">
                <table id="annotationStatisticTable" cellspacing="3" cellpadding="3">
                    <tr class="semiBold">
                        <td> Label </td>
                        <td colspan="2"> Boxes </td>
                        <td colspan="2"> Polygons </td>
                        <td colspan="2"> Polylines </td>
                        <td colspan="2"> Points </td>
                        <td> Manually </td>
                        <td> Interpolated </td>
                        <td> Total </td>
                    </tr>
                    <tr>
                        <td> </td>
                        <td> S </td>
                        <td> T </td>
                        <td> S </td>
                        <td> T </td>
                        <td> S </td>
                        <td> T </td>
                        <td> S </td>
                        <td> T </td>
                        <td> </td>
                        <td> </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>`
};

function Objectlabel() {
    return `<div class="tab customizedTab">
        <button class="h2 regular activeTabButton" id="sidePanelObjectsButton" style="width: 50%">Objects</button>
        <button class="h2 regular" id="sidePanelLabelsButton" style="width: 50%">Labels</button>
    </div>`
}

function AnnotationRightPanel() {
    return `<div id="uiContent"> </div>
        <div id="labelsContent" class="hidden"> </div>
        <div id="trackManagement">
            <button id="createShapeButton" class="regular h2" style="width: 80%;"> Create Shape </button>
            <button id="mergeTracksButton" class="regular h2" style="width: 80%; margin-top: 5px;"> Merge Shapes </button>
            <button id="groupShapesButton" class="regular h2" style="width: 80%; margin-top: 5px;"> Group Shapes </button>
            <select id="shapeLabelSelector" class="regular h2"> </select>
            <select id="shapeModeSelector" class="regular h2">
                <option value="annotation" class="regular"> Annotation </option>
                <option value="interpolation" class="regular"> Interpolation </option>
            </select>
            <select id="shapeTypeSelector" class="regular h2">
                <option value="box" class="regular"> Box </option>
                <option value="polygon" class="regular"> Polygon </option>
                <option value="polyline" class="regular"> Polyline </option>
                <option value="points" class="regular"> Points </option>
            </select>
            <div id="polyShapeSizeWrapper">
                <label for="polyShapeSize" class="regular h2"> Poly Shape Size: </label>
                <input id="polyShapeSize" type="text" value="" class="regular h2" style="width: 30%; margin-top: 1%;" placeholder="0-100" />
            </div>
        </div>
        <div id="aamMenu" class="hidden">
            <label class="regular h1"> AAM Mode </label>
            <label id="aamCounter" class="regular h1"> </label> <br />
            <label id="aamTitle" class="regular h2"> </label>
            <div id="aamHelpContainer" class="regular">
            </div>
        </div>`
}

function RevisedAnnotationRightPanel() {
    return `<div id="uiContent"> </div>
        <div id="labelsContent" class="hidden"> </div>
        <div id="trackManagement">
            <button id="createShapeButton" class="regular h2" style="width: 80%;">New</button>
            <select id="shapeLabelSelector" class="regular h2"></select>
            <select id="shapeModeSelector" class="regular h2">
                <option value="annotation" class="regular"> Annotation </option>
                <option value="interpolation" class="regular"> Interpolation </option>
            </select>
        </div>
        `
}

function CVATAnnotationHTML() {
    let centerPanelHTML = Player() + HelpWindow() + SettingWindow() + RevisedPlayerToolBar();
    let rightPanelHTML = RevisedAnnotationRightPanel();
    let objectLabelHTML = Objectlabel()
    return <div style={{ minHeight: '1000px' }}>
        <div id="taskAnnotationCenterPanel" dangerouslySetInnerHTML={{ __html: centerPanelHTML }}
            style={{ height: '480px' }}
        >
        </div>
        <div dangerouslySetInnerHTML={{ __html: objectLabelHTML }}>
        </div>
        <div id="taskAnnotationRightPanel" dangerouslySetInnerHTML={{ __html: rightPanelHTML }}
        >
        </div>

        <div id="overlayTemplate" hidden>
            <div className="modal" hidden>
                <div className="modal-content" >
                    <label className="regular templateMessage selectable"> </label>
                </div>
            </div>
        </div>
    </div>
}

export { SettingWindow, HelpWindow, Player as Plalyer, ActionMenu as AnnotationMenu, AnnotationRightPanel, Objectlabel, CVATAnnotationHTML as CVATAnnotationHTML }