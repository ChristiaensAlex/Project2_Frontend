let form, buttonAddStep, removeButton, buttonAddStepBetween, inputStep, inputStepDescription, allSteps, count;

const getFormElements = function() {
	form = document.querySelector('.js-form-addStep');
	if (form) {
		form.noValidate = true; //input is not validated when submitted
		// form.addEventListener('submit', onFormSubmit);
	} else if (submit) {
		submit.noValidate = true;
	}
	buttonAddStep = document.querySelector('.js-button-addStep');
	buttonAddContact = document.querySelector('.c-button__addContact');
	count = document.querySelectorAll('.js-single-step');
	if (document.title == 'Trek Je Plan - Maak een nieuw stappenplan aan') {
		console.log(count.length);
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
		console.log(stepNumbersArr);
		stepNumbersArr.forEach(i => {
			nummer2 = i.getAttribute('data-number');
			console.log('Nummer 2: ' + nummer2);
			nummer = i.dataset.number;
			console.log(nummer);

			if (i.dataset.number >= e.currentTarget.parentNode.parentNode.parentNode.parentNode.dataset.number) {
				nummer = parseInt(nummer) - 1;
				if (document.title == 'Trek Je Plan - Maak een nieuw stappenplan aan') {
					i.querySelector('.js-step-number').innerHTML = nummer;

					i.setAttribute('data-number', nummer);
				} else if (document.title == 'Trek Je Plan - Wijzig een stappenplan') {
					i.querySelector('.js-step-number').innerHTML = 'Stap ' + nummer;
					i.setAttribute('data-number', nummer);
				}
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
	count = document.querySelectorAll('.js-single-step');
	inpStep.dataset.number = count.length + 1;
	inpStep.style.display = 'block';
	if (inpStep.querySelector('.js-step-number') && inpStep.querySelector('.js-input-description')) {
		inpStep.querySelector('.js-step-number').innerHTML = inpStep.dataset.number;
		inpStep.querySelector('.js-input-description').value = '';
	}
	allSteps.appendChild(inpStep);
	ListenToRemoveButton();
};

const AddToEditScheme = function(e) {
	e.preventDefault();
	let inpStep = inputStep.cloneNode(true);
	count = document.querySelectorAll('.js-single-step');
	inpStep.dataset.number = count.length;
	console.log('Inpstep nummer: ' + inpStep.dataset.number);
	console.log(inpStep);
	inpStep.style.display = 'block';
	if (inpStep.querySelector('.js-step-number') && inpStep.querySelector('.js-input-description')) {
		inpStep.querySelector('.js-step-number').innerHTML = 'Stap ' + inpStep.dataset.number;
		inpStep.querySelector('.js-input-description').value = '';
	}
	allSteps.appendChild(inpStep);
	ListenToRemoveButton();
};

const ListenToRemoveButton = function() {
	removeButton = document.querySelectorAll('.js-remove-button');
	removeButton.forEach(element => {
		element.addEventListener('click', onHandlerClickedRemove);
	});
};

document.addEventListener('DOMContentLoaded', function() {
	console.info('DOM loaded - addComponent');
	getFormElements();
});
