var objects = { // in different arrays so i can use the funny individual counters :3
	cat: [],
	campfire: []
} // todo: get the code to only create NEW cats, if the number of cats gets lowered, unload the unneeded ones so they can be brought back with same positioning and stuff (the people will thank me)
var preview = document.getElementById("placement_preview");
var root = document.querySelector(':root');
var darktheme = false;

var images = {
	"campfire": "https://github.com/aflacc/campfire-cats/blob/main/assets/campfire.gif?raw=true",
	"cat": "https://github.com/aflacc/campfire-cats/blob/main/assets/cat.png?raw=true"
}
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
	constructor(type,x,y) {
		this.type = type;
		this.flipped = false;
		// unsure if i should use a div or img here, using img bc i can
		var element = document.createElement("img");
		element.classList.add("img_obj");
		element.src = images[type];
		element.draggable = false;
		objects[type].push(element);
		element.oncontextmenu = function()
			{
				this.flipped = !this.flipped;
				if (this.flipped)
				{
					element.style["-webkit-transform"] = "scaleX(-1)";
					element.style["transform"] = "scaleX(-1)";
					
				}
				else
				{
					element.style["-webkit-transform"] = "scaleX(1)";
					element.style["transform"] = "scaleX(1)";
					
				}
				return false; // no context menu >:(
			}
		document.getElementById("canvas").appendChild(element);
	}
}
// general handler
function changeObjectCount() {
	var intendedCatCount 	= Number(document.getElementById("counter_cats").value) + 0;
	var intendedCFCount 	= Number(document.getElementById("counter_campfires").value) + 0;
	console.log(`${intendedCatCount} cats and ${intendedCFCount} campfires`);

	objects.cat.forEach(function(c)
													{
														c.style.display = "none";
													})
	objects.campfire.forEach(function(c)
													{
														c.style.display = "none";
													})
	for (let cat = 0; cat < intendedCatCount; cat++)
		{
			
			//console.log("l")
			if (objects["cat"][cat] == null)
			{
				new Object("cat");
			}
			else
			{
				objects["cat"][cat].style.display = "inline-block";
			}
		}
	for (let cf = 0; cf < intendedCFCount; cf++)
		{
			//console.log("l")
			if (objects["campfire"][cf] == null)
			{
				new Object("campfire");
			}
			else
			{
				objects["campfire"][cf].style.display = "inline-block";
			}
		}
	console.log(objects["cat"]);
}
/** debug, use at own risk this will probably end reality as we know it or something */ 
function createTestObject(type) {
	console.log("you've doomed us all")
	new Object(type); // i see no reason to assign it to variable other than to create intentional memory leaks
}