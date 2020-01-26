let form, mailErrorMessage, mailField, mailInput, mailLabel, mailError, iconCorrect, iconError, passwordInput, passwordError, passwordField, iconPasswordCorrect, iconPasswordError, pw, passwordRepeatInput, passwordRepeatError, passwordRepeatField, iconPasswordRepeatCorrect, iconPasswordRepeatError, pwInput, pwError, pwErrormessage, iconPwCorrect, iconPwError, firstNameInput, lastNameInput;

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
	if (field == 'pw') {
		pwField.classList.add('s-has-error');
		pwField.classList.remove('s-correct');
		pwError.classList.remove('u-hide');
		iconPwError.classList.remove('u-hide');
		iconPwCorrect.classList.add('u-hide');
	}
	if (field == 'username') {
		usernameField.classList.add('s-has-error');
		usernameField.classList.remove('s-correct');
		usernameError.classList.remove('u-hide');
		iconUsernameError.classList.remove('u-hide');
		iconUsernameCorrect.classList.add('u-hide');
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
	if (field == 'pw') {
		pwField.classList.remove('s-has-error');
		pwField.classList.add('s-correct');
		iconPwError.classList.add('u-hide');
		iconPwCorrect.classList.remove('u-hide');
	}
	if (field == 'username') {
		usernameField.classList.remove('s-has-error');
		usernameField.classList.add('s-correct');
		iconUsernameError.classList.add('u-hide');
		iconUsernameCorrect.classList.remove('u-hide');
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
		passwordInput.removeEventListener('input', doubleCheckPassword);
		removeErrors('password');
		passwordErrormessage.innerText = 'Wachtwoord is voldoende lang.';
		pw = passwordInput.value;
		console.log(pw);
		doubleCheckPasswordRepeat();
	} else {
		// Stuk herhalende code.
		addErrors('password');
		if (isEmpty(passwordInput.value)) {
			passwordErrormessage.innerText = 'Dit veld is verplicht.';
		} else {
			passwordErrormessage.innerText = 'Het wachtwoord moet minstens 8 tekens lang zijn.';
		}
	}
};

const doubleCheckPasswordRepeat = function() {
	if (isSamePassword(passwordInput.value, passwordRepeatInput.value)) {
		passwordRepeatInput.removeEventListener('input', doubleCheckPasswordRepeat);
		removeErrors('passwordRepeat');
		removeErrors('password');
		passwordRepeatErrormessage.innerText = 'Wachtwoorden komen overeen.';
		passwordErrormessage.innerText = 'Wachtwoorden komen overeen.';
	} else {
		addErrors('passwordRepeat');
		if (isEmpty(passwordRepeatInput.value)) {
			passwordRepeatErrormessage.innerText = 'Dit veld is verplicht.';
		} else {
			passwordRepeatErrormessage.innerText = 'De wachtwoorden komen niet overeen.';
		}
	}
};

const doubleCheckPw = function() {
	console.log('double');
	if (!isEmpty(pwInput.value)) {
		pwInput.removeEventListener('input', doubleCheckPw);
		removeErrors('pw');
		pwErrormessage.innerText = 'Dit veld is verplicht.';
	} else {
		addErrors('pw');
		pwErrormessage.innerText = 'Dit veld is verplicht.';
		console.log('double check empty');
	}
};
const doubleCheckUsername = function() {
	console.log('double');
	if (!isEmpty(username.value)) {
		username.removeEventListener('input', doubleCheckUsername);
		removeErrors('username');
		usernameErrorMessage.innerText = 'Dit veld is verplicht.';
	} else {
		addErrors('username');
		usernameErrorMessage.innerText = 'Dit veld is verplicht.';
		console.log('double check empty');
	}
};

const ListenToMail = function(mailInput) {
	mailInput.addEventListener('focus', function() {
		console.log('we zijn gefocused');
		if (!isValidEmailAddress(mailInput.value)) {
			if (!isEmpty(mailInput.value)) {
				mailErrorMessage.innerText = 'Ongeldig e-mailadres.';
				console.log('email invalid');
				addErrors('email');
				console.log('voeg errors mail toe');
				mailInput.addEventListener('input', doubleCheckEmailAddress);
			}
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
};

const ListenToPassword = function(passwordInput) {
	console.log(passwordInput);
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
		} else {
			if (!isSamePassword(passwordInput.value, passwordRepeatInput.value)) {
				passwordErrormessage.innerText = 'De wachtwoorden komen niet overeen.';
				addErrors('password');
				passwordInput.addEventListener('input', doubleCheckPassword);
			}
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
		} else {
			if (!isSamePassword(passwordInput.value, passwordRepeatInput.value)) {
				passwordErrormessage.innerText = 'De wachtwoorden komen niet overeen.';
				addErrors('password');
				passwordInput.addEventListener('input', doubleCheckPassword);
			}
		}
	});
};

