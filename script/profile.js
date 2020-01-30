let baseURL = 'https://trekjeplan.azurewebsites.net/api/',
	firstName,
	lastName,
	email,
	submitButton,
	editButton;

const showProfileInfo = function(jsonObject) {
	sessionStorage.mentorId = jsonObject.id;
	//console.log(submitButton);
	if (editButton) {
		console.log('invullen values');
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
			console.log(res.status)((window.location.href = 'https://trekjeplan-front.azurewebsites.net/EditProfileMentor2.html'));
		})
		// .then(data => {
		// 	console.log(data); // ;
		// })
		.catch(err => console.log(err));
};
// const ListenToSubmitButton = function(button) {
// 	button.addEventListener('click', function(e) {
// 		e.preventDefault();
// 		if (!isEmpty(email.value) && isValidEmailAddress(email.value)) {
// 			let payload = {
// 				id: sessionStorage.mentorId,
// 				firstName: firstName.value,
// 				lastName: lastName.value,
// 				email: email.value
// 			};
// 			console.log(payload);
// 			EditMentorProfile(payload, mentorId);
// 		}
// 		else if(isEmpty(email.value)){
// 			addErrors
// 		}
// 	});
// };
const getProfileElements = function() {
	// submitButton = document.querySelector('.js-submitbutton');
	// console.log(submitButton);
	//console.log(editButton);
	if (editButton) {
		firstName = document.querySelector('.js-firstname');
		lastName = document.querySelector('.js-lastname');
		email = document.querySelector('.js-email');
		//	ListenToSubmitButton(submitButton);
	} else {
		firstName = document.querySelector('.js-profile-firstName');
		lastName = document.querySelector('.js-profile-lastName');
		email = document.querySelector('.js-profile-email');
	}
};

const logOut = function() {
	logOutButton = document.querySelector('.js-logout');

	logOutButton.addEventListener('click', function(e) {
		//localStorage.clear();
		window.location.href = 'https://trekjeplan-front.azurewebsites.net/index.html';
	});
};

document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded - profile');
	sessionStorage.mentorId = localStorage.getItem('mentorId');
	mentorId = sessionStorage.mentorId;
	console.log(mentorId);
	getProfileElements();
	getMentorProfile(mentorId);
	if (document.title == 'Trek Je Plan - Begeleidersprofiel') {
		logOut();
	}
});
