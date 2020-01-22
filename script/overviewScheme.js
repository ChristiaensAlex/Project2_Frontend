const showOneProgressiveScheme = function(payload){
    showClientsFromProgressiveScheme(payload); 
    let progressiveSchemeName = document.querySelector(".js-progressiveScheme-name"); 
    progressiveSchemeName.innerHTML = payload.name; 
    let steps = payload.steps; 
    let progressiveSchemeSteps = document.querySelector(".js-scheme-allSteps"); 
    for(i in steps){
        progressiveSchemeSteps.innerHTML += `<div class="c-overview__step">
        <div class="c-picto">
            <img alt="Swipe de picto om door te gaan naar de volgende stap" />
        </div>
        <div class="c-step__countsymbol">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g id="Getal" transform="translate(-100 -470)">
                    <g id="Rectangle_24" data-name="Rectangle 24" transform="translate(100 470)" fill="#fff"
                        stroke="#27255f" stroke-width="1.5">
                        <rect width="24" height="24" rx="4" stroke="none" />
                        <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="3.25" fill="none" />
                    </g>
                    <circle id="Ellipse_4" data-name="Ellipse 4" cx="4" cy="4" r="4"
                        transform="translate(108 478)" fill="#27255f" />
                </g>
            </svg>
        </div>
        <div class="c-step__name">Stap ${steps[i].sequence}</div>
        <div class="c-step__explanation-mentor">
            ${steps[i].descriptionStep}
        </div>
    </div> `;
    let step = document.querySelector('.c-overview__step');
    if (i != 0){ //if the step is not the last one, add an arrow 
        step.outerHTML +=  `<div class="c-downwardsArrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="27.353" viewBox="0 0 24 27.353">
            <g id="Component_4_44" data-name="Component 4 – 44" transform="translate(0 27.353) rotate(-90)">
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
    </div>`
    }
    }
    
}


const getProgressiveSchemeById = function(){
	let id = sessionStorage.planId; 
	let url = `${baseURL}progressiveScheme/${id}`;
	fetch(url)
	.then(function(response) {
		if (!response.ok) {
			throw Error(`Problem to fetch(). Status code: ${response.status}`);
		} else {
			return response.json(); 
		}
	})
	.then(function(jsonObject) {
		showOneProgressiveScheme(jsonObject); 
		console.log(jsonObject);
	})
	.catch(function(error) {
		console.error(`Problem to process json ${error}`);
	});
}


document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded - Overview progressive scheme ');
	baseURL = 'https://localhost:44374/api/';
    console.log(sessionStorage.planId);
    getProgressiveSchemeById(); 
});