const GetDomElements = function() {
	submitButton = document.querySelector('.js-submitbutton');
	console.log(sessionStorage.mentorId);
};

const init = function() {
	console.log('dom loaded');
	// queryselectors ophalen
	GetDomElements();
};
document.addEventListener('DOMContentLoaded', init);
