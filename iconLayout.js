function changeHeight () {
	$(".icon").each(function() {
		var icon = $(this);
		console.log(icon.width());
		icon.width(Math.floor(icon.data("width") * $("body").width()));
		icon.height(Math.floor(icon.width() * icon.data("aspect")));
		console.log(icon.children("h2").css("fontSize", icon.width() * icon.data("fontAspect")));
	});
}

function setThreeColMargins () {
	var fullWidth = parseInt(window.getComputedStyle(document.body).width);
	var sections = document.getElementsByClassName('three-column');
	for (var i = sections.length - 1; i >= 0; i--) {
		var icons = sections[i].getElementsByClassName('icon');
		if (icons.length < 1) {
			continue;
		};
		var marginSize = Math.floor((fullWidth - 3 * (parseFloat(window.getComputedStyle(icons[0]).width) + 2))/4);
		for (var i = icons.length - 1; i >= 0; i--) {
			icons[i].style.marginLeft = marginSize.toString() + "px";
		};
	};
}

function setOneColMargins () {
	var fullWidth = parseInt(window.getComputedStyle(document.body).width);
	var sections = document.getElementsByClassName('one-column');
	for (var i = sections.length - 1; i >= 0; i--) {
		var icons = sections[i].getElementsByClassName('icon');
		if (icons.length < 1) {
			continue;
		};
		var marginSize = (fullWidth - (parseFloat(window.getComputedStyle(icons[0]).width) + 2))/2;
		for (var i = icons.length - 1; i >= 0; i--) {
			icons[i].style.marginLeft = marginSize.toString() + "px";
		};
	};
}

function setTwoColMargins () {
	var fullWidth = parseInt(window.getComputedStyle(document.body).width);
	var sections = document.getElementsByClassName('two-column');
	for (var i = sections.length - 1; i >= 0; i--) {
		var icons = sections[i].getElementsByClassName('icon');
		if (icons.length < 1) {
			continue;
		};
		var marginSize = (fullWidth - 2 * (parseFloat(window.getComputedStyle(icons[0]).width) + 2))/3;
		for (var i = icons.length - 1; i >= 0; i--) {
			icons[i].style.marginLeft = marginSize.toString() + "px";
		};
	};
}

function setLayout () {
	changeHeight();
	setThreeColMargins();
	setOneColMargins();
	setTwoColMargins();
}

window.onresize = function () {
	setLayout();
}

$(document).ready(function() {
	$(".icon1").data("aspect", 1).data("fontAspect", .044).data("width", .365);
	$(".icon2").data("aspect", .79).data("fontAspect", .056).data("width", .288);
	setLayout();
})