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
        headers: { 'Content-Type': 'application/json' },
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
document.addEventListener('DOMContentLoaded', function(){
    console.log('DOM loaded - Picture'); 
    init(); 
})