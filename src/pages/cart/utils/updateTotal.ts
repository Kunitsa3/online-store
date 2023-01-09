import { updateHeaderTotal } from '../../../helpers/helpers';
import { discount } from './promo';

const totalSum = document.querySelector('.total-price') as HTMLElement;
const totalQuantity = document.querySelector('.total-quantity') as HTMLElement;

export const updateTotal = (totalSumValue: number, totalQuantityValue: number): void => {
  totalSum.innerHTML = `${totalSumValue} руб.`;
  totalQuantity.innerHTML = `${totalQuantityValue} шт.`;
  discount();
};

export const updateTotalAfterCount = (type: string, cost: number): void => {
  const currentSum = +totalSum.innerText.split(' ')[0];
  const currentQuantity = +totalQuantity.innerText.split(' ')[0];

  type === 'plus'
    ? updateTotal(currentSum + cost, currentQuantity + 1)
    : updateTotal(currentSum - cost, currentQuantity - 1);

  updateHeaderTotal();
};
