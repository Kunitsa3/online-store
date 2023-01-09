import { addToQueryParams, updateHeaderTotal } from '../../helpers/helpers';
import './index.scss';
import { renderPageElements } from './utils/renderPageElements';
import { initSlider } from './utils/slider';

const choose = document.querySelector('#choose') as HTMLInputElement | null;
const select = document.querySelector('.cost-filter-select') as HTMLInputElement | null;
const categoryFilter = document.querySelector('#category-form') as HTMLInputElement | null;
const brandFilter = document.querySelector('#brand-form') as HTMLInputElement | null;
const itemSmall = document.querySelector('.items-quantity-small') as HTMLElement;
const itemBig = document.querySelector('.items-quantity-big') as HTMLElement;
const costSliderLeftInput = document.querySelector(
  '#CostRangeSlider .range-slider-input-left'
) as HTMLInputElement | null;
const costSliderRightInput = document.querySelector(
  '#CostRangeSlider .range-slider-input-right'
) as HTMLInputElement | null;
const clearButton = document.querySelector('.clear-btn') as HTMLElement;
const copyButton = document.querySelector('.copy-btn') as HTMLElement;
const costMaxValueWrapper = document.querySelector(
  '#CostRangeSlider .range-slider-tooltip-right .range-slider-tooltip-text'
) as HTMLElement | null;
const costMinValueWrapper = document.querySelector(
  '#CostRangeSlider .range-slider-tooltip-left .range-slider-tooltip-text'
) as HTMLElement | null;
const warehouseSliderLeftInput = document.querySelector(
  '#WarehouseRangeSlider .range-slider-input-left'
) as HTMLInputElement | null;
const warehouseSliderRightInput = document.querySelector(
  '#WarehouseRangeSlider .range-slider-input-right'
) as HTMLInputElement | null;
const warehouseMaxValueWrapper = document.querySelector(
  '#WarehouseRangeSlider .range-slider-tooltip-right .range-slider-tooltip-text'
) as HTMLElement | null;
const warehouseMinValueWrapper = document.querySelector(
  '#WarehouseRangeSlider .range-slider-tooltip-left .range-slider-tooltip-text'
) as HTMLElement | null;

categoryFilter?.addEventListener('change', e => {
  addToQueryParams('category', (e.target as HTMLInputElement)?.value);
  renderPageElements();
});
brandFilter?.addEventListener('change', e => {
  addToQueryParams('brand', (e.target as HTMLInputElement)?.value);
  renderPageElements();
});
choose?.addEventListener('input', e => {
  addToQueryParams('find', (e.target as HTMLInputElement)?.value);
  renderPageElements();
});
select?.addEventListener('change', e => {
  addToQueryParams('sort', (e.target as HTMLInputElement)?.value);
  renderPageElements();
});
itemSmall?.addEventListener('click', () => {
  addToQueryParams('view', 'small');
  renderPageElements();
  itemSmall.style.backgroundColor = 'blue';
  itemBig.style.backgroundColor = '#36b0cb';
});
itemBig?.addEventListener('click', () => {
  addToQueryParams('view', 'big');
  renderPageElements();
  itemBig.style.backgroundColor = 'blue';
  itemSmall.style.backgroundColor = '#36b0cb';
});
costSliderLeftInput?.addEventListener('change', () => {
  addToQueryParams('price', `${costMinValueWrapper?.innerText}-${costMaxValueWrapper?.innerText}`);
  renderPageElements();
});
costSliderRightInput?.addEventListener('change', () => {
  addToQueryParams('price', `${costMinValueWrapper?.innerText}-${costMaxValueWrapper?.innerText}`);
  renderPageElements();
});
warehouseSliderLeftInput?.addEventListener('change', () => {
  addToQueryParams('warehouse', `${warehouseMinValueWrapper?.innerText}-${warehouseMaxValueWrapper?.innerText}`);
  renderPageElements();
});
warehouseSliderRightInput?.addEventListener('change', () => {
  addToQueryParams('warehouse', `${warehouseMinValueWrapper?.innerText}-${warehouseMaxValueWrapper?.innerText}`);
  renderPageElements();
});
clearButton?.addEventListener('click', () => {
  const url = new URL(window.location.href);

  [...url.searchParams.keys()].forEach(key => url.searchParams.delete(key));
  window.history.replaceState(null, '', url);
  renderPageElements();
});
copyButton?.addEventListener('click', () => {
  const copytext = document.createElement('input');
  copytext.value = window.location.href;
  document.body.appendChild(copytext);
  copytext.select();
  document.execCommand('copy');
  document.body.removeChild(copytext);
  copyButton.innerText = 'Скопировано!';
  setTimeout(() => {
    copyButton.innerText = 'Копировать';
  }, 1000);
});

updateHeaderTotal();
initSlider();
renderPageElements();

function sizeParamFunc() {
  const currentUrl = new URLSearchParams(window.location.search);
  const sizeParam = currentUrl.get('view');

  if (sizeParam === 'small') {
    itemSmall.style.backgroundColor = 'blue';
    itemBig.style.backgroundColor = '#36b0cb';
  } else {
    itemBig.style.backgroundColor = 'blue';
    itemSmall.style.backgroundColor = '#36b0cb';
  }
}

sizeParamFunc();
