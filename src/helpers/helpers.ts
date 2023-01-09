import { IGoods } from './item';
import { routeCart } from './routes';

export const createElement = (
  elementType: string,
  parent: HTMLElement,
  classNames: string[],
  innerHTML?: string
): HTMLElement => {
  const element = document.createElement(elementType);
  parent.appendChild(element);

  if (classNames) {
    element.classList.add(...classNames);
  }

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
};

export const addToQueryParams = (key: string, value: string): void => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.replaceState(null, '', url);
};

export const getWordWithEnding = (number: number, word: string): string => {
  return number === 1 ? word : `${word}s`;
};

export const isProductInCart = (id: number): boolean => {
  const cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '') : [];
  const itemId = [...cartItems].findIndex(({ productId }) => {
    return id === productId;
  });

  return itemId >= 0;
};

export const addProductToCart = (item: IGoods): void => {
  const cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '') : [];
  const newCartItems = [...cartItems, item];
  localStorage.setItem('cart', JSON.stringify(newCartItems));
};

export const removeProductFromCart = (item: IGoods): void => {
  const cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '') : [];
  const itemIndex = [...cartItems].findIndex(({ id }) => {
    return id === item.id;
  });
  const newCartItems = [...cartItems.slice(0, itemIndex), ...cartItems.slice(itemIndex + 1, cartItems.length)];
  localStorage.setItem('cart', JSON.stringify(newCartItems));
};

export const updateHeaderTotal = (): void => {
  const itemsInCart: IGoods[] = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '') : [];
  const headerTotalSum = document.querySelector('.header-total') as HTMLElement;
  const headerTotalQuantity = document.querySelector('.header-cart-quantity') as HTMLElement;
  const totalSum = itemsInCart.reduce((sum, curr) => {
    return sum + curr.cost;
  }, 0);
  const totalQuantity = itemsInCart.length;

  headerTotalSum.innerText = `Общая сумма: ${totalSum} руб.`;
  headerTotalQuantity.innerText = String(totalQuantity);
};

export const addEventListenerToCartProduct = (element: HTMLElement, item: IGoods): void => {
  element.addEventListener('click', () => {
    if (element.innerText === 'Добавить в корзину') {
      addProductToCart(item);
      element.innerText = 'Удалить из корзины';
      element.classList.toggle('btn-remove');
      updateHeaderTotal();
    } else {
      removeProductFromCart(item);
      element.innerText = 'Добавить в корзину';
      element.classList.toggle('btn-remove');
      updateHeaderTotal();
    }

    localStorage.removeItem('block');
  });
};
