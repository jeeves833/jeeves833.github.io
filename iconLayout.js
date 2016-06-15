function changeHeight () {
	var icons = document.getElementsByClassName('icon1');
	for (var i = icons.length - 1; i >= 0; i--) {
		var style = window.getComputedStyle(icons[i]);
		icons[i].style.height = style.width;
		var heading = icons[i].getElementsByTagName('h2')[0];
		heading.style.fontSize = parseFloat(style.width) * .044;

	};
	var icons = document.getElementsByClassName('icon2');
	for (var i = icons.length - 1; i >= 0; i--) {
		var style = window.getComputedStyle(icons[i]);
		icons[i].style.height = parseInt(style.width) * .79;
		var heading = icons[i].getElementsByTagName('h2')[0];
		heading.style.fontSize = parseFloat(style.width) * .056;
	};
}

function setThreeColMargins () {
	var fullWidth = parseInt(window.getComputedStyle(document.body).width);
	var sections = document.getElementsByClassName('three-column');
	for (var i = sections.length - 1; i >= 0; i--) {
		var icons = sections[i].getElementsByClassName('icon');
		if (icons.length < 1) {
			continue;
		};
		var marginSize = (fullWidth - 3 * (parseFloat(window.getComputedStyle(icons[0]).width) + 2))/4;
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

setLayout();