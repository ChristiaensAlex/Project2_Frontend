let emailResetInput, submitReset; 

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

const GetResetPassword = function(email){
	console.log("Reset password: " + email); 
	const baseURL = "https://localhost:44374/api/";
	const url = `${baseURL}AuthMentor/ForgotPassword/${email}`; 
	fetch(url)
		.then(function(response) {
			if (response.status == 204) {
				console.log("If"); 
				return response.status;
			} else {
				throw Error(`Problem to fetch(). Status code: ${response.status}`);
			}
		})
	// DOORLINKEN NAAR RESETPASSWORD
};

const initForgotPassword = function(){
	console.log("Init");
	emailResetInput = document.querySelector('.js-email-resetInput'); 
	submitReset = document.querySelector('.js-submit-reset'); 
	if (submitReset){
		console.log("If 1");
		submitReset.addEventListener('click', function(){
			if(emailResetInput.value){
				console.log("If2"); 
				GetResetPassword(emailResetInput.value);
			}
			// ELSE: Dit veld is verplicht
		})
	}
}

document.addEventListener('DOMContentLoaded', function(){
	console.log('DOM loaded - register mentor'); 
	initForgotPassword(); 
})