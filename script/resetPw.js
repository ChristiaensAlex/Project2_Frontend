let emailResetInput, submitReset;
const isValidEmailAddress = function (emailAddress) {
	// Basis manier om e-mailadres te checken.
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};
const isEmpty = function (fieldValue) {
	return !fieldValue || !fieldValue.length;
};
const addErrors = function (field) {
	if (field == 'email') {
		emailField.classList.add('s-has-error');
		emailError.classList.remove('u-hide');
		iconError.classList.remove('u-hide');
		iconCorrect.classList.add('u-hide');
		emailField.classList.remove('s-correct');
	}
};

const removeErrors = function (field) {
	if (field == 'email') {
		emailField.classList.remove('s-has-error');
		emailField.classList.add('s-correct');
		iconError.classList.add('u-hide');
		iconCorrect.classList.remove('u-hide');
	}
};

const GetResetPassword = function (email) {
	console.log('Reset password: ' + email);
	const baseURL = 'https://trekjeplan.azurewebsites.net/api/';
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
const initForgotPassword = function () {
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
		submitReset.addEventListener('click', function (event) {
			event.preventDefault();
			if (!isEmpty(emailResetInput.value) && isValidEmailAddress(emailResetInput.value)) {
				console.log('If2');
				removeErrors('email');
				GetResetPassword(emailResetInput.value);
			} else if (isEmpty(emailResetInput.value)) {
				emailErrorMessage.innerHTML = 'Dit veld is verplicht.';
				addErrors('email');
			} else {
				emailErrorMessage.innerHTML = 'Dit is geen geldig emailadres.';
				addErrors('email');
			}
			// ELSE: Dit veld is verplicht
		});
		emailResetInput.addEventListener('blur', function () {
			if (!isEmpty(emailResetInput.value) && isValidEmailAddress(emailResetInput.value)) {
				console.log('If2');
				removeErrors('email');
				emailErrorMessage.innerHTML = 'Dit is een geldig emailadres.';
				//GetResetPassword(emailResetInput.value);
			} else if (isEmpty(emailResetInput.value)) {
				emailErrorMessage.innerHTML = 'Dit veld is verplicht.';
				addErrors('email');
			} else {
				emailErrorMessage.innerHTML = 'Dit is geen geldig emailadres.';
				addErrors('email');
			}
		});
	}
};

document.addEventListener('DOMContentLoaded', function () {
	console.log('DOM loaded - register mentor');
	initForgotPassword();
});
