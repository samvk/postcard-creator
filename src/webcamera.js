import Webcam from "webcamjs/webcam";
import Events from "pubsub";
import { POSTCARD } from "data";

function closeWebcam() {
	$(".webcam-wrapper").removeClass("fade-in");
	Webcam.reset();
}

function openWebcam(e) {
	e.stopPropagation();

	Webcam.set({
		width: POSTCARD.long,
		height: POSTCARD.short
	});

	Webcam.attach("#webcam");
	
	$(".webcam-wrapper").addClass("fade-in");

	function takeSnapshot() {
		Webcam.snap(function(dataUri) {
			const $gcardImage = $(".gcard-image");

			$gcardImage.attr("src", dataUri); //set giftcard image
			$gcardImage.on("load", function(){ //wait till image is loaded
				Events.trigger("gcardSet", $gcardImage[0]);
			});
		});
		closeWebcam();
	}
	
	$(".webcam__snap").click(takeSnapshot);
}

$(".dropzone__camera").click(openWebcam);

//toggle display on snap & unfocused click
$(".webcam__close").click(closeWebcam);