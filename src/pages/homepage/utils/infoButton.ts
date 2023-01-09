import { itemsData } from '../../../helpers/item';
import { routeGood } from '../../../helpers/routes';

export function infoDetail(): void {
  const btnDetails = document.querySelectorAll<HTMLElement>('.btn.btn-details');
  const infoTitle = document.querySelectorAll<HTMLElement>('.info-title');

  for (let g = 0; g < btnDetails.length; g++) {
    btnDetails[g].addEventListener('click', () => {
      const findParam = infoTitle[g].innerText;
      const itemsFinal = findParam
        ? itemsData.filter(item => Object.values(item).some(el => String(el).includes(findParam)))
        : itemsData;
      localStorage.setItem('id', String(itemsFinal[0].id));
      window.location.href = routeGood;
    });

    infoTitle[g].addEventListener('click', () => {
      const findParam = infoTitle[g].innerText;
      const itemsFinal = findParam
        ? itemsData.filter(item => Object.values(item).some(el => String(el).includes(findParam)))
        : itemsData;
      localStorage.setItem('id', String(itemsFinal[0].id));
      window.location.href = routeGood;
    });
  }
}

export function infoDetailSmall(): void {
  const btnDetails2 = document.querySelectorAll<HTMLElement>('.btn-good.btn-details');
  const infoTitle2 = document.querySelectorAll<HTMLElement>('.info-title2');

  for (let g = 0; g < btnDetails2.length; g++) {
    btnDetails2[g].addEventListener('click', () => {
      const findParam = infoTitle2[g].innerText;
      const itemsFinal = findParam
        ? itemsData.filter(item => Object.values(item).some(el => String(el).includes(findParam)))
        : itemsData;
      localStorage.setItem('id', String(itemsFinal[0].id));
      window.location.href = routeGood;
    });
  }
}
