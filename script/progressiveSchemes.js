let progressiveSchemes, baseURL, addStepsForm ,scheme, updatedScheme,  title, schemeTitle;
const showAllProgressiveSchemes = function(jsonObject) {
	for (i in jsonObject) {
		progressiveSchemes.innerHTML += `<div class="c-stepplan">
        <div class="c-stepplan__picto">
            <img class="c-icon" src="wassen.png" alt="beta_picto_wassen" />
        </div>
        <div class="c-stepplan__name">
           ${jsonObject[i].name}
        </div>
        <div class="c-stepplan__pencil">
            <svg xmlns="http://www.w3.org/2000/svg" width="14.65" height="14.579"
                viewBox="0 0 14.65 14.579">
                <g id="pencil-edit-button" transform="translate(-0.001 -1.289)">
                    <path id="Path_288" data-name="Path 288"
                        d="M9.11,3.722,12.09,6.7,4.547,14.245l-2.978-2.98ZM14.352,3,13.023,1.674a1.319,1.319,0,0,0-1.863,0L9.887,2.947l2.98,2.98,1.485-1.485A1.016,1.016,0,0,0,14.352,3ZM.009,15.454a.339.339,0,0,0,.41.4l3.321-.805L.762,12.072Z"
                        transform="translate(0)" fill="#291f5f" />
                </g>
            </svg>
        </div>
        <div class="c-stepplan__delete js-progressivescheme-delete">
            <svg xmlns="http://www.w3.org/2000/svg" width="19.492" height="24" viewBox="0 0 19.492 24">
                <g id="bin" transform="translate(0.003 0.001)">
                    <path id="Path_316" data-name="Path 316"
                        d="M222.96,154.7a.562.562,0,0,0-.562.562v10.623a.562.562,0,1,0,1.124,0V155.265A.562.562,0,0,0,222.96,154.7Zm0,0"
                        transform="translate(-209.901 -146.009)" fill="#28225f" />
                    <path id="Path_317" data-name="Path 317"
                        d="M104.961,154.7a.562.562,0,0,0-.562.562v10.623a.562.562,0,0,0,1.124,0V155.265A.562.562,0,0,0,104.961,154.7Zm0,0"
                        transform="translate(-98.534 -146.009)" fill="#28225f" />
                    <path id="Path_318" data-name="Path 318"
                        d="M1.593,7.144V20.992a3.1,3.1,0,0,0,.824,2.139A2.768,2.768,0,0,0,4.426,24H15.06a2.767,2.767,0,0,0,2.008-.868,3.1,3.1,0,0,0,.824-2.139V7.144a2.147,2.147,0,0,0-.551-4.222H14.464v-.7A2.208,2.208,0,0,0,12.238,0H7.248a2.208,2.208,0,0,0-2.226,2.22v.7H2.144a2.147,2.147,0,0,0-.551,4.222ZM15.06,22.875H4.426a1.78,1.78,0,0,1-1.709-1.883V7.193H16.769v13.8A1.78,1.78,0,0,1,15.06,22.875ZM6.146,2.219a1.083,1.083,0,0,1,1.1-1.1h4.991a1.083,1.083,0,0,1,1.1,1.1v.7H6.146Zm-4,1.827h15.2a1.012,1.012,0,0,1,0,2.023H2.144a1.012,1.012,0,1,1,0-2.023Zm0,0"
                        transform="translate(0)" fill="#28225f" />
                    <path id="Path_319" data-name="Path 319"
                        d="M163.96,154.7a.562.562,0,0,0-.562.562v10.623a.562.562,0,1,0,1.124,0V155.265A.562.562,0,0,0,163.96,154.7Zm0,0"
                        transform="translate(-154.217 -146.009)" fill="#28225f" />
                </g>
            </svg>
        </div>
    </div>`;
	}
	getElements();
};

