import Events from "pubsub";

function setStep(name) {
	$(`[data-step="${name}"]`).addClass("is-active").prev().removeClass("is-active");
}

Events.on("gcardSet", function(){
	setStep("personalize");
});