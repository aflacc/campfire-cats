var objects = {}

var preview = document.getElementById("placement_preview");
var root = document.querySelector(':root');

function update_instructions() {
	var value = document.getElementById("mode").value;
	var instructions = document.getElementById("controls");
	switch (value) {
		default:
			instructions.innerHTML = "confused :(";
		case 'cat':
			instructions.innerHTML = "left click - place cat";
			break;
		case 'camp':
			instructions.innerHTML = "left click - place campfire";
			break;
		case 'edit':
			instructions.innerHTML = "hold left click - drag, right click to flip";
			break;
		case 'delete':
			instructions.innerHTML = "left click - delete"
			break;
	}
}

/*document.addEventListener('mousemove', function(e) {
	let body = document.querySelector('body');
	let circle = document.getElementById('placement_preview');
	let left = e.offsetX;
	let top = e.offsetY;
	circle.style.left = left + 'px';
	circle.style.top = top + 'px';
});*/

var darktheme = false

if (localStorage.getItem("darkTheme") != null)
{
	darktheme = localStorage.getItem("darkTheme") == "true" ? true : false;
	toggle_theme(false);
}
else
{
	localStorage.setItem("darkTheme",darktheme);
}

function toggle_theme(actuallyChange) {
	if (actuallyChange == null) {darktheme = !darktheme;}
	document.getElementById("themetoggle").innerHTML = darktheme ? "make me blind" : "my eyes hurt :(";
	localStorage.setItem("darkTheme",darktheme);
	root.style.setProperty('--theme-background', `var(--${darktheme ? "dark" : "light"}-background)`);
	root.style.setProperty('--theme-text', `var(--${darktheme ? "dark" : "light"}-text)`);
	root.style.setProperty('--theme-border', `var(--${darktheme ? "dark" : "light"}-border)`);
	root.style.setProperty('--theme-button', `var(--${darktheme ? "dark" : "light"}-button)`);
	root.style.setProperty('--theme-button-border', `var(--${darktheme ? "dark" : "light"}-button-border)`);
	
}