let baseURL = "https://localhost:44374/api/", frontBar, root; 

const drawEndbar = function(){
    let earnedCoins = 30; 
    let newLengthFrontBar = earnedCoins; 
    frontBar.style.width = newLengthFrontBar + "%"; 
    frontBar.style.animation = "extension 2s"; 
    root.style.setProperty('--global-newCoins', newLengthFrontBar+ "%"); 
}

const drawStartBar= function(currentCoins){
    console.log(currentCoins);
    frontBar = document.querySelector('.c-congrats__bar-progress'); 
    console.log(frontBar); 
    let lengthFrontbar = currentCoins;
    console.log("length: " + lengthFrontbar); 
    frontBar.style.width = lengthFrontbar + "%";
    root = document.documentElement; 
    root.style.setProperty('--global-previousCoins', lengthFrontbar + "%");
    drawEndbar(); 
}

const getCurrentCoins = function(id){
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
                console.log(json);
                json.forEach(element =>{ 
                    if(element.id == id){ 
                        drawStartBar(element.clientTotalCoins); 
                    }
                }); 
            })
            .catch(function(error) {
                console.log(error);
                console.error(`Problem to process json ${error}`);
            });
    
}
const initProgressBar = function(){
    let clientId = '3b0e727c-d59b-4188-17d4-08d79c1917ed'; 
    getCurrentCoins(clientId); 
    // SESSIONSTORAGE: INGELOGDE CLIENT
}

document.addEventListener('DOMContentLoaded', function(){
    console.log('DOM Content Loaded - Progress bar'); 
    initProgressBar();
})