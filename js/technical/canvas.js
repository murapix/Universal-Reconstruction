var canvas;
var ctx;

window.addEventListener("resize", (_=>resizeCanvas()));

function retrieveCanvasData() {
	let treeCanv = document.getElementById("treeCanvas")
	let treeTab = document.getElementById("treeTab")
	if (treeCanv===undefined||treeCanv===null) return false;

	canvas = treeCanv;
	ctx = canvas.getContext("2d");

	if (treeTab===undefined||treeTab===null) {
		if (canvas && ctx) {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			canvas.width = 0;
    		canvas.height = 0;
			canvas.width  = window.innerWidth;
			canvas.height = window.innerHeight;
			drawResearchBranches();
		}
		return false;
	}
	return true;
}

function resizeCanvas() {
	if (!retrieveCanvasData()) return
	canvas.width = 0;
    canvas.height = 0;
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	drawTree();
	drawResearchBranches();
}

var colors = {
	default: {
		1: "#ffffff",
		2: "#bfbfbf",
		3: "#7f7f7f",
	},
	aqua: {
		1: "#bfdfff",
		2: "#8fa7bf",
		3: "#5f6f7f",
	},
}
var colors_theme

function drawTree() {
	if (!retrieveCanvasData()) return;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (layer in layers) {
		if (tmp[layer].layerShown == true && tmp[layer].branches) {
			for (branch in tmp[layer].branches) {
				drawTreeBranch(layer, tmp[layer].branches[branch])
			}
		}
	}
}

function drawTreeBranch(num1, data) { // taken from Antimatter Dimensions & adjusted slightly
	let num2 = data
	let color_id = 1

	if (Array.isArray(data)){
		num2 = data[0]
		color_id = data[1]
	}

	if(typeof(color_id) == "number")
		color_id = colors_theme[color_id]

	if (document.getElementById(num1) == null || document.getElementById(num2) == null)
		return

	let start = document.getElementById(num1).getBoundingClientRect();
    let end = document.getElementById(num2).getBoundingClientRect();
    let x1 = start.left + (start.width / 2) + document.body.scrollLeft;
    let y1 = start.top + (start.height / 2) + document.body.scrollTop;
    let x2 = end.left + (end.width / 2) + document.body.scrollLeft;
    let y2 = end.top + (end.height / 2) + document.body.scrollTop;
    ctx.lineWidth = 15;
    ctx.beginPath();
    ctx.strokeStyle = color_id
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawResearchBranches() {
	if (canvas === undefined) return
	if (player.tab !== 'inflaton') return
	if (player.subtabs.inflaton.stuff !== 'Research') return

	let clickableElements = Array.from(document.getElementsByClassName('upg')).slice(temp.inflaton.queueSize-1)
	let clickableMapping = {}
	for (let id in temp.inflaton.clickables) {
		let clickable = temp.inflaton.clickables[id]
		if (typeof clickable !== 'object') continue
		if (clickable.unlocked !== true) continue
		if (clickable.research === undefined) continue

		let research = temp.inflaton.research[clickable.research]
		clickableMapping[clickable.research] = clickableElements.find(element => element.innerText.startsWith(research.title))

		if (research.requires)
			research.requires.forEach(req => drawResearchBranch(clickableMapping[clickable.research], clickableMapping[req], hasResearch('inflaton', req)))
	}
}

function drawResearchBranch(child, parent, researched) {
	let start = child.getBoundingClientRect();
	let end = parent.getBoundingClientRect();
	let x1 = start.left + (start.width / 2) + document.body.scrollLeft;
	let y1 = start.top + (start.height / 2) + document.body.scrollTop;
	let x2 = end.left + (end.width / 2) + document.body.scrollLeft;
	let y2 = end.top + (end.height / 2) + document.body.scrollTop;
	ctx.lineWidth = 10;
	ctx.beginPath();
	ctx.strokeStyle = colors_theme[researched ? 1 : 2];
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}