const showClientsFromProgressiveScheme = function(payload){
    let clients = payload.clients; 
    let clientSchemes = document.querySelector('.js-clientScheme'); 
    for(i in clients){
        clientSchemes.innerHTML += `<div class="c-symbol__clientProfiles-client">
        <div class="c-symbol__clientProfiles-client__symbol">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                <rect id="rectangle-6" width="40" height="40" rx="20" fill="#bdc0c4" />
            </svg>
            <div class="c-symbol__clientProfiles-client__delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <g id="Group_1018" data-name="Group 1018" transform="translate(74 -190)">
                        <g id="Group_1019" data-name="Group 1019" transform="translate(-137 18)">
                            <circle id="Ellipse_151" data-name="Ellipse 151" cx="5.658" cy="5.658"
                                r="5.658" transform="matrix(0.695, -0.719, 0.719, 0.695, 63, 180.139)"
                                fill="#e0dee6" />
                            <path id="Path_292" data-name="Path 292"
                                d="M6,1.2,4.8,0,3,1.8,1.2,0,0,1.2,1.8,3,0,4.8,1.2,6,3,4.2,4.8,6,6,4.8,4.2,3Z"
                                transform="translate(68 177.105) rotate(-1)" fill="#fff" />
                        </g>
                    </g>
                </svg>
            </div>
        </div>
        <div class="c-symbol__clientProfiles-client__name">
            ${clients[i].firstName}
        </div>
    </div>`;
    }
    clientSchemes.innerHTML += ` <div class="c-symbol__clientProfiles-client">
    <div class="c-symbol__clientProfiles-client__addClient">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
            <g id="Group_1142" data-name="Group 1142" transform="translate(-161 -194)">
                <circle id="Ellipse_146" data-name="Ellipse 146" cx="6.5" cy="6.5" r="6.5"
                    transform="translate(161 194)" fill="#1d5c5c" />
                <path id="Path_285" data-name="Path 285"
                    d="M5.471,1.094,4.377,0,2.736,1.641,1.094,0,0,1.094,1.641,2.736,0,4.377,1.094,5.471,2.736,3.83,4.377,5.471,5.471,4.377,3.83,2.736Z"
                    transform="translate(167.519 197) rotate(45)" fill="#fff" />
            </g>
        </svg>
    </div>
</div>`; 
    

}

const showOneProgressiveScheme = function(payload){
    console.log("In 1 stappenplan"); 
    showClientsFromProgressiveScheme(payload); 
    let progressiveSchemeName = document.querySelector(".js-progressiveScheme-name"); 
    progressiveSchemeName.innerHTML = payload.name; 
    console.log(progressiveSchemeName); 
    let steps = payload.steps; 
    console.log(steps[0].sequence); 
    let progressiveSchemeSteps = document.querySelector(".js-scheme-allSteps"); 
    for(i in steps){
        progressiveSchemeSteps.innerHTML += `<div class="c-overview__step">
        <div class="c-picto">
            <img alt="Swipe de picto om door te gaan naar de volgende stap" />
        </div>
        <div class="c-step__countsymbol">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g id="Getal" transform="translate(-100 -470)">
                    <g id="Rectangle_24" data-name="Rectangle 24" transform="translate(100 470)" fill="#fff"
                        stroke="#27255f" stroke-width="1.5">
                        <rect width="24" height="24" rx="4" stroke="none" />
                        <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="3.25" fill="none" />
                    </g>
                    <circle id="Ellipse_4" data-name="Ellipse 4" cx="4" cy="4" r="4"
                        transform="translate(108 478)" fill="#27255f" />
                </g>
            </svg>
        </div>
        <div class="c-step__name">Stap ${steps[i].sequence}</div>
        <div class="c-step__explanation-mentor">
            ${steps[i].descriptionStep}
        </div>
    </div> `;
    if (i != 0){ //if the step is not the last one, add an arrow 
        progressiveSchemeSteps.innerHTML +=  `<div class="c-downwardsArrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="27.353" viewBox="0 0 24 27.353">
            <g id="Component_4_44" data-name="Component 4 – 44" transform="translate(0 27.353) rotate(-90)">
                <g id="Group_972" data-name="Group 972" transform="translate(4 6)">
                    <path id="Path_4" data-name="Path 4" d="M508.019,162.566l-6.2,6.2,6.2,6.2"
                        transform="translate(-501.817 -162.566)" fill="none" stroke="#28225f"
                        stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                    <path id="Path_5" data-name="Path 5" d="M478.752,117.413h19.669"
                        transform="translate(-476.569 -111.036)" fill="none" stroke="#28225f"
                        stroke-linecap="round" stroke-width="3" />
                </g>
                <rect id="Rectangle_85" data-name="Rectangle 85" width="24" height="24" fill="none" />
            </g>
        </svg>
    </div>`
    }
    }
    
}

