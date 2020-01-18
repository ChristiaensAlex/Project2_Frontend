const url = 'https://localhost:44374/api/AuthMentor/Register';
let id;
const postAPI = function(payload) {
	console.log('post');
	let body = JSON.stringify(payload);
	console.log(body);
	fetch(url, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'application/json' },
		body: body
	})
		.then(res => res.json())
		.then(data => {
			console.log(data), (id = data.id), console.log(id);
		})
		.catch(err => console.log(err));
};

const OnHandlerClickedLogin = function(payload) {
	console.log(payload);
	console.log('Handler');
	// console.log(emailLogin.value);
	// console.log(passwordLogin.value);
	postAPI(payload);
};
