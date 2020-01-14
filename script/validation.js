let form, mailErrorMessage, mailField, mailInput, mailLabel, mailError, iconCorrect, iconError, passwordInput, passwordError, passwordField, iconPasswordCorrect, iconPasswordError, pw, passwordRepeatInput, passwordRepeatError, passwordRepeatField, iconPasswordRepeatCorrect, iconPasswordRepeatError;

const isValidEmailAddress = function(emailAddress) {
	// Basis manier om e-mailadres te checken.
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};

const isValidPassword = function(password) {
	return password.length >= 8;
};
const isEmpty = function(fieldValue) {
	return !fieldValue || !fieldValue.length;
};

const isSamePassword = function(pw, repeatpw) {
	console.log(pw, repeatpw);
	result = pw == repeatpw;
	console.log('pw gelijk: ' + result);
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
	if (field == 'password') {
		passwordField.classList.add('s-has-error');
		passwordField.classList.remove('s-correct');
		passwordError.classList.remove('u-hide');
		iconPasswordError.classList.remove('u-hide');
		iconPasswordCorrect.classList.add('u-hide');
	}
	if (field == 'passwordRepeat') {
		passwordRepeatField.classList.add('s-has-error');
		passwordRepeatField.classList.remove('s-correct');
		passwordRepeatError.classList.remove('u-hide');
		iconPasswordRepeatError.classList.remove('u-hide');
		iconPasswordRepeatCorrect.classList.add('u-hide');
	}
};

const removeErrors = function(field) {
	if (field == 'email') {
		mailField.classList.remove('s-has-error');
		mailField.classList.add('s-correct');
		iconError.classList.add('u-hide');
		iconCorrect.classList.remove('u-hide');
	}
	if (field == 'password') {
		passwordField.classList.remove('s-has-error');
		passwordField.classList.add('s-correct');
		iconPasswordError.classList.add('u-hide');
		iconPasswordCorrect.classList.remove('u-hide');
	}
	if (field == 'passwordRepeat') {
		passwordRepeatField.classList.remove('s-has-error');
		passwordRepeatField.classList.add('s-correct');
		iconPasswordRepeatError.classList.add('u-hide');
		iconPasswordRepeatCorrect.classList.remove('u-hide');
	}
};

/* -------------------------------------------------------------------------- */
const doubleCheckEmailAddress = function() {
	if (isValidEmailAddress(mailInput.value)) {
		// Stop met dit veld in de gaten te houden; het is in orde.
		// mailInput.removeEventListener('input', doubleCheckEmailAddress);
		removeErrors('email');
		mailErrorMessage.innerText = 'Geldig e-mailadres.';
	} else {
		// Stuk herhalende code.
		if (isEmpty(mailInput.value)) {
			addErrors('email');
			mailErrorMessage.innerText = 'Dit veld is verplicht.';
		} else {
			mailErrorMessage.innerText = 'Ongeldig e-mailadres.';
		}
	}
};

const doubleCheckPassword = function() {
	if (isValidPassword(passwordInput.value)) {
		// passwordInput.removeEventListener('input', doubleCheckPassword);
		removeErrors('password');
		passwordErrormessage.innerText = 'Wachtwoord is voldoende lang.';
		pw = passwordInput.value;
		console.log(pw);
	} else {
		// Stuk herhalende code.
		addErrors('password');
		if (isEmpty(passwordInput.value)) {
			passwordErrormessage.innerText = 'Dit veld is verplicht.';
		} else {
			passwordErrormessage.innerText = 'Het wachtwoord moet minstens 8 tekens lang zijn.';
		}

		// if (isSamePassword(passwordInput.value, passwordRepeatInput.value)) {
		// 	passwordInput.removeEventListener('input', doubleCheckEmailAddress);
		// 	removeErrors('password');
		// 	passwordErrormessage.innerText = '';
		// } else {
		// 	if (isEmpty(passwordInput.vallue)) {
		// 		passwordErrormessage.innerText = 'Dit veld is verplicht.';
		// 	} else {
		// 		passwordErrormessage.innerText = 'De wachtwoorden komen niet overeen.';
		// 	}
	}
};

const doubleCheckPasswordRepeat = function() {
	if (isSamePassword(passwordInput.value, passwordRepeatInput.value)) {
		removeErrors('passwordRepeat');
		passwordRepeatErrormessage.innerText = 'Wachtwoorden komen overeen.';
	} else {
		addErrors('passwordRepeat');
		if (isEmpty(passwordRepeatInput.value)) {
			passwordRepeatErrormessage.innerText = 'Dit veld is verplicht.';
		} else {
			passwordRepeatErrormessage.innerText = 'De wachtwoorden komen niet overeen.';
		}
	}
};

