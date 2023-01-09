const rightArray = document.querySelector('.array-right-img') as HTMLElement | null;
const imgSlider = document.querySelectorAll<HTMLElement>('.slider-items-img');
const leftArray = document.querySelector('.array-left-img') as HTMLElement | null;

export const initSlider = (): void => {
  // add left slider

  let i = 0;
  imgSlider[0].style.display = 'block';

  leftArray?.addEventListener('click', () => {
    imgSlider[0].style.display = 'none';
    imgSlider[i].style.display = 'none';

    if (i <= 0) {
      i = imgSlider.length - 1;
    } else {
      i -= 1;
    }

    imgSlider[i].style.display = 'block';
  });

  // add right slider

  rightArray?.addEventListener('click', () => {
    imgSlider[0].style.display = 'none';
    imgSlider[i].style.display = 'none';

    if (i >= imgSlider.length - 1) {
      i = 0;
    } else {
      i += 1;
    }

    imgSlider[i].style.display = 'block';
  });
};
