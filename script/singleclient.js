let profiel;

const showClient = function(json) {
	document.querySelector('.c-clientname').innerHTML = `${json.firstName} ${json.lastName}`;
};

const getAPI = function(url) {
	fetch(url)
		.then(function(response) {
			if (!response.ok) {
				throw Error(`Problem to fetch(). Status code: ${response.status}`);
			} else {
				return response.json();
			}
		})
		.then(function(jsonObject) {
			sessionStorage.Client = jsonObject;
			showClient(jsonObject);
			console.log(jsonObject);
		})
		.catch(function(error) {
			console.error(`Problem to process json ${error} `);
		});
};

document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded');
	profiel = document.querySelector('.c-profile');
	getAPI(`https://localhost:44374/api/client/${sessionStorage.clientId}`);
});
