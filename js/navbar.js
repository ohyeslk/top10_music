function toggleDropdown() {
    if (document.getElementById('navbar_main').style.height != '225px')
        document.getElementById('navbar_main').style.height = '225px';
    else
        document.getElementById('navbar_main').style.height = '20px';
}

function fadeSplash() {
    document.getElementById('splash_screen').style.opacity = 0;
    setTimeout(function () {
        document.getElementById('splash_screen').style.visibility = "hidden";
    }, 400);
}

function toggleAbout() {
    if (document.getElementById('about_screen').style.visibility == "visible") {
        document.getElementById('about_screen').style.opacity = 0;
        setTimeout(function () {
            document.getElementById('about_screen').style.visibility = "hidden";
        }, 400);
    }
    else {
        document.getElementById('about_screen').style.visibility = "visible";
        document.getElementById('about_screen').style.opacity = 1;
    }
}

function like() {
    alert("test");
    document.getElementsByClassName("glyphicon glyphicon-heart").style.fontSize = "80px";
}