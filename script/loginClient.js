let baseURL = `https://localhost:44374/api/`,
	username,
	password;

const loginClient = function(payload) {
	console.log(' add existing client');
	let body = JSON.stringify(payload);
	console.log(body);
	fetch(`${baseURL}client/Login`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'application/json' },
		body: body
	})
		.then(res => res.json())
		.then(data => {
			console.log(data), saveData(data), (window.location.href = 'MainMenuClient.html');
		})
		.catch(err => console.log(err));
};
const saveData = function(data) {
	sessionStorage.clientId = data.id;
	sessionStorage.client = JSON.stringify(data);
	//client = sessionStorage.client;
	//console.log(sessionStorage.clientId, JSON.parse(client));
};
const ListenToSubmit = function(button) {
	button.addEventListener('click', function(event) {
		event.preventDefault();
		let payload = {
			username: username.value,
			password: password.value
		};
		console.log(payload);
		loginClient(payload);
	});
};
const init = function() {
	username = document.querySelector('.js-username');
	password = document.querySelector('.js-password');
	submit = document.querySelector('.js-submitbutton');
	ListenToSubmit(submit);
};
document.addEventListener('DOMContentLoaded', function() {
	console.info('domcontentloaded');
	init();
});
