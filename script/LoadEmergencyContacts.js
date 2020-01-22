let customHeaders = new Headers();
customHeaders.append("Accept", "application/json");

let MentorId = "ef4c3f22-6ac3-4143-b9cd-21a23f9ea1fe"


URIContacts = `https://localhost:44374/api/mentor/${MentorId}/contact`;

const init = function () {
    getContacts();
};


const showHtml = function (queryResponse, dataArrayContacts, dataArrayNumbers, dataArrayPictures) {
    let html = "";
    for (let i = 0; i < dataArrayContacts.length; i++) {
        html += `<div class="c-contactlist">
    					<div class="c-contact" onclick="window.location.href = 'tel:${dataArrayNumbers[i]}';">
    						<div class="c-contact__profilepic">
    							<img class="c-icon" src="${dataArrayPictures[i]}" alt="profielfoto" />
    						</div>
    						<div class="c-contact__name">${dataArrayContacts[i]}</div>
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



const fetchData = function (url) {
    fetch(url, { headers: customHeaders })
        .then(r => r.json())
        .then(data => data);
};

document.addEventListener("DOMContentLoaded", function () {
    console.info("domcontentloaded");
    init();
});