const ListenToPasswordRepeat = function(passwordRepeatInput) {
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
				console.log(passwordInput.value, passwordRepeatInput.value);
				passwordRepeatErrormessage.innerText = 'De wachtwoorden komen niet overeen.';
			}
			addErrors('passwordRepeat');
			passwordRepeatInput.addEventListener('input', doubleCheckPasswordRepeat);
		}
	});
};

const ListenToSinglePw = function() {
	pwInput.addEventListener('blur', function() {
		if (isEmpty(pwInput.value)) {
			pwErrormessage.innerText = 'Dit veld is verplicht.';
			addErrors('pw');
			pwInput.addEventListener('input', doubleCheckPw);
		}
	});

};

const ListenToButton = function(button) {
	button.addEventListener('click', function(event) {
		// We gaan de form zelf versturen wanneer nodig.
		event.preventDefault();
		if (button == submitButton) {
			if (isValidEmailAddress(mailInput.value) && isValidPassword(passwordInput.value) && isSamePassword(passwordInput.value, passwordRepeatInput.value)) {
				console.log('Form is good to go!');

				let payload = {
					firstName: firstNameInput.value,
					lastName: lastNameInput.value,
					email: mailInput.value,
					password: passwordInput.value,
					confirmPassword: passwordRepeatInput.value
				};
				postRegisterMentorAPI(payload);
			} else {
				if (!isValidEmailAddress(mailInput.value)) {
					addErrors('email');
					mailInput.addEventListener('input', doubleCheckEmailAddress);
				}
				if (!isValidPassword(passwordInput.value)) {
					addErrors('password');
					passwordInput.addEventListener('input', doubleCheckPassword);
				}
				if (!isSamePassword(passwordInput.value, passwordRepeatInput.value)) {
					addErrors('passwordRepeat');

					passwordRepeatInput.addEventListener('input', doubleCheckPasswordRepeat);
				}
			}
		} else if (button == startButton) {
			if (isValidEmailAddress(mailInput.value) && !isEmpty(pwInput.value)) {
				let payload = {
					email: mailInput.value,
					password: passwordInput.value
				};
				postLoginMentorAPI(payload);
				window.location.href = 'MentorHasClientList.html';
			} else {
				if (!isValidEmailAddress(mailInput.value)) {
					addErrors('email');
					mailInput.addEventListener('input', doubleCheckEmailAddress);
				}
				if (isEmpty(pwInput.value)) {
					addErrors('pw');
					pwInput.addEventListener('input', doubleCheckPw);
				}
			}
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

	firstNameInput = document.querySelector('.js-firstname');
	lastNameInput = document.querySelector('.js-lastname');
	//single password

	pwField = document.querySelector('.js-pw-field');

	// button
	submitButton = document.querySelector('.js-submitbutton');
	startButton = document.querySelector('.js-startbutton');
	callListeners();
};

const callListeners = function() {
	if (mailField != null) {
		ListenToMail(mailInput);
	}
	if (passwordField != null) {
		ListenToPassword(passwordInput);
	}
	if (passwordRepeatField != null) {
		ListenToPasswordRepeat(passwordRepeatInput);
	}
	if (pwField != null) {
		console.log('pw-field');
		pwInput = document.querySelector('.js-password');
		pwErrormessage = document.querySelector('.js-password-errormessage');
		pwError = document.querySelector('.js-password-error');
		iconPwError = document.querySelector('.js-icon-password-error');
		iconPwCorrect = document.querySelector('.js-icon-password');
		ListenToSinglePw();
	}
	// ListenToFocus();
	if (submitButton != null) {
		ListenToButton(submitButton);
	} else if (startButton != null) {
		console.log('startbutton');
		ListenToButton(startButton);
	}
};

const init = function() {
	console.log('dom loaded');
	// queryselectors ophalen
	GetDomElements();
};
document.addEventListener('DOMContentLoaded', init);
