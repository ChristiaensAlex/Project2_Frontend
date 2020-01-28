let fullName, fullNameArr, clients;

const showAllClients = function(jsonObject) {
	for (i in jsonObject) {
		let clientP = document.querySelector('.c-client')
		console.log(clientP); 
		let clientClone = clientP.cloneNode(true); 
		clientClone.classList.remove('u-hide'); 
		let client = jsonObject[i];
		console.log(client.firstName);
		let clientName = clientClone.querySelector('.c-client__name'); 
		console.log(clientName); 
		clientClone
		clientName.innerHTML = `${client.firstName} ${client.lastName}`; 
		clients.appendChild(clientClone); 
	}; 
  console.log(clients); 
	getElements();
	ListenToClients(jsonObject);
};

const ListenToClients = function(jsonObject) {
	clients = document.querySelectorAll('.js-client');
	for (client of clients) {
		client.addEventListener('click', function(event) {
			let nr = this.getAttribute('clientnr');
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
			showAllClients(jsonObject);
		})
		.catch(function(error) {
			console.error(`Problem to process json ${error} `);
		});
};
const initClients = function() {
	mentorId = 'ef4c3f22-6ac3-4143-b9cd-21a23f9ea1fe';
	getAPI(`https://localhost:44374/api/client/`);
	clients = document.querySelector('.c-clients');
};
document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded');
	initClients();
});
