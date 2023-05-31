// note to self: re-export the gifs so they dont have uneeded space in the image so moving them around doesn't become annoying

var objects = { // in different arrays so i can use the funny individual counters :3
	cat: [],
	campfire: []
} 
var preview = document.getElementById("placement_preview");
var root = document.querySelector(':root');
var darktheme = false;
var seen_warning = false; // for having too many objects

var images = {
	"campfire": "https://github.com/aflacc/campfire-cats/blob/main/assets/campfire.gif?raw=true",
	"cat": "https://github.com/aflacc/campfire-cats/blob/main/assets/cat.png?raw=true"
}

// math.random is weird
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
// brain hurt, thank you w3schools
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = Math.floor(elmnt.offsetTop - pos2) + "px";
		elmnt.style["z-index"] = (elmnt.offsetTop - pos2);
    elmnt.style.left = Math.floor(elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
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
	constructor(type,x,y,flipped) {
		this.type = type;
		if (x != null) {this.x = x;} else {this.x = getRandomInt(600);}
		if (y != null) {this.y = y;} else {this.y = getRandomInt(320);}

		console.log(x,y);
		console.log(this.x,this.y);
		this.flipped = flipped || false;
		// unsure if i should use a div or img here, using img bc i can
		var element = document.createElement("img");
		element.classList.add("img_obj");
		element.src = images[type];
		element.draggable = false;
		element.style.left = this.x + "px";
		element.style.top = this.y + "px";
		element.style["z-index"] = this.y;

		dragElement(element);

		element.ondblclick = function()
			{
				element.style["z-index"] = 9999;
			}
		
		// initial one for loading page.. used once... sharing when?
		if (!this.flipped)
				{
					element.style["-webkit-transform"] = "scaleX(1)";
					element.style["transform"] = "scaleX(1)";
				}
				else
				{
					element.style["-webkit-transform"] = "scaleX(-1)";
					element.style["transform"] = "scaleX(-1)";
				}
		this.flipped = flipped;
		// womp womp
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
		this.element = element;
		document.getElementById("canvas").appendChild(element);
		return this;
	}
}
// general handler
function changeObjectCount() {
	var intendedCatCount 	= Number(document.getElementById("counter_cats").value) + 0;
	var intendedCFCount 	= Number(document.getElementById("counter_campfires").value) + 0;
	console.log(`${intendedCatCount} cats and ${intendedCFCount} campfires`);
	if (!seen_warning){
	if (intendedCFCount + intendedCatCount >= 80)
	{
		seen_warning = true;
		window.alert("having too many cats/campfires will bring performance down, i advise you to not put many more than this, but i wont stop you. don't say i didnt warn you if the tab crashes though.\n\nthis warning won't show up twice in one session btw.");
	}}

	objects.cat.forEach(function(c)
													{
														c.element.style.display = "none";
													})
	objects.campfire.forEach(function(c)
													{
														c.element.style.display = "none";
													})
	for (let cat = 0; cat < intendedCatCount; cat++)
		{
			
			//console.log("l")
			if (objects["cat"][cat] == null)
			{
				objects["cat"].push(new Object("cat",null,null));
			}
			else
			{
				objects["cat"][cat].element.style.display = "inline-flex";
			}
		}
	for (let cf = 0; cf < intendedCFCount; cf++)
		{
			//console.log("l")
			if (objects["campfire"][cf] == null)
			{
				objects["campfire"].push(new Object("campfire",null,null));
			}
			else
			{
				objects["campfire"][cf].element.style.display = "inline-flex";
			}
		}
	console.log(objects["cat"]);
}
/** debug, use at own risk this will probably end reality as we know it or something */ 
function createObject(type,x,y,flipped) {
	console.log("you've doomed us all")
	objects[type].push(new Object(type,x,y,flipped)); // i see no reason to assign it to variable other than to create intentional memory leaks
}
// professional programmer moments right here
createObject("cat",110,125,false)
createObject("campfire",210,125,false)
createObject("cat",295,125,true)
createObject("cat",380,125,true)
// and finally
changeObjectCount()

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
  //document.write("mobile device");
}else{
  // false for not mobile device
  //document.write("not mobile device");
}
const canvas = document.getElementById("generated")
const ctx = document.getElementById("generated").getContext("2d");

// wip, likely will break.
function generateImage()
{
	console.log("Generating image!!! :3")
	domtoimage.toPng(document.getElementById("canvas"))
    .then(function (dataUrl) {
			window.open('',dataUrl)
		})
	/*domtoimage.toJpeg(document.getElementById('canvas'), { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
    });*/

	/*
	var c = document.getElementById('generated');
	c.style.display = "block";
    var t = c.getContext('2d');
    window.location.href = image;

    window.open('', document.getElementById('generated').toDataURL());
	/**/
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	 
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.globalCompositeOperation = "destination-over";
	//const combine = []; // objects but its combined into one and sorted by z-index
	
	/*["cat","campfire"].forEach(function(object)
		{
			for (let obj = 0; obj < object.length; obj++)
		{
			
		}
			
		});*/
}