let allImages = document.querySelectorAll('.slideshow-images');
let leftArrow = document.querySelector('#left-arrow');
let rightArrow = document.querySelector('#right-arrow');
let imageIndex = 0;

rightArrow.addEventListener('click', () => {
    imageIndex++;
    if(imageIndex > allImages.length) {
        imageIndex = 1;
    }
    for(image of allImages) {
        image.className += " slideshow-images-hidden";
    }
    allImages[imageIndex - 1].className = 'slideshow-images';
})

leftArrow.addEventListener('click', () => {
    imageIndex--;
    if(imageIndex < 1) {
        imageIndex = allImages.length;
    }
    for(image of allImages) {
        image.className += " slideshow-images-hidden";
    }
    allImages[imageIndex - 1].className = 'slideshow-images';
})