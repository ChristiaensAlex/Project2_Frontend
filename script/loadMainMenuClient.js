const weekdayclient = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
const monthclient = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

let baseURL = `https://trekjeplan.azurewebsites.net/api/`,
	clientId;

let showDateImages = function () {
	let html = `<img class="c-icon" src="daysAndMonths_pictos/${weekdayclient[new Date().getDay()]}.png" alt="${weekdayclient[new Date().getDay()]}" />
				<img class="c-icon" src="daysAndMonths_pictos/${monthclient[new Date().getMonth()]}.jpg" alt="${monthclient[new Date().getMonth()]}" />`;
	document.querySelector('.js-date').innerHTML = html;
};

let ShowProgressiveSchemesClient = function (json) {
	let html = '';
	for (object of json) {
		html += `<div class="c-progressiveScheme ${object.done}">
							<div class="c-progressiveScheme__mainPicto">
								<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
									<g id="start-up" transform="translate(0 0)">
										<path id="Path_293" data-name="Path 293"
											d="M43.948,3.285A3.42,3.42,0,0,0,40.715.052,33.965,33.965,0,0,0,23.688,3.46a33.427,33.427,0,0,0-9.761,8.094l-.1.126-6.444.5A3.4,3.4,0,0,0,4.788,13.7l-4.4,6.649A2.356,2.356,0,0,0,2,23.98l5.429.841c-.019.106-.038.211-.056.317a3.418,3.418,0,0,0,.958,2.973l7.562,7.562a3.427,3.427,0,0,0,2.418,1,3.369,3.369,0,0,0,.555-.046c.106-.018.211-.037.317-.056L20.02,42a2.354,2.354,0,0,0,3.628,1.6l6.649-4.4a3.4,3.4,0,0,0,1.525-2.592l.5-6.444.126-.1a33.424,33.424,0,0,0,8.094-9.761A33.967,33.967,0,0,0,43.948,3.285ZM28.875,37.061l-6.36,4.205L21.7,35.976a28.878,28.878,0,0,0,7.881-3.752l-.324,4.2a.84.84,0,0,1-.377.64ZM17.712,33.849l-7.562-7.562a.836.836,0,0,1-.238-.725,22.176,22.176,0,0,1,1.007-3.83L22.265,33.079a22.269,22.269,0,0,1-3.827,1.009.836.836,0,0,1-.725-.238ZM7.578,14.748l4.2-.324A28.875,28.875,0,0,0,8.024,22.3l-5.291-.819,4.205-6.36A.84.84,0,0,1,7.578,14.748ZM30.795,28.093A29.555,29.555,0,0,1,24.828,32L12,19.172a30.067,30.067,0,0,1,3.9-5.967A30.764,30.764,0,0,1,24.873,5.75a31.356,31.356,0,0,1,15.7-3.124.846.846,0,0,1,.8.8,31.354,31.354,0,0,1-3.124,15.7,30.764,30.764,0,0,1-7.455,8.966Z"
											transform="translate(0 0)" fill="#28225f" />
										<path id="Path_294" data-name="Path 294"
											d="M282.168,99.2a6.44,6.44,0,1,0-4.557-1.885A6.427,6.427,0,0,0,282.168,99.2Zm-2.735-9.176a3.867,3.867,0,1,1-1.133,2.734A3.855,3.855,0,0,1,279.434,90.026Z"
											transform="translate(-252.028 -78.9)" fill="#28225f" />
										<path id="Path_295" data-name="Path 295"
											d="M1.591,349.751a1.284,1.284,0,0,0,.911-.378l4.209-4.209a1.289,1.289,0,0,0-1.823-1.823L.679,347.551a1.289,1.289,0,0,0,.911,2.2Z"
											transform="translate(-0.276 -313.491)" fill="#28225f" />
										<path id="Path_296" data-name="Path 296"
											d="M10.292,388.223a1.289,1.289,0,0,0-1.823,0L.378,396.315A1.289,1.289,0,1,0,2.2,398.137l8.091-8.091A1.289,1.289,0,0,0,10.292,388.223Z"
											transform="translate(-0.001 -354.515)" fill="#28225f" />
										<path id="Path_297" data-name="Path 297"
											d="M94.649,433.1l-4.209,4.209a1.289,1.289,0,1,0,1.823,1.823l4.209-4.209a1.289,1.289,0,0,0-1.823-1.823Z"
											transform="translate(-82.323 -395.539)" fill="#28225f" />
									</g>
								</svg>
							</div>
							<div class="c-progressiveScheme__name">
								${object.schemeName}
							</div>
						</div> `;
	}

	document.querySelector('.js-progressiveSchemes').innerHTML = html;
};



const getProgressiveSchemesClient = function (clientId) {
	let url = `${baseURL}client/${clientId}/progressiveScheme`;
	fetch(url)
		.then(function (response) {
			if (!response.ok) {
				throw Error(`Problem to fetch(). Status code: ${response.status}`);
			} else {
				let arr = new Array();
				arr = response.json();
				console.log(arr);
				return arr;
			}
		})
		.then(function (jsonObject) {
			json = jsonObject;
			console.log(jsonObject);
			ShowProgressiveSchemesClient(jsonObject);
		})
		.catch(function (error) {
			console.log(error);
			console.error(`Problem to process json $`);
		});
};
const init = function () {
	clientId = sessionStorage.clientId;
	console.log(clientId);
	getProgressiveSchemesClient(clientId);
	showDateImages();
};
document.addEventListener('DOMContentLoaded', function () {
	console.info('domcontentloaded');
	init();
});
