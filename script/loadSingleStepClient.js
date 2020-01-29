baseURL = 'https:/trekjeplan.azurewebsites.net/api/';
var beginning;
var end;
let step;
let activeIndex, startTouch;

let progressiveStepPlanBeginning = function(isBeginning) {
	beginning = isBeginning;
};

let progressiveStepPlanEnd = function(isEnd) {
	end = isEnd;
};

const getClient = function(id) {
	let url = `${baseURL}client/${id}`;
	fetch(url)
		.then(function(response) {
			if (!response.ok) {
				throw Error(`Problem to fetch(). Status code: ${response.status}`);
			} else {
				let arr = new Array();
				arr = response.json();
				return arr;
			}
		})
		.then(function(jsonObject) {
			json = jsonObject;
			if (json.totalSteps == 1) {
				end = true;
			}
			showStepsClient(json);
		})
		.catch(function(error) {
			console.error(`Problem to process json ${error}`);
		});
};

const putStepFullFilled = function() {
	let url = `${baseURL}client/progressiveScheme/${clientProgressiveSchemeId}`;
	fetch(url, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'application/json' }
	})
		.then(response => {
			return response.json();
		})
		.then(data => {
			sessionStorage.coinsToEarn = data.coinsToEarn;
			console.log('GET');
			console.log(clientId);
			getClient(clientId);
		})
		.catch(err => console.log(err));
};

const putStartTime = function() {
	let url = `${baseURL}client/progressiveScheme/${clientProgressiveSchemeId}/startTime`;
	fetch(url, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'application/json' }
	})
		.then(data => {
			console.log(data);
			getSteps(clientProgressiveSchemeId);
		})
		.catch(err => console.log(err));
};

const stepNumber = function() {
	mySwiper.on('reachBeginning', function() {
		step = 1;
		end = true;
		putStartTime();
		putStepFullFilled();
	});
	//putStepFullFilled(activeIndex);
	mySwiper.on('progress', function() {
		step = activeIndex + 1;
		putStepFullFilled();

		// step 1 is activeIndex = 0
	});
};

const showStepsClient = function(json) {
	let html = '';
	let title = document.querySelector('.c-progressiveScheme__name');
	title.innerHTML = json.name;
	console.log('JSON');
	console.log(json);
	for (o in json.steps) {
		html += `<div class="swiper-slide">
						<div class="c-step">
							<div class="c-step__pictowrapper">
								<div class="c-step__picto">
									<img class="c-picto" src="https://trekjeplan.blob.core.windows.net/pictos/${json.steps[o].pictoFilleName}"
										alt="Swipe de picto om door te gaan naar de volgende stap" />
								</div>
							</div>
							<p class="c-step__explanation">
								${json.steps[o].descriptionStep}
							</p>
						</div>
                    </div>`;
	}

	document.querySelector('.swiper-wrapper').innerHTML = html;
	mySwiper.update();
	mySwiper.on('reachBeginning', function(e) {
		console.log(e);
	});
	// let startTouch;
	// let nextTouch;
	// if (end == true) {
	// 	console.log('Einde touch');
	// 	mySwiper.on('touchStart', function(e) {
	// 		console.log('Start');
	// 		console.log(e);
	// 		startTouch = e.screenX;
	// 		console.log(startTouch);
	// 	});
	// 	mySwiper.on('touchMove', function(e) {
	// 		console.log('beweging');
	// 		console.log(e);
	// 		if (startTouch > e.screenX) {
	// 			console.log('eventje rechts');
	// 			window.location.href = 'FinishedProgressiveScheme.html';
	// 		}
	// 	});
	// }
};

mySwiper.on('reachEnd', function() {
	console.log('einde'), console.log();
	console.log('Einde touch');
	mySwiper.on('touchStart', function(e) {
		console.log('Start');
		console.log(e);
		if (e.touches) {
			startTouch = e.touches[0].screenX;
			console.log(startTouch);
		} else if (e.screenX) startTouch = e.screenX;
	});
	mySwiper.on('touchMove', function(e) {
		console.log('beweging');
		console.log(e);
		let currentTouch;
		if (e.touches) {
			currentTouch = e.touches[0].screenX;
			if (startTouch > currentTouch) {
				console.log('eventje rechts');
				window.location.href = 'FinishedProgressiveScheme.html';
			}
		} else if (e.screenX) {
			console.log('HIERZOOO');
			currentTouch = e.screenX;
			if (startTouch > currentTouch) {
				console.log('eventje rechts');
				window.location.href = 'FinishedProgressiveScheme.html';
			}
		}
	});
});

const getSteps = function(cpsId) {
	console.log('id' + cpsId);
	let url = `${baseURL}client/progressiveScheme/${cpsId}`;
	console.log(url);
	fetch(url)
		.then(function(response) {
			if (!response.ok) {
				throw Error(`Problem to fetch(). Status code: ${response.status}`);
			} else {
				let arr = new Array();
				arr = response.json();
				return arr;
			}
		})
		.then(function(jsonObject) {
			json = jsonObject;
			if (json.totalSteps == 1) {
				end = true;
			}
			console.log('JSON DIE IK MEESTUUR');
			console.log(json.steps);
			showStepsClient(json);
		})
		.catch(function(error) {
			console.error(`Problem to process json ${error}`);
		});
};

document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded - SingleStepsClient');
	clientProgressiveSchemeId = sessionStorage.clientSchemeId;
	clientId = sessionStorage.clientId;

	console.log(clientId);
	console.log(clientProgressiveSchemeId);
	getSteps(clientProgressiveSchemeId);
	stepNumber();
});
