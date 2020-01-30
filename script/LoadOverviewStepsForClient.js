let counterStepsClient;
const showStepsProgressiveScheme = function(json) {
  console.log(json);
  let steps = json.steps;
  let nameProgressiveScheme = json.name;
  document.querySelector('.js-progressiveScheme__name').innerHTML = nameProgressiveScheme;
  let progressiveSchemeSteps = document.querySelector('.js-loadsteps');
  for (i in steps) {
    console.log(steps);
    let OneStep = document.querySelector('.c-overview__step');
    let stepClone = OneStep.cloneNode(true);
    stepClone.classList.remove('u-hide');
    stepClone.classList.remove('js-overview-step');
    let step = steps[i];
    let stepDescription = stepClone.querySelector('.c-step__explanation');
    stepDescription.innerHTML = step.descriptionStep;
    let pictoStep = stepClone.querySelector('.c-picto');
    pictoStep.innerHTML = `<img class="c-choose__picto-img" src="https://trekjeplan.blob.core.windows.net/pictos/${steps[i].pictoFilleName}" width="104px" height="auto"/>`;
    progressiveSchemeSteps.append(stepClone);
    let count = steps.length - 1;
    if (i != count) {
      let OneArrow = document.querySelector('.c-downwardsArrow');
      let arrowClone = OneArrow.cloneNode(true);
      arrowClone.classList.remove('u-hide');
      progressiveSchemeSteps.append(arrowClone);
    }
    let F = steps[i].done;
    console.log(F);
    let isChecked = stepClone.querySelector('.ischecked');
    console.log(isChecked);
    if (F == true) {
      isChecked.classList.add('c-checkmark');
    } else {
      isChecked.classList.add('c-checkmark');
      isChecked.classList.add('c-checkmark__unchecked');
    }
  }
};

const getAllSteps = function(url) {
  fetch(url)
    .then(function(response) {
      if (!response.ok) {
        throw Error(`Problem to fetch(). Status code: ${response.status}`);
      } else {
        return response.json();
      }
    })
    .then(function(jsonObject) {
      //sessionStorage.Client = jsonObject;
      showStepsProgressiveScheme(jsonObject);
      console.log(jsonObject);
    })
    .catch(function(error) {
      console.error(`Problem to process json ${error} `);
    });
};

document.addEventListener('DOMContentLoaded', function() {
  console.info('domcontentloaded');
  clientProgressiveSchemeId = sessionStorage.clientSchemeId;

  getAllSteps(`https://trekjeplan.azurewebsites.net/api/client/progressiveScheme/${clientProgressiveSchemeId}`);
});
