let customHeaders = new Headers();
customHeaders.append("Accept", "application/json");


ClientId = "1d32717c-4c22-40a2-650e-08d79a90abfb";
URI = `https://localhost:44374/api/client/${ClientId}/rapport`

const init = function () {
    getClientReport(URI);
};


let showTitle = function (queryResponse) {
    let title = `Rapport <span>${queryResponse.firstName + " " + queryResponse.lastName}</span>`
    document.querySelector(".js-title").innerHTML = title;
};

let showClientReport = function (dataArraySchemeName, dataArrayNumberOfTimesDone, dataArrayLastTimeInMinutes) {
    let html = "";
    for (let i = 0; i < dataArraySchemeName.length; i++) {
        html += `  <div class="c-report-scheme">
              <p class="c-report-title">${dataArraySchemeName[i]}</p>
              <div class="c-client-report">
                <div class="c-report-description">
                  <p>Aantal keer doorlopen:</p>
                  <div>Laatste tijd:</div>
                </div>
                <div class="c-report-description">
                  <p>${dataArrayNumberOfTimesDone[i]}</p>
                  <div>${dataArrayLastTimeInMinutes[i]} min</div>
                </div>
              </div>
            </div>`;
    }

    document.querySelector(".js-report-schemes").innerHTML = html;
};


let ProcessClientReport = function (queryResponse) {
    // console.log(queryResponse)

    // let FirstName = queryResponse.firstName;
    // let LastName = queryResponse.lastName;

    dataArraySchemeName = [];
    for (var addSchemeName of queryResponse.rapportDetailList) {
        let SN = addSchemeName.progressiveSchemeName;
        dataArraySchemeName.push(SN);
    };

    dataArrayNumberOfTimesDone = [];
    for (var addNumberOfTimesDone of queryResponse.rapportDetailList) {
        let NOTD = addNumberOfTimesDone.numberOfTimesDone;
        dataArrayNumberOfTimesDone.push(NOTD);
    };

    dataArrayLastTimeInMinutes = [];
    for (var addLastTimeInMinutes of queryResponse.rapportDetailList) {
        let LTIM = addLastTimeInMinutes.lastTimeInMinutes;
        dataArrayLastTimeInMinutes.push(LTIM);
    };

    //console.log(dataArraySchemeName, dataArrayNumberOfTimesDone, dataArrayLastTimeInMinutes);
    showTitle(queryResponse);
    showClientReport(dataArraySchemeName, dataArrayNumberOfTimesDone, dataArrayLastTimeInMinutes);
};

let getClientReport = async function (URI) {
    // Eerst bouwen we onze url op
    const SERVER_ENDPOINT = `${URI}`;
    // console.log(URI);
    // Met de fetch API proberen we de data op te halen.
    const response = await fetch(SERVER_ENDPOINT, { headers: customHeaders });
    const queryResponse = await response.json();

    ProcessClientReport(queryResponse);
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