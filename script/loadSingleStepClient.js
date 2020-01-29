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
  window.location.href = 'OverviewStepsForClient.html';
  // json = sessionStorage.client;
  // showStepsClient(json);

  
  // let url = `${baseURL}client/${id}`;
  // fetch(url)
  //   .then(function(response) {
  //     if (!response.ok) {
  //       throw Error(`Problem to fetch(). Status code: ${response.status}`);
  //     } else {
  //       let arr = new Array();
  //       arr = response.json();
  //       return arr;
  //     }
  //   })
  //   .then(function(jsonObject) {
  //     json = jsonObject;

  //     console.log(json.totalSteps)
  //     showStepsClient(json);
  //   })
  //   .catch(function(error) {
  //     console.error(`Problem to process json ${error}`);
  //   });
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
      console.log(response.json());
      return response.json();
    })
    .then(data => {
      sessionStorage.coinsToEarn = data.coinsToEarn;
      //getClient(clientId);
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
      //getSteps(clientProgressiveSchemeId);
    })
    .catch(err => console.log(err));
};

const showStepsClient = function(json) {
  let html = '';
  let title = document.querySelector('.c-progressiveScheme__name');
  title.innerHTML = json.name;
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
  mySwiper.on('reachBeginning', function(e) {});
};
mySwiper.on('reachEnd', function() {
  console.log('einde');
  mySwiper.on('touchStart', function(e) {
    if (e.touches) {
      startTouch = e.touches[0].screenX;
    } else if (e.screenX) {
      startTouch = e.screenX;
    }
  });
  mySwiper.on('touchMove', function(e) {
    let currentTouch;
    // if (activeIndex == 1) {
    //   putStepFullFilled();
    // }
    if (e.touches) {
      currentTouch = e.touches[0].screenX;
      if (startTouch > currentTouch) {
        window.location.href = 'FinishedProgressiveScheme.html';
      }
    } else if (e.screenX) {
      currentTouch = e.screenX;
      if (startTouch > currentTouch) {
        window.location.href = 'FinishedProgressiveScheme.html';
      }
    }
  });
});

const getSteps = function(cpsId) {
  let url = `${baseURL}client/progressiveScheme/${cpsId}`;
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

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded - SingleStepsClient');
  clientProgressiveSchemeId = sessionStorage.clientSchemeId;
  clientId = sessionStorage.clientId;
  getSteps(clientProgressiveSchemeId);


  // activeIndex = 0;
  // mySwiper.init();


  let stepsOverview = document.querySelector('.c-stepsOverview__sybmol');
  console.log(stepsOverview);

  stepsOverview.addEventListener('click', function() {
    getClient(clientId);
  });

});


mySwiper.on('init', function() {
  activeIndex = 1;
  step = activeIndex;
  putStartTime();
});


mySwiper.on('slideChangeTransitionEnd', function() {
  activeIndex = activeIndex + 1;
  step = activeIndex;
  putStepFullFilled();
});
