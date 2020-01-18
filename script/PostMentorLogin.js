let email, password;

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
	email = mailInput.value; 
	password = passwordInput.value;
	let payload = { email: email, password: password };
	console.log(payload);
	console.log('Handler');
	postAPI(payload);
};


document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded');
});
