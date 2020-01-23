const showStepsFromProgressiveScheme = function(payload){
    let steps = payload.steps; 
    let progressiveSchemeSteps = document.querySelector(".js-scheme-allSteps"); 
    console.log(progressiveSchemeSteps); 
    for(i in steps){
        let OneStep = document.querySelector('.js-overview-step'); 
        let stepClone = OneStep.cloneNode(true); 
        console.log(stepClone);
        stepClone.classList.remove('u-hide');
        stepClone.classList.remove('js-overview-step'); 
        let step = steps[i]; 
        let stepName = stepClone.querySelector('.c-step__name'); 
        console.log(step.sequence)
        stepName.innerHTML = `Stap ${step.sequence}`; 
        let stepDescription = stepClone.querySelector('.c-step__explanation-mentor'); 
        stepDescription.innerHTML = step.descriptionStep; 
        console.log(stepClone); 
        progressiveSchemeSteps.append(stepClone); 
        let count = steps.length - 1
        console.log(count); 
     if(i != steps.length - 1){
         let OneArrow = document.querySelector('.c-downwardsArrow');
         let arrowClone = OneArrow.cloneNode(true); 
         arrowClone.classList.remove('u-hide'); 
         progressiveSchemeSteps.append(arrowClone);
     }
    }
}

const fillInputsFromEditPlan = function(payload){
    let steps = payload.steps; 
    let progressiveSchemeSteps = document.querySelector(".js-edit-scheme"); 
    console.log(progressiveSchemeSteps); 
    for(i in steps){
        let OneStep = document.querySelector('.c-first-step'); 
        let stepClone = OneStep.cloneNode(true); 
        stepClone.classList.remove('u-hide');
        let step = steps[i]; 
        let stepNumber = stepClone.querySelector('.js-step-number'); 
        stepNumber.innerHTML = `Stap ${step.sequence}`; 
        let stepInputDescription = stepClone.querySelector('.js-input-description'); 
        stepInputDescription.innerHTML = step.descriptionStep; 
        progressiveSchemeSteps.append(stepClone); 
    }
}

const showOneProgressiveScheme = function(payload){
    let progressiveSchemeName = document.querySelector(".js-progressiveScheme-name"); 
     let editPlanName = document.querySelector('.js-scheme-name');
    if(progressiveSchemeName){
        showClientsFromProgressiveScheme(payload); 
    progressiveSchemeName.innerHTML = payload.name; 
    showStepsFromProgressiveScheme(payload);
 }
 else if(editPlanName){
     editPlanName.value = payload.name; 
     fillInputsFromEditPlan(payload); 
 }   
 }


const getProgressiveSchemeById = function(){
	let id = sessionStorage.planId; 
    let url = `${baseURL}progressiveScheme/${id}`;
    console.log(url); 
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
		console.log(jsonObject);
	})
	.catch(function(error) {
		console.error(`Problem to process json ${error}`);
	});
}


document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded - Overview progressive scheme ');
	baseURL = 'https://localhost:44374/api/';
    console.log(sessionStorage.planId);
    getProgressiveSchemeById(); 
});