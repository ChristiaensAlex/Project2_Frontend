let imgInput;
let removeImgBtn;
let uploadImgDiv;
let uploadedImg = [];
let selectedimg  = '';
let isCover = false
let canvas;
let ctx;
let file;
let reader;
let croppedImg; 
let profileImg;
let index;

const getElements = function() {
  
    canvas = document.querySelector(".canvas");
    if (canvas){
      ctx = canvas.getContext("2d");
      canvas.width = 104;
      canvas.width = 104;
    }

    uploadImgDiv = document.querySelectorAll('.js-upload-img');
    imgInput = document.querySelectorAll('.js-input-img');
    removeImgBtn = document.querySelectorAll('.js-remove-img');

 

    if (uploadImgDiv.length > 0){
      //uploadedImg = [];
      imgInput.forEach((element, i) => {
        //uploadedImg.push('profile-icon.svg')
        index = i,
        element.addEventListener('change', event => {

          previewProfileImg(event, i)
        });
      });
      removeImgBtn.forEach((element, i) => {
        index = i,
        element.addEventListener('click', () => {
          removeProfileImg(i);
        });
      });    
      console.log(uploadedImg)  

      uploadedImg[index] = selectedimg;
      if (selectedimg) {
        uploadedImg[index] = selectedimg;
      } else {
        uploadedImg[index] = 'profile-icon.svg';
      }
      if (!uploadedImg[index].includes('profile-icon.svg')) {
        isCover = true;
      }
  
      showUploadImg(index);
    }
  }

const previewProfileImg =  function(event, i) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    file = event.target.files[0];
    reader = new FileReader();

    const image = new Image();

    if (file) {
      reader.readAsDataURL(file);
      isCover = true;
    }

    reader.onloadend = () => {
      uploadedImg[i] =  reader.result;
      image.crossOrigin = 'Anonymous';
      image.src = uploadedImg[i];
      showUploadImg(i);
      checkIsCover(i);

    };

    image.onload = () => {
      fit(ctx, image, false, canvas.width, canvas.height, image.width, image.height, i);
    };
  }

  const fit = function(ctx, image, contains, parentWidth, parentHeight, childWidth, childHeight, i,  scale = 1, offsetX = 0.5, offsetY = 0.5) {
    const childRatio = childWidth / childHeight;
    const parentRatio = parentWidth / parentHeight;
    let width = parentWidth * scale;
    let height = parentHeight * scale;

    if (contains ? (childRatio > parentRatio) : (childRatio < parentRatio)) {
      height = width / childRatio;
    } else {
      width = height * childRatio;
    }

    offsetX = (parentWidth - width) * offsetX;
    offsetY = (parentHeight - height) * offsetY;

    ctx.drawImage(image, offsetX, offsetY, width, height);
    croppedImg = canvas.toDataURL('image/png');

    showcroppedImg(i);
  }

  const removeProfileImg = function(i) {
    uploadImgDiv[i].classList.remove("c-upload-image--big");
    uploadedImg[i] = 'profile-icon.svg';
    showUploadImg(i);
    croppedImg = '';
    showcroppedImg(i);
    isCover = false;
    checkIsCover(i);
  }


  const checkIsCover = function(i) {
      if (isCover){
        uploadImgDiv[i].classList.add('c-upload--no-image');
      }else {
        uploadImgDiv[i].classList.remove('c-upload--no-image');
      }
  
  }

  const showUploadImg = function(i){
    uploadImgDiv[i].style.backgroundImage = `url(${uploadedImg[index]})`;
  }


  const showcroppedImg= function(i){
   
    if(croppedImg == ''){
      removeImgBtn[i].classList.remove("c-upload-image__close")
      removeImgBtn[i].classList.add("c-upload-image__select")
    }else {
      removeImgBtn[i].classList.add("c-upload-image__close")  
      removeImgBtn[i].classList.remove("c-upload-image__select")  
    }
}


document.addEventListener('DOMContentLoaded', function() {
	console.info('DOM loaded - addProfileImage');
	getElements();
});

