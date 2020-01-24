// inkomende datums zijn yyyy-mm-dd format
let customHeaders = new Headers();
customHeaders.append("Accept", "application/json");

let now;

MentorId = "EF4C3F22-6AC3-4143-B9CD-21A23F9EA1FE";
ClientId = "1d32717c-4c22-40a2-650e-08d79a90abfb";
URIStart = "https://localhost:44374/api/clientprogressiveScheme/";
URIClient = `https://localhost:44374/api/client/${ClientId}`
// console.log(URIClient);


const init = function () {
    DateToday();
    getClientInfo(URIClient);
};

const DateToday = function (today) {
    today = new Date();
    //"Tue Jan 28 2020 18:31:03 GMT+0100 (Central European Standard Time)"  omzetten naar 28%2F01%2F2020
    now = ("0" + today.getDate()).slice(-2) + "%2F" + ("0" + (today.getMonth() + 1)).slice(-2) + "%2F" + today.getFullYear();
    // console.log(now);
    TitleDay(today);
    URI = `${URIStart + MentorId}?clientId=${ClientId}&selectedDate=${now}`;
    getProgressiveSchemes(URI);
};


const DateChoosen = function (date) {
    clickedDate = ("0" + date.getDate()).slice(-2) + "%2F" + ("0" + (date.getMonth() + 1)).slice(-2) + "%2F" + date.getFullYear();
    // console.log(clickedDate);
    URI = `${URIStart + MentorId}?clientId=${ClientId}&selectedDate=${clickedDate}`
    TitleDay(date);
    getProgressiveSchemes(URI);
};

const TitleDay = function (date) {
    currentDay = new Date();
    if (date.getDate() == currentDay.getDate() || date.getDate() == null) {
        let html = "";
        html += `<h3>
                    Vandaag ${currentDay.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear()}
                </h3>`;

        document.querySelector(".js-fullDate").innerHTML = html;
    }
    else {
        let html = "";

        html += `<h3>
                    ${weekday[date.getDay()] + " " + date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear()}
                </h3>`;

        document.querySelector(".js-fullDate").innerHTML = html;
    }
};



const showNameClient = function (queryResponseClient, FirstName, LastName) {
    let html = "";
    html += `<h3>
                    Planning ${FirstName + " " + LastName}
            </h3>`;

    document.querySelector(".js-name__planning-individual-client").innerHTML = html;
};


let ShowProgressiveSchemes = function (queryResponse, dataArraySchemeName, dataArrayPictoId, dataArrayTime, dataArrayChecked) {
    console.log(dataArraySchemeName + "------" + dataArrayPictoId + "------" + dataArrayTime + "------" + dataArrayChecked);
    let html = "";
    if (dataArraySchemeName === undefined || dataArraySchemeName.length == 0) {
        html = `<div class="c-title__menu">
            <h3 class="c-hour">
                Niets gepland deze dag
            </h3>
        </div>`
    }
    else {
        for (let i = 0; i < dataArraySchemeName.length; i++) {
            console.log(dataArrayChecked);
            html += `   <div class="c-planning">
                        <div class="c-hour__specific">
                            ${dataArrayTime[i]}
                        </div>
                        <div class="c-planning__picto">
                            <!-- Hier wordt de hoofdpicto van het stappenplan gebruikt -->
                            <img class="c-icon" src="wassen.png" alt="picto_stappenplan" />
                        </div>
                        <div class="c-planning__name-indClient">
                            ${dataArraySchemeName[i]}
                        </div>
                        <!-- Een doorzichtig checkmark is alleen class c-planning_check
                        Om een groen checkmark te hebben moeten zowel c-planning__chack als c-planning__checked aanwezig zijn in dezelfde div -->
                        <div class="${dataArrayChecked[i]}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20.278" height="19.963"
                                viewBox="0 0 20.278 19.963">
                                <g id="Group_1013" data-name="Group 1013" transform="translate(-325.12 -355)">
                                    <ellipse id="Ellipse_128" data-name="Ellipse 128" cx="10.139" cy="9.981" rx="10.139"
                                        ry="9.981" transform="translate(325.12 355)" fill="#1c5c5c" />
                                    <path id="Fill_1" data-name="Fill 1"
                                        d="M4.251,8.665a.925.925,0,0,1-.663-.28L.275,5.008a.968.968,0,0,1,0-1.351.925.925,0,0,1,1.326,0l2.651,2.7L10.216.28a.925.925,0,0,1,1.325,0,.968.968,0,0,1,0,1.351L4.914,8.385a.926.926,0,0,1-.663.28"
                                        transform="translate(328.828 360.29)" fill="#fff" />
                                </g>
                            </svg>
                        </div>
                        <div class="c-planning__delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19.492" height="24" viewBox="0 0 19.492 24">
                                <g id="bin" transform="translate(0.003 0.001)">
                                    <path id="Path_316" data-name="Path 316"
                                        d="M222.96,154.7a.562.562,0,0,0-.562.562v10.623a.562.562,0,1,0,1.124,0V155.265A.562.562,0,0,0,222.96,154.7Zm0,0"
                                        transform="translate(-209.901 -146.009)" fill="#28225f" />
                                    <path id="Path_317" data-name="Path 317"
                                        d="M104.961,154.7a.562.562,0,0,0-.562.562v10.623a.562.562,0,0,0,1.124,0V155.265A.562.562,0,0,0,104.961,154.7Zm0,0"
                                        transform="translate(-98.534 -146.009)" fill="#28225f" />
                                    <path id="Path_318" data-name="Path 318"
                                        d="M1.593,7.144V20.992a3.1,3.1,0,0,0,.824,2.139A2.768,2.768,0,0,0,4.426,24H15.06a2.767,2.767,0,0,0,2.008-.868,3.1,3.1,0,0,0,.824-2.139V7.144a2.147,2.147,0,0,0-.551-4.222H14.464v-.7A2.208,2.208,0,0,0,12.238,0H7.248a2.208,2.208,0,0,0-2.226,2.22v.7H2.144a2.147,2.147,0,0,0-.551,4.222ZM15.06,22.875H4.426a1.78,1.78,0,0,1-1.709-1.883V7.193H16.769v13.8A1.78,1.78,0,0,1,15.06,22.875ZM6.146,2.219a1.083,1.083,0,0,1,1.1-1.1h4.991a1.083,1.083,0,0,1,1.1,1.1v.7H6.146Zm-4,1.827h15.2a1.012,1.012,0,0,1,0,2.023H2.144a1.012,1.012,0,1,1,0-2.023Zm0,0"
                                        transform="translate(0)" fill="#28225f" />
                                    <path id="Path_319" data-name="Path 319"
                                        d="M163.96,154.7a.562.562,0,0,0-.562.562v10.623a.562.562,0,1,0,1.124,0V155.265A.562.562,0,0,0,163.96,154.7Zm0,0"
                                        transform="translate(-154.217 -146.009)" fill="#28225f" />
                                </g>
                            </svg>

                        </div>
                    </div>`;
        }
    }
    document.querySelector(".js-plannings__individual").innerHTML = html;
};

