let baseURL = 'https://trekjeplan.azurewebsites.net/api/',
	mentorId,
	json,
	url,
	search,
	clientId,
	frequency,
	chosenDays = [],
	numberOfDays,
	backPage;

const postCP = function(url, payload) {
	console.log('add client to progressive scheme');
	let body = JSON.stringify(payload);
	console.log(body);
	fetch(`${baseURL}${url}`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'application/json' },
		body: body
	})
		.then(res => res.json())
		.then(data => {
			console.log(data), console.log(data), (window.location.href = 'https://trekjeplan-front.azurewebsites.net/DetailProgressiveStepsPlan.html');
		})
		.catch(err => console.log(err));
};
const showClients = function(json, element) {
	i = 0;
	let html = '';
	for (object of json) {
		html += `<div class="c-search-list__item" data-number="${i}">${object.firstName} ${object.lastName}</div>`;
		console.log(i);
		i++;
	}
	document.querySelector('.js-clients').innerHTML = html;
	ListenToObjects(element);
};

const showProgressiveSchemes = function(json, element) {
	i = 0;
	let html = '';
	for (object of json) {
		html += `<div class="c-search-list__item" data-number="${i}">${object.name}</div>`;
		console.log(i);
		i++;
	}
	document.querySelector('.js-progressiveSchemes').innerHTML = html;
	ListenToObjects(element);
};

const getSearchElements = function(element, string) {
	let url = `${baseURL}mentor/${mentorId}/${element}?search=${string}`;
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
			if (element == 'client') {
				showClients(jsonObject, element);
				backPage = 'DetailProgressiveSteppsplan.html';
			} else if (element == 'progressiveScheme') {
				showProgressiveSchemes(jsonObject, element);
				backPage = 'PlanningClient.html';
				console.log('ps');
			}
		})
		.catch(function(error) {
			console.log(error);
			console.error(`Problem to process json $`);
		});
};

const makePayload = function(frequency) {
	let payload = [];
	let points = document.querySelector('.js-points').value;
	let startDate = document.querySelector('.js-startDate').value;
	let endDate = document.querySelector('.js-endDate').value;
	let time = document.querySelector('.js-time').value;
	console.log(time);
	switch (frequency) {
		case 'Dagelijks':
			url = 'clientprogressiveScheme/everyday';
			let cpDaily = {
				clientId: clientId,
				progressiveSchemeId: progressiveSchemeId,
				progressiveSchemeCoins: parseInt(points),
				startDate: startDate,
				endDate: endDate,
				time: time
			};
			payload.push(cpDaily);
			console.log(cpDaily);
			postCP(url, payload);
			return url;
		case 'Wekelijks':
			console.log(chosenDays);
			url = 'clientprogressiveScheme/everyWeek';

			let cpWeekly = {
				clientId: clientId,
				progressiveSchemeId: progressiveSchemeId,
				progressiveSchemeCoins: parseInt(points),
				startDate: startDate,
				endDate: endDate,
				time: time,
				weekdays: chosenDays
			};
			payload.push(cpWeekly);
			console.log(cpWeekly);
			postCP(url, payload);
			return url;
		case 'Elke ... dagen':
			url = 'clientprogressiveScheme/everyFewDays';

			let cpEveryFewDays = {
				numberOfDays: parseInt(numberOfDays),
				clientId: clientId,
				progressiveSchemeId: progressiveSchemeId,
				progressiveSchemeCoins: parseInt(points),
				startDate: startDate,
				endDate: endDate,
				time: time
			};
			payload.push(cpEveryFewDays);
			console.log(cpEveryFewDays);
			postCP(url, payload);

			return url;
	}
};

