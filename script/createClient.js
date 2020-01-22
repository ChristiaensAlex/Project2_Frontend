//{
//     "firstName": "Chloë",
//     "lastName": "Devriese",
//     "username": "string",
//     "password": "-Azerty123",
//     "confirmPassword": "-Azerty123",
//     "infoClient": "string",
//     "profilePictureId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
//   }
let firstname, lastname, username, password, passwordConfirm, extra;
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
const AddExistingClient = function(payload) {
	console.log(' add existing client');
	let body = JSON.stringify(payload);
	console.log(body);
	fetch(`https://localhost:44374/api/client/Login`, {
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
const ListenToSubmitButton = function(button) {
	button.addEventListener('click', function(event) {
		event.preventDefault();
		if (firstname) {
			let payload = {
				firstName: firstname.value,
				lastName: lastname.value,
				username: username.value,
				password: password.value,
				confirmPassword: passwordConfirm.value,
				infoClient: extra.value,
				profilePictureId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
			};
			mentorId = 'EF4C3F22-6AC3-4143-B9CD-21A23F9EA1FE';
			CreateClient(payload, mentorId);
		} else {
			let payload = {
				username: username.value,
				password: password.value
			};
			console.log(payload);
			//AddExistingClient(payload);
		}
	});
};

const GetDomElements = function() {
	firstname = document.querySelector('.js-firstnameClient');
	lastname = document.querySelector('.js-lastnameClient');
	username = document.querySelector('.js-username');
	password = document.querySelector('.js-password');
	passwordConfirm = document.querySelector('.js-passwordConfirm');
	extra = document.querySelector('.js-extraClientInfo');
	submitButton = document.querySelector('.js-submitbutton');

	ListenToSubmitButton(submitButton);
};
document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded');
	GetDomElements();
});
