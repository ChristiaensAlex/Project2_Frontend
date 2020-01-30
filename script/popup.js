let deleteClient, background, deleteProgressiveScheme, stepImages, mainImage, divElement, text;

const OnHandlerClickedCancel = function() {
	background.classList.remove('c-popup-blur');
	popup.style.display = 'none';
};

const onHandlerClickedPopUp = function(picto, element) {
	//background blurry

	background.classList.add('c-popup-blur');
	//popup appears
	popup.style.display = 'block';

	if (document.title == 'Trek Je Plan - Cliënten Overzicht') {
		document.querySelector('.js-deleteButton').addEventListener('click', function() {
			text.innerhtml = `${deletedClient.firstName} ${deletedClient.lastName}`;
			console.log(deletedClient);
			// hier de delete functie aanspreken voor de client

			let url = `client/${deletedClient.id}`;
			removefromDB(url);
		});
	} else if (document.title == 'Trek Je Plan - Overzicht stappenplan - Mentor') {
		document.querySelector('.js-deleteButton').addEventListener('click', function() {
			console.log(deletedProgressiveScheme);
			// hier de delete functie aanspreken voor progressive scheme
			let url = `progressiveScheme/${deletedProgressiveScheme.id}`;
			removefromDB(url);
		});
	} else if (document.title == 'Trek Je Plan - Overzicht kalender alle cliënten') {
		document.querySelector('.deleteToday').addEventListener('click', function() {
			console.log(deletedPlan);
			console.log(vandaag);
			// hier de delete functie aanspreken voor progressive scheme
			let url = `clientprogressiveScheme/${deletedPlan.clientProgressiveSchemeId}/${deletedPlan.clientId}`;
			removefromDB(url);
		});
	}
	if (picto == true) {
		divElement = element;
	}
};
const removefromDB = function(endurl) {
	let url = `https://trekjeplan.azurewebsites.net/api/${endurl}`;
	fetch(url, {
		method: 'DELETE'
	})
		.then(function(response) {
			if (response.ok) {
				console.log(response.status);
			} else {
				response.json();
				throw Error(`Problem to fetch(). Status code: ${response.status}`);
			}
		})
		// .then(res => res.json())
		.then(data => console.log(data));
};
const ListenToDelete = function(element) {
	element.addEventListener('click', function() {
		console.log('klik vb');
		onHandlerClickedPopUp(false, element);
	});
};

const getElements = function() {
	deleteClient = document.querySelectorAll('.js-client-delete');
	background = document.querySelector('.js-background-popup');
	popup = document.querySelector('.c-popup-form');
	text = document.querySelector('.js-text');
	cancelButton = document.querySelector('.js-cancel');
	if (cancelButton) {
		cancelButton.addEventListener('click', OnHandlerClickedCancel);
	}
	deleteProgressiveScheme = document.querySelectorAll('.js-progressivescheme-delete');
	//deletePlanButton = document.querySelector('.c-planning__delete');
	stepImages = document.querySelectorAll('.c-selectedPicto');
	mainImage = document.querySelector('.c-button__mainStepImage');
	deleteSchedules = document.querySelectorAll('.js-calendar-delete');
	if (typeof deleteClient != 'undefined' && deleteClient.length > 0) {
		deleteClient.forEach(element => {
			ListenToDelete(element);
		});
	} else if (typeof deleteProgressiveScheme != 'undefined' && deleteProgressiveScheme.length > 0) {
		deleteProgressiveScheme.forEach(element => {
			ListenToDelete(element);
		});
	} else if (typeof deleteSchedules != 'undefined' && deleteSchedules.length > 0) {
		console.log(deleteSchedules);
		deleteSchedules.forEach(element => {
			ListenToDelete(element);
		});
	} //else if (deletePlanButton) {
	// 	console.log(deletePlanButton);
	// 	ListenToDelete(deletePlanButton);
	// }
	else if (typeof stepImages != 'undefined' && stepImages.length > 0 && mainImage) {
		stepImages.forEach(element => {
			element.addEventListener('click', function() {
				onHandlerClickedPopUp(true, element);
			});
		});
		mainImage.addEventListener('click', function() {
			onHandlerClickedPopUp(true, mainImage);
		});
	}
};

document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded - popup');
	getElements();
});
