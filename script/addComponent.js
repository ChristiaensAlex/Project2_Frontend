let form, buttonAddStep, removeButton, buttonAddStepBetween, inputStep, inputStepDescription;

const getFormElements = function() {
  form = document.querySelector('.js-form-addStep');
  form.noValidate = true; //input is not validated when submitted
  // form.addEventListener('submit', onFormSubmit);
  buttonAddStep = document.querySelector('.js-button-addStep');
  buttonAddStep.addEventListener('click', onHandlerClickedAdd);
  inputStep = document.querySelector('.js-single-step');
  numberStep = document.querySelector('.js-step-number');
  allSteps = document.querySelector('.js-all-steps');
  inputStepDescription = document.querySelector('.js-input-description');
};

const onHandlerClickedRemove = function(e) {
  e.preventDefault();
  console.log(allSteps);
  document.querySelector('.js-all-steps').removeChild3(e.currentTarget.parentNode.parentNode.parentNode.parentNode);
};

const onHandlerClickedAdd = function(e) {
  e.preventDefault();
  let inpStep = inputStep.cloneNode(true);
  let count = document.getElementsByName('stepDescription');
  inpStep.dataset.number = count.length + 1;
  inpStep.querySelector('.js-step-number').innerHTML = inpStep.dataset.number;
  inpStep.querySelector('.js-input-description').value = '';
  allSteps.appendChild(inpStep);
  removeButton = document.querySelectorAll('.js-remove-button');
  removeButton.forEach(element => {
    element.addEventListener('click', onHandlerClickedRemove);
  });
};

document.addEventListener('DOMContentLoaded', function() {
  console.info('DOM loaded');
  getFormElements();
});
