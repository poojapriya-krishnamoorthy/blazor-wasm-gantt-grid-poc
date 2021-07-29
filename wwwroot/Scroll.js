function scroll(index, rowHeight)
{
    var grid = document.getElementsByClassName("e-grid")[0];
    grid.querySelector('.e-content').scrollTop = (index - 1) * rowHeight;
}
//function AddEvent() {
//    var header = document.querySelector('.e-columnheader');
//    header.addEventListener('contextmenu', rightClickHandler);
//}

function GetSplitPanePosition(columnIndex, id, tooltipPositionX) {
    var nameColumnOffsetWidth = document.querySelector('.e-columnheader th:nth-child(' + (columnIndex + 1) + ')').offsetWidth +
        document.querySelector('.e-columnheader th:nth-child(' + (columnIndex + 1) + ')').offsetLeft;
    var splitterOffset = document.getElementById(id).getElementsByClassName("e-split-bar")[0].offsetLeft;
    var scrollLefPosition = document.getElementById("treeGrid" + id + "_gridcontrol").scrollLeft;
    //var nameColumnOffset = nameColumnOffsetWidth - scrollLefPosition;

    var columnWidth = document.querySelector('.e-columnheader th:nth-child(' + (columnIndex + 1) + ')').offsetWidth; 

    // tooltip container width + 20
    if (splitterOffset < nameColumnOffsetWidth) { //(tooltipPositionX + 140)
        var difference = columnWidth - (nameColumnOffsetWidth - splitterOffset);
        tooltipPositionX = difference - 220;
    } else {
        tooltipPositionX = columnWidth - 220;
    }
    
    //return tooltipPositionX;
    DotNet.invokeMethodAsync('BSTPROJECT', 'SetTooltipPosition', tooltipPositionX);
}

function StyleEventMarker(eventMarkers, projectStartDate, timelineCell, mode) {
    for (i = 0; i < eventMarkers.length; i++) {
        eventMarker = eventMarkers[i].day;
        var left = new Date(eventMarker) - new Date(projectStartDate);
        var element;
        if (mode == "Day") {
            cellIndex = Math.ceil(left / (24 * 60 * 60 * 1000));
            element = document.querySelectorAll(".e-timeline-header-table-container")[1].querySelector("th:nth-child(" + cellIndex + ")").children[0];
            
        } else if (mode == "Week") {
            cellIndex = Math.ceil(left / (24 * 60 * 60 * 1000));
            weekNumber = Math.ceil((new Date(eventMarker).getDay() + 1 + cellIndex) / 7);
            dayPosition = ((weekNumber - 1) * timelineCell) + (timelineCell / (new Date(eventMarker).getDay() + 1));
            element = document.querySelectorAll(".e-timeline-header-table-container")[1].querySelector("th:nth-child(" + weekNumber + ")").children[0].children[0];
        }
        element.style.borderRadius = "15px";
        element.style.backgroundColor = "red";
    }
}
//function rightClickHandler(args) {
//    var th = args.target.closest('th');
//    var colIndex = th.getAttribute('aria-colindex');
//    DotNet.invokeMethodAsync('BSTPROJECT', 'RightClickHandler', colIndex);
//}


