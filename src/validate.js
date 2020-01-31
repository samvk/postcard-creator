import Events from "pubsub";
/*************** </> Imports ******************/


//allow validation text to appear after input
$("input").blur(function(){
	$(this).siblings(".email__validate").addClass("is-displayed");
});

//clear validation text for second send
Events.on("reset", function(){
	$(".email__validate").removeClass("is-displayed");
});
