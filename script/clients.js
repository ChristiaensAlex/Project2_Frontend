let fullName, fullNameArr, clients, json, deletedClient;

const showAllClients = function(jsonObject) {
	for (i in jsonObject) {
		let clientP = document.querySelector('.c-client');
		console.log(clientP);
		let clientClone = clientP.cloneNode(true);
		clientClone.classList.remove('u-hide');
		let client = jsonObject[i];
		console.log(client.firstName);
		let clientInfo = clientClone.querySelector('.c-client__info');
		clientInfo.setAttribute('clientnr', i);
		let clientName = clientClone.querySelector('.c-client__name');
		let clientImage = clientClone.querySelector('.c-client__userPhoto--img');

		clientImage.classList.add("c-client__userPhoto--no-img")
		clientImage.style.backgroundImage = `url(profile-icon.svg) `;

		if(client.profilePicture && !client.profilePicture.includes('profile-icon.svg')){
			clientImage.style.backgroundImage = `url(${client.profilePicture}), url(profile-icon.svg) `;
			clientImage.classList.remove("c-client__userPhoto--no-img")
		}

		clientName.innerHTML = `${client.firstName} ${client.lastName}`;
		clients.appendChild(clientClone);
	}
	console.log(clients);
	getElements();
	ListenToClients(jsonObject);
	deletes = document.querySelectorAll('.js-client-delete');
	ListenToDeletes(deletes);
};
const ListenToDeletes = function(deletes) {
	for (let d of deletes) {
		d.addEventListener('click', function(event) {
			console.log('vuilbak geklikt');
			let nr = this.parentElement.querySelector('.c-client__info').getAttribute('clientnr');
			deletedClient = json[nr];
			console.log(deletedClient);
		});
	}
};

const ListenToClients = function(jsonObject) {
	clients = document.querySelectorAll('.c-client__info');
	for (client of clients) {
		client.addEventListener('click', function(event) {
			console.log(this);
			let nr = this.getAttribute('clientnr');
			console.log(nr);
			clientId = jsonObject[nr].id;
			sessionStorage.clientId = clientId;
			window.location.href = 'DetailInfoClient.html';
		});
	}
};
const getAPI = function(url) {
	fetch(url)
		.then(function(response) {
			if (!response.ok) {
				throw Error(`Problem to fetch(). Status code: ${response.status}`);
			} else {
				return response.json();
			}
		})
		.then(function(jsonObject) {
			json = jsonObject;
			showAllClients(jsonObject);
		})
		.catch(function(error) {
			console.error(`Problem to process json ${error} `);
		});
};
const initClients = function() {
	MentorId = localStorage.getItem('mentorId');
	console.log(MentorId);
	getAPI(`https://trekjeplan.azurewebsites.net/api/mentor/${MentorId}/client`);
	clients = document.querySelector('.c-clients');
};
document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded');
	initClients();
});
