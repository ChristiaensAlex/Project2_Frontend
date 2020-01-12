let form, mailErrorMessage, mailField, mailInput, mailLabel, mailError, iconCorrect, iconError, passwordInput, passwordRepeatInput, passwordError, passwordField, iconPasswordCorrect, iconPasswordError;

const isValidEmailAddress = function(emailAddress) {
	// Basis manier om e-mailadres te checken.
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};
const isEmpty = function(fieldValue) {
	return !fieldValue || !fieldValue.length;
};

const isSamePassword = function(pw, repeatpw) {
	result = pw == repeatpw;
	console.log(result);
	return result;
};
const addErrors = function(field) {
	if (field == 'email') {
		mailField.classList.add('s-has-error');
		mailError.classList.remove('u-hide');
		iconError.classList.remove('u-hide');
		iconCorrect.classList.add('u-hide');
		mailField.classList.remove('s-correct');
	}
	if ((field = 'password')) {
		passwordField.classList.add('s-has-error');
		passwordField.classList.remove('s-correct');
		passwordError.classList.remove('u-hide');
		iconPasswordError.classList.remove('u-hide');
		iconPasswordCorrect.classList.add('u-hide');
	}
};

const removeErrors = function(field) {
	if (field == 'email') {
		mailField.classList.remove('s-has-error');
		mailField.classList.add('s-correct');
		iconError.classList.add('u-hide');
		iconCorrect.classList.remove('u-hide');
	}
	if ((field = 'password')) {
		passwordField.classList.remove('s-has-error');
		passwordField.classList.add('s-correct');
		iconPasswordError.classList.add('u-hide');
		iconPasswordCorrect.classList.remove('u-hide');
	}
};

/* -------------------------------------------------------------------------- */
const doubleCheckEmailAddress = function() {
	if (isValidEmailAddress(mailInput.value)) {
		// Stop met dit veld in de gaten te houden; het is in orde.
		mailInput.removeEventListener('input', doubleCheckEmailAddress);
		removeErrors('email');
		mailErrorMessage.innerText = 'Geldig e-mailadres.';
	} else {
		// Stuk herhalende code.
		if (mailInput.value == '') {
			mailErrorMessage.innerText = 'Dit veld is verplicht.';
		} else {
			mailErrorMessage.innerText = 'Ongeldig e-mailadres.';
		}
	}
};

const doubleCheckPassword = function() {
	if (isSamePassword(passwordInput.value, passwordRepeatInput.value)) {
		passwordInput.removeEventListener('input', doubleCheckEmailAddress);
		removeErrors('password');
		passwordErrormessage.innerText = '';
	} else {
		if (isEmpty(passwordInput.vallue)) {
			passwordErrormessage.innerText = 'Dit veld is verplicht.';
		} else {
			passwordErrormessage.innerText = 'De wachtwoorden komen niet overeen.';
		}
	}
};

const ListenToFocus = function() {
	mailInput.addEventListener('focus', function() {
		console.log('we zijn gefocused');
		if (!isValidEmailAddress(mailInput.value)) {
			if (isEmpty(mailInput.value)) {
				mailErrorMessage.innerText = 'Dit veld is verplicht.';
			} else {
				console.log(mailInput.value);
				mailErrorMessage.innerText = 'Ongeldig e-mailadres.';
			}
			addErrors('email');
			mailInput.addEventListener('input', doubleCheckEmailAddress);
		}
	});
	mailInput.addEventListener('blur', function() {
		console.log('we zijn ontfocused');
		if (!isValidEmailAddress(mailInput.value)) {
			if (isEmpty(mailInput.value)) {
				mailErrorMessage.innerText = 'Dit veld is verplicht.';
			} else {
				console.log(mailInput.value);
				mailErrorMessage.innerText = 'Ongeldig e-mailadres.';
			}
			addErrors('email');

			// Gebruik een named function (doubleChecEmailAdress), om die er weer af te kunnen halen. Dit vermijd ook het dubbel toevoegen ervan.
			mailInput.addEventListener('input', doubleCheckEmailAddress);
		}
	});
	passwordInput.addEventListener('blur', function() {
		if (isEmpty(passwordInput.value)) {
			passwordErrormessage.innerText = 'Dit veld is verplicht.';
		} else {
			if (!isSamePassword(passwordInput.value, passwordRepeatInput.value)) {
				passwordErrormessage.innerText = 'De wachtwoorden komen niet overeen.';
			}
			// if (isEmpty(passwordRepeatInput.value)) {
			// 	passwordErrormessage.innerText = 'Dit veld is verplicht';
			// }

			// passwordInputRepeat.addEventListener('input', doubleCheckPassword);

			// Gebruik een named function (doubleCheckPassword), om die er weer af te kunnen halen. Dit vermijd ook het dubbel toevoegen ervan.
		}
		addErrors('password');
		passwordInput.addEventListener('input', doubleCheckPassword);
	});
};

const ListenToButton = function(button) {
	button.addEventListener('click', function(event) {
		// We gaan de form zelf versturen wanneer nodig.
		event.preventDefault();

		if (isValidEmailAddress(mailInput.value) && isSamePassword(passwordInput.value, passwordRepeatInput.value)) {
			console.log('Form is good to go!');
			form.submit();
		} else {
			// Stuk herhalende code...

			addErrors();
			mailInput.addEventListener('input', doubleCheckEmailAddress);
		}
	});
};

const GetDomElements = function() {
	//email
	form = document.querySelector('.js-form');
	mailField = document.querySelector('.js-email-field');
	mailLabel = document.querySelector('.js-email-label');
	mailInput = document.querySelector('.js-email');
	mailErrorMessage = document.querySelector('.js-mail-errormessage');
	mailError = document.querySelector('.js-email-error');
	iconCorrect = document.querySelector('.js-icon');
	iconError = document.querySelector('.js-icon-error');
	//password and matching password
	passwordInput = document.querySelector('.js-password');
	passwordRepeatInput = document.querySelector('.js-password-repeat');
	passwordField = document.querySelector('.js-password-field');
	passwordRepeatField = document.querySelector('.js-password-repeat-field');
	passwordErrormessage = document.querySelector('.js-password-errormessage');
	passwordRepeatErrormessage = document.querySelector('.js-password-repeat-errormessage');
	passwordError = document.querySelector('.js-password-error');
	iconPasswordError = document.querySelector('.js-icon-password-error');
	iconPasswordCorrect = document.querySelector('.js-icon-password');

	// button
	submitButton = document.querySelector('.js-submitbutton');

	console.log(mailField, mailLabel, mailInput, mailErrorMessage);

	ListenToFocus();
	ListenToButton(submitButton);
};

const init = function() {
	console.log('dom loaded');
	// queryselectors ophalen
	GetDomElements();
};
document.addEventListener('DOMContentLoaded', init);
