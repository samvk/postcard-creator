//allow validation text to appear after input
$("input").blur(function(){
	$(this).siblings(".email__validate").removeClass("is-invisible");
});