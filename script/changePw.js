// {
//     "email": "chloe.devriese@student.howest.be",
//     "oldPassword": "old password",
//     "password": "new password",
//     "passwordComfirmation": "new password"
//   }

let password, newPw, confirmPw, email;

const postResetPW = function (url, payload) {
	console.log('change pw');
	let body = JSON.stringify(payload);
	console.log(body);
	fetch(url, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'application/json' },
		body: body
	})
		.then(res => {
			console.log(res), (status = res.status);
			if (status == 204) {
				window.location.href = 'EditProfileMentor1.html';
			} else {
				return res.json();
			}
		})

		.then(data => {
			console.log(data);
			addErrors('pw'), (pwErrormessage.innerText = data);

			//
		})
		.catch(err => console.log(err));
};

const ListenToSubmitButton = function (button) {
	button.addEventListener('click', function (event) {
		event.preventDefault();
		let payload = {
			email: 'alexandra.christiaens@student.howest.be',
			oldPassword: pwInput.value,
			password: passwordInput.value,
			passwordComfirmation: passwordRepeatInput.value
		};
		postResetPW(`https://trekjeplan.azurewebsites.net/api/AuthMentor/ResetPassword`, payload);
	});
};
document.addEventListener('DOMContentLoaded', function () {
	console.log('DOM loaded - register mentor');
	//password = document.querySelector('.js-oldPassword');
	// newPw = document.querySelector('.js-newPassword');
	// confirmPw = document.querySelector('.js-passwordConfirm');
	submit = document.querySelector('.js-changePwButton');
	ListenToSubmitButton(submit);
});
