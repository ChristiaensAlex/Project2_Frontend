let baseURL = 'https://localhost:44374/api/',
	json;
const showContacts = function(jsonObject) {
	html = '';
	i = 1;
	for (object of jsonObject) {
		console.log(object);
		html += `<div class="js-single-step" data-number="${i}"> 
        <div class="c-contact__wrapper" >
        <div class="c-profile" >
            <div>
                Kies een profielfoto
            </div>
            <div class="c-stepplan__pencil">
                <svg xmlns="http://www.w3.org/2000/svg" width="14.65" height="14.579"
                    viewBox="0 0 14.65 14.579">
                    <g id="pencil-edit-button" transform="translate(-0.001 -1.289)">
                        <path id="Path_288" data-name="Path 288"
                            d="M9.11,3.722,12.09,6.7,4.547,14.245l-2.978-2.98ZM14.352,3,13.023,1.674a1.319,1.319,0,0,0-1.863,0L9.887,2.947l2.98,2.98,1.485-1.485A1.016,1.016,0,0,0,14.352,3ZM.009,15.454a.339.339,0,0,0,.41.4l3.321-.805L.762,12.072Z"
                            transform="translate(0)" fill="#291f5f" />
                    </g>
                </svg>
    
            </div>
            <div class="c-delete  js-remove-button">
                <svg class="c-icon" xmlns="http://www.w3.org/2000/svg" width="19.492" height="24" viewBox="0 0 19.492 24">
                    <g id="bin" transform="translate(0.003 0.001)">
                        <path id="Path_316" data-name="Path 316" d="M222.96,154.7a.562.562,0,0,0-.562.562v10.623a.562.562,0,1,0,1.124,0V155.265A.562.562,0,0,0,222.96,154.7Zm0,0" transform="translate(-209.901 -146.009)" fill="#28225f" />
                        <path id="Path_317" data-name="Path 317" d="M104.961,154.7a.562.562,0,0,0-.562.562v10.623a.562.562,0,0,0,1.124,0V155.265A.562.562,0,0,0,104.961,154.7Zm0,0" transform="translate(-98.534 -146.009)" fill="#28225f" />
                        <path id="Path_318" data-name="Path 318" d="M1.593,7.144V20.992a3.1,3.1,0,0,0,.824,2.139A2.768,2.768,0,0,0,4.426,24H15.06a2.767,2.767,0,0,0,2.008-.868,3.1,3.1,0,0,0,.824-2.139V7.144a2.147,2.147,0,0,0-.551-4.222H14.464v-.7A2.208,2.208,0,0,0,12.238,0H7.248a2.208,2.208,0,0,0-2.226,2.22v.7H2.144a2.147,2.147,0,0,0-.551,4.222ZM15.06,22.875H4.426a1.78,1.78,0,0,1-1.709-1.883V7.193H16.769v13.8A1.78,1.78,0,0,1,15.06,22.875ZM6.146,2.219a1.083,1.083,0,0,1,1.1-1.1h4.991a1.083,1.083,0,0,1,1.1,1.1v.7H6.146Zm-4,1.827h15.2a1.012,1.012,0,0,1,0,2.023H2.144a1.012,1.012,0,1,1,0-2.023Zm0,0" transform="translate(0)" fill="#28225f" />
                        <path id="Path_319" data-name="Path 319" d="M163.96,154.7a.562.562,0,0,0-.562.562v10.623a.562.562,0,1,0,1.124,0V155.265A.562.562,0,0,0,163.96,154.7Zm0,0" transform="translate(-154.217 -146.009)" fill="#28225f" />
                    </g>
                </svg>
            </div>
            <button class="o-button-reset c-button__addProfilePic">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="96" height="99" viewBox="0 0 96 99">
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

        <p class="js-firstname-field">
            <label class="c-label" for="FirstName">Voornaam</label>
            <input class="c-input js-firstname " type="text" name="FirstName" value="${object.firstName}"/>
        </p>
        <div class="c-addPhonenumber">
            <label class="c-label" for="PhoneNumber">Telefoonnummer</label>
            <input class="c-input js-phonenumber" type="tel" name="PhoneNumber" value="${object.phoneNumber}"/>
            <p>
                Bij nood kunnen je cliënten je via dit nummer bereiken en je herkennen aan je foto
            </p>
        </div>
    </div>
</div>
</div></div>`;
		i++;
	}
	document.querySelector('.js-all-steps').innerHTML += html;
	getFormElements();
	ListenToPencil(jsonObject);
};
const getContacts = function(id) {
	let url = `${baseURL}mentor/${id}/contact`;
	fetch(url)
		.then(function(response) {
			if (!response.ok) {
				throw Error(`Problem to fetch(). Status code: ${response.status}`);
			} else {
				let arr = new Array();
				arr = response.json();
				console.log(arr);
				return arr;
			}
		})
		.then(function(jsonObject) {
			json = jsonObject;
			console.log(jsonObject);
			showContacts(jsonObject);
		})
		.catch(function(error) {
			console.log(error);
			console.error(`Problem to process json $`);
		});
};

const getContactElements = function() {
	submit = document.querySelector('.js-submitButton');
	phonenumber = document.querySelector('.js-phonenumber');
	firstname = document.querySelector('.js-firstname');
	//ListenToSubmit();
};
const ListenToPencil = function(jsonObject) {
	let pencils = document.querySelectorAll('.c-stepplan__pencil');
	for (p of pencils) {
		p.addEventListener('click', function() {
			console.log(this.parentElement.parentElement);
			console.log(this.parentElement.parentElement.querySelector('.js-firstname').value);
			let chosenContact = this.parentElement.parentElement.parentElement.getAttribute('data-number');
			console.log(chosenContact);

			EditContact(jsonObject[chosenContact - 1]);
		});
	}
};

const EditContact = function(chosenContact) {
	console.log(chosenContact);
};

const removefromDB = function(i) {
	i = parseInt(i) - 1;
	console.log(i);
	console.log('removed: ' + json[i].firstName);
};
document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded - contact');
	let id = 'EF4C3F22-6AC3-4143-B9CD-21A23F9EA1FE';
	getContactElements();
	getContacts(id);
});
