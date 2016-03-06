var date1 = null;
var date2 = null;
var date = 0;
var timer = null;
var penalty = true;
var selectedState = 0;
var selectedStateName = "";
var selectedTeam = 0;
var teamId = 0;
var transtitionCount = 0;
var dbObject = null;
var stopped = false;
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
        stopped = true;
        document.getElementById("timer1").style.display = "block";
        document.getElementById("timer2").style.display = "block";
        var dat1 = new Date(date1) + "";
        var dat2 = new Date(date1 + date) + "";
        var d1 = dat1.split(" ");
        var d2 = dat2.split(" ");
        document.getElementById("timer1").value = "Старт: " + d1[4];
        document.getElementById("timer2").value = "Финиш: " + d2[4];
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
    var time1 = document.getElementById("timer").value.split(":");
    var ti1 = time1[2].split(".");
    //var tim1 = time1[0] * 36000000 + time1[1] * 600000 + ti1[0] * 1000 + ti[1];
    var results = {
        "result": {
        "stageId" : dbObject.stages[selectedState - 1].id,
        "time" : document.getElementById("timer").value,
        "startTime" : document.getElementById("timer1").value,
        "penalties": [] },
        "teamId" : parseInt(selectedTeam - 1)
    }
    for(i = 0; i < dbObject.stages[selectedState - 1].penaltyIds.length; i++) {
        results.result.penalties.push({
            "penaltieId": dbObject.stages[selectedState - 1].penaltyIds[i].id,
            "count": document.getElementsByClassName("counter")[i].value
        });
    }
    xhttp.open("POST", "http://192.168.1.179:1337/addResult", true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhttp.send(JSON.stringify(results));
}

function addCounter(index) {
    console.log(document.getElementsByClassName("counter")[index]);
    if(!document.getElementsByClassName("counter")[index].value) document.getElementsByClassName("counter")[index].value = 0;
    document.getElementsByClassName("counter")[index].value = 1 + parseInt(document.getElementsByClassName("counter")[index].value);
}

function reduceCounter(index) {
    if(!document.getElementsByClassName("counter")[index].value) document.getElementsByClassName("counter")[index].value = 0;
    if (document.getElementsByClassName("counter")[index].value > 0)
    document.getElementsByClassName("counter")[index].value = parseInt(document.getElementsByClassName("counter")[index].value) - 1;
}

