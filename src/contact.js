import Events from "pubsub";
import dropzoneAlert from "dropzone-ui";


let sending = false;

$(".email-form").submit(function(e){
	e.preventDefault();
	//prevent duplicate requests
	if (sending) return false;

	dropzoneAlert("Sending...", null, true);

	sending = true;

	const url = $(this).attr("action"),
		  image = $(".gcard-image").attr("src"),
		  data = $(this).serialize() + "&image=" + image;

	$.ajax({
		type: "POST",
		url: url,
		data: data,
	})

	.done(response => {
		response = JSON.parse(response);
		dropzoneAlert(response.message, response.status);
		Events.trigger("reset");

		setTimeout(function(){
			sending = false;
			Events.trigger("resetOver");
		}, 4600);
	})

	.fail(response => {
		sending = false;
		dropzoneAlert("Something went wrong. Your message could not be sent.", "error");
	});
});