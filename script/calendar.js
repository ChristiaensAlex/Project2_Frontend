/*Om de calendar te gebruiken laat je vanillaCalendar.js en calendar.js gewoon staan zoals het is.
Dan kan je de aangeklikte dag ophalen in je eigen .js file door 

const DateChoosen = date => {
    console.log(date);
}

toe te voegen aan je .js file
dan zorg je ervoor dat je in je html file de vanillaCalendar.js , calendar.js en je eigen .js file aanspreekt

*/

let $containerEvening, $containerMorning, $containerAfternoon;
let today;
let thisMonth;
let fullDate;

const weekday = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
const month = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

const initCalendar = () => {
    today = new Date().getFullYear() + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + ("0" + new Date().getDate()).slice(-2)
    thisMonth = new Date().getMonth() + 1;

    // now = new Date();
    // // met today krijg je de datum van vandaag terug als yyyy-mm-dd format
    // // console.log("calendar.js " + today);
    // DateToday(now);


    const $date = document.querySelector(".js-date");
    $date.innerHTML = month[new Date().getMonth()] + " " + new Date().getFullYear();
    $date.innerHTML += " <span></span>"

    $date.getElementsByTagName("span")[0].innerHTML = weekday[new Date().getDay()];
}

const DateClickedHandler = e => {
    fullDate = new Date(e.currentTarget.dataset.calendarDate);
    const date = fullDate.getFullYear() + "-" + ("0" + (fullDate.getMonth() + 1)).slice(-2) + "-" + ("0" + fullDate.getDate()).slice(-2)

    // je krijgt de datum die je aangeklikt hebt terug als yyyy-mm-dd format
    // console.log("calendar.js " + fullDate)
    DateChoosen(fullDate);

    const $date = document.querySelector(".js-date");
    $date.innerHTML = month[fullDate.getMonth()] + " " + fullDate.getFullYear();
    $date.innerHTML += " <span></span>"

    // $date.getElementsByTagName("span")[0].innerHTML = weekday[fullDate.getDay()];
}



document.addEventListener('DOMContentLoaded', () => {
    console.info('DOM loaded calendar.js');
    initCalendar();
});

window.addEventListener('load', function () {
    vanillaCalendar.init();
})
