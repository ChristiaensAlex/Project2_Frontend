let deleteClientButton, background;

const OnHandlerClickedCancel = function() {
  background.classList.remove('c-popup-blur');
  popup.style.display = 'none';
};

const onHandlerClickedPopUp = function() {
  //background blurry
  background.classList.add('c-popup-blur');
  //popup appears
  popup.style.display = 'block';
};

const getElements = function() {
  deleteClientButton = document.querySelectorAll('.js-client-delete');
  background = document.querySelector('.js-background-popup');
  popup = document.querySelector('.c-popup-form');
  cancelButton = document.querySelector('.js-cancel');
  cancelButton.addEventListener('click', OnHandlerClickedCancel);
  if(deleteClientButton){
    deleteClientButton.forEach(element => {
      element.addEventListener('click', onHandlerClickedPopUp);
    });
  }
  };

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded');
});