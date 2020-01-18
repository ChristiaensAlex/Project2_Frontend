const showClientInfo = function(json) {
    firstname.value = json.firstName;
    lastname.value = json.lastName;
    username.value = json.username;
    password.value = json.password;
    extra.value = json.infoClient;
};

const GetDomElements = function() {
    firstname = document.querySelector('.js-firstnameClient');
    lastname = document.querySelector('.js-lastnameClient');
    username = document.querySelector('.js-username');
    password = document.querySelector('.js-password');
    extra=document.querySelector('.js-extraClientInfo');

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
			sessionStorage.Client = jsonObject;
			showClientInfo(jsonObject);
			console.log(jsonObject);
		})
		.catch(function(error) {
			console.error(`Problem to process json ${error} `);
		});
};

document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded');
	console.log(sessionStorage.clientId);
	getAPI(`https://localhost:44374/api/client/${sessionStorage.clientId}`);
	GetDomElements();
});
