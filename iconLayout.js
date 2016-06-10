function changeHeight () {
	console.log('changing')
	var icons = document.getElementsByClassName('icon1');
	for (var i = icons.length - 1; i >= 0; i--) {
		var style = window.getComputedStyle(icons[i]);
		icons[i].style.height = style.width;
	};
}

changeHeight();