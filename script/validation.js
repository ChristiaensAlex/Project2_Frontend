let form, mailErrorMessage, mailField, mailInput, mailLabel, mailError, iconCorrect, iconError;

const isValidEmailAddress = function(emailAddress) {
	// Basis manier om e-mailadres te checken.
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};
const isEmpty = function(fieldValue) {
	return !fieldValue || !fieldValue.length;
};
const addErrors = function() {
	mailField.classList.add('s-has-error');
	mailError.classList.remove('u-hide');
	iconError.classList.remove('u-hide');
	iconCorrect.classList.add('u-hide');
	mailField.classList.remove('s-correct');
};

const removeErrors = function() {
	mailField.classList.remove('s-has-error');
	mailField.classList.add('s-correct');
	iconError.classList.add('u-hide');
	iconCorrect.classList.remove('u-hide');
};

/* -------------------------------------------------------------------------- */
const doubleCheckEmailAddress = function() {
	if (isValidEmailAddress(mailInput.value)) {
		// Stop met dit veld in de gaten te houden; het is in orde.
		mailInput.removeEventListener('input', doubleCheckEmailAddress);
		removeErrors();
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
			addErrors();
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
			addErrors();

			// Gebruik een named function (doubleChecEmailAdress), om die er weer af te kunnen halen. Dit vermijd ook het dubbel toevoegen ervan.
			mailInput.addEventListener('input', doubleCheckEmailAddress);
		}
	});
};

const ListenToButton = function(button) {
	button.addEventListener('click', function(event) {
		// We gaan de form zelf versturen wanneer nodig.
		event.preventDefault();

		if (isValidEmailAddress(mailInput.value)) {
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
	form = document.querySelector('.js-form');
	mailField = document.querySelector('.js-email-field');
	mailLabel = document.querySelector('.js-email-label');
	mailInput = document.querySelector('.js-email');
	mailErrorMessage = document.querySelector('.js-mail-errormessage');
	mailError = document.querySelector('.js-error');
	submitButton = document.querySelector('.js-submitbutton');
	iconCorrect = document.querySelector('.js-icon');
	iconError = document.querySelector('.js-icon-error');
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
