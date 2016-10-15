import Events from "pubsub";

const $dropzoneWrapper = $(".dropzone-wrapper");

$dropzoneWrapper.click(function(){
	$("#fileInput").trigger("click");
});

Events.on("drag", function(){
	$dropzoneWrapper.addClass("is-dragging");
});
Events.on("dragend", function(){
	$dropzoneWrapper.removeClass("is-dragging");
});
Events.on("gcardSet", function(){
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
});


export default function dropzoneAlert(message){
	const $dropzoneMessage = $(".dropzone__message");
	$dropzoneMessage.text(message);
	$dropzoneMessage.addClass("display-alert");
	setTimeout(function() {
		$dropzoneMessage.removeClass("display-alert");
	}, 3800);
}