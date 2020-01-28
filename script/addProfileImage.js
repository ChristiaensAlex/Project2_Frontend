let imgInput;
let removeImgBtn;
let uploadImgDiv;
let uploadedImg = 'profile-icon.svg';
let selectedimg  = '';
let isCover = false
let canvas;
let ctx;
let file;
let reader;
let croppedImg; 
let profileImg;

const getElements = function() {
  
    canvas = document.querySelector(".canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 170;
    canvas.width = 170;
    uploadImgDiv = document.querySelector('.js-upload-img');

    imgInput = document.querySelector('.js-input-img');
    imgInput.addEventListener('change', previewProfileImg);

    removeImgBtn = document.querySelector('.js-remove-img');
    removeImgBtn.addEventListener('click', removeProfileImg);


    console.log(imgInput)
    console.log(removeImgBtn)
    console.log(uploadImgDiv)

    uploadedImg = selectedimg;
    if (selectedimg) {
      uploadedImg = selectedimg;
    } else {
      uploadedImg = 'profile-icon.svg';
    }
    if (!uploadedImg.includes('profile-icon.svg')) {
      isCover = true;
    }

    showUploadImg();


};


const previewProfileImg =  function(event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    file = event.target.files[0];
    reader = new FileReader();

    const image = new Image();

    if (file) {
      reader.readAsDataURL(file);
      isCover = true;
    }

    reader.onloadend = () => {
      uploadedImg =  reader.result;
      image.crossOrigin = 'Anonymous';
      image.src = uploadedImg;
      showUploadImg();
      checkIsCover();

    };

    image.onload = () => {
      fit(ctx, image, false, canvas.width, canvas.height, image.width, image.height);
    };
  }

  const fit = function(ctx, image, contains, parentWidth, parentHeight, childWidth, childHeight, scale = 1, offsetX = 0.5, offsetY = 0.5) {
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

    showcroppedImg();
    //profileImg.emit(croppedImg);
  }

  const removeProfileImg = function() {
    uploadedImg = 'profile-icon.svg';
    showUploadImg();
    croppedImg = '';
    showcroppedImg();
    //profileImg.emit(this.croppedImg);
    isCover = false;
    checkIsCover();
  }


  const checkIsCover = function() {

      if (isCover){
        uploadImgDiv.classList.add('c-upload--no-image');
      }else {
        uploadImgDiv.classList.remove('c-upload--no-image');
      }
  
  }

  const showUploadImg = function(){
    console.log(uploadImgDiv)
    uploadImgDiv.style.backgroundImage = `url(${uploadedImg})`;
  }


  const showcroppedImg= function(){
   
    if(croppedImg == ''){
      removeImgBtn.classList.add("u-hide")
    }else {
      removeImgBtn.classList.remove("u-hide")  
    }
}


document.addEventListener('DOMContentLoaded', function() {
	console.info('DOM loaded - addProfileImage');
	getElements();
});

