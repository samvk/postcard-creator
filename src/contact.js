$.fn.submitForm = function (success) {    
	this.submit( e => {
		e.preventDefault();
		const url = this.attr("action");
		$.post(url, this.serialize(), success);
	});
};

$(".email-form").submitForm(function(response) {
	$(".response").append(response).fadeOut(2000);
});