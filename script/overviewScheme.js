let json;

const showStepsFromProgressiveScheme = function(payload) {
	let steps = payload.steps;
	let progressiveSchemeSteps = document.querySelector('.js-scheme-allSteps');
	for (i in steps) {
		console.log(steps);
		let OneStep = document.querySelector('.js-overview-step');
		let stepClone = OneStep.cloneNode(true);
		stepClone.classList.remove('u-hide');
		stepClone.classList.remove('js-overview-step');
		let step = steps[i];
		let stepName = stepClone.querySelector('.c-step__name');
		stepName.innerHTML = `Stap ${step.sequence}`;
		let stepDescription = stepClone.querySelector('.c-step__explanation-mentor');
		stepDescription.innerHTML = step.descriptionStep;
		let pictoStep = stepClone.querySelector('.c-picto');
		pictoStep.innerHTML = `<img class="c-choose__picto-img" src="https://trekjeplan.blob.core.windows.net/pictos/${steps[i].pictoFilleName}" width="104px" height="auto"/>`;
		progressiveSchemeSteps.append(stepClone);
		let count = steps.length - 1;
		if (i != count) {
			let OneArrow = document.querySelector('.c-downwardsArrow');
			let arrowClone = OneArrow.cloneNode(true);
			arrowClone.classList.remove('u-hide');
			progressiveSchemeSteps.append(arrowClone);
		}
	}
	showClientsFromProgressiveScheme(payload);
};

const fillInputsFromEditPlan = function(payload) {
	console.log(payload);
	let steps = payload.steps;
	let progressiveSchemeSteps = document.querySelector('.js-edit-scheme');
	for (i in steps) {
		let OneStep = document.querySelector('.c-first-step');
		let stepClone = OneStep.cloneNode(true);
		stepClone.classList.remove('u-hide');
		console.log(stepClone);
		let step = steps[i];
		stepClone.dataset.number = parseInt(step.sequence);
		let stepNumber = stepClone.querySelector('.js-step-number');

		console.log(parseInt(step.sequence));
		stepNumber.innerHTML = `Stap ${step.sequence}`;
		let stepInputDescription = stepClone.querySelector('.js-input-description');
		stepInputDescription.innerHTML = step.descriptionStep;
		let imgdiv = stepClone.querySelector('.js-step-img');

		imgdiv.innerHTML = `<img class="c-selectedPicto js-selected-picto" src="https://trekjeplan.blob.core.windows.net/pictos/${step.pictoFilleName}" width="104px" height="auto" data-img="${step.pictoFilleName}"/>`;
		progressiveSchemeSteps.append(stepClone);
	}
	console.log(allSteps);
	ListenToRemoveButton();
	getElements();
	buttonAddStep.addEventListener('click', AddToEditScheme);
};

const showOneProgressiveScheme = function(payload) {
	json = payload;
	let progressiveSchemeName = document.querySelector('.js-progressiveScheme-name');
	let editPlanName = document.querySelector('.js-scheme-name');
	if (progressiveSchemeName) {
		console.log(payload);
		progressiveSchemeName.innerHTML = payload.name;
		showStepsFromProgressiveScheme(payload);
	} else if (editPlanName) {
		console.log('EDIT');
		console.log(editPlanName);
		editPlanName.value = payload.name;
		document.querySelector('.js-mainImg').innerHTML = `<img class="c-selectedPicto js-selected-picto" src="https://trekjeplan.blob.core.windows.net/pictos/${payload.pictoFilleName}" width="104px" height="auto" data-img="${payload.pictoFilleName}"/>`;
		fillInputsFromEditPlan(payload);
	}
};

const getProgressiveSchemeById = function(baseURL) {
	let id = sessionStorage.planId;
	console.log(id);
	let url = `${baseURL}progressiveScheme/${id}`;
	fetch(url)
		.then(function(response) {
			if (!response.ok) {
				throw Error(`Problem to fetch(). Status code: ${response.status}`);
			} else {
				return response.json();
			}
		})
		.then(function(jsonObject) {
			showOneProgressiveScheme(jsonObject);
		})
		.catch(function(error) {
			console.error(`Problem to process json ${error}`);
		});
};

document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded - Overview progressive scheme ');
	baseURL = 'https://trekjeplan.azurewebsites.net/api/';
	console.log(document.title);
	if (document.title == 'Trek Je Plan - Overzicht stappen in stappenplan - Mentor' || document.title == 'Trek Je Plan - Wijzig een stappenplan') {
		console.log('IN IF ');
		getProgressiveSchemeById(baseURL);
	}
});
