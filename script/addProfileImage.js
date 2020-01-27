let imgInput;
let removeImgBtn;
let uploadImgDiv;
let uploadedImg = '/assets/icons/profile-icon.svg';
let selectedimg  = '';
let isCover = false
let canvas;
let ctx;
let file;
let reader;
let croppedImg; 
let profileImg;

const getElements = function() {
    imgInput = document.querySelector('.js-input-img');
    imgInput.addEventListener('change', previewProfileImg());

    removeImgBtn = document.querySelector('.js-remove-img');
    removeImgBtn.addEventListener('click', removeProfileImg());

    uploadImgDiv = document.querySelector('.js-upload-img');


    uploadedImg = selectedimg;
    if (selectedimg) {
      uploadedImg = selectedimg;
    } else {
      uploadedImg = '/assets/icons/profile-icon.svg';
    }
    if (!uploadedImg.includes('profile-icon.svg')) {
      isCover = true;
    }

    showUploadImg();

    canvas = document.querySelector(".canvas");
    ctx = canvas.getContext("2d");
    canvas.nativeElement.width = 170;
    canvas.nativeElement.width = 170;

};


const previewProfileImg =  function(event) {
    ctx.clearRect(0, 0, canvas.nativeElement.width, canvas.nativeElement.height);

    file = event.target.files[0];
    reader = new FileReader();

    const image = new Image();

    if (file) {
      reader.readAsDataURL(file);
      isCover = true;
      checkIsCover();
    }

    reader.onloadend = () => {
      uploadedImg =  reader.result;
      image.crossOrigin = 'Anonymous';
      image.src = uploadedImg;
      showUploadImg();
    };

    image.onload = () => {
      fit(ctx, image, false, canvas.nativeElement.width, canvas.nativeElement.height, image.width, image.height);
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
    croppedImg = canvas.nativeElement.toDataURL('image/png');

    showcroppedImg();
    //profileImg.emit(croppedImg);
  }

  const removeProfileImg = function() {
    uploadedImg = '/assets/icons/profile-icon.svg';
    showUploadImg();
    croppedImg = '';
    showcroppedImg();
    //profileImg.emit(this.croppedImg);
    isCover = false;
    checkIsCover();
  }


  const checkIsCover = function() {
      if (isCover){
        uploadImgDiv.add.classList('c-upload--no-image');
      }else {
        uploadImgDiv.remove.classList('c-upload--no-image');
      }
  
  }

  const showUploadImg = function(){
    uploadImgDiv.style.backgroundImage = `url(${uploadedImg})`;
  }


  const showcroppedImg= function(){
    if(croppedImg == ''){
      imgInput.classList.add("u-hide")
    }else {
      imgInput.classList.remove("u-hide")  
    }
}


document.addEventListener('DOMContentLoaded', function() {
	console.info('DOM loaded - addProfileImage');
	getElements();
});

