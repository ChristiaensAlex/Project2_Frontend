let baseURL = 'https://trekjeplan.azurewebsites.net/api/',
	mentorId,
	allChosenClients = [],
	allChosenPs = [],
	objects,
	numberClients = 0,
	numberPs = 0;
const showClients = function(json, element) {
	let i = 0;
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
	let i = 0;
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
		window.location.href = 'https://trekjeplan-front.azurewebsites.net/OverviewDetailClientAscribed.html';
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
				chosenClients = document.querySelector('.js-chosenClients');

				chosenClients.innerHTML += `<div class="o-layout o-layout--justify-space-between o-layout--align-center" data-number=${numberClients}>${chosenClient.firstName} ${chosenClient.lastName}  <div class="c-client__delete js-client-delete">
				<svg xmlns="http://www.w3.org/2000/svg" width="19.492" height="24" viewBox="0 0 19.492 24">
				  <g id="bin" transform="translate(0.003 0.001)">
					<path id="Path_316" data-name="Path 316" d="M222.96,154.7a.562.562,0,0,0-.562.562v10.623a.562.562,0,1,0,1.124,0V155.265A.562.562,0,0,0,222.96,154.7Zm0,0" transform="translate(-209.901 -146.009)" fill="#28225f" />
					<path id="Path_317" data-name="Path 317" d="M104.961,154.7a.562.562,0,0,0-.562.562v10.623a.562.562,0,0,0,1.124,0V155.265A.562.562,0,0,0,104.961,154.7Zm0,0" transform="translate(-98.534 -146.009)" fill="#28225f" />
					<path id="Path_318" data-name="Path 318" d="M1.593,7.144V20.992a3.1,3.1,0,0,0,.824,2.139A2.768,2.768,0,0,0,4.426,24H15.06a2.767,2.767,0,0,0,2.008-.868,3.1,3.1,0,0,0,.824-2.139V7.144a2.147,2.147,0,0,0-.551-4.222H14.464v-.7A2.208,2.208,0,0,0,12.238,0H7.248a2.208,2.208,0,0,0-2.226,2.22v.7H2.144a2.147,2.147,0,0,0-.551,4.222ZM15.06,22.875H4.426a1.78,1.78,0,0,1-1.709-1.883V7.193H16.769v13.8A1.78,1.78,0,0,1,15.06,22.875ZM6.146,2.219a1.083,1.083,0,0,1,1.1-1.1h4.991a1.083,1.083,0,0,1,1.1,1.1v.7H6.146Zm-4,1.827h15.2a1.012,1.012,0,0,1,0,2.023H2.144a1.012,1.012,0,1,1,0-2.023Zm0,0" transform="translate(0)" fill="#28225f" />
					<path id="Path_319" data-name="Path 319" d="M163.96,154.7a.562.562,0,0,0-.562.562v10.623a.562.562,0,1,0,1.124,0V155.265A.562.562,0,0,0,163.96,154.7Zm0,0" transform="translate(-154.217 -146.009)" fill="#28225f" />
				  </g>
				</svg>
			  </div></div>`;

				allChosenClients.push(chosenClient);
				console.log(allChosenClients);
				let deletes = document.querySelectorAll('.js-client-delete');
				ListenToDeletes(deletes, 'client');
				numberClients++;
			} else if (element == 'progressiveScheme') {
				let chosenProgressiveScheme = json[i];
				chosenProgressiveSchemes = document.querySelector('.js-chosenProgressiveSchemes');

				chosenProgressiveSchemes.innerHTML += `<div class="o-layout o-layout--justify-space-between o-layout--align-center" data-number=${numberPs}>${chosenProgressiveScheme.name}  <div class="c-client__delete js-progressiveScheme-delete">
				<svg xmlns="http://www.w3.org/2000/svg" width="19.492" height="24" viewBox="0 0 19.492 24">
				  <g id="bin" transform="translate(0.003 0.001)">
					<path id="Path_316" data-name="Path 316" d="M222.96,154.7a.562.562,0,0,0-.562.562v10.623a.562.562,0,1,0,1.124,0V155.265A.562.562,0,0,0,222.96,154.7Zm0,0" transform="translate(-209.901 -146.009)" fill="#28225f" />
					<path id="Path_317" data-name="Path 317" d="M104.961,154.7a.562.562,0,0,0-.562.562v10.623a.562.562,0,0,0,1.124,0V155.265A.562.562,0,0,0,104.961,154.7Zm0,0" transform="translate(-98.534 -146.009)" fill="#28225f" />
					<path id="Path_318" data-name="Path 318" d="M1.593,7.144V20.992a3.1,3.1,0,0,0,.824,2.139A2.768,2.768,0,0,0,4.426,24H15.06a2.767,2.767,0,0,0,2.008-.868,3.1,3.1,0,0,0,.824-2.139V7.144a2.147,2.147,0,0,0-.551-4.222H14.464v-.7A2.208,2.208,0,0,0,12.238,0H7.248a2.208,2.208,0,0,0-2.226,2.22v.7H2.144a2.147,2.147,0,0,0-.551,4.222ZM15.06,22.875H4.426a1.78,1.78,0,0,1-1.709-1.883V7.193H16.769v13.8A1.78,1.78,0,0,1,15.06,22.875ZM6.146,2.219a1.083,1.083,0,0,1,1.1-1.1h4.991a1.083,1.083,0,0,1,1.1,1.1v.7H6.146Zm-4,1.827h15.2a1.012,1.012,0,0,1,0,2.023H2.144a1.012,1.012,0,1,1,0-2.023Zm0,0" transform="translate(0)" fill="#28225f" />
					<path id="Path_319" data-name="Path 319" d="M163.96,154.7a.562.562,0,0,0-.562.562v10.623a.562.562,0,1,0,1.124,0V155.265A.562.562,0,0,0,163.96,154.7Zm0,0" transform="translate(-154.217 -146.009)" fill="#28225f" />
				  </g>
				</svg>
			  </div></div>`;

				console.log(progressiveSchemeId);
				allChosenPs.push(chosenProgressiveScheme);
				console.log(allChosenPs);
				let deletes = document.querySelectorAll('.js-progressiveScheme-delete');
				ListenToDeletes(deletes, 'progressiveScheme');
				numberPs++;
			}
		});
	}
};

const ListenToDeletes = function(deletes, element) {
	for (del of deletes) {
		del.addEventListener('click', function(e) {
			console.log(this.parentElement);
			if (element == 'client') {
				this.parentElement.classList.add('u-hide');

				number = this.parentElement.dataset.number;
				objects[number].classList.remove('c-backbutton__text');
				console.log(number);
				allChosenClients.splice(number, 1);
				console.log(allChosenClients);
			} else if (element == 'progressiveScheme') {
				this.parentElement.classList.add('u-hide');

				number = this.parentElement.dataset.number;
				objects[number].classList.remove('c-backbutton__text');
				console.log(number);
				allChosenPs.splice(number, 1);
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
