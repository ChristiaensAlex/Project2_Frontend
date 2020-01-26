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
const CreateClient = function(payload, mentorId) {
	console.log('post contact' + mentorId);
	let body = JSON.stringify(payload);
	console.log(body);
	fetch(`https://localhost:44374/api/client/${mentorId}`, {
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
const AddExistingClient = function(payload, mentorId) {
	console.log(' add existing client');
	let body = JSON.stringify(payload);
	console.log(body);
	fetch(`https://localhost:44374/api/client/Login?mentorid=${mentorId}`, {
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
const ListenToUsername = function(username) {
	usernameField = document.querySelector('.js-username-field');
	usernameErrorMessage = document.querySelector('.js-username-errormessage');
	usernameError = document.querySelector('.js-username-error');
	iconUsernameError = document.querySelector('.js-icon-username-error');
	iconUsernameCorrect = document.querySelector('.js-icon-username');

	username.addEventListener('blur', function() {
		if (isEmpty(username.value)) {
			usernameErrorMessage.innerText = 'Dit veld is verplicht.';
			addErrors('username');
			username.addEventListener('input', doubleCheckUsername);
		}
	});
};
const ListenToSubmitButton = function(button) {
	button.addEventListener('click', function(event) {
		event.preventDefault();

		mentorId = 'EF4C3F22-6AC3-4143-B9CD-21A23F9EA1FE';
		if (!isEmpty(passwordInput.value) && isSamePassword(passwordInput.value, passwordRepeatInput.value) && !isEmpty(username.value)) {
			console.log('form is good to go');
			if (firstname.value) {
				let payload = {
					firstName: firstname.value,
					lastName: lastname.value,
					username: username.value,
					password: passwordInput.value,
					confirmPassword: passwordRepeatInput.value,
					infoClient: extra.value,
					profilePictureId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
				};

				CreateClient(payload, mentorId);
			} else {
				let payload = {
					username: username.value,
					password: passwordInput.value
				};
				console.log(payload);
				AddExistingClient(payload, mentorId);
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
	});
};

const GetDomElementsClient = function() {
	firstname = document.querySelector('.js-firstnameClient');
	lastname = document.querySelector('.js-lastnameClient');
	username = document.querySelector('.js-username');
	//password = document.querySelector('.js-password');
	//passwordConfirm = document.querySelector('.js-passwordConfirm');
	extra = document.querySelector('.js-extraClientInfo');
	submitButton = document.querySelector('.js-createClientButton');
	//ListenToPassword(password);
	//ListenToPasswordRepeat(passwordConfirm);
	ListenToUsername(username);
	ListenToSubmitButton(submitButton);
};
document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded');
	GetDomElementsClient();
	GetDomElements();
});
