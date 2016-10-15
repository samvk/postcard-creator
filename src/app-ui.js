import Events from "pubsub";

Events.on("gcardSet", function(){
	$(".canvas-section").addClass("fade-in");
});