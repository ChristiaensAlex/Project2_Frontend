let customHeaders = new Headers();
customHeaders.append("Accept", "application/json");

let MentorId = "aacb2362-73a9-43dc-b9de-0ce057623568"

URIMentors = "https://localhost:44374/api/mentor";
URIContacts = `https://localhost:44374/api/mentor/${MentorId}/contact`;

const init = function () {
    getMentors();
    getContacts();
};


const showHtml = function (queryResponse, dataArrayContacts, dataArrayNumbers, dataArrayPictures) {
    let html = "";
    for (const contact of queryResponse) {
        html += `<div class="c-contactlist">
    					<div class="c-contact" onclick="window.location.href = 'tel:${dataArrayNumbers}';">
    						<div class="c-contact__profilepic">
    							<img class="c-icon" src="${dataArrayPictures}" alt="profielfoto" />
    						</div>
    						<div class="c-contact__name">${dataArrayContacts}</div>
    					</div>
    				</div>`;
    }
    document.querySelector(".js-contactlist").innerHTML = html;
    console.log("toegevoegd aan queryselector");
}


let showContacts = async function (queryResponse) {
    dataArrayContacts = [];
    for (var addcontactname of queryResponse) {
        let ContactName = addcontactname.firstName;
        dataArrayContacts.push(ContactName);
    };

    dataArrayNumbers = [];
    for (var addcontactnumber of queryResponse) {
        let ContactNumber = addcontactnumber.phoneNumber;
        dataArrayNumbers.push(ContactNumber);
    };

    dataArrayPictures = [];
    for (var addcontactpicture of queryResponse) {
        let ContactPicture = addcontactpicture.profilePicture;
        dataArrayPictures.push(ContactPicture);
    };
    showHtml(queryResponse, dataArrayContacts, dataArrayNumbers, dataArrayPictures);
};



let getContacts = async function (Contact) {
    // Eerst bouwen we onze url op
    const SERVER_ENDPOINT = `${URIContacts}`;
    // Met de fetch API proberen we de data op te halen.
    const response = await fetch(SERVER_ENDPOINT, { headers: customHeaders });
    const queryResponse = await response.json();

    dataArray = [];
    showContacts(queryResponse);
};


let getMentors = async function (Contact) {
    // Eerst bouwen we onze url op
    const SERVER_ENDPOINT = `${URIMentors}`;
    // Met de fetch API proberen we de data op te halen.
    const response = await fetch(SERVER_ENDPOINT, { headers: customHeaders });
    const queryResponse = await response.json();

    console.log(queryResponse);
};

const fetchData = function (url) {
    fetch(url, { headers: customHeaders })
        .then(r => r.json())
        .then(data => data);
};

document.addEventListener("DOMContentLoaded", function () {
    console.info("domcontentloaded");
    init();
});