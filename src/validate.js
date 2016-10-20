//allow validation text to appear on change
$("input").blur(function(){
	$(this).siblings(".email__validate").removeClass("is-invisible");
});