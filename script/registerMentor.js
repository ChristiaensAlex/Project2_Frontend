const url = 'https://localhost:44374/api/AuthMentor/Register';
let mentorId;
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
			console.log(data), (sessionStorage.mentorId = data.id), console.log(sessionStorage.mentorId);
		})
		.catch(err => console.log(err));
};
