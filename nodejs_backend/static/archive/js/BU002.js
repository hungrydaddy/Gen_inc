// The first three functions respond to input from the search box, to load data to display on the day buttons.

function mycallback(data) {
    document.getElementsByClassName('days_container')[0].style.visibility = "visible";
    var day_text = document.getElementsByClassName('day_button_text');
    var dayButton = document.getElementsByClassName('dayButton');
    var degC = "\u00B0C";
    for (i in data['days']) {
        var temp_max = data['days'][i]['temp_max'];
        day_text[i].innerHTML = data['days'][i]['day_name'] + '<br>' + temp_max + (temp_max.length > 0 ? ' ' + degC : '');
        dayButton[i].setAttribute('data-day_name', data['days'][i]['day_name']);
        dayButton[i].setAttribute('data-temp_min', data['days'][i]['temp_min']);
        dayButton[i].setAttribute('data-temp_max', data['days'][i]['temp_max']);
        dayButton[i].setAttribute('data-text', data['days'][i]['text']);
    }
}

onSearchSelect = function(i) {
    window.location = "#page2";
    var suburb = i.toLowerCase().replace(' ','');
    if (suburb.indexOf('-') > -1) {
        suburb = suburb.substr(suburb.indexOf('-') + 1);
    }
    var url = 'http://gen-inc004rdm.herokuapp.com?id=' + suburb;
    var script = document.createElement('script');
    script.src = url + '&callback=mycallback';
    document.getElementsByTagName('head')[0].appendChild(script);
}

onTextChange= function() {
    document.getElementsByClassName('days_container')[0].style.visibility = 'hidden';
    var dayButton = document.getElementsByClassName('dayButton');
    for (i in dayButton) {
        if (typeof dayButton[i] == 'object') {
            if (dayButton[i].classList.toString().indexOf("day_button_select") > -1) {
                dayButton[i].classList.remove("day_button_select");
            }
        }
    }
}



day_button_onload = function() {
    var dayBut_template = document.getElementsByClassName('dayButton')[0];
    var dayButton = [];
    for (var i = 0; i < 7; i++) {
        dayButton.push(dayBut_template.cloneNode(true));
        dayButton[i].setAttribute('class', 'dayButton dayButton' + i);
        dayButton[i].setAttribute('onclick', 'day_button_toggle("dayButton' + i + '")');
        dayBut_template.parentNode.appendChild(dayButton[i]);
    }
    dayBut_template.parentNode.removeChild(dayBut_template);
    var days_submit_button = document.getElementsByClassName('days_submit_button')[0];
    days_submit_button.setAttribute('onclick','submit_days()');
}

day_button_toggle = function(caller) {
    var button = document.getElementsByClassName(caller)[0];
    if (button.classList.toString().indexOf("day_button_select") > -1) {
        button.classList.remove("day_button_select");
    } else {
        button.classList += " day_button_select";
    }
}

submit_days = function() {
    window.location = "#page3"
    var dayButton = document.getElementsByClassName('dayButton');
    var selection = [];
    for (i in dayButton) {
        if (typeof dayButton[i] == 'object') {
            if (dayButton[i].classList.toString().indexOf("day_button_select") > -1) {
                var graph_data = [i,
                   dayButton[i].getAttribute('data-day_name'),
                   dayButton[i].getAttribute('data-temp_min'),
                   dayButton[i].getAttribute('data-temp_max'),
                   dayButton[i].getAttribute('data-text')];
                selection.push(graph_data);
            }
        }
    }
    if (typeof window.showDaysGraph == "function") {
        window.showDaysGraph(selection);
    }
}