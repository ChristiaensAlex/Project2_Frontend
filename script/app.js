const plusButtonClicked = function() {
  console.log('Op knop gedrukt');
  newStep.insertAdjacentHTML(
    'afterend',
    `<div class="c-new-step">
  <div class="c-button_addStepImage">
      <button class="o-button-reset">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" viewBox="0 0 96 99">
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
          </button>
      </div>
      <div class="c-step-description">
              <span><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                  <circle id="Ellipse_19" data-name="Ellipse 19" cx="4" cy="4" r="4" fill="#27255F" />
              </svg></span> Stap <span>1</span>
              <label for="description">Beschrijving</label>
              <textarea rows=3 name="description" class="c-input c-input-description"></textarea>
      </div>
</div>
<div class="c-add-step c-downwardArrowAdd">
<div class="c-downwardsArrow">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="27.353" viewBox="0 0 24 27.353">
          <g id="Component_4_44" data-name="Component 4 – 44" transform="translate(0 27.353) rotate(-90)">
              <g id="Group_972" data-name="Group 972" transform="translate(4 6)">
                  <path id="Path_4" data-name="Path 4" d="M508.019,162.566l-6.2,6.2,6.2,6.2" transform="translate(-501.817 -162.566)" fill="none" stroke="#28225f" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                  <path id="Path_5" data-name="Path 5" d="M478.752,117.413h19.669" transform="translate(-476.569 -111.036)" fill="none" stroke="#28225f" stroke-linecap="round" stroke-width="3" />
              </g>
              <rect id="Rectangle_85" data-name="Rectangle 85" width="24" height="24" fill="none" />
          </g>
      </svg>

</div>
<button class="o-button-reset js-button-addStep">
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24">
          <g id="Group_1007" data-name="Group 1007" transform="translate(-181 -1013)">
              <circle id="Ellipse_148" data-name="Ellipse 148" cx="12" cy="12" r="12" transform="translate(181 1013)" fill="#1d5c5c" />
              <path id="Path_287" data-name="Path 287" d="M12,2.4,9.6,0,6,3.6,2.4,0,0,2.4,3.6,6,0,9.6,2.4,12,6,8.4,9.6,12,12,9.6,8.4,6Z" transform="translate(193.16 1016.599) rotate(45)" fill="#fff" stroke="#1d5c5c" stroke-width="1" />
          </g>
      </svg>
</button>
</div>`
  );
};
const getElements = function() {
  plusButtonBetween = document.querySelector('.js-button-addStepBetween');
  plusButton = document.querySelector('.js-button-addStep');
  newStep = document.querySelector('.c-add-step');
};
const init = function() {
  graph = document.querySelector('.js-graph');
  getElements();
  plusButtonBetween.addEventListener('click', plusButtonClicked);
  plusButton.addEventListener('click', plusButtonClicked);
};

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM geladen');
  init();
});
