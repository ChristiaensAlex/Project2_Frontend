const postRegisterMentorAPI = function (payload) {
	console.log('post');
	let body = JSON.stringify(payload);
	console.log(body);
	fetch('https://trekjeplan.azurewebsites.net/api/AuthMentor/Register', {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'application/json' },
		body: body
	})
		.then(res => res.json())
		.then(data => {
			console.log(data), (sessionStorage.mentorId = data.id), console.log(sessionStorage.mentorId), (window.location.href = 'https://trekjeplan-front.azurewebsites.net/RegistrationMentor2.html');
		})
		.catch(err => console.log(err));
};
