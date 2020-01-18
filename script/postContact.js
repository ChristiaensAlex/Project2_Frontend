const postContactAPI = function(payload, mentorId) {
	console.log('post' + mentorId);
	let body = JSON.stringify(payload);
	console.log(body);
	fetch(`https://localhost:44374/api/mentor/${mentorId}/contact`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'application/json' },
		body: body
	})
		.then(res => res.json())
		.then(data => {
			console.log(data), console.log(data);
		})
		.catch(err => console.log(err));
};

const ListenToSubmit = function() {
	submitButton.addEventListener('click', function(event) {
		event.preventDefault();
		let payload = [
			{
				firstName: firstname.value,
				phoneNumber: phonenumber.value,
				profilePicture: 'stringpicture'
			}
		];
		mentorId = sessionStorage.mentorId;
		postContactAPI(payload, mentorId);
	});
};

const GetDomElements = function() {
	submitButton = document.querySelector('.js-submitButton');
	phonenumber = document.querySelector('.js-phonenumber');
	firstname = document.querySelector('.js-firstname');

	console.log(sessionStorage.mentorId);

	ListenToSubmit();
};

const init = function() {
	console.log('dom loaded');
	// queryselectors ophalen
	GetDomElements();
};
document.addEventListener('DOMContentLoaded', init);