let ProcessProgressiveSchemes = function (queryResponse) {
    dataArraySchemeName = [];
    for (var addSchemeName of queryResponse) {
        let SN = addSchemeName.schemeName;
        dataArraySchemeName.push(SN);
    };

    dataArrayPictoId = [];
    for (var addPictoId of queryResponse) {
        let PI = addPictoId.pictoId;
        dataArrayPictoId.push(PI);
    };

    dataArrayTime = [];
    for (var addTime of queryResponse) {
        let simpleTime = addTime.schedule;
        var ParcedTime = new Date(simpleTime);
        var H = ParcedTime.getHours();
        var M = ParcedTime.getMinutes();
        H = ("0" + H).slice(-2);
        M = ("0" + M).slice(-2);
        dataArrayTime.push(`${H}` + ":" + `${M}`);

    };


    dataArrayChecked = [];
    for (var addChecked of queryResponse) {
        let F = addChecked.done;
        if (F == true) {
            ischecked = "c-planning__check c-planning__checked";
        }
        else {
            ischecked = "c-planning__check";

        };
        dataArrayChecked.push(ischecked);
    }
    console.log(dataArrayChecked);
    ShowProgressiveSchemes(queryResponse, dataArraySchemeName, dataArrayPictoId, dataArrayTime, dataArrayChecked);
};


let getProgressiveSchemes = async function (URI) {
    // Eerst bouwen we onze url op
    const SERVER_ENDPOINT = `${URI}`;
    // Met de fetch API proberen we de data op te halen.
    const response = await fetch(SERVER_ENDPOINT, { headers: customHeaders });
    const queryResponse = await response.json();

    // console.log(queryResponse);
    ProcessProgressiveSchemes(queryResponse);
};


let showClientInfo = function (queryResponseClient) {
    let FirstName = queryResponseClient.firstName;
    let LastName = queryResponseClient.lastName;
    showNameClient(queryResponseClient, FirstName, LastName);
};


let getClientInfo = async function (URIClient) {
    // Eerst bouwen we onze url op
    const SERVER_ENDPOINT = `${URIClient}`;
    // Met de fetch API proberen we de data op te halen.
    const response = await fetch(SERVER_ENDPOINT, { headers: customHeaders });
    const queryResponseClient = await response.json();
    // console.log(queryResponseClient);
    showClientInfo(queryResponseClient);
};

const fetchData = function (url) {
    fetch(url, { headers: customHeaders })
        .then(r => r.json())
        .then(data => data);
};


// meegeven: mentorid (verplicht), clientid , datum in dd/mm/yyyy format

//response example = 
// {
//     "clientId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     "firstName": "string",
//     "lastName": "string",
//     "pictoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     "schemeName": "string",
//     "currentStep": 0,
//     "schedule": "2020-01-20T17:10:12.880Z",
//     "done": true
// }

document.addEventListener("DOMContentLoaded", function () {
    console.info("domcontentloaded");
    init();
});