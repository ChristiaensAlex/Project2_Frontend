let mainPictoFile, pictoTags; 
let baseURL = 'https://localhost:44374/api/'; 
const postMainPicto = function(file, tags){
    console.log("post"); 
    console.log(file); 
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
                console.log(data); 
            })
            .catch(err => console.log(err));
    };

const init = function(){
    const mainPicto = document.querySelector('.js-uploadMainPicto'); 
    console.log(mainPicto); 
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
    console.log(pictoTags); 
    console.log(mainPictoFile)
    
    
}

const showPictos = function(json){
    for(i in json){
        let pictos = document.querySelector('.c-choose'); 
        let picto = document.querySelector('.c-choose__picto');
        let pictoClone = picto.cloneNode(true); 
        pictoClone.classList.remove('u-hide'); 
        let pictoC = json[i]
        let pictoSource = pictoClone.querySelector('.c-choose__picto-img');
        console.log(pictoSource); 
        pictoSource.src = `https://trekjeplan.blob.core.windows.net/pictos/${pictoC.name}`; 
        pictos.appendChild(pictoClone); 
    }
}

const getPictos = function(){
    console.log("get"); 
    let url = `${baseURL}picto`;
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
            if(jsonObject){
            showPictos(json); }
			//showContacts(jsonObject);
		})
		.catch(function(error) {
			console.log(error);
			console.error(`Problem to process json $`);
		});
}

document.addEventListener('DOMContentLoaded', function(){
    console.log('DOM loaded - Picture'); 
    init(); 
    getPictos(); 
})