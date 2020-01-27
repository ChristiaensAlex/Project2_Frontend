//{
//     "firstName": "Chloë",
//     "lastName": "Devriese",
//     "username": "string",
//     "password": "-Azerty123",
//     "confirmPassword": "-Azerty123",
//     "infoClient": "string",
//     "profilePictureId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
//   }
let firstname, lastname, username, password, passwordConfirm, extra, usernameErrorMessage, usernameField, usernameError, iconUsernameError, iconUsernameCorrect;

const getProfileClient = function (url) {
	fetch(url)
		.then(function (response) {
			if (!response.ok) {
				throw Error(`Problem to fetch(). Status code: ${response.status}`);
			} else {
				return response.json();
			}
		})
		.then(function (jsonObject) {
			sessionStorage.Client = jsonObject;
			showClientInfo(jsonObject);
			console.log(jsonObject);
		})
		.catch(function (error) {
			console.error(`Problem to process json ${error} `);
		});
};
const putClientInfoAPI = function (url, payload) {
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
const showClientInfo = function (json) {
	firstname.value = json.firstName;
	lastname.value = json.lastName;
	username.value = json.username;
	passwordInput.value = json.password;
	passwordRepeatInput.value = json.password;
	extra.value = json.infoClient;
};
const CreateClient = function (payload, mentorId) {
	console.log('post contact' + mentorId);
	let body = JSON.stringify(payload);
	console.log(body);
	fetch(`https://trekjeplan.azurewebsites.net/api/client/${mentorId}`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'application/json' },
		body: body
	})
		.then(res => res.json())
		.then(data => {
			console.log(data), (window.location.href = 'MentorHasClientList.html');
		})
		.catch(err => console.log(err));
};
const AddExistingClient = function (payload, mentorId) {
	console.log(' add existing client');
	let body = JSON.stringify(payload);
	console.log(body);
	fetch(`https://trekjeplan.azurewebsites.net/api/Client/Login?mentorId=${mentorId}`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'application/json' },
		body: body
	})
		.then(res => {
			status = res.status;
			return res.json();
		})

		.then(data => {
			if (status == 200) {
				removeErrors('username');
				window.location.href = 'MentorHasClientList.html';
			} else {
				console.log(data);
				addErrors('username'), (usernameErrorMessage.innerText = data);
			}

			//
		})
		.catch(err => console.log(err));
};
const ListenToUsername = function (username) {
	usernameField = document.querySelector('.js-username-field');
	usernameErrorMessage = document.querySelector('.js-username-errormessage');
	usernameError = document.querySelector('.js-username-error');
	iconUsernameError = document.querySelector('.js-icon-username-error');
	iconUsernameCorrect = document.querySelector('.js-icon-username');
	username.addEventListener('blur', function () {
		if (isEmpty(username.value)) {
			usernameErrorMessage.innerText = 'Dit veld is verplicht.';
			addErrors('username');
			username.addEventListener('input', doubleCheckUsername);
		}
	});
};
const ListenToSubmitButton = function (button) {
	button.addEventListener('click', function (event) {
		event.preventDefault();

		mentorId = localStorage.getItem('mentorId');
		if (button == addClient) {
			let payload = {
				username: username.value,
				password: password.value
			};
			console.log(payload);
			AddExistingClient(payload, mentorId);
		} else {
			if (!isEmpty(passwordInput.value) && isSamePassword(passwordInput.value, passwordRepeatInput.value) && !isEmpty(username.value)) {
				console.log('form is good to go');

				let payload = {
					firstName: firstname.value,
					lastName: lastname.value,
					username: username.value,
					password: passwordInput.value,
					confirmPassword: passwordRepeatInput.value,
					infoClient: extra.value,
					profilePictureId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
				};
				if (button == createClient) {
					CreateClient(payload, mentorId);
				} else if (button == editClient) {
					putClientInfoAPI(`https://trekjeplan.azurewebsites.net/api/client/${sessionStorage.clientId}`, payload);
				}
			} else {
				if (isEmpty(username.value)) {
					addErrors('username');
					username.addEventListener('input', doubleCheckUsername);
				}
				if (isEmpty(passwordInput.value)) {
					addErrors('password');
					passwordInput.addEventListener('input', doubleCheckPassword);
				}
				if (!isSamePassword(passwordInput.value, passwordRepeatInput.value)) {
					addErrors('passwordRepeat');

					passwordRepeatInput.addEventListener('input', doubleCheckPasswordRepeat);
				}
			}
		}
	});
};

const GetDomElementsClient = function () {
	firstname = document.querySelector('.js-firstnameClient');
	lastname = document.querySelector('.js-lastnameClient');
	username = document.querySelector('.js-username');
	//password = document.querySelector('.js-password');
	//passwordConfirm = document.querySelector('.js-passwordConfirm');
	extra = document.querySelector('.js-extraClientInfo');
	createClient = document.querySelector('.js-createClientButton');
	editClient = document.querySelector('.js-editClientbutton');
	addClient = document.querySelector('.js-addClientButton');
	//ListenToPassword(password);
	//ListenToPasswordRepeat(passwordConfirm);
	ListenToUsername(username);
	if (editClient) {
		console.log('wijzig profiel');
		GetDomElements();

		getProfileClient(`https://trekjeplan.azurewebsites.net/api/client/${sessionStorage.clientId}`);
		ListenToSubmitButton(editClient);
	} else if (createClient) {
		GetDomElements();
		//ListenToUsername(username);
		ListenToSubmitButton(createClient);
	} else if (addClient) {
		password = document.querySelector('.js-password');
		ListenToSubmitButton(addClient);
	}
};
document.addEventListener('DOMContentLoaded', function () {
	console.log('DOM loaded');
	GetDomElementsClient();

	//GetDomElements();
});