const getProgressiveSchemeById = function(){
	let id = "FE929E77-A1A3-4A61-B76E-F25CFCAFC99E"; 
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


const getProgressiveSchemes = function() {
	let id = '82B3CB09-AC76-47A1-B879-B7A370E265D7';
	let url = `${baseURL}mentor/${id}/progressiveScheme`;
	fetch(url)
		.then(function(response) {
			if (!response.ok) {
				throw Error(`Problem to fetch(). Status code: ${response.status}`);
			} else {
				return response.json();
			}
		})
		.then(function(jsonObject) {
            if(progressiveSchemes){
			showAllProgressiveSchemes(jsonObject);
            console.log(jsonObject);
        }
		})
		.catch(function(error) {
			console.error(`Problem to process json ${error}`);
		});
};

const putProgressiveScheme = function(payload){
    console.log("In PUT");
    let body = JSON.stringify(payload);
    console.log(body);
    let schemeId = "f4ed4bfd-e707-4ff5-98a0-08d79eb0ca8e"; 
	fetch(`https://localhost:44374/api/progressiveScheme/${schemeId}`, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'application/json' },
		body: body
	})
		.then(data => {
			console.log(data); }) 
		.catch(err => console.log(err));
  
}

const postProgressiveScheme = function(payload){
    console.log("In post");
    let body = JSON.stringify(payload);
    console.log(body);
    let mentorId = "aacb2362-73a9-43dc-b9de-0ce057623568"; 
	fetch(`https://localhost:44374/api/progressiveScheme/${mentorId}`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'application/json' },
		body: body
	})
		.then(res => res.json())
		.then(data => {
			console.log(data); }) 
		.catch(err => console.log(err));
  
}

const getInputFieldsScheme = function(){
    title = document.querySelector('.js-scheme-name');
    stepNumber = document.querySelectorAll('.js-single-step');
    stepDescription = document.querySelectorAll('.js-input-description'); 
    let step = ""; 
    let stepsArr = []; 
    let updatedStep = "";
    let updatedStepsArr = []; 
    schemeTitle = title.value;
    
    if(document.title == "Trek Je Plan - Wijzig een stappenplan"){
        for(i = 0; i < stepNumber.length; i++){
            currentStep = stepNumber[i]; 
            let currentStepNumber = currentStep.dataset.number;
            let sequenceInt = parseInt(currentStepNumber); 
            let ids = ["a3e9acdf-d4eb-4712-65eb-08d79eb0cc34", "4b70b6df-ba0b-41be-65ec-08d79eb0cc34"];
            updatedStep = {
                id: ids[i], //NO ID FOR NEW STEP IN EXSISTING PROGRESSIVE SCHEME 
                descriptionStep: stepDescription[i].value, 
                pictoId: "3fa85f64-5717-4562-b3fc-2c963f66afa6", 
                sequence: sequenceInt
            };
            updatedStepsArr.push(updatedStep);  
        }
    
        updatedScheme = {
            id: "f4ed4bfd-e707-4ff5-98a0-08d79eb0ca8e", //PROGRESSIVE SCHEME ID 
            pictoId: "3fa85f64-5717-4562-b3fc-2c963f66afa6", 
            name : schemeTitle,
            totalSteps : stepNumber.length, 
            steps: updatedStepsArr
        }
        putProgressiveScheme(updatedScheme); 
    } else if(document.title == "Trek Je Plan - Maak een nieuw stappenplan aan") {
        for(i = 0; i < stepNumber.length; i++){
            currentStep = stepNumber[i]; 
            let currentStepNumber = currentStep.dataset.number;
            let sequenceInt = parseInt(currentStepNumber); 
            step = {
                descriptionStep: stepDescription[i].value, 
                pictoId: "3fa85f64-5717-4562-b3fc-2c963f66afa6", 
                sequence: sequenceInt
            };
            stepsArr.push(step);  
        }
    
        scheme = {
            pictoId: "3fa85f64-5717-4562-b3fc-2c963f66afa6", 
            name : schemeTitle,
            totalSteps : stepNumber.length, 
            steps: stepsArr
        }
        postProgressiveScheme(scheme);
	}
    
}


const initProgressiveSchemes = function() {
    progressiveSchemes = document.querySelector('.c-stepplans');
    addStepsForm = document.querySelector('.js-form-addStep');
    mainImage = document.querySelector('.c-button_addStepImage');
		console.log("We zitten in progressive scheme"); 
		if(document.title == "Trek Je Plan - Stappenplannen Overzicht"){
			getProgressiveSchemes()
		}else if(document.title == "Trek Je Plan - Overzicht stappenplan - Mentor"){
			getProgressiveSchemeById(); 
	}
    else if(addStepsForm){
        submitProgressiveScheme = document.querySelector('.c-submitbutton');
        console.log(submitProgressiveScheme);
        submitProgressiveScheme.addEventListener('click', function(){
            // enige verplichte is PICTO nu default waarde 
            if(mainImage){
                mainImage.value = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
                getInputFieldsScheme(); 
            }
        });
    }


};
document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded - Create progressive scheme ');
	baseURL = 'https://localhost:44374/api/';
	initProgressiveSchemes();
});