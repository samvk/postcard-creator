import "libraries/flip/flip";
import Events from "pubsub";
/*************** </> Imports ******************/


let $gcard3d = $(".gcard-3d")

$gcard3d.flip({trigger: "manual"}); //bind flip

Events.on("gcardSet", function(){
	$gcard3d.addClass("fade-in show-overflow");
}).on("gcardSet", function(){
	$gcard3d.flip(false); //flip to front
}).on("gcardSave", function(){
	$gcard3d.flip(true); //flip to back
}).on("reset", function(){
	$gcard3d.removeClass("fade-in");
	setTimeout(function(){//firefox hack (ignoring transitionend)
		$gcard3d.removeClass("show-overflow");
	}, 2000);
});

/*************** Postcard icon listeners *****************/

$(".gcard__button").click(function(){
	Events.trigger("gcardSave");
});

$(".edit__button").click(function(){
	Events.trigger("gcardSet");
});