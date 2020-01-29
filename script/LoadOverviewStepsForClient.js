const showStepsProgressiveScheme = function (json) {
	console.log(json);
	let nameProgressiveScheme = json.name;
	document.querySelector(".js-progressiveScheme__name").innerHTML = nameProgressiveScheme;

	let html = "";
	for (object of json.steps) {
		let ischecked = "";
		let F = object.done;
		if (F == true) {
			ischecked = 'c-checkmark';
		} else {
			ischecked = 'c-checkmark c-checkmark__unchecked';
		}

		html += `<div class="c-overview__step">
						<div class="c-picto">
							<img src="StartStap1.png" alt="Swipe de picto om door te gaan naar de volgende stap" />
						</div>
						<div class="c-step__explanation">
							${object.descriptionStep}
						</div>
						<div class="${ischecked}">
							<svg xmlns="http://www.w3.org/2000/svg" width="20.278" height="19.963"
								viewBox="0 0 20.278 19.963">
								<g id="Group_1089" data-name="Group 1089" transform="translate(-340.12 -355)">
									<ellipse id="Ellipse_128" data-name="Ellipse 128" cx="10.139" cy="9.981" rx="10.139"
										ry="9.981" transform="translate(340.12 355)" fill="#1c5c5c" />
									<path id="Fill_1" data-name="Fill 1"
										d="M4.251,8.665a.925.925,0,0,1-.663-.28L.275,5.008a.968.968,0,0,1,0-1.351.925.925,0,0,1,1.326,0l2.651,2.7L10.216.28a.925.925,0,0,1,1.325,0,.968.968,0,0,1,0,1.351L4.914,8.385a.926.926,0,0,1-.663.28"
										transform="translate(343.828 360.29)" fill="#fff" />
								</g>
							</svg>
						</div>
					</div>

					<div class="c-downwardsArrow u-hide">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="27.353" viewBox="0 0 24 27.353">
							<g id="Component_4_44" data-name="Component 4 – 44"
								transform="translate(0 27.353) rotate(-90)">
								<g id="Group_972" data-name="Group 972" transform="translate(4 6)">
									<path id="Path_4" data-name="Path 4" d="M508.019,162.566l-6.2,6.2,6.2,6.2"
										transform="translate(-501.817 -162.566)" fill="none" stroke="#28225f"
										stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
									<path id="Path_5" data-name="Path 5" d="M478.752,117.413h19.669"
										transform="translate(-476.569 -111.036)" fill="none" stroke="#28225f"
										stroke-linecap="round" stroke-width="3" />
								</g>
								<rect id="Rectangle_85" data-name="Rectangle 85" width="24" height="24" fill="none" />
							</g>
						</svg>
					</div>`;

	}
	let progressiveStep = document.querySelector(".js-loadsteps");
	progressiveStep.innerHTML = html;

	let count = json.steps.length - 1;

	
		if (object != count) {
			let OneArrow = document.querySelector('.c-downwardsArrow');
			let arrowClone = OneArrow.cloneNode(true);
			OneArrow.classList.remove('u-hide');
			progressiveStep.append(arrowClone);
			console.log(arrowClone)
		}
	
	console.log("toegevoegd aan queryselector");
};


const getAllSteps = function (url) {
	fetch(url)
		.then(function (response) {
			if (!response.ok) {
				throw Error(`Problem to fetch(). Status code: ${response.status}`);
			} else {
				return response.json();
			}
		})
		.then(function (jsonObject) {
			//sessionStorage.Client = jsonObject;
			showStepsProgressiveScheme(jsonObject);
			console.log(jsonObject);
		})
		.catch(function (error) {
			console.error(`Problem to process json ${error} `);
		});
};


document.addEventListener("DOMContentLoaded", function () {
	console.info("domcontentloaded");
	clientProgressiveSchemeId = sessionStorage.clientSchemeId;

	getAllSteps(`https://trekjeplan.azurewebsites.net/api/client/progressiveScheme/${clientProgressiveSchemeId}`);
});