let deleteClient, background, deleteProgressiveScheme, stepImages, mainImage, divElement;

const OnHandlerClickedCancel = function() {
  background.classList.remove('c-popup-blur');
  popup.style.display = 'none';
};

const onHandlerClickedPopUp = function(picto, element) {
  //background blurry
  background.classList.add('c-popup-blur');
  //popup appears
  popup.style.display = 'block';
  if(picto == true){
    divElement = element; 
  }
};

const ListenToDelete = function(element){
  element.addEventListener('click',function(){
    onHandlerClickedPopUp(false, element)}); 
}

const getElements = function() {
  deleteClient = document.querySelectorAll('.js-client-delete');
  background = document.querySelector('.js-background-popup');
  popup = document.querySelector('.c-popup-form');
  cancelButton = document.querySelector('.js-cancel');
  if (cancelButton)  {
    cancelButton.addEventListener('click', OnHandlerClickedCancel);
  }
  deleteProgressiveScheme = document.querySelectorAll('.js-progressivescheme-delete');
  stepImages = document.querySelectorAll('.c-button_addStepImage');
  console.log(stepImages)
  mainImage = document.querySelector('.c-button__mainStepImage');
  if(typeof deleteClient != 'undefined' && deleteClient.length > 0){
    deleteClient.forEach(element => {
      ListenToDelete(element)}
      );
  }
  else if(typeof deleteProgressiveScheme != 'undefined' && deleteProgressiveScheme.length > 0){
    deleteProgressiveScheme.forEach(element => {
      ListenToDelete(element)}
      );
  }
  else if(typeof stepImages != 'undefined' && stepImages.length > 0 && mainImage){
    stepImages.forEach(element => {
      element.addEventListener('click', function(){
        onHandlerClickedPopUp(true, element)})}
      );
    mainImage.addEventListener('click', function(){
      onHandlerClickedPopUp(true, mainImage)}); 
  }
};

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded - popup');
  getElements(); 
});
