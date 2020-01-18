let fullName, fullNameArr, clients;

const showAllClients = function(jsonObject) {
	for (i in jsonObject) {
		console.log(jsonObject[i]);
		clients.innerHTML += `<div class="c-client">
        <div class="c-client__userPhoto js-client">
          <img class="c-icon" src="icon_Chloë.png" alt="profielfoto" />
        </div>
        <div class="c-client__name js-client" clientnr="${i}">
          ${jsonObject[i].firstName + ' ' + jsonObject[i].lastName}
        </div>
        <div class="c-client__delete js-client-delete">
          <svg xmlns="http://www.w3.org/2000/svg" width="19.492" height="24" viewBox="0 0 19.492 24">
            <g id="bin" transform="translate(0.003 0.001)">
              <path id="Path_316" data-name="Path 316" d="M222.96,154.7a.562.562,0,0,0-.562.562v10.623a.562.562,0,1,0,1.124,0V155.265A.562.562,0,0,0,222.96,154.7Zm0,0" transform="translate(-209.901 -146.009)" fill="#28225f" />
              <path id="Path_317" data-name="Path 317" d="M104.961,154.7a.562.562,0,0,0-.562.562v10.623a.562.562,0,0,0,1.124,0V155.265A.562.562,0,0,0,104.961,154.7Zm0,0" transform="translate(-98.534 -146.009)" fill="#28225f" />
              <path id="Path_318" data-name="Path 318" d="M1.593,7.144V20.992a3.1,3.1,0,0,0,.824,2.139A2.768,2.768,0,0,0,4.426,24H15.06a2.767,2.767,0,0,0,2.008-.868,3.1,3.1,0,0,0,.824-2.139V7.144a2.147,2.147,0,0,0-.551-4.222H14.464v-.7A2.208,2.208,0,0,0,12.238,0H7.248a2.208,2.208,0,0,0-2.226,2.22v.7H2.144a2.147,2.147,0,0,0-.551,4.222ZM15.06,22.875H4.426a1.78,1.78,0,0,1-1.709-1.883V7.193H16.769v13.8A1.78,1.78,0,0,1,15.06,22.875ZM6.146,2.219a1.083,1.083,0,0,1,1.1-1.1h4.991a1.083,1.083,0,0,1,1.1,1.1v.7H6.146Zm-4,1.827h15.2a1.012,1.012,0,0,1,0,2.023H2.144a1.012,1.012,0,1,1,0-2.023Zm0,0" transform="translate(0)" fill="#28225f" />
              <path id="Path_319" data-name="Path 319" d="M163.96,154.7a.562.562,0,0,0-.562.562v10.623a.562.562,0,1,0,1.124,0V155.265A.562.562,0,0,0,163.96,154.7Zm0,0" transform="translate(-154.217 -146.009)" fill="#28225f" />
            </g>
          </svg>
        </div>
      </div>`;
	}
	ListenToClients(jsonObject);
};

const ListenToClients = function(jsonObject) {
	clients = document.querySelectorAll('.js-client');
	for (client of clients) {
		client.addEventListener('click', function(event) {
			console.log(this);
			let nr = this.getAttribute('clientnr');
			console.log(nr);
			clientId = jsonObject[nr].id;
			sessionStorage.clientId = clientId;
			console.log(clientId);
			window.location.href = 'DetailInfoClient.html';
		});
	}
};
const getAPI = function(url) {
	

	fetch(url)
		.then(function(response) {
			if (!response.ok) {
				throw Error(`Problem to fetch(). Status code: ${response.status}`);
			} else {
				return response.json();
			}
		})
		.then(function(jsonObject) {
			showAllClients(jsonObject);
			console.log(jsonObject);
		})
		.catch(function(error) {
			console.error(`Problem to process json ${error} `);
		});
};
const initClients = function() {
	mentorId = 'ef4c3f22-6ac3-4143-b9cd-21a23f9ea1fe';
	getAPI(`https://localhost:44374/api/client/`);
	clients = document.querySelector('.c-clients');
};
document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded');
	initClients();
});
