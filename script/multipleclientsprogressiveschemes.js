let baseURL = 'https://localhost:44374/api/',
	mentorId,
	allChosenClients = [],
	allChosenPs = [];
const showClients = function(json, element) {
	i = 0;
	let html = '';
	for (object of json) {
		html += `<div class="c-search-list__item" data-number="${i}">${object.firstName} ${object.lastName}</div>`;
		console.log(i);
		i++;
	}
	document.querySelector('.js-clients').innerHTML = html;
	ListenToObjects(element);
};

const showProgressiveSchemes = function(json, element) {
	i = 0;
	let html = '';
	for (object of json) {
		html += `<div class="c-search-list__item" data-number="${i}">${object.name}</div>`;
		console.log(i);
		i++;
	}
	document.querySelector('.js-progressiveSchemes').innerHTML = html;
	ListenToObjects(element);
};
const getSearchElements = function(element, string) {
	let url = `${baseURL}mentor/${mentorId}/${element}?search=${string}`;
	fetch(url)
		.then(function(response) {
			if (!response.ok) {
				throw Error(`Problem to fetch(). Status code: ${response.status}`);
			} else {
				let arr = new Array();
				arr = response.json();
				console.log(arr);
				return arr;
			}
		})
		.then(function(jsonObject) {
			json = jsonObject;
			console.log(jsonObject);
			if (element == 'client') {
				showClients(jsonObject, element);
				backPage = 'DetailProgressiveSteppsplan.html';
			} else if (element == 'progressiveScheme') {
				showProgressiveSchemes(jsonObject, element);
				backPage = 'PlanningClient.html';
				console.log('ps');
			}
		})
		.catch(function(error) {
			console.log(error);
			console.error(`Problem to process json $`);
		});
};
const ListenToSubmit = function(button) {
	button.addEventListener('click', function(event) {
		event.preventDefault();
		let payload = {
			allChosenPs: allChosenPs,
			allChosenClients: allChosenClients
		};
		console.log(payload);
		sessionStorage.items = JSON.stringify(payload);
		let ids = JSON.parse(sessionStorage.items);
		console.log(ids);
		window.location.href = 'OverviewDetailClientAscribed.html';
	});
};
// const ListenToSearch = function (search) {
//   search.addEventListener('focus', function (event) {
//     console.log(this.value)
//     getSearchElements(search.name, this.value)
//   })
// }
const ListenToSearch = function(search) {
	//let searchPicto = document.querySelector('.c-input-search');

	console.log(search);
	search.addEventListener('input', function() {
		console.log('Er verandert hier gelijk iets');
		console.log(this.value);
		console.log(search.name);
		//  let url = `${baseURL}picto?search=${searchPicto.value}`;
		getSearchElements(search.name, this.value);
		//getPictos(url, true);
	});
};
const ListenToObjects = function(element) {
	objects = document.querySelectorAll('.c-search-list__item');
	console.log(element);
	for (object of objects) {
		console.log(object);
		object.addEventListener('click', function(event) {
			console.log(this);
			this.classList.add('c-backbutton__text');
			i = this.dataset.number;
			i = parseInt(i);
			console.log(i);
			chosenItem = json[i];
			console.log(json[i]);
			//search.value = `${chosenItem.firstName} ${chosenItem.lastName}`
			console.log(element);
			if (element == 'client') {
				let chosenClient = json[i];
				allChosenClients.push(chosenClient);
				console.log(allChosenClients);
			} else if (element == 'progressiveScheme') {
				let chosenProgressiveScheme = json[i];
				console.log(progressiveSchemeId);
				allChosenPs.push(chosenProgressiveScheme);
				console.log(allChosenPs);
			}
		});
	}
};
document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded - contact');
	mentorId = '206D076A-D443-40AD-AE3A-783350C2E0F7';

	progressiveSchemeId = '52B05597-D586-4DF2-AB80-5DF8BF33B8D4';
	clientId = '1D32717C-4C22-40A2-650E-08D79A90ABFB';
	//clientId = sessionStorage.clientId;
	console.log(clientId);
	searchClient = document.querySelector('.js-search-client');
	searchProgressiveScheme = document.querySelector('.js-search-progressiveScheme');
	//console.log(searchClient);
	//	console.log(searchProgressiveScheme);
	select = document.querySelector('.js-select');
	submit = document.querySelector('.js-submitbutton');
	ListenToSearch(searchClient);
	ListenToSearch(searchProgressiveScheme);
	// ListenToSelect(select)
	ListenToSubmit(submit);
});
