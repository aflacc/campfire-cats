var cats = {}
var campfires = {}
var preview = document.getElementById("placement_preview");
var root = document.querySelector(':root');
var darktheme = false;
// unused at the moment, keeping it in case i want to use it later
// these instructions aren't even remotely accurate anymore too, don't listen to them
function update_instructions() {
	var value = document.getElementById("mode").value;
	var instructions = document.getElementById("controls");
	switch (value) {
		default: // default case first because javascript is weird
			instructions.innerHTML = "confused :(";
		case 'cat':
			instructions.innerHTML = "left click - place cat"; break;
		case 'camp':
			instructions.innerHTML = "left click - place campfire"; break;
		case 'edit':
			instructions.innerHTML = "hold left click - drag, right click to flip"; break;
		case 'delete':
			instructions.innerHTML = "left click - delete"; break;
	}
}
// obligatory dark theme code, easier on the eyes, it'd be really funny if the campfires would visibly glow when dark themes on too, just an idea i'm throwing out there :3
if (localStorage.getItem("darkTheme") != null) {
	darktheme = localStorage.getItem("darkTheme") == "true" ? true : false;
	toggle_theme(false);
} else { localStorage.setItem("darkTheme", darktheme); }
// AAAAAAAAAAAAAAAAAA this code looks SO UGLY 
// but i do like me some variable = bool ? false : true; so i wont complain
function toggle_theme(actuallyChange) {
	if (actuallyChange == null) { darktheme = !darktheme; }
	document.getElementById("themetoggle").innerHTML = darktheme ? "make me blind" : "my eyes hurt :(";
	localStorage.setItem("darkTheme", darktheme);
	root.style.setProperty('--theme-background', `var(--${darktheme ? "dark" : "light"}-background)`);
	root.style.setProperty('--theme-text', `var(--${darktheme ? "dark" : "light"}-text)`);
	root.style.setProperty('--theme-border', `var(--${darktheme ? "dark" : "light"}-border)`);
	root.style.setProperty('--theme-button', `var(--${darktheme ? "dark" : "light"}-button)`);
	root.style.setProperty('--theme-button-border', `var(--${darktheme ? "dark" : "light"}-button-border)`);
}
// objec t :)
class Object {
	constructor(type) {
		this.type = type;
		// unsure if i should use a div or img here, using img bc i can
		var element = document.createElement("img");
	}
}