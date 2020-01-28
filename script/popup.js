let deleteClient, background, deleteProgressiveScheme, stepImages, mainImage, divElement;

const removefromDB = function(baseURL, id) {
	// i = parseInt(i) - 1;
	// console.log(i);
	//let contactId = json[i].id;
	//contactId = 0;
	console.log('removed: ' + contactId);
	let url = `${baseURL}/${id}`;
	fetch(url, {
		method: 'DELETE'
	})
		.then(function(response) {
			if (response.ok) {
				console.log(response.status);
			} else {
				response.json();
				throw Error(`Problem to fetch(). Status code: ${response.status}`);
			}
		})
		// .then(res => res.json())
		.then(data => console.log(data));
};

const OnHandlerClickedCancel = function() {
	background.classList.remove('c-popup-blur');
	popup.style.display = 'none';
};


const onHandlerClickedPopUp = function(element) {
	//background blurry

	background.classList.add('c-popup-blur');
	//popup appears
	popup.style.display = 'block';
	console.log('element' + element);
	if (deleteClient) {
		document.querySelector('.js-deleteButton').addEventListener('click', function() {
			console.log(deletedClient);
			// hier de delete functie aanspreken voor de client
		});
	} else if (deleteProgressiveScheme) {
		document.querySelector('.js-deleteButton').addEventListener('click', function() {
			console.log(deletedProgressiveScheme);
			// hier de delete functie aanspreken voor progressive scheme
		});
	}
	document.querySelector('.js-deleteButton').addEventListener('click', function() {
		console.log(deletedClient.id);
		let url = 'https://trekjeplan.azurewebsites.net/api/client';
		removefromDB(url, deletedClient.id);
  });
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
