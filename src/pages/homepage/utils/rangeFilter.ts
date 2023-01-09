import { IGoods, itemsData } from '../../../helpers/item';

const setStyleParam = (className: string, value: number) => {
  (document.querySelector(className) as HTMLElement).style.left = `${value}%`;
};

export const addRangeFilter = (items: IGoods[], type: string, sliderId: string): void => {
  const itemsSortedFilterValues = items.map(item => item[type as keyof IGoods]).sort((a, b) => +a - +b);
  const rangeSliderMinValue = +itemsSortedFilterValues[0] || 0;
  const rangeSliderMaxValue = +itemsSortedFilterValues[itemsSortedFilterValues.length - 1] || 0;
  const inputStartValue = 0;
  const inputFinishValue = +itemsData
    .map(item => item[type as keyof IGoods])
    .sort((a, b) => +a - +b)
    .slice(-1);
  const minValuePercent = (rangeSliderMinValue / (inputFinishValue - inputStartValue)) * 100;
  const maxValuePercent = (rangeSliderMaxValue / (inputFinishValue - inputStartValue)) * 100;
  const maxValueWrapper = document.querySelector(
    `#${sliderId} .range-slider-tooltip-right .range-slider-tooltip-text`
  ) as HTMLElement;

  const minValueWrapper = document.querySelector(
    `#${sliderId} .range-slider-tooltip-left .range-slider-tooltip-text`
  ) as HTMLElement;
  const sliderLeftInput = document.querySelector(`#${sliderId} .range-slider-input-left`) as HTMLInputElement;
  const sliderRightInput = document.querySelector(`#${sliderId} .range-slider-input-right`) as HTMLInputElement;
  const sliderCenterRange = document.querySelector(`#${sliderId} .range-slider-val-range`) as HTMLElement;

  (document.querySelector(`#${sliderId} .range-slider-val-left`) as HTMLElement).style.width = `${
    minValuePercent + (100 - maxValuePercent)
  }%`;
  (document.querySelector(`#${sliderId} .range-slider-val-right`) as HTMLElement).style.width = `${
    minValuePercent + (100 - maxValuePercent)
  }%`;

  sliderCenterRange.style.left = `${minValuePercent}%`;
  sliderCenterRange.style.right = `${100 - maxValuePercent}%`;

  setStyleParam(`#${sliderId} .range-slider-handle-left`, minValuePercent);
  setStyleParam(`#${sliderId} .range-slider-handle-right`, maxValuePercent);
  setStyleParam(`#${sliderId} .range-slider-tooltip-left`, minValuePercent);
  setStyleParam(`#${sliderId} .range-slider-tooltip-right`, maxValuePercent);

  minValueWrapper.innerText = String(rangeSliderMinValue);
  maxValueWrapper.innerText = String(rangeSliderMaxValue);

  sliderLeftInput.value = String(minValuePercent);

  sliderLeftInput.addEventListener('input', e => {
    const input = e.target as HTMLInputElement;
    const value =
      (100 / (parseInt(input.max, 10) - parseInt(input.min, 10))) * parseInt(input.value, 10) -
      (100 / (parseInt(input.max, 10) - parseInt(input.min, 10))) * parseInt(input.min, 10);
    const children = input.parentNode?.childNodes[1].childNodes as NodeListOf<HTMLElement>;
    const filterValue = String(Math.ceil((+input.value * (inputFinishValue - inputStartValue)) / 100));

    input.value = String(Math.min(+input.value, +(input.parentNode?.childNodes[5] as HTMLInputElement).value - 1));

    if (children) {
      children[1].style.width = `${value}%`;
      children[5].style.left = `${value}%`;
      children[7].style.left = `${value}%`;
      children[11].style.left = `${value}%`;

      (children[11].childNodes[1] as HTMLInputElement).innerHTML = filterValue;
    }
  });

  sliderRightInput.value = String(maxValuePercent);
  sliderRightInput.addEventListener('input', e => {
    const input = e.target as HTMLInputElement;
    input.value = String(Math.max(+input.value, +(input.parentNode?.childNodes[3] as HTMLInputElement).value - -1));
    const value =
      (100 / (parseInt(input.max, 10) - parseInt(input.min, 10))) * parseInt(input.value, 10) -
      (100 / (parseInt(input.max, 10) - parseInt(input.min, 10))) * parseInt(input.min, 10);

    const children = input.parentNode?.childNodes[1].childNodes as NodeListOf<HTMLElement>;
    const filterValue = (+input.value * (inputFinishValue - inputStartValue)) / 100 + inputStartValue;

    if (children) {
      children[3].style.width = `${100 - value}%`;
      children[5].style.right = `${100 - value}%`;
      children[9].style.left = `${value}%`;
      children[13].style.left = `${value}%`;

      (children[13].childNodes[1] as HTMLInputElement).innerHTML = String(Math.ceil(filterValue));
    }
  });
};
