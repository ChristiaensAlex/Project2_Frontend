let profiel;

const showClient = function (json) {
	document.querySelector('.c-clientname').innerHTML = `${json.firstName} ${json.lastName}`;
	document.querySelector('.c-clientname').innerHTML = `${json.firstName} ${json.lastName}`;


	let clientImage = document.querySelector('.c-client__userPhoto--img');

	clientImage.classList.add("c-client__userPhoto--no-img")
	clientImage.style.backgroundImage = `url(profile-icon.svg) `;

	if(json.profilePicture && !json.profilePicture.includes('profile-icon.svg')){
		clientImage.style.backgroundImage = `url(${json.profilePicture}), url(profile-icon.svg) `;
		clientImage.classList.remove("c-client__userPhoto--no-img")
	}
};

const getAPI = function (url) {
	fetch(url)
		.then(function (response) {
			if (!response.ok) {
				throw Error(`Problem to fetch(). Status code: ${response.status}`);
			} else {
				return response.json();
			}
		})
		.then(function (jsonObject) {
			sessionStorage.Client = jsonObject;
			showClient(jsonObject);
			console.log(jsonObject);
		})
		.catch(function (error) {
			console.error(`Problem to process json ${error} `);
		});
};

document.addEventListener('DOMContentLoaded', function () {
	console.log('DOM loaded');
	profiel = document.querySelector('.c-profile');
	getAPI(`https://trekjeplan.azurewebsites.net/api/client/${sessionStorage.clientId}`);
});
