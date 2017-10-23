// add an onSearchSelect function to your javascript to get the selected search result

    var search_list = [
    'Mildura', 'Ouyen', 'Swan Hill', 'Kerang', 'Cobram', 'Birchip',
    'Yarrawonga', 'Rutherglen', 'Albury-Wodonga', 'Echuca', 'Corryong', 'Warracknabeal',
    'Beechworth', 'Nhill', 'Kyabram', 'Wangaratta', 'Shepparton', 'Tatura',
    'Benalla', 'Horsham', 'Bendigo', 'Falls Creek', 'Mount Hotham', 'Redesdale',
    'Edenhope', 'Seymour', 'Mansfield', 'Maryborough', 'Stawell', 'Castlemaine',
    'Omeo', 'Mount Buller', 'Lake Eildon', 'Kyneton', 'Ararat', 'Gisborne',
    'Lake Mountain', 'Mallacoota', 'Ballarat', 'Casterton', 'Orbost', 'Hamilton',
    'Bairnsdale', 'Mount Baw Baw', 'Lakes Entrance', 'Mortlake', 'Sale', 'Heywood',
    'Drouin', 'Warragul', 'Moe', 'Traralgon', 'Latrobe Valley', 'Colac',
    'Portland', 'Warrnambool', 'Port Fairy', 'Aireys Inlet', 'Leongatha', 'Wonthaggi',
    'Weeaproinah', 'Cape Otway', 'Wilsons Promontory', 'Phillip Island', 'Cerberus', 'Rhyll',
    'Geelong', 'Torquay', 'Mornington Peninsula', 'Cranbourne', 'Frankston', 'Pakenham',
    'Avalon', 'Mount Dandenong', 'Dandenong', 'Melbourne', 'Watsonia', 'Laverton',
    'Moorabbin', 'Melton', 'Scoresby', 'Tullamarine', 'Yarra Glen', 'Sunbury'
    ]
    var dict = {}
    var search_box = {}
    var search_container = {}
    var results_frame = {}
    var last_search = ''
    var strip_list = [];
    var result_max = 0;     // how many results to display. Set this in HTML using data-n="5" (or "6" or whatever)
    hover_on_color = "";    // as a property on the "search_box" text area.
    hover_off_color = "";
    search_box_onload = function() {
        search_box = document.getElementsByClassName('search_box')[0]
        search_box.setAttribute('onKeyUp','textChange(event)');
        search_box.setAttribute('onFocus','textChange(event)');
        search_box.setAttribute('onKeyPress','suppressEnter(event)');
        search_box.setAttribute('onBlur','hideDropDown()');
        search_box.style = 'white-space: nowrap; overflow: hidden; z-index: 1; position: absolute;'
        search_container = document.getElementsByClassName('search_container')[0]
		if (search_container.dataset.n) {
            result_max = search_container.dataset.n;
		} else {
			result_max = 5;
		}
        for (var i = 0; i < search_list.length; i++) {
            for (var j = 1; j <= search_list[i].length; j++) {
                partial_text = search_list[i].substring(0,j).toLowerCase();
                if (dict[partial_text]) {
                    dict[partial_text].push(search_list[i]);
                } else {
                    dict[partial_text] = [search_list[i]]
                }
            }
        }
        for (var i = 0; i < result_max; i++) {
            strip_list.push(document.createElement('div'));
            strip_list[i].style.visibility = "hidden";
            strip_list[i].style.position = 'absolute';
            strip_list[i].id = 'result_strip' + i;
            strip_list[i].setAttribute('class', 'result_strip');
            search_container.appendChild(strip_list[i])
            strip_list[i].setAttribute('onmousedown', ['resultClick(',i,')'].join(''));
            strip_list[i].setAttribute('onmouseover', ['searchHoverOn(',i,')'].join(''));
            strip_list[i].setAttribute('onmouseout', ['searchHoverOff(',i,')'].join(''));
        }
        results_frame = document.createElement('div');
        results_frame.setAttribute('class', 'results_frame');
        results_frame.style.position = 'absolute';
        results_frame.style.top = '0px';
        results_frame.style.pointerEvents = 'none';
        resultSize();
        search_container.appendChild(results_frame)
        var temp = document.createElement('div');
        temp.setAttribute('class', 'search_hover');
        temp.style.top = '0px';
        search_container.appendChild(temp);
        hover_on_color = window.getComputedStyle(temp).getPropertyValue("background-color");
        hover_off_color = window.getComputedStyle(strip_list[0]).getPropertyValue("background-color");
        search_container.removeChild(temp);
    }
    window.onresize = function() {
        resultSize();
    }
    textChange = function(event) {
        var e = window.event || event;
        if (e.key == 'Enter') {
            search_box.value = last_search;
            hideDropDown();
            resultClick(-1);
            return
        }
        for (var i = 0; i < result_max; i++) {
            strip_list[i].innerHTML = '';
            strip_list[i].style.visibility = 'hidden';
        }
        results_frame.style.height = '0px';
        if (search_box.value.length > 0) {
            results = dict[search_box.value.toLowerCase()] || []
            results_frame.style.height = (Math.min(results.length,parseInt(result_max)) + 1)
                                         * search_box.clientHeight + 2 + 'px';
            for (var i = 0; i < Math.min(result_max,results.length); i++) {
                strip_list[i].innerHTML = results[i];
                strip_list[i].style.visibility = 'visible';
            }
        }
        if (window.onTextChange != undefined) { onTextChange(); };
    }
    searchHoverOn = function(caller_id) {
        strip_list[caller_id].classList += " search_hover";
        strip_list[caller_id].style.background = hover_on_color;
    }
    searchHoverOff = function(caller_id) {
        strip_list[caller_id].classList.remove("search_hover");
        strip_list[caller_id].style.background = hover_off_color;
    }
    resultSize = function() {
        for (var i = 0; i < result_max; i++) {
            strip_list[i].style.top = search_box.offsetTop + (i + 1) * search_box.clientHeight + 2 + "px";
            strip_list[i].style.left = search_box.offsetLeft + 1 + "px";
            strip_list[i].style.width = search_box.clientWidth - 2 + "px";
            strip_list[i].style.height = search_box.clientHeight + "px";
        }
        results_frame.style.left = search_box.offsetLeft + 'px';
        results_frame.style.width = search_box.clientWidth + 2 + 'px';
    }
    resultClick = function(caller) {
        lostFocus = false;
        if (caller == -1) {
            var result = search_box.value
        } else {
            result_strip = document.getElementById('result_strip' + caller);
            search_box.value = result_strip.innerHTML;
            var result = result_strip.innerHTML;   // .toLowerCase().replace(/ /g,'')
            hideDropDown();
        }
        if (typeof window.onSearchSelect == "function") { onSearchSelect(search_box.value); };
    }
    suppressEnter = function(event) {
       var e = window.event || event;
       if (e.key == 'Enter') {
           last_search = search_box.value;
           search_box.value = ''
       };
    }
    hideDropDown = function() {
        for (var i = 0; i < result_max; i++) {
            strip_list[i].innerHTML = '';
            strip_list[i].style.visibility = 'hidden';
        }
        results_frame.style.height = '0px';
    }