const ListenToFocus = function() {
	mailInput.addEventListener('focus', function() {
		console.log('we zijn gefocused');
		if (!isValidEmailAddress(mailInput.value)) {
			if (isEmpty(mailInput.value)) {
				mailErrorMessage.innerText = 'Dit veld is verplicht.';
				console.log('email verplicht');
			} else {
				console.log(mailInput.value);
				mailErrorMessage.innerText = 'Ongeldig e-mailadres.';
				console.log('email invalid');
			}
			addErrors('email');
			console.log('voeg errors mail toe');
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
	passwordInput.addEventListener('focus', function() {
		if (!isValidPassword(passwordInput.value)) {
			console.log('password niet lang genoeg');
			if (!isEmpty(passwordInput.value)) {
				passwordErrormessage.innerText = 'Het wachtwoord moet minstens 8 tekens lang zijn.';
				addErrors('password');
				console.log("als 't niet leeg is en niet valid is 't tekort é ja");
				passwordInput.addEventListener('input', doubleCheckPassword);
			}
			console.log('niets te doen');
		}
	});
	passwordInput.addEventListener('blur', function() {
		if (!isValidPassword(passwordInput.value)) {
			if (isEmpty(passwordInput.value)) {
				passwordErrormessage.innerText = 'Dit veld is verplicht.';
			} else {
				console.log(passwordInput.value);
				passwordErrormessage.innerText = 'Het wachtwoord moet minstens 8 tekens lang zijn.';
			}
			addErrors('password');
			passwordInput.addEventListener('input', doubleCheckPassword);
		}
	});
	passwordRepeatInput.addEventListener('focus', function() {
		if (!isSamePassword(passwordInput.value, passwordRepeatInput.value)) {
			if (!isEmpty(passwordRepeatInput.value)) {
				passwordRepeatErrormessage.innerText = 'De wachtwoorden komen niet overeen.';
			} else {
				passwordRepeatErrormessage.innerText = 'Dit veld is verplicht.';
			}
			addErrors('passwordRepeat');
			passwordRepeatInput.addEventListener('input', doubleCheckPasswordRepeat); //else {
			// 	console.log(pw, passwordRepeatInput.value);

			// }
		}
	});
	passwordRepeatInput.addEventListener('blur', function() {
		if (!isSamePassword(passwordInput.value, passwordRepeatInput.value)) {
			if (isEmpty(passwordRepeatInput.value)) {
				passwordRepeatErrormessage.innerText = 'Dit veld is verplicht.';
			} else {
				console.log(pw, passwordRepeatInput.value);
				passwordRepeatErrormessage.innerText = 'De wachtwoorden komen niet overeen.';
			}
			addErrors('passwordRepeat');
			passwordRepeatInput.addEventListener('input', doubleCheckPasswordRepeat);
		}
	});
};

const ListenToButton = function(button) {
	button.addEventListener('click', function(event) {
		// We gaan de form zelf versturen wanneer nodig.
		event.preventDefault();

		if (isValidEmailAddress(mailInput.value) && isValidPassword(passwordInput.value) && isSamePassword(passwordInput.value, passwordRepeatInput.value)) {
			console.log('Form is good to go!');
			form.submit();
		} else {
			// Stuk herhalende code...

			addErrors('email');
			addErrors('password');
			addErrors('passwordRepeat');
			mailInput.addEventListener('input', doubleCheckEmailAddress);
			passwordInput.addEventListener('input', doubleCheckPassword);
			passwordRepeatInput.addEventListener('input', doubleCheckPasswordRepeat);
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
	passwordField = document.querySelector('.js-password-field');
	passwordErrormessage = document.querySelector('.js-password-errormessage');

	passwordError = document.querySelector('.js-password-error');
	iconPasswordError = document.querySelector('.js-icon-password-error');
	iconPasswordCorrect = document.querySelector('.js-icon-password');

	passwordRepeatInput = document.querySelector('.js-password-repeat');
	passwordRepeatField = document.querySelector('.js-password-repeat-field');
	passwordRepeatErrormessage = document.querySelector('.js-password-repeat-errormessage');
	passwordRepeatError = document.querySelector('.js-password-repeat-error');
	iconPasswordRepeatError = document.querySelector('.js-icon-password-repeat-error');
	iconPasswordRepeatCorrect = document.querySelector('.js-icon-password-repeat');
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
