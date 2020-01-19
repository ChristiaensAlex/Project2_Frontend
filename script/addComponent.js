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
	numberStep = document.querySelector('.js-step-number');
	allSteps = document.querySelector('.js-all-steps');
	inputStepDescription = document.querySelector('.js-input-description');
};

const onHandlerClickedRemove = function(e) {
	e.preventDefault();
	document.querySelector('.js-all-steps').removeChild(e.currentTarget.parentNode.parentNode.parentNode.parentNode);
	let stepNumbers = document.querySelectorAll('.js-step-number'); 
	let stepNumbersArr = Array.from(stepNumbers); 
	console.log(stepNumbers); 
	console.log("Lijst"); 
	console.log(stepNumbersArr);
	stepNumbersArr.forEach( i => {
		console.log("I"); 
		console.log(i);
		if (i.dataset.number <= e.currentTarget.parentNode.parentNode.parentNode.parentNode.dataset.number){
			console.log("Dataset nummer 1");
			console.log(e.currentTarget.parentNode.parentNode.parentNode.parentNode.dataset.number); 
			e.currentTarget.parentNode.parentNode.parentNode.parentNode.dataset.number = e.currentTarget.parentNode.parentNode.parentNode.parentNode.dataset.number + 1; 
			console.log("Nieuw dataset nummer 2");
			console.log(e.currentTarget.parentNode.parentNode.parentNode.parentNode.dataset.number); 
			i.innerHTML = i.dataset.number; 
		}
		else{
			
		}; 
	})
	// if( <= ){

	// }
};

const onHandlerClickedAdd = function(e) {
	e.preventDefault();
	let inpStep = inputStep.cloneNode(true);
	let count = document.querySelectorAll('.js-single-step');
	inpStep.dataset.number = count.length + 1;
	if (inpStep.querySelector('.js-step-number') && inpStep.querySelector('.js-input-description')) {
		inpStep.querySelector('.js-step-number').innerHTML = inpStep.dataset.number;
		console.log("Dataset nummer");
		console.log(inpStep.dataset.number); 
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
