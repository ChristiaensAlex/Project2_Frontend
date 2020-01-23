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
    
    progressiveSchemeSteps.innerHTML += `<div class="c-single-step js-single-step" data-number=${steps[i].sequence}>
    <div class="c-new-step js-new-step">
        <div class="c-button_addStepImage">
            <button class="o-button-reset">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" viewBox="0 0 96 99">
                        <defs>
                            <filter id="Rectangle_20" x="0" y="4" width="95" height="95" filterUnits="userSpaceOnUse">
                                <feOffset dy="3" input="SourceAlpha" />
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feFlood flood-opacity="0.161" />
                                <feComposite operator="in" in2="blur" />
                                <feComposite in="SourceGraphic" />
                            </filter>
                        </defs>
                        <g id="Group_954" data-name="Group 954" transform="translate(-271.5 -418.679)">
                            <g transform="matrix(1, 0, 0, 1, 271.5, 418.68)" filter="url(#Rectangle_20)">
                                <rect id="Rectangle_20-2" data-name="Rectangle 20" width="77" height="77" rx="5" transform="translate(9 10)" fill="#ececf0" />
                            </g>
                            <g id="Group_7" data-name="Group 7" transform="translate(293.5 448.679)">
                                <path id="Path_238" data-name="Path 238" d="M52.208,35.483V28.656A13.656,13.656,0,0,0,38.553,15h-23.9A13.656,13.656,0,0,0,1,28.656v6.828" transform="translate(-1 21.282)" fill="none" stroke="#fff" stroke-linejoin="round" stroke-width="4.5" />
                                <ellipse id="Ellipse_70" data-name="Ellipse 70" cx="13.655" cy="13.656" rx="13.655" ry="13.656" transform="translate(12.174 0)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4.5" />
                            </g>
                            <g id="Group_1088" data-name="Group 1088" transform="translate(239.5 113.679)">
                                <circle id="Ellipse_140" data-name="Ellipse 140" cx="10" cy="10" r="10" transform="translate(108 305)" fill="#e0dee6" />
                                <path id="Path_273" data-name="Path 273" d="M827,2271.6l-1.6-1.6-2.4,2.4-2.4-2.4-1.6,1.6,2.4,2.4-2.4,2.4,1.6,1.6,2.4-2.4,2.4,2.4,1.6-1.6-2.4-2.4Z" transform="translate(1144.012 -1874.738) rotate(45)" fill="#fff" />
                            </g>
                        </g>
                    </svg>
                </button>
            </div>
            <div class="c-step-description">
                <div class="c-step-description--header">
                    <div>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                        <circle id="Ellipse_19" data-name="Ellipse 19" cx="4" cy="4" r="4" fill="#27255F" />
                    </svg></span> Stap <span class="js-step-number" data-number=1>1</span>
                    <label for="stepDescription">Beschrijving</label>
                </div>
                <div class="js-remove-button">
                    <svg height="24" viewBox="-40 0 427 427.00131" width="20" fill="#27255f" xmlns="http://www.w3.org/2000/svg"><path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"/><path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/></svg>
                </div>
                </div>
                    <textarea rows=3 name="stepDescription" class="c-input c-input-description js-input-description">${steps[i].descriptionStep}</textarea>
            </div>
    </div>
    <div class="c-add-step c-downwardArrowAdd">
    <div class="c-downwardsArrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="27.353" viewBox="0 0 24 27.353">
                <g id="Component_4_44" data-name="Component 4 – 44" transform="translate(0 27.353) rotate(-90)">
                    <g id="Group_972" data-name="Group 972" transform="translate(4 6)">
                        <path id="Path_4" data-name="Path 4" d="M508.019,162.566l-6.2,6.2,6.2,6.2" transform="translate(-501.817 -162.566)" fill="none" stroke="#28225f" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                        <path id="Path_5" data-name="Path 5" d="M478.752,117.413h19.669" transform="translate(-476.569 -111.036)" fill="none" stroke="#28225f" stroke-linecap="round" stroke-width="3" />
                    </g>
                    <rect id="Rectangle_85" data-name="Rectangle 85" width="24" height="24" fill="none" />
                </g>
            </svg>

    </div>
    </div>
</div>`
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