const getDayOfWeek = function(day) {
	switch (day) {
		case 'Ma':
			return 'monday';
		case 'Di':
			return 'tuesday';
		case 'Wo':
			return 'wednesday';
		case 'Do':
			return 'thursday';
		case 'Vr':
			return 'friday';
		case 'Za':
			return 'saturday';
		case 'Zo':
			return 'sunday';
	}
};
const ListenToSearch = function(search) {
	//let searchPicto = document.querySelector('.c-input-search');

	console.log(search);
	search.addEventListener('input', function() {
		console.log('Er verandert hier gelijk iets');
		console.log(this.value);
		console.log(search.name);
		//  let url = `${baseURL}picto?search=${searchPicto.value}`;
		getSearchElements(search.name, this.value);
		//getPictos(url, true);
	});
};
const ListenToSelect = function(select) {
	select.addEventListener('change', function() {
		console.log(this.value);
		frequency = this.value;
		switch (frequency) {
			case 'Dagelijks':
				this.parentElement.parentElement.querySelector('.js-specificFrequency').innerHTML = '';
				return;
			case 'Elke ... dagen':
				console.log(this.parentElement.parentElement);
				console.log(this.parentElement.parentElement.querySelector('.js-specificFrequency'));
				this.parentElement.parentElement.querySelector('.js-specificFrequency').innerHTML = `<div class="c-numberOfDays"><label class="c-label" for="numberOfDays">Elke&nbsp 
                <input class="c-input c-numberOfDays-input js-numberOfDays" type="number" name="numberOfDays" min="1" max="6" placeholder="1 tot 6" /> &nbspdagen</label></div>`;
				let numberOfDaysInput = document.querySelector('.js-numberOfDays');
				ListenToNumberOfDays(numberOfDaysInput);
				return;
			case 'Wekelijks':
				this.parentElement.parentElement.querySelector('.js-specificFrequency').innerHTML = `<div class="c-days"> <span class= "c-day" >Ma</span> <span class= "c-day">Di</span> <span class= "c-day">Wo</span> <span class= "c-day">Do</span> <span class= "c-day">Vr</span> <span class= "c-day">Za</span>
                <span class= "c-day">Zo</span> </div>`;
				let allDays = document.querySelectorAll('.c-day');
				console.log(allDays);
				listenToDays(allDays);
				return;
		}
	});
};

const ListenToNumberOfDays = function(number) {
	number.addEventListener('change', function() {
		numberOfDays = this.value;
		console.log('numberofdays' + numberOfDays);
	});
};
const listenToDays = function(days) {
	for (day of days) {
		day.addEventListener('click', function() {
			console.log(this.innerHTML);
			let day = getDayOfWeek(this.innerHTML);
			chosenDays.push(day);
			this.classList.add('c-selected');
		});
	}
};
const ListenToSubmit = function(button) {
	button.addEventListener('click', function(e) {
		e.preventDefault();
		makePayload(frequency);
	});
};
const ListenToObjects = function(element) {
	objects = document.querySelectorAll('.c-search-list__item');
	console.log(element);
	for (object of objects) {
		console.log(object);
		object.addEventListener('click', function(event) {
			this.classList.add('c-backbutton__text');
			console.log(this);
			i = this.dataset.number;
			i = parseInt(i);
			console.log(i);
			chosenItem = json[i];
			console.log(json[i]);

			console.log(element);
			if (element == 'client') {
				clientId = json[i].id;
				search.value = `${chosenItem.firstName} ${chosenItem.lastName}`;
			} else if (element == 'progressiveScheme') {
				progressiveSchemeId = json[i].id;
				console.log(progressiveSchemeId);
				search.value = `${chosenItem.name}`;
			}
		});
	}
};
document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded - contact');
	mentorId = localStorage.getItem('mentorId');

	//progressiveSchemeId = '52B05597-D586-4DF2-AB80-5DF8BF33B8D4';
	//clientId = '1D32717C-4C22-40A2-650E-08D79A90ABFB';

	progressiveSchemeId = sessionStorage.planId;
	clientId = sessionStorage.clientId;
	console.log(clientId);
	console.log(progressiveSchemeId);
	search = document.querySelector('.c-search-input');
	console.log(search.name);
	if (progressiveSchemeId) {
		document.querySelector('.c-title').innerHTML = `Client toevoegen aan ${sessionStorage.planName}`;
	}

	select = document.querySelector('.js-select');
	submit = document.querySelector('.js-submitbutton');
	ListenToSearch(search);
	ListenToSelect(select);
	ListenToSubmit(submit);
});
