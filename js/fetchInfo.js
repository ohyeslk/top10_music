var loadedSong;
var trackNum;
var localSong;
var localNum = 0;
var playingLocal = 0;
var topArtists= new Array();
var topSongs = new Array();
var localArtists;
var localSongTitles;

function updateInfo() {
    document.getElementById('overlay_text_location_content').textContent = window.frames['map_frame'].curCountryName;

    var countryName = window.frames['map_frame'].curCountry;
    if (countryName == "NL") {
        localSong = ["NL/Songs/Cartographer - A Sea of Sunshine, but None for You - Netherlands.wav",
        "NL/Songs/Kuiters - Ride With Me - Netherlands.mp3",
        "NL/Songs/Luukg2 - Pink Substance - Netharlands.mp3"
        ];
        localArtists = ["Cartographer", "Kuiters", "Luukg2"];
        localSongTitles = ["A Sea of Sunshine, but None for You", "Ride With Me", "Pink Substance"];

    }
    else if (countryName == "TR") {
        localSong = ["TR/Songs/Kalben Sagdic - Firtinalar.wav",
            "TR/Songs/I'mpty - Amed - Turkey.wav",
            "TR/Songs/Odead x Grej - Kemer Suikasti - Turkey.wav"];
        localArists = ["Kalben Sagdic", "I'mpty", "Kemer Suikasti"];
        localSongTitles = ["Firtinalar", "Amed", "Odead x Grej"];
    }
    else if (countryName == "UG") {
        localSong = ["UG/Songs/Eddy Kenzo Ft. Toofan -- Sitya Loss Remix.mp3",
            "UG/Songs/Lowooza Kunze Rema Namakula New Ugandan Music 2015 Official HD Video.mp3"];
        localArtists = ["Eddy Kenzo Ft. Toofan", "Rema Namakula"];
        localSongTitles["Sitya Loss Remix", "Lowooza Kunze"];
    }

    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "php/ItunesTop40.php", false);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest.send("term=" + window.frames['map_frame'].curCountry);
    var response = String(httpRequest.response);

    //response = jsonRemoveUnicodeSequences(response);


    var removed = response.replace('"', "");
    while (response != removed) {
        response = removed;
        removed = response.replace('"', "");
    }

    removed = response.replace('\\', "");
    while (response != removed) {
        response = removed;
        removed = response.replace('\\', "");
    }
    
    var httpRequest2 = new XMLHttpRequest();
    httpRequest2.open("POST", "php/ItunesTop40.php", false);
    httpRequest2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest2.send("termFull=" + window.frames['map_frame'].curCountryName);
    var response2 = String(httpRequest2.response);

    //response2 = jsonRemoveUnicodeSequences(response2);

    var removed2 = response2.replace('"', "");
    while (response2 != removed2) {
        response2 = removed2;
        removed2 = response2.replace('"', "");
    }

    removed2 = response2.replace('\\', "");
    while (response2 != removed2) {
        response2 = removed2;
        removed2 = response2.replace('\\', "");
    }

    var split = response.split("][");
    var songs = split[0].replace("[","");
    var pictures = split[1];
    loadedSong = split[2].replace("]","");
    songs = songs.split(",");
    pictures = pictures.split(",");
    loadedSong = loadedSong.split(",");

    response2 = response2.replace("[", "").replace("]", "");

    var backgroundImage = response2;

    document.getElementById('overlay_background').style.backgroundImage = "URL('" + backgroundImage + "')";

    document.getElementById('audio_player').pause();
    trackNum = 0;
    document.getElementById('audio_source').src = loadedSong[trackNum];
    document.getElementById('audio_player').load();
    var myListArray = document.getElementById('overlay_text_toplist').getElementsByTagName('li');
    for (var i = 0; i < myListArray.length; i++) {
        myListArray[i].getElementsByTagName('img')[0].src = pictures[i];
        myListArray[i].getElementsByTagName('a')[0].textContent = songs[i];
    }
    for (var i = 0; i < myListArray.length; i++) {
        topSongs[i] = songs[i].split("-")[0];
        topArtists[i] = songs[i].split("-")[1];
    }
}

function showInfo() {
    document.getElementById('overlay_small').style.visibility = "visible";
    document.getElementById('overlay_small').style.opacity = 1;
    setTimeout(function () {
        document.getElementById('overlay_small').style.visibility = "visible";
    }, 500);

}

function hideInfo() {
    document.getElementById('overlay_small').style.opacity = 0;
    setTimeout(function () {
        document.getElementById('overlay_small').style.visibility = "hidden";
    }, 500);
}

function updateSong() {
    if (!playingLocal) {
        document.getElementById('overlay_player_song').textContent = topSongs[trackNum];
        document.getElementById('overlay_player_artist').textContent = topArtists[trackNum];
    }
    else {
        document.getElementById('overlay_player_song').textContent = localSongsTitles[localNum];
        document.getElementById('overlay_player_artist').textContent = localArtists[localNum];
    }
}

function playTop(myNum) {
    document.getElementById('audio_player').pause();
    trackNum = myNum;
    document.getElementById('audio_source').src = loadedSong[trackNum];
    document.getElementById('audio_player').load();
    document.getElementById('audio_player').play();
    document.getElementById('overlay_player_button_icon_play').className = "glyphicon glyphicon-pause";
    updateSong();
}

function playToggle() {
    if (document.getElementById('audio_player').paused) {
        document.getElementById('audio_player').play();
        updateSong();
        document.getElementById('overlay_player_button_icon_play').className = "glyphicon glyphicon-pause";
    }
    else {
        document.getElementById('audio_player').pause();
        document.getElementById('overlay_player_button_icon_play').className = "glyphicon glyphicon-play";
    }
}

function playNext() {
    document.getElementById('audio_player').pause();
    if (!playingLocal) {
        trackNum += 1;
        trackNum %= 10;
        document.getElementById('audio_source').src = loadedSong[trackNum];
    }
    else {
        localNum += 1;
        localNum %= localSong.length;
        document.getElementById('audio_source').src = localSong[localNum];
    }

    document.getElementById('audio_player').load();
    document.getElementById('audio_player').play();
}

function playLocal() {
    //alert(localSong[0]);
    playingLocal = true;
    document.getElementById('audio_player').pause();
    document.getElementById('audio_source').src = localSong[localNum];
    document.getElementById('audio_player').load();
    document.getElementById('audio_player').play();
    document.getElementById('overlay_player_button_icon_play').className = "glyphicon glyphicon-pause";
    updateSong();
}

function search() {
    var text = document.getElementById('navbar_menu_search_field').value;
    window.frames['map_frame'].geocoder.geocode({ 'address' : text }, function (results, status) {
        if (status == window.frames['map_frame'].google.maps.GeocoderStatus.OK) {
            window.frames['map_frame'].getCountry(results[0].geometry.location);
        }
        else {
        }
    });
}