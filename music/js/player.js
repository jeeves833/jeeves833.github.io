// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
  $('#player').css({"zIndex": "1"});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  // $('#player').hide();
  $('<div id="overlay">').css({"opacity" : '0', "zIndex": "0"}).appendTo(document.body).hide()
  .click(function(event) {$(this).animate({opacity: "0"}, function(){$("#overlay").hide()})});
  songSelect();
  // event.target.cueVideoById("5uLwkOLW-Lg");
  // event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    $('#overlay').show().animate({opacity: '0.8'});
  } else {
    $("#overlay").animate({opacity: '0'}, function(){$("#overlay").hide()});
  }
}

