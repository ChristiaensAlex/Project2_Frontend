let json, mentorId;
const putContacts = function(payload, mentorId) {
	console.log('put client info');
	let body = JSON.stringify(payload);
	console.log(body);
	fetch(`${baseURL}mentor/${mentorId}/contact`, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'application/json' },
		body: body
	})
		.then(res => {
			console.log(res.status);
			window.location.href = 'MentorHasClientList.html';
		})
		// .then(data => {
		// 	console.log(data); // ;
		// })
		.catch(err => console.log(err));
};
const editContacts = function(jsonObject) {
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
	ListenToRemoveButton();
	//ListenToPencil(jsonObject);
};
const showContacts = function(jsonObject) {
	console.log('show op profile page');
	html = '';
	i = 1;
	for (object of jsonObject) {
		console.log(object);
		html += `<div class="js-single-step" data-number="${i}"> 
        <div class="c-contact__wrapper" >
        <div class="c-contact__info" >
         
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
        <div>
		<label class="c-label__profile">Voornaam:</label>
		<p class="c-profile__info ">${object.firstName}</p>
		<label class="c-label__profile">Telefoonnummer:</label>
		<p class="c-profile__info ">${object.phoneNumber}</p>
        </div>
    </div>
</div>
</div></div>`;
		i++;
	}
	document.querySelector('.js-all-steps').innerHTML += html;
};
const getContacts = function(baseURL, id) {
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

			if (submit) {
				editContacts(jsonObject);
			} else {
				showContacts(jsonObject);
			}
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
	if (submit) {
		ListenToSubmit(submit);
	}
};
// const ListenToPencil = function(jsonObject) {
// 	let pencils = document.querySelectorAll('.c-stepplan__pencil');
// 	for (p of pencils) {
// 		p.addEventListener('click', function() {
// 			console.log(this.parentElement.parentElement);
// 			console.log(this.parentElement.parentElement.querySelector('.js-firstname').value);
// 			let chosenContact = this.parentElement.parentElement.parentElement.getAttribute('data-number');
// 			console.log(chosenContact);

// 			EditContact(jsonObject[chosenContact - 1]);
// 		});
// 	}
// };

const EditContact = function(chosenContact) {
	console.log(chosenContact);
};

const removefromDB = function(i) {
	i = parseInt(i) - 1;
	console.log(i);
	let contactId = json[i].id;
	//contactId = 0;

	console.log('removed: ' + contactId);
	let url = `${baseURL}mentor/${mentorId}/contact/${contactId}`;
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

const ListenToSubmit = function(button) {
	button.addEventListener('click', function(event) {
		event.preventDefault();
		let payload = [];
		allContacts = document.querySelectorAll('.js-single-step');
		console.log(allContacts);
		counter = 0;
		console.log(json);
		for (object of json) {
			object.firstName = allContacts[counter].querySelector('.js-firstname').value;
			object.phoneNumber = allContacts[counter].querySelector('.js-phonenumber').value;
			object.profilePicture = 'string';
			console.log(object);
			payload.push(object);
			counter++;
		}

		for (i = counter; i < allContacts.length; i++) {
			let contact = {
				firstName: allContacts[i].querySelector('.js-firstname').value,
				phoneNumber: allContacts[i].querySelector('.js-phonenumber').value,
				profilePicture: 'profilepic'
			};

			payload.push(contact);
		}

		putContacts(payload, mentorId);
	});
};
document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded - contact');
	baseURL = 'https://trekjeplan.azurewebsites.net/api/';
	mentorId = localStorage.getItem('mentorId');
	getContactElements();
	getContacts(baseURL, mentorId);
});
