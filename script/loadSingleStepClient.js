baseURL = 'https://localhost:44374/api/';
var beginning;
var end;
let step;

let progressiveStepPlanBeginning = function (isBeginning) {
    beginning = isBeginning;
};

let progressiveStepPlanEnd = function (isEnd) {
    end = isEnd;
};

let stepNumber = function (activeIndex) {
    console.log("Start " + beginning);
    console.log("End " + end);
    if (beginning == true) {
        step = 1;
    }
    else {
        step = activeIndex + 1;
    };
    console.log(step);
    // step 1 is activeIndex = 0;
}


let showStepsClient = function (json) {
    let html = '';
    console.log(json.steps);
    for (object of json.steps) {
        console.log(object.done);
        html += `<div class="swiper-slide">
						<div class="c-step">
							<div class="c-step__pictowrapper">
								<div class="c-step__picto">
									<img class="c-picto" src="StartStap1.png"
										alt="Swipe de picto om door te gaan naar de volgende stap" />
								</div>
							</div>
							<p class="c-step__explanation">
								${object.descriptionStep}
							</p>
						</div>
					</div>`;
    }
    document.querySelector('.js-steps').innerHTML = html;
    mySwiper.update()
};


const getSteps = function (clientProgressiveSchemeId) {
    let url = `${baseURL}client/progressiveScheme/${clientProgressiveSchemeId}`;
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
            console.log(json);
            showStepsClient(json);
        })
        .catch(function (error) {
            console.error(`Problem to process json ${error}`);
        });
};


document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded - SingleStepsClient');
    clientProgressiveSchemeId = "829b18b0-0e92-43dd-8241-cef2feef76ad";
    stepNumber();
    getSteps(clientProgressiveSchemeId);
});