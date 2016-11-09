var songList;

function populateList (json) {
		songList = json;
		var l = $(".selection-list");
		for (var i = 0; i < json.videos.length; i++) {
			var songElement = $('<a class="list-group-item song-selector" id="' + json.videos[i].id + '">').append($('<h4>' +
			 json.videos[i].title + ' <small>' + json.videos[i].album + '</small></h4>'));
			l.append(songElement);
		};
	}

$.getJSON("data/videos.json", populateList);

function songSelect() {
		console.log("setting click")
		$(".song-selector").click(function(event) {
			window.scrollTo(0,0);
			$(".hide-when-play").slideUp();
			var i = $(this).attr('id');
			// console.log($(this).attr('id'));
			$("#player").css({"visibility": "visible"})
			// console.log(player.cueVideoById);
			player.cueVideoById(i);
		})
	}