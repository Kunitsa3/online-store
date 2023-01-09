import { addEventListenerToCartProduct, createElement, isProductInCart } from '../../../helpers/helpers';
import { IGoods } from '../../../helpers/item';
import { infoDetail, infoDetailSmall } from './infoButton';

export const addProducts = ({
  id,
  name,
  brand,
  category,
  description,
  image1,
  image2,
  cost,
  warehouse,
}: IGoods): void => {
  const productsWrapper = document.querySelector('.good-items') as HTMLElement;
  const productWrapper = createElement('div', productsWrapper, ['good-items-info']);
  createElement('h3', productWrapper, ['info-title'], name);
  const infoColumn = createElement('div', productWrapper, ['info-column']);
  const imageWrapper = createElement('div', infoColumn, ['info-column-image']);

  const image = document.createElement('img');
  image.src = image1;
  imageWrapper.appendChild(image);

  const infoColumnDetails = createElement('div', infoColumn, ['info-column-details']);
  createElement('p', infoColumnDetails, ['info-brand'], `Брэнд: ${brand}`);
  createElement('p', infoColumnDetails, ['info-category'], `Категория: ${category}`);
  createElement('p', infoColumnDetails, ['info-cost'], `Цена (в рублях): ${cost}`);
  createElement('p', infoColumnDetails, ['info-quantity'], `Количество на складе: ${warehouse}`);

  const infoBtn = createElement('div', productWrapper, ['info-btn']);
  const cartButtonText = isProductInCart(id) ? 'Удалить из корзины' : 'Добавить в корзину';
  const cartButton = createElement('button', infoBtn, ['btn', 'btn-cart'], cartButtonText);
  addEventListenerToCartProduct(cartButton, {
    id,
    name,
    image1,
    image2,
    brand,
    category,
    cost,
    warehouse,
    description,
  });
  createElement('button', infoBtn, ['btn', 'btn-details'], 'Информация');

  if (cartButtonText === 'Удалить из корзины') {
    cartButton.classList.add('btn-remove');
  }

  infoDetail();
};

export const addProductsSmall = ({
  id,
  name,
  brand,
  category,
  description,
  image1,
  image2,
  cost,
  warehouse,
}: IGoods): void => {
  const productsWrapper = document.querySelector('.good-items') as HTMLElement;
  const productWrapper = createElement('div', productsWrapper, ['good-items-info2']);
  createElement('h3', productWrapper, ['info-title2'], name);
  const infoColumn = createElement('div', productWrapper, ['info-column2']);
  const imageWrapper = createElement('div', infoColumn, ['info-column-image2']);

  const image = document.createElement('img');
  image.src = image1;
  imageWrapper.appendChild(image);

  const infoBtn = createElement('div', productWrapper, ['info-btn-good']);
  const cartButtonText = isProductInCart(id) ? 'Удалить из корзины' : 'Добавить в корзину';

  const cartButton = createElement('button', infoBtn, ['btn-good', 'btn-cart'], cartButtonText);
  addEventListenerToCartProduct(cartButton, {
    id,
    name,
    image1,
    image2,
    brand,
    category,
    cost,
    warehouse,
    description,
  });
  createElement('button', infoBtn, ['btn-good', 'btn-details'], 'Информация');

  if (cartButtonText === 'Удалить из корзины') {
    cartButton.classList.add('btn-remove');
  }

  infoDetailSmall();
};

export const createFilterItem = (
  inputId: string | number,
  filterType: string,
  wrapperSelector: string,
  checked?: boolean,
  possibleItems?: number,
  allItems?: number
): void => {
  const productsWrapper = document.querySelector(wrapperSelector) as HTMLElement;
  const checkFlag = checked ? 'checked' : '';
  productsWrapper.insertAdjacentHTML(
    'beforeend',
    `<div class='filter-item'>
    <label for="${inputId}" id="${inputId}-label">
    <input type="radio" id="${inputId}" name="${filterType}" value="${inputId}" ${checkFlag}>
    ${inputId}</label>
    <p>${possibleItems}/${allItems}</p>
    </div>`
  );
};

export const addFilter = (
  filterType: string,
  filterWrapperClass: string,
  items: IGoods[],
  filterParam: string | null,
  filteredItems: IGoods[]
): void => {
  const filterWrapper = document.querySelector(filterWrapperClass) as HTMLElement;
  filterWrapper.innerHTML = '';

  const filterItems = new Set(items.map(item => item[filterType as keyof IGoods]));

  filterItems.forEach(filterItem => {
    const isChecked = filterItem === filterParam;
    const allItems = items.filter(item => item[filterType as keyof IGoods] === filterItem).length;
    const possibleItems = filteredItems.filter(item => item[filterType as keyof IGoods] === filterItem).length;

    createFilterItem(filterItem, filterType, filterWrapperClass, isChecked, possibleItems, allItems);
  });
};
