import { POSTCARD } from "data";


let canvasData = {};

//Get canvas orientation
const long = POSTCARD.long,
	  short = POSTCARD.short;

//ratio representing orientation mode
const landscape = long / short,
	  portrait = 1 / landscape;

//ratio breakpoint between page orientations
const breakpoint = (landscape + portrait) / 2;

export default function setCanvasOrientation(img) {
	//ratio of chosen photo
	const imgShape = img.width / img.height;

	//set photo data
	if (imgShape > landscape) {
		canvasData = {
			width: long,
			height: short,
			orientation: "letterbox"
		};
	} else if (imgShape > breakpoint) {
		canvasData = {
			width: long,
			height: short,
			orientation: "pillarbox"
		};
	} else if (imgShape > portrait) {
		canvasData = {
			width: short,
			height: long,
			orientation: "letterbox"
		};
	} else {
		canvasData = {
			width: short,
			height: long,
			orientation: "pillarbox"
		};
	}

	//Set canvas attributes
	$("#gcard").attr({
		"width": canvasData.width,
		"height": canvasData.height,
		"data-orientation": canvasData.orientation
	});
}