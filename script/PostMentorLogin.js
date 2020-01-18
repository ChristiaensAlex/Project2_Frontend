let email, emailLogin, password, passwordLogin, buttonLogin;

const url = 'https://localhost:44374/api/AuthMentor/Login';
const postAPI = function(payload) {
	console.log('post');
	fetch(url, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	})
		.then(res => res.json())
		.then(data => console.log(data))
		.catch(err => console.log(err));
};

const OnHandlerClickedLogin = function() {
	email = emailLogin.value;
	password = passwordLogin.value;
	let payload = { email: email, password: password };
	console.log(payload);
	console.log('Handler');
	console.log(emailLogin.value);
	console.log(passwordLogin.value);
	postAPI(payload);
};

const getElements = function() {
	emailLogin = document.querySelector('.js-email');
	passwordLogin = document.querySelector('.js-password');
	buttonLogin = document.querySelector('.js-startbutton');
	buttonLogin.addEventListener('click', function(event) {
		event.preventDefault();
		OnHandlerClickedLogin();
	});
};

const initLogin = function() {
	getElements();
};

document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded');
	initLogin();
});
