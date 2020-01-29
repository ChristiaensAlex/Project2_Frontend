let form, buttonAddStep, removeButton, buttonAddStepBetween, inputStep, inputStepDescription, allSteps, count;

const getFormElements = function() {
  form = document.querySelector('.js-form-addStep');
  if (form) {
    form.noValidate = true; //input is not validated when submitted
    // form.addEventListener('submit', onFormSubmit);
  } else if (submit) {
    submit.noValidate = true;
  }
  buttonAddStep = document.querySelector('.js-button-addStep');
  buttonAddContact = document.querySelector('.c-button__addContact');
  count = document.querySelectorAll('.js-single-step');
  if (document.title == 'Trek Je Plan - Maak een nieuw stappenplan aan') {
    buttonAddStep.addEventListener('click', onHandlerClickedAdd);
  } else if (buttonAddContact) {
    buttonAddContact.addEventListener('click', onHandlerClickedAdd);
  } else if (document.title == 'Trek Je Plan - Wijzig een stappenplan') {
    console.log('WIJZIG');
    buttonAddStep.addEventListener('click', AddToEditScheme);
  }
  inputStep = document.querySelector('.js-single-step');
  numberStep = document.querySelector('.js-step-number');
  allSteps = document.querySelector('.js-all-steps');
  inputStepDescription = document.querySelector('.js-input-description');
};

const onHandlerClickedRemove = function(e) {
  e.preventDefault();
  if (e.currentTarget.parentNode.parentNode.parentNode.querySelector('.c-contact__wrapper')) {
    removefromDB(e.currentTarget.parentNode.parentNode.parentNode.dataset.number);
    allSteps.removeChild(e.currentTarget.parentNode.parentNode.parentNode);
  } else {
    allSteps.removeChild(e.currentTarget.parentNode.parentNode.parentNode.parentNode);
    let stepNumbers = document.querySelectorAll('.js-single-step');
    let stepNumbersArr = Array.from(stepNumbers);
    stepNumbersArr.forEach(i => {
      nummer2 = i.getAttribute('data-number');
      nummer = i.dataset.number;

      if (i.dataset.number >= e.currentTarget.parentNode.parentNode.parentNode.parentNode.dataset.number) {
        nummer = parseInt(nummer) - 1;
        if (document.title == 'Trek Je Plan - Maak een nieuw stappenplan aan') {
          i.querySelector('.js-step-number').innerHTML = nummer;

          i.setAttribute('data-number', nummer);
        } else if (document.title == 'Trek Je Plan - Wijzig een stappenplan') {
          i.querySelector('.js-step-number').innerHTML = 'Stap ' + nummer;
          i.setAttribute('data-number', nummer);
        }
      }
    });
    let dataNumber = e.currentTarget.parentNode.parentNode.parentNode.parentNode.dataset.number;
    if (document.title == 'Trek Je Plan - Wijzig een stappenplan') {
      if (json && json.steps) {
        json.steps.splice(dataNumber - 1, 1);
      }
    }
  }
  //getElements();
  // if( <= ){

  // }
};

const onHandlerClickedAdd = function(e) {
  e.preventDefault();
  let inpStep = inputStep.cloneNode(true);
  count = document.querySelectorAll('.js-single-step');
  inpStep.dataset.number = count.length + 1;
  inpStep.style.display = 'block';
  if (inpStep.querySelector('.js-step-number') && inpStep.querySelector('.js-input-description')) {
    inpStep.querySelector('.js-step-number').innerHTML = inpStep.dataset.number;
    inpStep.querySelector('.c-button_addStepImage').innerHTML = `<div class="o-button-reset c-button__mainStepImage">
		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="77" height="77" viewBox="0 0 96 99">
			<defs>
				<filter id="Rectangle_20" x="0" y="4" width="95" height="95" filterUnits="userSpaceOnUse">
					<feOffset dy="3" input="SourceAlpha" />
					<feGaussianBlur stdDeviation="3" result="blur" />
					<feFlood flood-opacity="0.161" />
					<feComposite operator="in" in2="blur" />
					<feComposite in="SourceGraphic" />
				</filter>
			</defs>
			<g id="Group_954" data-name="Group 954" transform="translate(-271.5 -418.679)">
				<g transform="matrix(1, 0, 0, 1, 271.5, 418.68)" filter="url(#Rectangle_20)">
					<rect id="Rectangle_20-2" data-name="Rectangle 20" width="77" height="77" rx="5" transform="translate(9 10)" fill="#ececf0" />
				</g>
				<g id="Group_7" data-name="Group 7" transform="translate(293.5 448.679)">
					<path id="Path_238" data-name="Path 238" d="M52.208,35.483V28.656A13.656,13.656,0,0,0,38.553,15h-23.9A13.656,13.656,0,0,0,1,28.656v6.828" transform="translate(-1 21.282)" fill="none" stroke="#fff" stroke-linejoin="round" stroke-width="4.5" />
					<ellipse id="Ellipse_70" data-name="Ellipse 70" cx="13.655" cy="13.656" rx="13.655" ry="13.656" transform="translate(12.174 0)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4.5" />
				</g>
				<g id="Group_1088" data-name="Group 1088" transform="translate(239.5 113.679)">
					<circle id="Ellipse_140" data-name="Ellipse 140" cx="10" cy="10" r="10" transform="translate(108 305)" fill="#e0dee6" />
					<path id="Path_273" data-name="Path 273" d="M827,2271.6l-1.6-1.6-2.4,2.4-2.4-2.4-1.6,1.6,2.4,2.4-2.4,2.4,1.6,1.6,2.4-2.4,2.4,2.4,1.6-1.6-2.4-2.4Z" transform="translate(1144.012 -1874.738) rotate(45)" fill="#fff" />
				</g>
			</g>
		</svg>
	</div>`;
    inpStep.querySelector('.js-input-description').value = '';
  }
  let phone = inpStep.querySelector('.js-phonenumber');
  let firstname = inpStep.querySelector('.js-firstname');
  if (phone && firstname) {
    phone.value = '';
    firstname.value = '';
  }

  allSteps.appendChild(inpStep);
  stepImages = document.querySelectorAll('.c-button_addStepImage');
  if (stepImages) {
    stepImages.forEach(element => {
      element.addEventListener('click', function() {
        onHandlerClickedPopUp(true, element);
      });
    });
  }
  ListenToRemoveButton();
};

const AddToEditScheme = function(e) {
  e.preventDefault();
  let inpStep = inputStep.cloneNode(true);
  inpStep.classList.remove('u-hide');
  count = document.querySelectorAll('.js-single-step');
  inpStep.dataset.number = count.length;

  inpStep.style.display = 'block';
  if (inpStep.querySelector('.js-step-number') && inpStep.querySelector('.js-input-description')) {
    inpStep.querySelector('.js-step-number').innerHTML = 'Stap ' + inpStep.dataset.number;
    inpStep.querySelector('.js-input-description').value = '';
  }
  allSteps.appendChild(inpStep);
  getElements();
  ListenToRemoveButton();
};

const ListenToRemoveButton = function() {
  removeButton = document.querySelectorAll('.js-remove-button');
  removeButton.forEach(element => {
    element.addEventListener('click', onHandlerClickedRemove);
  });
};

document.addEventListener('DOMContentLoaded', function() {
  console.info('DOM loaded - addComponent');
  getFormElements();
});
