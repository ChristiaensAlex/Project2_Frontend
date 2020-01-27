let mainPictoFile, pictoTags, pictos, picto;  
const postMainPicto = function(file, tags){
    console.log("post"); 
    console.log(file); 
    var formData = new FormData(); 
    formData.append("tags", tags); 
    formData.append("file", file); 
    console.log("BASE"); 
    console.log(baseURL); 
    let url = `${baseURL}picto`
    
    
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data); 
            })
            .catch(err => console.log(err));
};

const init = function(){
    const mainPicto = document.querySelector('.js-uploadMainPicto'); 
    console.log(mainPicto); 
    if(mainPicto){
    mainPicto.addEventListener('change', function(){
        mainPictoFile = this.files[0]; 
        console.log(mainPictoFile)
    })
    const pictoTag = document.querySelector('.js-tagInput'); 
    console.log(pictoTag);
    pictoTag.addEventListener('blur', function(){
        console.log(mainPictoFile);
        tags = this.value; 
        console.log(mainPictoFile); 
        if(tags.indexOf(',')> -1){
            let arr = tags.split(",");
            let tagArr = []; 
            for(i in arr){
                tagArr.push(arr[i]); 
            }
            pictoTags = tagArr; 
            console.log(tagArr)
        }
        else{
            pictoTags = tags;
            console.log(pictoTags)
        }
        if(pictoTags && mainPictoFile){
            postMainPicto(mainPictoFile, pictoTags); 
        }
    })
}
}

const listenToSelect = function(json){
    let pictos = document.querySelectorAll('.c-choose__picto'); 
    for(eachPicto of pictos){
        eachPicto.addEventListener('click', function(){
            this.innerHTML += `<div class="c-picto__selected c-checkmark">
            <svg xmlns="http://www.w3.org/2000/svg" width="20.278" height="19.963" viewBox="0 0 20.278 19.963">
              <g id="Group_1013" data-name="Group 1013" transform="translate(-325.12 -355)">
                <ellipse id="Ellipse_128" data-name="Ellipse 128" cx="10.139" cy="9.981" rx="10.139" ry="9.981" transform="translate(325.12 355)" fill="#1c5c5c" />
                <path id="Fill_1" data-name="Fill 1" d="M4.251,8.665a.925.925,0,0,1-.663-.28L.275,5.008a.968.968,0,0,1,0-1.351.925.925,0,0,1,1.326,0l2.651,2.7L10.216.28a.925.925,0,0,1,1.325,0,.968.968,0,0,1,0,1.351L4.914,8.385a.926.926,0,0,1-.663.28" transform="translate(328.828 360.29)" fill="#fff" />
              </g>
            </svg>
          </div>`;
          let i = this.getAttribute('pictonr'); 
          let mainPictoName = json[i].name; 
          sessionStorage.mainPictoName = mainPictoName; 
          console.log(sessionStorage.mainPictoName)
        })
    }
    listenToSelectSubmit();
}

const showPictos = function(json){
    for(i in json){
        let pictoClone = picto.cloneNode(true); 
        pictoClone.classList.remove('u-hide'); 
        let pictoC = json[i]
        let pictoSource = pictoClone.querySelector('.c-choose__picto-img');
        console.log(pictoSource); 
        pictoClone.setAttribute('pictonr', i); 
        console.log(pictoClone.getAttribute('pictonr')); 
        pictoSource.src = `https://trekjeplan.blob.core.windows.net/pictos/${pictoC.name}`; 
        pictos.appendChild(pictoClone); 
    }
    let chosenPicto = JSON.parse(sessionStorage.clickedStepPicto)
    console.log(chosenPicto)
    console.log(sessionStorage.mainPictoName)
    listenToSelect(json);
}

const showFilteredPictos = function(json){
    console.log("Gefilterde");
    pictos.innerHTML = ''; 
    for(i in json){
        let pictoClone = picto.cloneNode(true); 
        pictoClone.classList.remove('u-hide'); 
        let pictoC = json[i]
        let pictoSource = pictoClone.querySelector('.c-choose__picto-img');
        console.log(pictoSource); 
        pictoClone.setAttribute('pictonr', i); 
        console.log(pictoClone.getAttribute('pictonr')); 
        pictoSource.src = `https://trekjeplan.blob.core.windows.net/pictos/${pictoC.name}`; 
        pictos.appendChild(pictoClone); 
    }
    listenToSelect(json); 
}

const getPictos = function(url, filtered){
    console.log("get"); 
    console.log(url)
    fetch(url)
    .then(function(response) {
        if (!response.ok) {
            throw Error(`Problem to fetch(). Status code: ${response.status}`);
        } else {
            return response.json();
        }
    })
		.then(function(jsonObject) {
			json = jsonObject;
            console.log(jsonObject);
            console.log("Filtered" + filtered)
            if(jsonObject){
                if(filtered == true){
                    showFilteredPictos(json);
                }
                else if(filtered == false){
            showPictos(json); }}
			//showContacts(jsonObject);
		})
		.catch(function(error) {
			console.log(error);
			console.error(`Problem to process json $`);
		});
}

const listenToSearch = function(){
    let searchPicto = document.querySelector('.c-input-search'); 
    console.log(searchPicto)
    searchPicto.addEventListener('input', function(){
        console.log("Er verandert hier gelijk iets");
        let url = `${baseURL}picto?search=${searchPicto.value}`; 
        getPictos(url, true); 
    })
}

const fillMainPicto = function(){
    //console.log(sessionStorage.mainPictoName); 
    console.log()
    console.log(JSON.parse(sessionStorage.clickedStepPicto))
    console.log("HISTORY")
    console.log(history); 
    console.log("stap waar ik op klikte");
    let stepPicto = sessionStorage.clickedStepPicto;
    console.log(stepPicto)
        console.log("in if")
        if(sessionStorage.mainPictoName){
        let mainPictoImage = document.querySelector('.c-button__mainStepImage'); 
        console.log(mainPictoImage)
        mainPictoImage.innerHTML=`<img src="https://trekjeplan.blob.core.windows.net/pictos/${sessionStorage.mainPictoName}" class='js-mainPicto' >`; }
    
        
        console.log(JSON.parse(stepPicto));
        stepPicto.innerHTML = `<img src="https://trekjeplan.blob.core.windows.net/pictos/${sessionStorage.mainPictoName}" class='js-mainPicto' >`; 
        
    
}

const showMainPicto = function(){
    window.location.href = 'CreateProgressiveScheme.html'; 
}

const loadImage = function(){ 
    window.location.href = 'ChoosePhoto.html'; 
    console.log("STORAGE");
    console.log(JSON.parse(sessionStorage.clickedStepPicto));
    
}

const listenToSelectSubmit = function(){
    let selectSubmit = document.querySelector('.c-submitbutton'); 
    selectSubmit.addEventListener('click', showMainPicto)
}

document.addEventListener('DOMContentLoaded', function(){
    console.log('DOM loaded - Picture'); 
    let baseURL ='https://localhost:44374/api/';
    let url = `${baseURL}picto`;
    pictos = document.querySelector('.c-choose'); 
    picto = document.querySelector('.c-choose__picto');
    init(); 
    
    if(document.title =='Trek Je Plan - Kies een afbeelding'){
        getPictos(url, false); 
        listenToSearch();
    }else if(document.title == 'Trek Je Plan - Maak een nieuw stappenplan aan'){
        fillMainPicto();  }
})