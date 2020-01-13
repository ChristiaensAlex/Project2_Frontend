const getData = function() {
  plusButton.addEventListener('click', plusButtonClicked);
};
const init = function() {
  graph = document.querySelector('.js-graph');
  plusButton = document.querySelector('js-button-addStep');
  console.log(plusButton);
  getData();
};

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM geladen');
  init();
});
