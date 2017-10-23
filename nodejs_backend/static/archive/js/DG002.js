showDaysGraph = function(day_list) {
    var graph_template = document.getElementsByClassName('dayGraph')[0];
    var dayGraph = [];
    for (var i = 0; i < day_list.length; i++) {
        dayGraph.push(graph_template.cloneNode(true));
        dayGraph[i].setAttribute('class', 'row dayGraph' + i);
        dayGraph[i].style.display = "";
        graph_template.parentNode.appendChild(dayGraph[i]);
        var day_label = dayGraph[i].getElementsByClassName("day_label")[0];
        day_label.innerHTML = day_list[i][1];
    }
    graph_template.style.display = "none";
}



//js file for displaying sunny period


var getInfo = function() {

  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      return xmlhttp.responseText;
    }
  }

  //request from the server
  //xmlhttp.open();
  xmlhttp.send();
}


var parseInfo = function(jsonString) {
  //do json parsing
  var sunnyPeriod = { "Mon" :
  [{"type":"sun",
    "range":"0500-0700",
    "magnitude":"heavy",
    "possibility": "0.7"},
    {"type":"sun",
      "range":"1210-1500",
      "magnitude":"medium",
      "possibility": "0.7"},
    {"type":"cloud",
      "range":"0600-1110",
      "magnitude":"minimum",
      "possibility": "0.2"},
    ],
  "Tue": [{"type":"sun",
    "range":"0500-2100",
    "magnitude":"light",
    "possibility": "0.7"}]};

  return sunnyPeriod;
}

//setting a hour element valid
var setValid = function(name) {
  var item = document.getElementsByClassName(name)[0];
  item.classList.add("valid");
}


var updateSunnyPeriod = function(sunnyPeriod) {
  var prediction;
  var range;
  var startingHour;
  var endingHour;
  var i;
  var j;

  //parsing json
  for (i=0;i<sunnyPeriod["Mon"].length;i++) {
    prediction = sunnyPeriod["Mon"][i];
    //if not sunny, carry on looping
    if (prediction["type"] != "sun") {
      continue;
    }
    range = prediction["range"];
    startingHour = parseInt(range.substring(0,2));
    endingHour = parseInt(range.substring(5,7));

    for (j=startingHour;j<endingHour;j++) {
      if (startingHour < 7 || endingHour > 18) {
        continue;
      }
      setValid("hourElem" + j.toString());
    }
  }
}
