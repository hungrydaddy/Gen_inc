page_count = 4          // change this if you add more pages (it's a pain for me to calculate it)
menu_shrink_y = 100     // sets how far user has to scroll before menu shrinks

window.onscroll = function() {
    var header = document.getElementsByClassName("header")[0];
    if (window.scrollY > 100) {
        header.classList.remove("scrollTopHeader");
    } else if (header.classList.toString().indexOf("scrollTopHeader") == -1) {
        header.classList += " scrollTopHeader";
    }
    hide_all_highlights();
    for (var i = 1; i <= page_count; i++) {
        page = document.getElementsByClassName("page"+(Number(i)))[0]
        var top = get_style(page,"top");
        var height = get_style(page,"height");
        var screen_center = window.scrollY + window.innerHeight / 2
        if ((screen_center > top) && (screen_center < (top + height))) {
            show_highlight(i);
        }
    }
}

get_style = function(elem,style) {
    raw = window.getComputedStyle(elem).getPropertyValue(style);
    return Number(raw.substring(0,raw.length - 2));
}

hide_all_highlights = function() {
    for (var i = 0; i < page_count; i++) {
        hide_highlight(i);
    }
}

hide_highlight = function(pageID) {
    document.getElementsByClassName("menu_item"+(Number(pageID)+1))[0].classList.remove("menu_highlight");
}

show_highlight = function(pageID) {
    if (document.getElementsByClassName("menu_item"+pageID)[0].classList.toString().indexOf("menu_highlight") == -1) {
        document.getElementsByClassName("menu_item"+pageID)[0].classList += " menu_highlight";
    }
}