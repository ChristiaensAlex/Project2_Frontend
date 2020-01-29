let baseURL = `https://trekjeplan.azurewebsites.net/api/`;

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
	let title = `Rapport <span>${json.firstName} ${json.lastName}</span>`;

	document.querySelector('.js-title').innerHTML = title;
	document.querySelector('.js-report-schemes').innerHTML = html;

	showCoins(sessionStorage.clientTotalCoins);
};
const showCoins = function(coins) {
	let html = `<div> Totaal verdiende munten: ${coins}</div>
	<button class="o-button-reset c-button c-submitbutton c-rewardButton js-rewardButton disabled ">Beloning uitgevoerd</button>`;
	document.querySelector('.js-clientReward').innerHTML = html;
	rewardButton = document.querySelector('.js-rewardButton');
	ListenToRewardButton(rewardButton);
};
const ListenToRewardButton = function(rewardButton) {
	if (sessionStorage.clientTotalCoins >= 100) {
		rewardButton.classList.remove('c-submit-uploadPicto');
	} else {
		rewardButton.classList.add('c-submit-uploadPicto');
	}
	rewardButton.addEventListener('click', function(e) {
		updateCoins(sessionStorage.clientId, 100);
		console.log('beloning uitgevoerd');
	});
};

const updateCoins = function(clientId, coins) {
	fetch(`https://trekjeplan.azurewebsites.net/api/client/${clientId}/${coins}`, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'application/json' }
	})
		.then(res => {
			console.log(res.status);
			console.log(res.body);
			return res.json();
		})
		.then(data => {
			console.log(data);
			sessionStorage.clientTotalCoins = data.totalCoins;
			showCoins(data.totalCoins);
		})
		.catch(err => console.log(err));
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
