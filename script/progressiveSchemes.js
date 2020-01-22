let progressiveSchemes, baseURL, addStepsForm ,scheme,  title, schemeTitle;
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
    schemeTitle = title.value;
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


const initProgressiveSchemes = function() {
    progressiveSchemes = document.querySelector('.c-stepplans');
    addStepsForm = document.querySelector('.js-form-addStep');
    mainImage = document.querySelector('.c-button_addStepImage');
    mainImageFilled = mainImage.value; 
    if(progressiveSchemes){
    getProgressiveSchemes();}
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
