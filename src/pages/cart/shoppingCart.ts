import './shoppingCart.scss';
import { paginationInit } from './utils/pagination';
import './utils/promo';
import '../goods/utils/card';
import { updateHeaderTotal } from '../../helpers/helpers';

paginationInit();
updateHeaderTotal();

const formes = document.querySelector('.formes') as HTMLElement;
formes.style.display = 'none';
localStorage.getItem('block') ? (formes.style.display = 'block') : (formes.style.display = 'none');

const closeButton = document.querySelector('.btn-close') as HTMLElement;
const closeButtonContainer = document.querySelector('.btn-close-container') as HTMLElement;
const formesContainer = document.querySelector('.formes-container') as HTMLElement;

closeButton.addEventListener('click', () => {
  formes.style.display = 'none';
});

closeButtonContainer.addEventListener('click', () => {
  formesContainer.style.display = 'none';
});

const orderButton = document.querySelector('.order-button') as HTMLElement;
orderButton.addEventListener('click', () => {
  formes.style.display = 'block';
});
