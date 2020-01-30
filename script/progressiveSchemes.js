let progressiveSchemes, stepPlans, baseURL, addStepsForm, scheme, updatedScheme, title, schemeTitle, mainImg, stepImg;
let eventClicked;
const showAllProgressiveSchemes = function(jsonObject) {
	for (i in jsonObject) {
		if (!jsonObject[i].pictoFilleName) {
			jsonObject[i].pictoFilleName = '23e5daf5-2eb6-4693-b245-3ee7f91e04af.jpg';
		}
		progressiveSchemes.innerHTML += `<div class="c-stepplan" >
		<div class= "c-stepplan__info " plannr=${i}> 
		<div class="c-stepplan__picto">
		<img class="c-choose__picto-img" src="https://trekjeplan.blob.core.windows.net/pictos/${jsonObject[i].pictoFilleName}" width="104px" height="auto"/>
        </div>
        <div class="c-stepplan__name">
           ${jsonObject[i].name}
        </div>
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
	deletes = document.querySelectorAll('.js-progressivescheme-delete');
	ListenToDeletes(deletes);
};
const ListenToDeletes = function(deletes) {
	for (let d of deletes) {
		d.addEventListener('click', function(event) {
			console.log('vuilbak geklikt');
			let nr = this.parentElement.querySelector('.c-stepplan__info').getAttribute('plannr');
			deletedProgressiveScheme = json[nr];
			console.log(deletedProgressiveScheme);
		});
	}
};
const ListenToAddClient = function(button) {
	button.addEventListener('click', function(event) {
		window.location.href = 'AddClientToProgressiveScheme.html';
	});
};

const showClientsFromProgressiveScheme = function(payload) {
	let clients = payload.clients;
	let clientSchemes = document.querySelector('.js-clientScheme');
	for (i in clients) {
		let OneClient = document.querySelector('.c-symbol__clientProfiles-client');
		let clientClone = OneClient.cloneNode(true);
		clientClone.classList.remove('u-hide');
		let client = clients[i];
		let clientName = clientClone.querySelector('.c-symbol__clientProfiles-client__name');
		clientName.innerHTML = client.firstName;
		clientSchemes.appendChild(clientClone);
	}
	clientSchemes.innerHTML += `<button class="c-symbol__clientProfiles-client o-button-reset js-button__addStep">
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
</button>`;
	let addClientButton = document.querySelector('.js-button__addStep');
	console.log(addClientButton);
	ListenToAddClient(addClientButton);
};

const getProgressiveSchemes = function() {
	console.log('get');
	let id = localStorage.getItem('mentorId');
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
			if (progressiveSchemes) {
				showAllProgressiveSchemes(jsonObject);
				console.log(jsonObject);
				json = jsonObject;
				stepPlans = document.querySelectorAll('.c-stepplan__info');
				for (stepPlan of stepPlans) {
					stepPlan.addEventListener('click', function() {
						console.log(this);
						let i = this.getAttribute('plannr');
						console.log(i);
						console.log(jsonObject[i]);
						planId = jsonObject[i].id;
						sessionStorage.planId = planId;
						sessionStorage.planName = jsonObject[i].name;
						window.location.href = 'DetailProgressiveStepsPlan.html';
					});
				}
			}
		})
		.catch(function(error) {
			console.error(`Problem to process json ${error}`);
		});
};

const putProgressiveScheme = function(payload) {
	let body = JSON.stringify(payload);
	let schemeId = sessionStorage.planId;
	fetch(`${baseURL}progressiveScheme/${schemeId}`, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'application/json' },
		body: body
	})
		.then(data => {
			sessionStorage.mainPictoName = '';
			sessionStorage.clickedStepPicto = '';
			console.log(data), (window.location.href = 'MentorHasProgressiveStepsList.html');
		})
		.catch(err => console.log(err));
};

const postProgressiveScheme = function(payload) {
	let body = JSON.stringify(payload);
	console.log(body);
	let mentorId = localStorage.getItem('mentorId');
	fetch(`${baseURL}progressiveScheme/${mentorId}`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'application/json' },
		body: body
	})
		.then(res => res.json())
		.then(data => {
			sessionStorage.mainPictoName = '';
			sessionStorage.clickedStepPicto = '';
			console.log(data), (window.location.href = 'MentorHasProgressiveStepsList.html');
		})
		.catch(err => console.log(err));
};

// const onHandlerClickedOpenChoosePhoto = function(){
// 	window.location.href = 'ChoosePhoto.html';
// }

const getInputFieldsScheme = function() {
	console.log('getInputFieldsScheme');
	mainImg = document.querySelector('.js-mainImg').querySelector('.js-selected-picto');
	stepImg = document.querySelectorAll('.js-selected-picto');
	title = document.querySelector('.js-scheme-name');
	stepNumber = document.querySelectorAll('.js-single-step');
	stepDescription = document.querySelectorAll('.js-input-description');

	schemeTitle = title.value;
	console.log(stepImg);

	if (document.title == 'Trek Je Plan - Wijzig een stappenplan') {
		let payload = [];
		let counter = 1;
		console.log(json);
		for (object of json.steps) {
			object.descriptionStep = stepDescription[counter].value;
			object.sequence = counter;
			object.pictoFilleName = stepImg[counter].dataset.img;
			payload.push(object);
			counter++;
		}

		for (i = counter; i < stepNumber.length; i++) {
			console.log(i);
			let step = {
				descriptionStep: stepDescription[i].value,
				sequence: i,
				pictoFilleName: stepImg[i].dataset.img
			};

			payload.push(step);
		}

		updatedScheme = {
			id: sessionStorage.planId,
			pictoFilleName: mainImg.dataset.img,
			name: schemeTitle,
			totalSteps: stepNumber.length - 1,
			steps: payload
		};

		console.log(updatedScheme);
		putProgressiveScheme(updatedScheme);
	} else if (document.title == 'Trek Je Plan - Maak een nieuw stappenplan aan') {
		let payload = [];

		for (i = 0; i < stepNumber.length; i++) {
			let step = {
				descriptionStep: stepDescription[i].value,
				sequence: i + 1,
				pictoFilleName: stepImg[i + 1].dataset.img
			};

			payload.push(step);
		}

		postScheme = {
			pictoFilleName: mainImg.dataset.img,
			name: schemeTitle,
			totalSteps: stepNumber.length,
			steps: payload
		};

		console.log(postScheme);
		postProgressiveScheme(postScheme);
	}
};

const initProgressiveSchemes = function() {
	progressiveSchemes = document.querySelector('.c-stepplans');
	addStepsForm = document.querySelector('.js-form-addStep');
	mainImage = document.querySelector('.c-button_addStepImage');
	console.log(document.title);
	if (document.title == 'Trek Je Plan - Overzicht stappenplan - Mentor') {
		getProgressiveSchemes();
	} else if (addStepsForm) {
		// stepImages = document.querySelectorAll('.c-button_addStepImage');
		// if(stepImages){
		// 	stepImages.forEach(step => step.addEventListener('click', function(){
		// 		let dataNumber = step.parentNode.parentNode.dataset.number;
		// 		sessionStorage.clickedStepDataNumber = dataNumber;
		// 		//console.log(JSON.parse(sessionStorage.clickedStepPicto));
		// 		loadImage();
		// 	}));
		// }
		submitProgressiveScheme = document.querySelector('.c-submitbutton');
		submitProgressiveScheme.addEventListener('click', function() {
			// enige verplichte is PICTO nu default waarde
			if (mainImage) {
				console.log(mainImage.value);
				// mainImage.value = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
				getInputFieldsScheme();
			}
		});
	}
};
document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded - Create progressive scheme ');
	baseURL = 'https://trekjeplan.azurewebsites.net/api/';
	initProgressiveSchemes();
	// let mainPicto = document.querySelector('.c-button__mainStepImage');
	// if(mainPicto){
	// mainPicto.addEventListener('click', onHandlerClickedOpenChoosePhoto);
	// };
});
