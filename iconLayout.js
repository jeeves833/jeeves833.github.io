function changeHeight () {
	$(".icon").each(function() {
		var icon = $(this);
		icon.width(Math.floor(icon.data("width") * $("body").width()));
		icon.height(Math.floor(icon.width() * icon.data("aspect")));
		icon.children("h2").css("fontSize", icon.width() * icon.data("fontAspect"))
	});
};

function setColMargins () {
	var fullWidth = $('body').width();
	$("[class|='columns']").each(function() {
		var section = $(this);
		var numColumns = parseInt(section.attr("class").slice(-1));
		var icons = section.find('.icon');
		if (icons.length < 1) {
			return;
		}
		var marginSize = Math.floor((fullWidth - numColumns * (icons.width() + 2))/(numColumns + 1));
		icons.css('marginLeft', marginSize);
	});
}

function setLayout () {
	changeHeight();
	setColMargins();
}

window.onresize = function () {
	setLayout();
}

$(document).ready(function() {
	$(".icon1").data("aspect", 1).data("fontAspect", .044).data("width", .365);
	$(".icon2").data("aspect", .79).data("fontAspect", .056).data("width", .288);
	setLayout();
})