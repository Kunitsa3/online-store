import { addCartItem } from './addCartItems';
import { getItemsFromStorage } from './getItemsFromStorage';
import { updateTotal } from './updateTotal';

const main = document.querySelector('.main') as HTMLElement;

export const renderCartItems = (firstItem: number, lastItem: number): void => {
  const itemsWithQuantity = getItemsFromStorage();
  console.log(itemsWithQuantity, firstItem, lastItem);

  const itemsForRender = itemsWithQuantity.slice(firstItem - 1, lastItem);
  const productsWrapper = document.querySelector('.products-in-cart') as HTMLElement;

  productsWrapper.innerHTML = '';

  if (!itemsWithQuantity.length) {
    main.innerHTML = '';
    main.insertAdjacentHTML(
      'beforeend',
      `<div class='empty-cart'>
        <p>Здесь пока ничего нет :(</p>
        <img src="/christmas-wreath-2300222.png">
      </div>`
    );
  }

  itemsForRender.forEach(([itemDetails, quantity], index) => {
    if (itemDetails) {
      addCartItem(itemDetails, quantity, firstItem + index);
    }
  });

  const total = itemsWithQuantity.reduce((sum, [itemDetails, quantity]) => {
    if (itemDetails?.cost) {
      return sum + itemDetails?.cost * quantity;
    }

    return sum;
  }, 0);

  const totalQuantitySum = itemsWithQuantity.reduce((sum, [_, quantity]) => {
    return sum + quantity;
  }, 0);

  updateTotal(total, totalQuantitySum);
};
