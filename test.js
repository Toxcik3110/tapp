var date1 = null;
var date2 = null;
var date = 0;
var timer = null;
function startTimer() {
    document.getElementById("startButton").disabled = true;
    document.getElementById("stopButton").disabled = false;
    document.getElementById("clearButton").disabled = true;
    document.getElementById("sendButton").disabled = true;
    date1 = new Date().getTime();
    timer = setInterval(function() {
        date = new Date().getTime() - date1;
        var millis = date % 1000;
        var sec = Math.floor(date / 1000);
        sec = sec % 60;
        var min = Math.floor(date / 60000);
        var hours = Math.floor(date / 36000000);
        if (Math.floor(millis/10) == 0) millis = "0" + millis;
        if (Math.floor(millis/100) == 0) millis = "0" + millis;
        if (Math.floor(millis/1000) == 0) millis = "" + millis;
        if (Math.floor(sec/10) == 0) sec = "0" + sec;
        if (Math.floor(min/10) == 0) min = "0" + min;
        if (Math.floor(hours/10) == 0) hours = "0" + hours;
        //if (Math.floor(hours/10) > 0) hours = "0" + hours;
        document.getElementById("timer").value = hours + ":" + min + ":" + sec + "." + millis;

    }, 1);
}

function stopTimer() {
    if(timer != null) {
        window.clearInterval(timer);

    }
    document.getElementById("startButton").disabled = false;
    document.getElementById("clearButton").disabled = false;
    document.getElementById("sendButton").disabled = false;
}

function clearTimer() {
    document.getElementById("startButton").disabled = false;
    document.getElementById("stopButton").disabled = true;
    document.getElementById("clearButton").disabled = true;
    document.getElementById("timer").value = 0;
    date = 0;
    date1 = null;
}

function sendResult() {
    date = 0;
    date1 = null;
    document.getElementById("sendButton").disabled = true;
}

function addCounter(index) {
    document.getElementsByClassName("counter")[index].value = 1 + parseInt(document.getElementsByClassName("counter")[index].value);
}

function reduceCounter(index) {
    if (document.getElementsByClassName("counter")[index].value > 0)
    document.getElementsByClassName("counter")[index].value = parseInt(document.getElementsByClassName("counter")[index].value) - 1;
}
