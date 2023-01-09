import { IGoods } from '../../../helpers/item';
import { addProducts, addProductsSmall } from './addProducts';

export function smallSize(items: IGoods[]): void {
  const productsWrapper = document.querySelector('.good-items') as HTMLElement;
  productsWrapper.innerHTML = '';

  items.forEach(itemDetails => {
    addProductsSmall(itemDetails);
  });
}

export function bigSize(items: IGoods[]): void {
  const productsWrapper = document.querySelector('.good-items') as HTMLElement;
  productsWrapper.innerHTML = '';

  items.forEach(itemDetails => {
    addProducts(itemDetails);
  });
}
