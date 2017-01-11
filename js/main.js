$(".icon").hover(function() {
	$(this).css("border-color", "grey");
	},
	function() {
		$(this).css("border-color", "white");
	});


var defaultFontSize;


$(".expandable").hover(function() {
	// console.log($(".expander .glyphicon", this).css("font-size"));
	defaultFontSize = $(".expander .glyphicon", this).css("font-size");
	$(".expander .glyphicon", this).animate({fontSize: "120%"}, 50);
	}, function() {
	$(".expander .glyphicon", this).animate({fontSize: defaultFontSize}, 50);
}).click(function() {
	if ($(".expander .glyphicon", this).css("animation-name") == "openMenu") {
		$(".expander .glyphicon", this).css({"-webkit-animation-name":"closeMenu",
	        "-webkit-animation-duration":"0.1s",
	        "-webkit-animation-iteration-count":"1",
	        "-webkit-animation-fill-mode" : "forwards"});
		var offset = $(this).offset();
		offset.left -= 20;
		offset.top -= 20;
		$('html, body').animate({
		    scrollTop: offset.top,
		    scrollLeft: offset.left
		});
		// $(this).scrollIntoView();

	} else {
		$(".expander .glyphicon", this).css({"-webkit-animation-name":"openMenu",
	        "-webkit-animation-duration":"0.1s",
	        "-webkit-animation-iteration-count":"1",
	        "-webkit-animation-fill-mode" : "forwards"});
			var offset = $(this).offset();
			offset.left -= 20;
			offset.top -= 20;
			$('html, body').animate({
			    scrollTop: offset.top,
			    scrollLeft: offset.left
			});
			// $(this).scrollIntoView();
		// $(this).scrollIntoView();
	}
});

$(".menu").hide()