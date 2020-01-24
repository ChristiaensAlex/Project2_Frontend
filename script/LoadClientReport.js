let baseURL = `https://localhost:44374/api/`;

let showClientReport = function(json) {
	let html = '';

	for (object of json.rapportDetailList) {
		html += `  <div class="c-report-scheme">
              <p class="c-report-title">${object.progressiveSchemeName}</p>
              <div class="c-client-report">
                <div class="c-report-description">
                  <p>Aantal keer doorlopen:</p>
                  <div>Laatste tijd:</div>
                </div>
                <div class="c-report-description">
                  <p>${object.numberOfTimesDone}</p>
                  <div>${object.lastTimeInMinutes} min</div>
                </div>
              </div>
            </div>`;
	}
	let title = `Rapport <span>${json.firstName + ' ' + json.lastName}</span>`;
	document.querySelector('.js-title').innerHTML = title;
	document.querySelector('.js-report-schemes').innerHTML = html;
};

const getClientReport = function(clientId) {
	let url = `${baseURL}client/${clientId}/rapport`;
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
			showClientReport(jsonObject);
		})
		.catch(function(error) {
			console.log(error);
			console.error(`Problem to process json $`);
		});
};

const init = function() {
	clientId = sessionStorage.clientId;
	console.log(clientId);

	getClientReport(clientId);
};
document.addEventListener('DOMContentLoaded', function() {
	console.info('domcontentloaded');
	init();
});
