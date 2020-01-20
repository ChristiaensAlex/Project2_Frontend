let baseURL = 'https://localhost:44374/api/',
	firstName,
	lastName,
	email;
const showProfileInfo = function(jsonObject) {
	firstName.innerHTML = jsonObject.firstName;
	lastName.innerHTML = jsonObject.lastName;
	email.innerHTML = jsonObject.email;
};
const getMentorProfile = function(id) {
	let url = `${baseURL}mentor/${id}`;
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
			console.error(`Problem to process json $`);
		});
};

const getProfileElements = function() {
	firstName = document.querySelector('.js-profile-firstName');
	lastName = document.querySelector('.js-profile-lastName');
	email = document.querySelector('.js-profile-email');
};

document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded - profile');
	let id = 'EF4C3F22-6AC3-4143-B9CD-21A23F9EA1FE';
	getProfileElements();
	getMentorProfile(id);
});
