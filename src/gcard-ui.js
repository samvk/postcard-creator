import "libraries/flip/flip";
import Events from "pubsub";
/*************** </> Imports ******************/

$(".gcard-3d").flip({trigger: "manual"}); //bind flip

Events.on("gcardSet", function(){
	$(".gcard-3d").addClass("fade-in");
}).on("gcardSet", function(){
	$(".gcard-3d").flip(false); //flip to front
}).on("gcardSave", function(){
	$(".gcard-3d").flip(true); //flip to back
}).on("reset", function(){
	$(".gcard-3d").removeClass("fade-in");
});

/*************** Postcard icon listeners *****************/

$(".gcard__button").click(function(){
	Events.trigger("gcardSave");
});

$(".edit__button").click(function(){
	Events.trigger("gcardSet");
});