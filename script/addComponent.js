let form, buttonAddStep, removeButton, buttonAddStepBetween, inputStep, inputStepDescription, allSteps;

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
	numberStep = document.querySelector('.js-step-number');
	allSteps = document.querySelector('.js-all-steps');
	inputStepDescription = document.querySelector('.js-input-description');
};

const onHandlerClickedRemove = function(e) {
	e.preventDefault();
	console.log(allSteps);

	console.log(e.currentTarget.parentNode.parentNode.parentNode);
	if (e.currentTarget.parentNode.parentNode.parentNode.querySelector('.c-contact__wrapper')) {
		console.log(e.currentTarget.parentNode.parentNode.parentNode.dataset.number);
		removefromDB(e.currentTarget.parentNode.parentNode.parentNode.dataset.number);
		allSteps.removeChild(e.currentTarget.parentNode.parentNode.parentNode);
	} else {
		allSteps.removeChild(e.currentTarget.parentNode.parentNode.parentNode.parentNode);
		let stepNumbers = document.querySelectorAll('.js-single-step');
		let stepNumbersArr = Array.from(stepNumbers);
		console.log(stepNumbers);
		console.log('Lijst');
		console.log(stepNumbersArr);
		stepNumbersArr.forEach(i => {
			console.log('I');
			console.log(i);
			nummer2 = i.getAttribute('data-number');
			nummer = i.dataset.number;
			console.log(nummer2);
			if (i.dataset.number >= e.currentTarget.parentNode.parentNode.parentNode.parentNode.dataset.number) {
				console.log('Dataset nummer 1');
				console.log(e.currentTarget.parentNode.parentNode.parentNode.parentNode.dataset.number);
				nummer = parseInt(nummer) - 1;
				console.log('Nieuw dataset nummer 2');
				console.log(nummer);
				i.querySelector('.js-step-number').innerHTML = nummer;
			} else {
			}
		});
	}
	// if( <= ){

	// }
};

const onHandlerClickedAdd = function(e) {
	e.preventDefault();
	let inpStep = inputStep.cloneNode(true);
	let count = document.querySelectorAll('.js-single-step');
	inpStep.dataset.number = count.length + 1;
	inpStep.style.display = 'block'; 
	if (inpStep.querySelector('.js-step-number') && inpStep.querySelector('.js-input-description')) {
		inpStep.querySelector('.js-step-number').innerHTML = inpStep.dataset.number;
		console.log('Dataset nummer');
		console.log(inpStep.dataset.number);
		inpStep.querySelector('.js-input-description').value = '';
	}
	allSteps.appendChild(inpStep);
	ListToRemoveButton();
};

const ListToRemoveButton = function() {
	console.log(removeButton);
	removeButton = document.querySelectorAll('.js-remove-button');
	removeButton.forEach(element => {
		console.log('activated removebuttons');
		element.addEventListener('click', onHandlerClickedRemove);
	});
};

document.addEventListener('DOMContentLoaded', function() {
	console.info('DOM loaded - addComponent');
	getFormElements();
});
