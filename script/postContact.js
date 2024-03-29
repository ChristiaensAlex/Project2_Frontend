const postContactAPI = function (payload, mentorId) {
	console.log('post contact' + mentorId);
	let body = JSON.stringify(payload);
	console.log(body);
	fetch(`https://trekjeplan.azurewebsites.net/api/mentor/${mentorId}/contact`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'application/json' },
		body: body
	})
		.then(res => res.json())
		.then(data => {
			console.log(data), console.log(data), (window.location.href = 'https://trekjeplan-front.azurewebsites.net/MentorHasClientList.html');
		})
		.catch(err => console.log(err));
};

const ListenToSubmit = function () {
	submit.addEventListener('click', function (event) {
		event.preventDefault();
		let payload = [];
		allContacts = document.querySelectorAll('.js-single-step');
		console.log(allContacts);
		for (i = 0; i < allContacts.length; i++) {
			let contact = {
				firstName: allContacts[i].querySelector('.js-firstname').value,
				phoneNumber: allContacts[i].querySelector('.js-phonenumber').value,
				profilePicture: 'profilepic'
			};

			payload.push(contact);
		}
		console.log(payload);
		postContactAPI(payload, sessionStorage.mentorId);
	});
};

const GetDomElements = function () {
	submit = document.querySelector('.js-submitButton');
	console.log(submit);
	phonenumber = document.querySelector('.js-phonenumber');
	firstname = document.querySelector('.js-firstname');
	sessionStorage.mentorId = localStorage.getItem('mentorId');
	console.log(sessionStorage.mentorId);

	ListenToSubmit();
};

const init = function () {
	console.log('dom loaded');
	// queryselectors ophalen
	GetDomElements();
};
document.addEventListener('DOMContentLoaded', init);
