let form, buttonAddStep, removeButton, buttonAddStepBetween, inputStep, inputStepDescription;

const getFormElements = function() {
	form = document.querySelector('.js-form-addStep');
	//GetDomElements();
	if (form) {
		form.noValidate = true; //input is not validated when submitted
		// form.addEventListener('submit', onFormSubmit);
	} else if (submit) {
		submit.noValidate = true;
	}
	buttonAddStep = document.querySelector('.js-button-addStep');
	buttonAddContact = document.querySelector('.c-button__addContact');
	if (buttonAddStep) {
		buttonAddStep.addEventListener('click', onHandlerClickedAdd);
	} else if (buttonAddContact) {
		buttonAddContact.addEventListener('click', onHandlerClickedAdd);
	}

	inputStep = document.querySelector('.js-single-step');
	console.log(inputStep);
	numberStep = document.querySelector('.js-step-number');
	allSteps = document.querySelector('.js-all-steps');
	inputStepDescription = document.querySelector('.js-input-description');
};

const onHandlerClickedRemove = function(e) {
	e.preventDefault();
	console.log(allSteps);
	console.log(e.currentTarget.parentNode.parentNode.parentNode);
	document.querySelector('.js-all-steps').removeChild(e.currentTarget.parentNode.parentNode.parentNode);
};

const onHandlerClickedAdd = function(e) {
	e.preventDefault();
	let inpStep = inputStep.cloneNode(true);
	console.log(inpStep);
	let count = document.querySelectorAll('.js-single-step');
	inpStep.dataset.number = count.length + 1;

	if (inpStep.querySelector('.js-step-number') && inpStep.querySelector('.js-input-description')) {
		inpStep.querySelector('.js-step-number').innerHTML = inpStep.dataset.number;
		inpStep.querySelector('.js-input-description').value = '';
	}
	allSteps.appendChild(inpStep);
	removeButton = document.querySelectorAll('.js-remove-button');
	removeButton.forEach(element => {
		element.addEventListener('click', onHandlerClickedRemove);
	});
};

document.addEventListener('DOMContentLoaded', function() {
	console.info('DOM loaded');
	getFormElements();
});
