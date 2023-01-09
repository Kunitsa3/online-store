import { addProductToCart, removeProductFromCart } from '../../../helpers/helpers';
import { IGoods } from '../../../helpers/item';
import { paginationInit } from './pagination';
import { updateTotalAfterCount } from './updateTotal';

export const addCartItem = (itemDetails: IGoods, quantity: number, itemNumber: number): void => {
  const productsWrapper = document.querySelector('.products-in-cart') as HTMLElement;
  productsWrapper.insertAdjacentHTML(
    'beforeend',
    `
  <div class="product-wrapper">
        <div class="products-details" id=details-of-${itemDetails.id}>
          <div>
            <p class="product-name">${itemNumber}. ${itemDetails.name}</p>
            <p class="product-info">Категория: ${itemDetails.category}</p>
            <p class="product-info">
            Остаток на складе: ${itemDetails.warehouse} шт.
            </p>
            <p class="product-info">
            Сумма: ${itemDetails.cost} руб.
            </p>

          </div>
        </div>
        <div class="product-details">
          <div class="products-counter" id='counter-for-${itemDetails.id}'>
          </div>
          <div class="image-wrapper">
            <img class="product-photo" src=${itemDetails.image1} alt="Ничего не получилось" />
          </div>
        </div>
      </div>`
  );

  const productDetails = document.querySelector(`#details-of-${itemDetails.id}`);
  const counterWrapper = document.querySelector(`#counter-for-${itemDetails.id}`);
  const plusButton = document.createElement('button');
  plusButton.classList.add('square-button');
  plusButton.innerText = '+';
  counterWrapper?.appendChild(plusButton);

  const quantityValue = document.createElement('p');
  quantityValue.innerText = String(quantity);
  counterWrapper?.appendChild(quantityValue);

  const minusButton = document.createElement('button');
  minusButton.classList.add('square-button');
  minusButton.innerText = '-';
  counterWrapper?.appendChild(minusButton);

  const totalPrice = document.createElement('p');
  totalPrice.classList.add('product-info');
  totalPrice.innerText = `Общая сумма: ${itemDetails.cost * quantity}  руб.`;
  productDetails?.appendChild(totalPrice);

  plusButton?.addEventListener('click', () => {
    if (+quantityValue.innerText !== itemDetails.warehouse) {
      addProductToCart(itemDetails);
      quantityValue.innerText = String(+quantityValue.innerText + 1);

      const currentPrice = +totalPrice.innerText.split(' ')[2];
      totalPrice.innerText = `Общая сумма: ${itemDetails.cost + currentPrice}  руб.`;
      updateTotalAfterCount('plus', itemDetails.cost);
    }
  });

  minusButton?.addEventListener('click', () => {
    removeProductFromCart(itemDetails);

    if (+quantityValue.innerText === 1) {
      paginationInit();
    } else {
      quantityValue.innerText = String(+quantityValue.innerText - 1);
      const currentPrice = +totalPrice.innerText.split(' ')[2];
      totalPrice.innerText = `Общая сумма: ${currentPrice - itemDetails.cost}  руб.`;
      updateTotalAfterCount('minus', itemDetails.cost);
    }
  });
};
