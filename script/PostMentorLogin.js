let email, password;

const postLoginMentorAPI = function(payload) {
	console.log('post');
	fetch('https://localhost:44374/api/AuthMentor/Login', {
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