function changePage() {
    if (transtitionCount == 0) {
        var el1 = document.getElementById("stages").options[document.getElementById("stages").selectedIndex];
        selectedStateName = el1.text;
        selectedState = el1.value;
        var elem =
        document.getElementById("teams").options[document.getElementById("teams").selectedIndex];
        document.getElementById("team").value = elem.text;
        var teamId = elem.value;
        selectedTeam = teamId;
        var stateId =  document.getElementById("stages").options[document.getElementById("stages").selectedIndex].value;
        selectedState = stateId;
        for(i = 0; i < dbObject.stages[stateId].penaltyIds.length; i++) {
            var li = document.createElement("div");
            li.className = "content1";
            var ta = document.createElement("textarea");
            ta.cols=30;
            ta.disabled = true;
            ta.className="penaltyName"
            ta.innerHTML = dbObject.penalties[dbObject.stages[stateId].penaltyIds[i]].name;
            var li1 = document.createElement("div");
            li1.className = "controll";
            // var inpt1 = document.createElement("input");
            // inpt1.type = "button";
            // // inpt1.addEventListener("click", addCounter(i));
            // //inpt1.readOnly = true;
            // inpt1.id = "increaseButton";
            // inpt1.value = "Добавить один штраф";
            var inpt2 = document.createElement("input");
            inpt2.type = "number";
            //inpt2.addEventListener("click", addCounter(i));
            //inpt2.disabled = true;
            inpt2.className = "counter";
            inpt2.min = 0;
            inpt2.value = "0";
            // var inpt3 = document.createElement("input");
            // inpt3.type = "button";
            // //inpt3.readOnly = true;
            // inpt3.id = "decreaseButton";
            // inpt1.addEventListener("click", addCounter(i));
            // inpt3.addEventListener("click", reduceCounter(i));
            // inpt3.value = "Убрать один штраф";
            // li1.appendChild(inpt1);
            li1.appendChild(inpt2);
            // li1.appendChild(inpt3);
            li.appendChild(ta);
            li.appendChild(li1);
                 //
                //  '<div class="controll">' +
                //      '<input type="text" onclick="addCounter(' + i + ')" readonly id="clearButton" value="Добавить один штраф">' +
                //  '<input type="text" class="counter" disabled value="0">' +
                //  '<input type="text" onclick="reduceCounter(' + i + ')" id="sendButton" value="Убрать один штраф" readonly>' +
                //    '</div>';
             document.getElementById("second").appendChild(li);
        }
        for(i = 0; i < document.getElementsByClassName("sendButton").length; i++) {
            console.log("go");
            document.getElementsByClassName("sendButton")[i].addEventListener('click', function() {
                if (document.getElementsByClassName("counter")[i].value > 0)
                document.getElementsByClassName("counter")[i].value = parseInt(document.getElementsByClassName("counter")[i].value) - 1;
            });
            document.getElementsByClassName("clearButton")[i].addEventListener('click', function() {
                document.getElementsByClassName("counter")[i].value = 1 + parseInt(document.getElementsByClassName("counter")[i].value);
            });
        }
    }
    transtitionCount += 1;
    if(!penalty) {
        penalty = !penalty;
        document.getElementById("third").style.display = "none";
        document.getElementsByClassName("bottom")[0].innerHTML = "К таймеру";
        document.getElementById("header").innerHTML = selectedStateName;
        document.getElementById("second").style.display = "flex";
        document.getElementById("first").style.display = "none";
        document.getElementById("exit").style.display = "block";
        document.getElementById("timer1").style.display = "none";
        document.getElementById("timer2").style.display = "none";
    } else {
        penalty = !penalty;
        document.getElementById("third").style.display = "none";
        document.getElementsByClassName("bottom")[0].innerHTML = "К штрафам";
        document.getElementById("header").innerHTML = selectedStateName;
        document.getElementById("second").style.display = "none";
        document.getElementById("first").style.display = "flex";
        document.getElementById("exit").style.display = "block";
        if(stopped) {
            document.getElementById("timer1").style.display = "block";
            document.getElementById("timer2").style.display = "block";
        }
    }
    var results = dbObject.teams[selectedTeam - 1].results;
    console.log(dbObject.teams);
    console.log(selectedTeam);
    console.log(results);
    console.log(selectedState);
    if(results)
    for(i = 0; i < results.length; i++) {
        if(results[i].stageId == dbObject.stages[selectedState - 1].id) {
            console.log(results[i]);
            document.getElementById("timer").value = results[i].time;
            document.getElementById("timer").style.display = "block";
            document.getElementById("timer1").value = "Старт: " + results[i].startTime;
            var tim1 = results[i].startTime.split(":");
            var tim2 = results[i].time.split(":");
            var ti1 = tim1[2].split(".");
            var ti2 = tim2[2].split(".");
            var finish = parseInt(parseInt(tim1[0]) + parseInt(tim2[0])) + ":" + parseInt(parseInt(tim1[1]) +
            parseInt(tim2[1])) + ":" + parseInt(parseInt(ti1[0]) + parseInt(ti2[0])) +
            "." + parseInt(parseInt(ti1[1]) + parseInt(ti2[1]));
            console.log(finish);
            //var fini = (new Date(finish) + "").split(" ");
            document.getElementById("timer2").value = "Финиш: " + finish;
            document.getElementById("timer1").style.display = "block";
            document.getElementById("timer2").style.display = "block";
            document.getElementsByClassName("side")[0].style.display = "none";
            for(j = 0; j < results[i].penalties.length; j++) {
                for(k = 0; k < dbObject.stages[selectedState - 1].penaltyIds.length; k++) {
                    if(results[i].penalties[j].id == dbObject.stages[selectedState - 1].penaltyIds[k])
                    {
                        console.log("FOUND");
                        document.getElementsByClassName("counter")[k].value = results[i].penalties[j].count;
                        document.getElementsByClassName("counter")[k].readOnly = true;
                    }
                }
            }
        }
    }
}

function exit() {
    date = 0;

    stopped = false;
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
                option.value= teams[i].id;
                document.getElementById("teams").add(option);
            }
            document.getElementById("header").innerHTML += "1";
            getData1("getStages");
        }
    };
    xhttp.open("GET", "http://192.168.1.179:1337/" + str, true);
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
            document.getElementById("header").innerHTML += "2";
            getData2();
        }
    };
    xhttp.open("GET", "http://192.168.1.179:1337/" + str, true);
    xhttp.send();
}
function getData3() {
    var xhttp;
    var boo = 0;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState = 4 && xhttp.status == 200 && boo < 2) {
            boo = boo + 1;
            dbObject = JSON.parse(xhttp.responseText);
            document.getElementById("header").innerHTML += "3";
        }
    };
    xhttp.open("GET", "http://192.168.1.179:1337/getAll", true);
    xhttp.send();
}
function getData2() {
    var xhttp;
    var boo = 0;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState = 4 && xhttp.status == 200 && boo < 2) {
            boo = boo + 1;
            dbObject = JSON.parse(xhttp.responseText);
            document.getElementById("header").innerHTML += "3";
            console.log(dbObject);
        }
    };
    xhttp.open("GET", "http://192.168.1.179:1337/getAll", true);
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
    xhttp.open("POST", "http://192.168.1.179:1337/addTeam", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("name=" + name);
}
