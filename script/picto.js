let mainPictoFile, pictoTags, tags; 

const listenToSubmit = function(pictureName){
    console.log("Luister naar submit")
}

const postMainPicto = function(file, tags){
    var formData = new FormData(); 
    formData.append("tags", tags); 
    formData.append("file", file); 
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

                listenToSubmit(data.imageName); 
                showPictos(data); 
            })
            .catch(err => console.log(err));
};

const init = function(){
    const mainPicto = document.querySelector('.js-uploadMainPicto'); 
    if(mainPicto){
    mainPicto.addEventListener('change', function(){
        mainPictoFile = this.files[0]; 
    })
    const pictoTag = document.querySelector('.js-tagInput'); 
    pictoTag.addEventListener('blur', function(){
        tags = this.value; 
        if(tags.indexOf(',')> -1){
            let arr = tags.split(",");
            let tagArr = []; 
            for(i in arr){
                tagArr.push(arr[i]); 
            }
            pictoTags = tagArr; 
        }
        else{
            pictoTags = tags;
        }
        if(pictoTags && mainPictoFile){
            postMainPicto(mainPictoFile, pictoTags); 
        }
    })
}
}

const OnHandlerClickedShowPicto = function(imgSource, dataImg){
    background.classList.remove('c-popup-blur');
    popup.style.display = 'none';
    divElement.innerHTML = `<img class="c-selectedPicto js-selected-picto" src="${imgSource}" width="104px" height="auto" data-img="${dataImg}"/>`
}

const listenToSelectSubmit = function(selectedPicto){
    let selected = selectedPicto.querySelector('.c-choose__picto-img');
    let selectSubmit = document.querySelector('.c-submitbutton-picto'); 
    selectSubmit.addEventListener('click', function(){
        OnHandlerClickedShowPicto(selected.src, selected.dataset.img)}); 
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
          if (sessionStorage.getItem("clickedStepDataNumber")){
            let StepPictoName = json[i].name; 
            sessionStorage.StepPictoName = StepPictoName; 
          }else {
            let mainPictoName = json[i].name; 
            sessionStorage.mainPictoName = mainPictoName; 
          }

          listenToSelectSubmit(this);
        })
    }
    
}

const showPictos = function(json){
    for(i in json){
        let pictoClone = picto.cloneNode(true); 
        pictoClone.classList.remove('u-hide'); 
        let pictoC = json[i]
        let pictoSource = pictoClone.querySelector('.c-choose__picto-img');
        pictoClone.setAttribute('pictonr', i); 
        if(pictoC.name){
        pictoSource.src = `https://trekjeplan.blob.core.windows.net/pictos/${pictoC.name}`; }
        pictoSource.dataset.img = pictoC.name;
        pictos.appendChild(pictoClone); 
        
    }

    listenToSelect(json);
}

const getPictos = function(url, filtered){
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
            if(jsonObject){
                if(filtered == true){
                    showFilteredPictos(json);
                }
                else if(filtered == false){
            showPictos(json); 
        }}
		})
		.catch(function(error) {
			console.log(error);
			console.error(`Problem to process json ${error}`);
		});
}

const listenToSearch = function(){
    let searchPicto = document.querySelector('.c-input-search'); 
    searchPicto.addEventListener('input', function(){
        let url = `${baseURL}picto?search=${searchPicto.value}`; 
        getPictos(url, true); 
    })
}

document.addEventListener('DOMContentLoaded', function(){
    console.log('DOM loaded - Picto'); 
    let baseURL ='https://trekjeplan.azurewebsites.net/api/';
    let url = `${baseURL}picto`;
    pictos = document.querySelector('.c-choose'); 
    picto = document.querySelector('.c-choose__picto');
    init(); 
    
    getPictos(url, false); 
    listenToSearch(); 

})