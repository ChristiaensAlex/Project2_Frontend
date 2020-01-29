let baseURL = 'https:/trekjeplan.azurewebsites.net/api/',
  frontBar,
  root,
  clientTotalCoins;
// let clientId = "f9f0e169-890a-495d-a8fe-08d7a3514425";

const drawEndbar = function() {
  console.log(sessionStorage.coinsToEarn);
  let storage = sessionStorage.coinsToEarn;
  let star = 0;
  let earnedCoins = parseInt(storage);
  let newLengthFrontBar = clientTotalCoins + earnedCoins;
  frontBar.style.width = newLengthFrontBar + '%';
  frontBar.style.animation = 'extension 2s';
  root.style.setProperty('--global-newCoins', newLengthFrontBar + '%');
  if (newLengthFrontBar > 100) {
    newLengthFrontBar = newLengthFrontBar - 100;
    console.log('--------------------');
    console.log(newLengthFrontBar);
    star += 1;
    frontBar.style.width = newLengthFrontBar + '%';
    frontBar.style.animation = 'extension 2s';
    root.style.setProperty('--global-newCoins', newLengthFrontBar + '%');
  }
  if (star == 1) {
    var emptyStar = document.querySelector('.c-star__empty');
    emptyStar.classList.add('u-hide');
    var fullStar = document.querySelector('.c-star__full');
    fullStar.classList.remove('u-hide');
  }
  //getCurrentCoins(clientId);
  setTimeout(function() {
    window.location.href = 'MainMenuClient.html';
  }, 4000);
};

const drawStartBar = function(currentCoins) {
  frontBar = document.querySelector('.c-congrats__bar-progress');
  let lengthFrontbar = currentCoins;
  frontBar.style.width = lengthFrontbar + '%';
  root = document.documentElement;
  root.style.setProperty('--global-previousCoins', lengthFrontbar + '%');
  drawEndbar();
};

const getCurrentCoins = function(id) {
  let url = `${baseURL}client`;
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
      json.forEach(element => {
        if (element.id == id) {
          clientTotalCoins = parseInt(element.clientTotalCoins);
          drawStartBar(element.clientTotalCoins);
        }
      });
    })
    .catch(function(error) {
      console.error(`Problem to process json ${error}`);
    });
};
const initProgressBar = function() {
  getCurrentCoins(sessionStorage.clientId);
};

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded - Progress bar');
  initProgressBar();
});
