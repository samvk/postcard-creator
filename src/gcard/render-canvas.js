import Events from "pubsub";
import setCanvasOrientation from "gcard/canvas-orientation";
import paintCanvas from "gcard/paint-canvas";
/*************** </> Imports ******************/


function renderCanvas(img, switchStyle) {
	if (!img) return; //don't rerender canvas if not updating

	setCanvasOrientation(img); //set canvas orientation
	
	let header = $(".gcard__header").val(),
		message = $(".gcard__message").val();
	
	const canvas = $("#gcard")[0],
		  //initialize canvas
		  ctx = canvas.getContext("2d"),
		  canvasOrientation = canvas.dataset.orientation;
		  

	//SIMULATE "COVER" ABILITY FOR CANVAS
	let dx, dy, dWidth, dHeight, shape, scale;
	if (canvasOrientation === "pillarbox") {
		shape = img.height/img.width; //shape on img
		scale = canvas.width/img.width; //upscaling needed

		dx = 0;
		dy = (canvas.height * 0.5) - (img.height * 0.5 * scale); //center h-image (with respect to scaling)
		dWidth = canvas.width; //full width if pillarbox
		dHeight = canvas.width * shape;

	} else {
		shape = img.width/img.height; //shape on img
		scale = canvas.height/img.height; //upscaling needed

		dx = (canvas.width * 0.5) - (img.width * 0.5 * scale); //center v-image (with respect to scaling)
		dy = 0;
		dWidth = canvas.height * shape;
		dHeight = canvas.height; //full height if letterbox
	}

	ctx.drawImage(img, dx, dy, dWidth, dHeight);
	
	paintCanvas(header, message, switchStyle); //paint text (or defaults) onto canvas
}

/*************** Render Canvas events *****************/

Events.on("gcardSet", function(img){
	renderCanvas(img);
});

$(".gcard__header, .gcard__message").on("input", function(){
	let img = $(".gcard-image")[0]; //keep current image
	renderCanvas(img);
});

$(".design__button").on("click", function() {
	let img = $(".gcard-image")[0]; //keep current image
	renderCanvas(img, true);
});