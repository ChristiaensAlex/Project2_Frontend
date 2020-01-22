let baseURL = 'https://localhost:44374/api/',
	firstName,
	lastName,
	email,
	submitButton;
const showProfileInfo = function(jsonObject) {
	sessionStorage.mentorId = jsonObject.id;
	if (submitButton) {
		firstName.value = jsonObject.firstName;
		lastName.value = jsonObject.lastName;
		email.value = jsonObject.email;
	} else {
		firstName.innerHTML = jsonObject.firstName;
		lastName.innerHTML = jsonObject.lastName;
		email.innerHTML = jsonObject.email;
	}
};
const getMentorProfile = function(mentorId) {
	let url = `${baseURL}mentor/${mentorId}`;
	fetch(url)
		.then(function(response) {
			if (!response.ok) {
				throw Error(`Problem to fetch(). Status code: ${response.status}`);
			} else {
				return response.json();
			}
		})
		.then(function(jsonObject) {
			showProfileInfo(jsonObject);
			console.log(jsonObject);
		})
		.catch(function(error) {
			console.error(`Problem to process json ${error}`);
		});
};

const EditMentorProfile = function(payload, mentorId) {
	console.log('put mentor info');
	let body = JSON.stringify(payload);
	console.log(body);
	let url = `${baseURL}mentor/${mentorId}`;
	fetch(url, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'application/json' },
		body: body
	})
		.then(res => {
			console.log(res.status)((window.location.href = 'MentorHasProfile.html'));
		})
		// .then(data => {
		// 	console.log(data); // ;
		// })
		.catch(err => console.log(err));
};
const ListenToSubmitButton = function(button) {
	button.addEventListener('click', function(e) {
		e.preventDefault();
		mentorId = sessionStorage.mentorId;
		let payload = {
			id: sessionStorage.mentorId,
			firstName: firstName.value,
			lastName: lastName.value,
			email: email.value
		};
		console.log(payload);
		EditMentorProfile(payload, mentorId);
	});
};
const getProfileElements = function() {
	submitButton = document.querySelector('.js-submitbutton');
	if (submitButton) {
		firstName = document.querySelector('.js-firstname');
		lastName = document.querySelector('.js-lastname');
		email = document.querySelector('.js-email');
		ListenToSubmitButton(submitButton);
	} else {
		firstName = document.querySelector('.js-profile-firstName');
		lastName = document.querySelector('.js-profile-lastName');
		email = document.querySelector('.js-profile-email');
	}
};

document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded - profile');
	sessionStorage.mentorId = 'EF4C3F22-6AC3-4143-B9CD-21A23F9EA1FE';
	mentorId = sessionStorage.mentorId;
	getProfileElements();
	getMentorProfile(mentorId);
});
