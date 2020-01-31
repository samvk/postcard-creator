import Events from "pubsub";
/*************** </> Imports ******************/


const $dropzoneWrapper = $(".dropzone-wrapper");

function dropzoneAlert(message, status = "", waitForResponse = false){
	const $dropzoneMessage = $(".dropzone__message");
	$dropzoneMessage.text(message).addClass("display-alert").attr("data-status", status);

	//fade message out (unless told waiting for something)
	if (!waitForResponse) {
		setTimeout(function() {
			$dropzoneMessage.removeClass("display-alert");
		}, 3800);
	}
}

$dropzoneWrapper.click(function(){
	$("#fileInput").trigger("click");
});

Events.on("drag", function(){
	$dropzoneWrapper.addClass("is-dragging");
}).on("dragend", function(){
	$dropzoneWrapper.removeClass("is-dragging");
}).on("gcardSet", function(){
	$dropzoneWrapper.addClass("is-compressed");
});

//dropzone maximises on click and re-minimizes on body click
$(".dropzone__message-wrapper").click(function(e) {
	e.stopPropagation();
	$dropzoneWrapper.removeClass("is-compressed");
});

//after image is already loaded
Events.on("gcardSet", function(){
	$("body").on("click", function(){
		$dropzoneWrapper.addClass("is-compressed");
	});
//on reset
}).on("resetOver", function(){
	$dropzoneWrapper.removeClass("is-compressed");
	dropzoneAlert("Send another?");
});


/*************** Drag and Drop listeners *****************/
$("body").on("drag dragstart dragend dragover dragenter dragleave drop", function(e) {
	//prevent default browser file drop behaviour
	e.preventDefault();
	e.stopPropagation();
}).on("dragover dragenter", function() {
	Events.trigger("drag");
}).on("dragleave dragend drop", function() {
	Events.trigger("dragend");
});


export default dropzoneAlert;
