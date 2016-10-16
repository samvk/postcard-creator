import "libraries/flip/flip";
import Events from "pubsub";

Events.on("gcardSet", function(){
	$(".gcard-3d").addClass("fade-in");
});

$(".gcard-3d").flip({trigger: "manual"}); //bind flip

Events.on("gcardSet", function(){
	$(".gcard-3d").flip(false); //flip to front
});

Events.on("gcardSave", function(){
	$(".gcard-3d").flip(true); //flip to back
});

Events.on("reset", function(){
	$(".gcard-3d").removeClass("fade-in");
});

$(".gcard__button").click(function(){
	Events.trigger("gcardSave");
});

$(".edit__button").click(function(){
	Events.trigger("gcardSet");
});