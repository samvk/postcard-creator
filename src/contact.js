import Events from "pubsub";
import dropzoneAlert from "dropzone-ui";
/*************** </> Imports ******************/


let sending = false;

$(".email-form").submit(function(e){
	e.preventDefault();
	if (sending) return false; //prevent duplicate requests
	sending = true;

	dropzoneAlert("Sending...", null, true);
	$(".email__button").addClass("is-sending");

	const url = $(this).attr("action"),
		  image = $("#gcard")[0].toDataURL(),
		  theme = $(".theme__icon").attr("data-theme"),
		  data = $(this).serialize() + `&image=${image}&theme=${theme}`;

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
			$(".email__button").removeClass("is-sending");
			Events.trigger("resetOver");
		}, 4600);
	})
	.fail(response => {
		response = JSON.parse(response);
		console.error(response.message);

		sending = false;
		$(".email__button").removeClass("is-sending");
		dropzoneAlert("Something went wrong. Your message could not be sent.", "error");
	});
});

Events.on("resetOver", function(){
	$(".email-form")[0].reset();
});