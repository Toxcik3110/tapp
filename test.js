var date1 = null;
var date2 = null;
var date = 0;
var timer = null;
var penalty = true;
var selectedState = "";
var selectedTeam = "";
var transtitionCount = 0;
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

function changePage() {
    if (transtitionCount == 0) {
        selectedState = document.getElementById("stages").options[document.getElementById("stages").selectedIndex].text;
        document.getElementById("team").value =
        document.getElementById("teams").options[document.getElementById("teams").selectedIndex].text;
    }
    transtitionCount += 1;
    if(!penalty) {
        penalty = !penalty;
        document.getElementById("third").style.display = "none";
        document.getElementsByClassName("bottom")[0].innerHTML = "К таймеру";
        document.getElementById("header").innerHTML = selectedState;
        document.getElementById("second").style.display = "flex";
        document.getElementById("first").style.display = "none";
        document.getElementById("exit").style.display = "block";
    } else {
        penalty = !penalty;
        document.getElementById("third").style.display = "none";
        document.getElementsByClassName("bottom")[0].innerHTML = "К штрафам";
        document.getElementById("header").innerHTML = selectedState;
        document.getElementById("second").style.display = "none";
        document.getElementById("first").style.display = "flex";
        document.getElementById("exit").style.display = "block";
    }
}

function exit() {
    transtitionCount = 0;
    document.getElementById("third").style.display = "flex";
    document.getElementById("first").style.display = "none";
    document.getElementById("second").style.display = "none";
    document.getElementsByClassName("bottom")[0].innerHTML = "Судить";
    document.getElementById("header").innerHTML = "Приветствуем в TAPP!";
    document.getElementById("exit").style.display = "none";
}

function getData(str) {
    var xhttp;
    var boo = 0;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState = 4 && xhttp.status == 200 && boo < 2) {
            boo = boo + 1;
            console.log(JSON.parse(xhttp.responseText));
            console.log(JSON.parse(xhttp.responseText).length);
            var teams = JSON.parse(xhttp.responseText);
            for(var i = 0; i < teams.length; i++) {
                var option = document.createElement("option");
                option.text = teams[i].name;
                option.value= teams[i].name;
                document.getElementById("teams").add(option);
            }
            getData1("getStages");
        }
    };
    xhttp.open("GET", "http://localhost:1337/" + str, true);
    xhttp.send();
}
function getData1(str) {
    var xhttp;
    var boo = 0;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState = 4 && xhttp.status == 200 && boo < 2) {
            boo = boo + 1;
            console.log(JSON.parse(xhttp.responseText));
            console.log(JSON.parse(xhttp.responseText).length);
            var stages = JSON.parse(xhttp.responseText);
            for(var i = 0; i < stages.length; i++) {
                var option = document.createElement("option");
                option.text = stages[i].name;
                option.value= stages[i].id;
                document.getElementById("stages").add(option);
            }
        }
    };
    xhttp.open("GET", "http://localhost:1337/" + str, true);
    xhttp.send();
}

function addTeam(name) {
    var xhttp;
    var boo = 0;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState = 4 && xhttp.status == 200 && boo < 2) {
            boo = boo + 1;
            if(xhttp.responseText == "OK") {
                var option = document.createElement("option");
                option.text = name;
                option.value= name;
                document.getElementById("teams").add(option);
            }
        }
    };
    xhttp.open("GET", "http://localhost:1337/addTeam " + name, true);
    xhttp.send();
}
