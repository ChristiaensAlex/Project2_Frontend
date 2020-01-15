let form, buttonAddStep, buttonAddStepBetween, inputStep, inputStepDescription;

const getFormElements = function() {
  form = document.querySelector('.js-form-addStep');
  form.noValidate = true; //input is not validated when submitted
  // form.addEventListener('submit', onFormSubmit);
  buttonAddStep = document.querySelector('.js-button-addStep');
  buttonAddStep.addEventListener('click', onHandlerClickAdd);
  inputStep = document.querySelector('.js-single-step');
  numberStep = document.querySelector('.js-step-number');
  allSteps = document.querySelector('.js-all-steps');
  inputStepDescription = document.querySelector('.js-input-description');
};

const onHandlerClickAdd = function(e) {
  e.preventDefault();
  let inpStep = inputStep.cloneNode(true);
  let count = document.getElementsByName('stepDescription');
  inpStep.dataset.number = count.length + 1;
  inpStep.querySelector('.js-step-number').innerHTML = inpStep.dataset.number;
  inpStep.querySelector('.js-input-description').value = '';
  allSteps.appendChild(inpStep);
};

document.addEventListener('DOMContentLoaded', function() {
  console.info('DOM loaded');
  getFormElements();
});
