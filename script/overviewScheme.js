let json

const showStepsFromProgressiveScheme = function (payload) {
  let steps = payload.steps
  let progressiveSchemeSteps = document.querySelector('.js-scheme-allSteps')
  for (i in steps) {
    console.log(steps)
    let OneStep = document.querySelector('.js-overview-step')
    let stepClone = OneStep.cloneNode(true)
    stepClone.classList.remove('u-hide')
    stepClone.classList.remove('js-overview-step')
    let step = steps[i]
    let stepName = stepClone.querySelector('.c-step__name')
    stepName.innerHTML = `Stap ${step.sequence}`
    let stepDescription = stepClone.querySelector('.c-step__explanation-mentor')
    stepDescription.innerHTML = step.descriptionStep
    
    let pictoStep = stepClone.querySelector('.c-picto');
    pictoStep.innerHTML = `<img class="c-choose__picto-img" src="https://trekjeplan.blob.core.windows.net/pictos/${steps[i].pictoFilleName}" width="104px" height="auto"/>`; 
    console.log(pictoStep); 
    progressiveSchemeSteps.append(stepClone)
    let count = steps.length - 1
    if (i != steps.length - 1) {
      let OneArrow = document.querySelector('.c-downwardsArrow')
      let arrowClone = OneArrow.cloneNode(true)
      arrowClone.classList.remove('u-hide')
      progressiveSchemeSteps.append(arrowClone)
    }
  }
  showClientsFromProgressiveScheme(payload);
}

const fillInputsFromEditPlan = function (payload) {
  let steps = payload.steps
  let progressiveSchemeSteps = document.querySelector('.js-edit-scheme')
  for (i in steps) {
    let OneStep = document.querySelector('.c-first-step')
    let stepClone = OneStep.cloneNode(true)
    stepClone.classList.remove('u-hide')
    let step = steps[i]
    stepClone.dataset.number = parseInt(step.sequence)
    let stepNumber = stepClone.querySelector('.js-step-number')

    stepNumber.innerHTML = `Stap ${step.sequence}`
    let stepInputDescription = stepClone.querySelector('.js-input-description')
    stepInputDescription.innerHTML = step.descriptionStep
    let imgdiv = stepClone.querySelector('.js-step-img')

    imgdiv.innerHTML = `<img class="c-selectedPicto js-selected-picto" src="https://trekjeplan.blob.core.windows.net/pictos/${step.pictoFilleName}" width="104px" height="auto" data-img="${step.pictoFilleName}"/>`
    progressiveSchemeSteps.append(stepClone)

  }
  ListenToRemoveButton()
  getElements(); 
  buttonAddStep.addEventListener('click', AddToEditScheme)
}
const showOneProgressiveScheme = function (payload) {
  json = payload
  let progressiveSchemeName = document.querySelector(
    '.js-progressiveScheme-name'
  )
  let editPlanName = document.querySelector('.js-scheme-name')
  if (progressiveSchemeName) {
    console.log(payload)
    progressiveSchemeName.innerHTML = payload.name
    showStepsFromProgressiveScheme(payload)
  } else if (editPlanName) {
    editPlanName.value = payload.name
    document.querySelector(".js-mainImg").innerHTML = `<img class="c-selectedPicto js-selected-picto" src="https://trekjeplan.blob.core.windows.net/pictos/${payload.pictoFilleName}" width="104px" height="auto" data-img="${payload.pictoFilleName}"/>`
    fillInputsFromEditPlan(payload)
  }
}

const getProgressiveSchemeById = function () {
  let id = sessionStorage.planId
  let url = `${baseURL}progressiveScheme/${id}`
  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw Error(`Problem to fetch(). Status code: ${response.status}`)
      } else {
        return response.json()
      }
    })
    .then(function (jsonObject) {
      showOneProgressiveScheme(jsonObject)
    })
    .catch(function (error) {
      console.error(`Problem to process json ${error}`)
    })
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded - Overview progressive scheme ')
  baseURL = 'https://trekjeplan.azurewebsites.net/api/'
  getProgressiveSchemeById()
})
