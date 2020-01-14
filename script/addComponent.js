let form, buttonAddStep, inputStep;

const getFormElements = function() {
  form = document.querySelector('.js-form-addStep');
  form.noValidate = true; //input is not validated when submitted
  // form.addEventListener('submit', onFormSubmit);

  buttonAddStep = document.querySelector('.js-button-addStep');
  inputStep = document.querySelector('.js-single-step');
  buttonAddStep.addEventListener('click', onHandlerClickAdd);

  numberStep = document.querySelector('.js-step-number');
};

const onHandlerClickAdd = function(e) {
  e.preventDefault();
  let inpStep = inputStep.cloneNode(true);
  let count = document.getElementsByName('stepDescription');
  inpStep.dataset.number = count.length + 1;
  document.querySelector('.js-all-steps').appendChild(inpStep);
  console.log(numberStep);
  numberStep.innerHTML = inpStep.dataset.number;
  console.log('Lengte: ' + inpStep.dataset.number);
};

document.addEventListener('DOMContentLoaded', function() {
  console.info('DOM loaded');
  getFormElements();
});
