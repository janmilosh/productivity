//
//Declare global variables
//
var txTime, clockIn, lunchOut, lunchIn, clockOut, productivityInput, getClockOut, getProductivityOut;
var clockInMinutes, lunchInMinutes, lunchOutMinutes, clockOutMinutes;
var clockInArray = [];
var lunchOutArray = [];
var lunchInArray = [];

function $(id) {
    return document.getElementById(id);
}

//
//Function to collect form inputs
//
function getFormValues() {

    txTime = $('tx-time').value;
    clockIn = $('clockIn').value;
    lunchOut = $('lunch-out').value;
    lunchIn = $('lunchIn').value;
    clockOut = $('clock-out').value;
    productivityInput = $('productivity-input').value;
    clockInArray = clockIn.split(":");
    clockInMinutes = convertMinutes(clockInArray);
    if (clockOut !== '') {
        clockOutArray = clockOut.split(":");
        clockOutMinutes = convertMinutes(clockOutArray);
    }
    lunchOutArray = lunchOut.split(":");
    lunchOutMinutes = convertMinutes(lunchOutArray);
    lunchInArray = lunchIn.split(":");
    lunchInMinutes = convertMinutes(lunchInArray);
    if ((lunchOutMinutes < clockInMinutes) && (lunchOut !== '')) {
        lunchOutMinutes = lunchOutMinutes + 720;
    }
    if ((lunchInMinutes < clockInMinutes) && (lunchIn !=='')) {
        lunchInMinutes = lunchInMinutes + 720;
    }
    if (clockOutMinutes < clockInMinutes) {
        clockOutMinutes = clockOutMinutes + 720;
    }
}
function getProductivity() {
    getFormValues();
    var dayLength = clockOutMinutes - clockInMinutes;
    var workTime;   
    if (lunchIn == '') {
        workTime = dayLength;
    } else {
        var lunchBreak = lunchInMinutes - lunchOutMinutes;
        workTime = dayLength - lunchBreak;
    }
    if (clockOut !== '') {
        getProductivityOut = (txTime * 100)/workTime;       
        getProductivityOut = getProductivityOut.toFixed(1);
        $('get-productivity-out').innerHTML = getProductivityOut + " %" ;
        $('get-clock-out').innerHTML = '';
        $('productivity-input').value = '';
    }
        
}
function getClockOut() {
    getFormValues();
    if (lunchIn == '') {
        clockOutMinutes = (txTime*100/productivityInput) + clockInMinutes;
    } else {
        var lunchBreak = lunchInMinutes - lunchOutMinutes;
        clockOutMinutes = (txTime*100/productivityInput) + clockInMinutes + lunchBreak;
    }
    if (productivityInput !== '') {
        getClockOutTime = convertHours(clockOutMinutes);
        $('get-clock-out').innerHTML = getClockOutTime;
        $('get-productivity-out').innerHTML = '';
        $('clock-out').value = '';
    }      
}
function convertMinutes(inputArray) {
    var hours = Number(inputArray[0]);
    var minutes = Number(inputArray[1]);
    var totalMinutes = (hours * 60) + minutes;
    return totalMinutes;        
}
function convertHours(inputMinutes) {
    var hours = inputMinutes/60;
    hours = Math.floor(hours);
    var minutes = inputMinutes % 60;
    minutes = Math.round(minutes);
    if (hours > 12) {
        hours = hours - 12;
    }
    if (minutes === 60) {
        minutes = 0;
        hours = hours + 1;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    var outputTime = hours + ':' + minutes;
    return outputTime;
}
function reloadPage() {
    location.reload(true);
}