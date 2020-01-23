let emailResetInput, submitReset;
const isValidEmailAddress = function(emailAddress) {
	// Basis manier om e-mailadres te checken.
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};
const isEmpty = function(fieldValue) {
	return !fieldValue || !fieldValue.length;
};
const addErrors = function(field) {
	if (field == 'email') {
		emailField.classList.add('s-has-error');
		emailError.classList.remove('u-hide');
		iconError.classList.remove('u-hide');
		iconCorrect.classList.add('u-hide');
		emailField.classList.remove('s-correct');
	}
};

const removeErrors = function(field) {
	if (field == 'email') {
		emailField.classList.remove('s-has-error');
		emailField.classList.add('s-correct');
		iconError.classList.add('u-hide');
		iconCorrect.classList.remove('u-hide');
	}
};

const postRegisterMentorAPI = function(payload) {
	console.log('post');
	let body = JSON.stringify(payload);
	console.log(body);
	fetch('https://localhost:44374/api/AuthMentor/Register', {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'application/json' },
		body: body
	})
		.then(res => res.json())
		.then(data => {
			console.log(data), (sessionStorage.mentorId = data.id), console.log(sessionStorage.mentorId), (window.location.href = 'RegistrationMentor2.html');
		})
		.catch(err => console.log(err));
};

const GetResetPassword = function(email) {
	console.log('Reset password: ' + email);
	const baseURL = 'https://localhost:44374/api/';
	const url = `${baseURL}AuthMentor/ForgotPassword/${email}`;
	fetch(url)
		.then(res => {
			if (res.status == 204) {
				console.log('If');
				window.location.href = 'ForgotPassword2.html';
				return res.status;
			} else {
				console.log(res.status);
				addErrors('email');

				//throw Error(`Problem to fetch(). Status code: ${response.status}`);
				return res.json();
			}
		})
		.then(data => {
			(emailErrorMessage.innerHTML = `${data}`), console.log(data);
		});
};
// then(function(response)) .){
// 	console.log(response.json());
// 	if (response.status == 204) {
// 		console.log('If');
// 		return response.status;
// 	} else {

// 		console.log(response.body);
// 		throw Error(`Problem to fetch(). Status code: ${response.status}`);
// 	}
// });
// DOORLINKEN NAAR RESETPASSWORD

const initForgotPassword = function() {
	console.log('Init');
	emailResetInput = document.querySelector('.js-email-resetInput');
	submitReset = document.querySelector('.js-submit-reset');
	emailField = document.querySelector('.js-email-field');
	emailLabel = document.querySelector('.js-email-label');

	emailErrorMessage = document.querySelector('.js-mail-errormessage');
	emailError = document.querySelector('.js-email-error');
	iconCorrect = document.querySelector('.js-icon');
	iconError = document.querySelector('.js-icon-error');
	if (submitReset) {
		console.log('If 1');
		submitReset.addEventListener('click', function() {
			if (!isEmpty(emailResetInput.value) && isValidEmailAddress(emailResetInput.value)) {
				console.log('If2');
				removeErrors('email');
				GetResetPassword(emailResetInput.value);
			} else if (isEmpty(emailResetInput.value)) {
				emailErrorMessage.innerHTML = 'Dit veld is verplicht.';
				addErrors('email');
			} else {
				emailErrorMessage.innerHTML = 'Dit geen geldig emailadres.';
				addErrors('email');
			}
			// ELSE: Dit veld is verplicht
		});
		emailResetInput.addEventListener('blur', function(){
			if (!isEmpty(emailResetInput.value) && isValidEmailAddress(emailResetInput.value)) {
				console.log('If2');
				removeErrors('email');
				emailErrorMessage.innerHTML ="Dit is een geldig emailadres."
				//GetResetPassword(emailResetInput.value);
			} else if (isEmpty(emailResetInput.value)) {
				emailErrorMessage.innerHTML = 'Dit veld is verplicht.';
				addErrors('email');
			} else {
				emailErrorMessage.innerHTML = 'Dit geen geldig emailadres.';
				addErrors('email');
			}
		} )
	}
};

document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded - register mentor');
	initForgotPassword();
});
