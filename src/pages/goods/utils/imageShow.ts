const imgSmall1 = document.querySelector('.card-image-small-1') as HTMLImageElement;
const imgSmall2 = document.querySelector('.card-image-small-2') as HTMLImageElement;
const imgBig = document.querySelector('.card-image-big') as HTMLImageElement;
imgSmall1.addEventListener('click', () => {
  imgBig.src = imgSmall1.src;
});
imgSmall2.addEventListener('click', () => {
  imgBig.src = imgSmall2.src;
});
