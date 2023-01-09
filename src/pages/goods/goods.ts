import './goods.scss';
import './utils/imageShow';
import './utils/card';

import { IGoods, itemsData } from '../../helpers/item';
import { routeCart } from '../../helpers/routes';
import {
  addEventListenerToCartProduct,
  isProductInCart,
  updateHeaderTotal,
  addProductToCart,
  addToQueryParams,
} from '../../helpers/helpers';

export function Goodcart(items: IGoods[]): void {
  const url = new URLSearchParams(window.location.search);
  const id = url.get('id');
  const idLocal = localStorage.getItem('id');
  const currentID = id || idLocal;
  const currentProduct = items[Number(currentID) - 1];
  const cardTitle = document.querySelector('.card-title') as HTMLElement;
  const imgBig = document.querySelector('.card-image-big') as HTMLImageElement;
  const imgSmall1 = document.querySelector('.card-image-small-1') as HTMLImageElement;
  const imgSmall2 = document.querySelector('.card-image-small-2') as HTMLImageElement;
  const cardBrand = document.querySelector('.card-brand-details') as HTMLElement;
  const cardCategory = document.querySelector('.card-category-details') as HTMLElement;
  const cardCost = document.querySelector('.card-cost-details') as HTMLElement;
  const cardQuantity = document.querySelector('.card-quantity-details') as HTMLElement;
  const storeCategory = document.querySelector('.store-category') as HTMLElement;
  const storeBrand = document.querySelector('.store-brand') as HTMLElement;
  const storeName = document.querySelector('.store-name') as HTMLElement;
  const addToCartButton = document.querySelector('.btn-cart') as HTMLElement;
  const cartButtonText = isProductInCart(currentProduct.id) ? 'Удалить из корзины' : 'Добавить в корзину';
  addEventListenerToCartProduct(addToCartButton, currentProduct);
  const btnNow = document.querySelector('.btn-now') as HTMLElement;
  btnNow.addEventListener('click', () => {
    addProductToCart(currentProduct);
    window.location.href = routeCart;
    updateHeaderTotal();
    localStorage.setItem('block', 'block');
  });
  cardTitle.innerText = currentProduct.name;
  imgBig.src = `${currentProduct.image1}`;
  imgSmall1.src = `${currentProduct.image1}`;
  imgSmall2.src = `${currentProduct.image2}`;
  cardBrand.textContent = `${currentProduct.brand}`;
  cardCategory.textContent = `${currentProduct.category}`;
  cardCost.textContent = `${currentProduct.cost}`;
  cardQuantity.textContent = `${currentProduct.warehouse}`;
  storeCategory.textContent = `${currentProduct.category}`;
  storeBrand.textContent = `${currentProduct.brand}`;
  storeName.innerText = currentProduct.name;
  addToCartButton.innerText = cartButtonText;

  if (cartButtonText === 'Удалить из корзины') {
    addToCartButton.classList.add('btn-remove');
  }

  if (currentID) {
    addToQueryParams('id', currentID);
  }
}

Goodcart(itemsData);
updateHeaderTotal();
