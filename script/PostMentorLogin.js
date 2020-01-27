const postLoginMentorAPI = function (payload) {
	console.log('registerMentor');
	let body = JSON.stringify(payload);
	console.log(body);
	fetch('https://trekjeplan.azurewebsites.net/api/AuthMentor/Login', {
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
				removeErrors('email');
				console.log(data), (sessionStorage.mentorId = data.id), console.log(sessionStorage.mentorId), (window.location.href = 'MentorHasClientList.html');
			} else {
				console.log(data);
				addErrors('email'), (mailErrorMessage.innerText = data);
			}

			//
		})
		.catch(err => console.log(err));
};
