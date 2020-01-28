const weekdayclient = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
const monthclient = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

let baseURL = `https://trekjeplan.azurewebsites.net/api/`,
	clientId,
	countSchemeNr;

let showDateImages = function() {
	let html = `<img class="c-icon" src="daysAndMonths_pictos/${weekdayclient[new Date().getDay()]}.png" alt="${weekdayclient[new Date().getDay()]}" />
				<img class="c-icon" src="daysAndMonths_pictos/${monthclient[new Date().getMonth()]}.jpg" alt="${monthclient[new Date().getMonth()]}" />`;
	document.querySelector('.js-date').innerHTML = html;
};

const listenToClickScheme = function(json) {
	let progressiveScheme = document.querySelectorAll('.c-progressiveScheme');
	progressiveScheme.forEach(element =>
		element.addEventListener('click', function() {
			let nr = this.getAttribute('schemenr');
			console.log('Schemenr: ' + nr);
			clientSchemeId = json[nr].clientProgressiveSchemeId;
			sessionStorage.clientSchemeId = clientSchemeId;
			window.location.href = 'SingleStepClient.html';
		})
	);
};

let ShowProgressiveSchemesClient = function(json) {
	let html = '';
	for (let i = 0; i < json.length; i++) {
		if (!json[i].pictoFilleName) {
			json[i].pictoFilleName = '23e5daf5-2eb6-4693-b245-3ee7f91e04af.jpg';
		}
		let classDone;
		if (json[i].done == true) {
			classDone = 'c-progressiveScheme__done ';
		} else {
			classDone = '';
		}
		html += `<div class="c-progressiveScheme ${json[i].done} ${classDone}" schemenr=${i}>
							<div class="c-progressiveScheme__mainPicto">
							<img class="c-icon" src="https://trekjeplan.blob.core.windows.net/pictos/${json[i].pictoFilleName}" alt="hoofdpicto stappenplan ${json[i].schemeName}" />
								
							</div>
							<div class="c-progressiveScheme__name">
								${json[i].schemeName}
							</div>
						</div> `;
	}

	document.querySelector('.js-progressiveSchemes').innerHTML = html;
	listenToClickScheme(json);
};

const getProgressiveSchemesClient = function(clientId) {
	let url = `${baseURL}client/${clientId}/progressiveScheme`;
	fetch(url)
		.then(function(response) {
			if (!response.ok) {
				throw Error(`Problem to fetch(). Status code: ${response.status}`);
			} else {
				let arr = new Array();
				arr = response.json();
				console.log(arr);
				return arr;
			}
		})
		.then(function(jsonObject) {
			json = jsonObject;
			console.log(jsonObject);
			ShowProgressiveSchemesClient(jsonObject);
		})
		.catch(function(error) {
			console.log(error);
			console.error(`Problem to process json $`);
		});
};
const init = function() {
	clientId = sessionStorage.clientId;
	console.log(clientId);
	getProgressiveSchemesClient(clientId);
	showDateImages();
};
document.addEventListener('DOMContentLoaded', function() {
	console.info('domcontentloaded');
	init();
});
