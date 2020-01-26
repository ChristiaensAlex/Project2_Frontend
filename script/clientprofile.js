let firstname, lastname, username, password, extra, profilepic;
//const isEmpty = function(fieldValue) {
//	return !fieldValue || !fieldValue.length;
//};
const putClientInfoAPI = function(url, payload) {
	console.log('put client info');
	let body = JSON.stringify(payload);
	console.log(body);
	fetch(url, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'application/json' },
		body: body
	})
		.then(res => {
			console.log(res.status)((window.location.href = 'MentorHasClientList.html'));
		})
		// .then(data => {
		// 	console.log(data); // ;
		// })
		.catch(err => console.log(err));
};

const showClientInfo = function(json) {
	firstname.value = json.firstName;
	lastname.value = json.lastName;
	username.value = json.username;
	password.value = json.password;
	extra.value = json.infoClient;
};

const GetDomElementsClient = function() {
	firstname = document.querySelector('.js-firstnameClient');
	lastname = document.querySelector('.js-lastnameClient');
	username = document.querySelector('.js-username');
	password = document.querySelector('.js-password');
	extra = document.querySelector('.js-extraClientInfo');
	updateButton = document.querySelector('.js-submitbutton');
	ListenToUpdateButton(updateButton);
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

const ListenToUpdateButton = function(button) {
	button.addEventListener('click', function(event) {
		event.preventDefault();
		if (!isEmpty(firstname.value) && !isEmpty(password.value)) {
			let payload = {
				firstName: firstname.value,
				lastName: lastname.value,
				username: username.value,
				password: password.value,
				confirmPassword: password.value,
				infoClient: extra.value,
				profilePictureId: null
			};
			putClientInfoAPI(`https://localhost:44374/api/client/${sessionStorage.clientId}`, payload);
		}
	});
};

document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded');
	console.log(sessionStorage.clientId);
	GetDomElements();
	GetDomElementsClient();
	getAPI(`https://localhost:44374/api/client/${sessionStorage.clientId}`);
});
