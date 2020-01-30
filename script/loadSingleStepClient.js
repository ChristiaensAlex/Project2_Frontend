var beginning;
var end;
let step;
let startTouch;
let touchEnd = false;





let progressiveStepPlanBeginning = function(isBeginning) {
  beginning = isBeginning;
};

let progressiveStepPlanEnd = function(isEnd) {
  end = isEnd;
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
    .then(function(response) {
      if (!response.ok) {
        throw Error(`Problem to fetch(). Status code: ${response.status}`);
      } else {
        let arr = new Array();
        arr = response.json();
        return arr;
      }
    })
    .then(function(data) {
      sessionStorage.coinsToEarn = data.coinsToEarn;
      touchEnd = true;
    })
    .catch(function(error) {
      console.error(`Problem to process json ${error}`);
    });
};

const putStepGoBack = function() {
  let url = `${baseURL}client/progressiveScheme/${clientProgressiveSchemeId}/goBack`;
  fetch(url, {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' }
  }).catch(function(error) {
    console.error(`Problem to process json ${error}`);
  });
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
                  <div class="c-picto-container">
									<img class="c-picto" src="https://trekjeplan.blob.core.windows.net/pictos/${json.steps[o].pictoFilleName}"
										alt="Swipe de picto om door te gaan naar de volgende stap" />
                    
                    </div>
                </div>
                <div class="c-step__explanation">
                    ${json.steps[o].descriptionStep}
                  </div>
							</div>
							
						</div>
                    </div>`;
  }

  document.querySelector('.swiper-wrapper').innerHTML = html;
  mySwiper.update();
  mySwiper.slideTo(json.currentStep, 0);
};

mySwiper.on('reachEnd', function() {
  mySwiper.on('touchStart', function(e) {
    if (e.touches) {
      startTouch = e.touches[0].screenX;
    } else if (e.screenX) {
      startTouch = e.screenX;
    }
  });

  mySwiper.on('touchMove', function(e) {
    let currentTouch;
    putStepFullFilled();
    if (e.touches) {
      currentTouch = e.touches[0].screenX;
      if (startTouch > currentTouch) {
        window.location.href = 'https://trekjeplan-front.azurewebsites.net/FinishedProgressiveScheme.html';
      }
    } else if (e.screenX) {
      currentTouch = e.screenX;
      if (startTouch > currentTouch) {
        window.location.href = 'https://trekjeplan-front.azurewebsites.net/FinishedProgressiveScheme.html';
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
      showStepsClient(json);
    })
    .catch(function(error) {
      console.error(`Problem to process json ${error}`);
    });
};

const closeOverlay = function() {
  overlay.style.display = 'none';
};

const openOverlay = function() {
  let overlay = document.querySelector('.c-overlay');
  overlay.style.display = 'block';
  let closeOverlay = document.querySelector('.c-navigation__close');
  closeOverlay.addEventListener('click', closeOverlay);
};

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded - SingleStepsClient');
  let baseURL = 'https:/trekjeplan.azurewebsites.net/api/';

  clientProgressiveSchemeId = sessionStorage.clientSchemeId;
  clientId = sessionStorage.clientId;
  getSteps(clientProgressiveSchemeId);

  // activeIndex = 0;
  mySwiper.init();

  let stepsOverview = document.querySelector('.c-stepsOverview__sybmol');

  stepsOverview.addEventListener('click', function() {
    openOverlay();
  });
});

mySwiper.on('init', function() {
  putStartTime();
});

mySwiper.on('touchEnd', function() {
  touchEnd = true;
});

mySwiper.on('slideNextTransitionEnd', function() {
  if (touchEnd) {
    putStepFullFilled();
  }
});

mySwiper.on('slidePrevTransitionEnd', function() {
  putStepGoBack();
});
