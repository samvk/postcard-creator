import Events from "pubsub";
/*************** </> Imports ******************/


function setStep(name) {
	$(`[data-step]`).removeClass("is-active");
	$(`[data-step="${name}"]`).addClass("is-active");
}

Events.on("gcardSet", () => {
	setStep("personalize");
}).on("gcardSave", () => {
	setStep("send");
}).on("resetOver", () => {
	setStep("upload");
});