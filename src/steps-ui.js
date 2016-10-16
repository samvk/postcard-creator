import Events from "pubsub";

function setStep(name) {
	$(`[data-step]`).removeClass("is-active");
	$(`[data-step="${name}"]`).addClass("is-active");
}

Events.on("gcardSet", function(){
	setStep("personalize");
});

Events.on("gcardSave", function(){
	setStep("send");
});

Events.on("resetOver", function(){
	setStep("upload");
});