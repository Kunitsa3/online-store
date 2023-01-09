// data
import { routeMain } from '../../../helpers/routes';

const formes = document.querySelector('.formes') as HTMLElement;
const formesCard = document.querySelector('.formes-card') as HTMLElement;
const endOrder = document.querySelector('.end-order-wrapper') as HTMLElement;
const cardImg = document.querySelector('.field-container img') as HTMLImageElement;

const goToCard = function (event: SubmitEvent) {
  formes.style.display = 'none';
  formesCard.style.display = 'block';
  event.preventDefault();
};

formes.addEventListener('submit', goToCard, false);

// card
export const dateExp = document.querySelector('#expirationdate') as HTMLInputElement;

export const modifyInput = function () {
  if (dateExp.value.length === 2) dateExp.value += '/';
  else if (dateExp.value.length === 3 && dateExp.value.charAt(2) === '/')
    dateExp.value = dateExp.value.replace('/', '');
};

dateExp.addEventListener('input', modifyInput, false);

const goToEndOrder = function (event: SubmitEvent) {
  formesCard.style.display = 'none';
  endOrder.style.display = 'block';
  event.preventDefault();
  setTimeout(() => {
    window.location.href = routeMain;
  }, 4000);
};

formesCard.addEventListener('submit', goToEndOrder, false);

const cardnumber = document.querySelector('#cardnumber') as HTMLInputElement;

const changeImge = function () {
  if (cardnumber.value[0] === '3') {
    cardImg.src = './AmericanExpress.jpg';
  }

  if (cardnumber.value[0] === '4') {
    cardImg.src = './Visa.png';
  }

  if (cardnumber.value[0] === '5') {
    cardImg.src = './MasterCard.png';
  }
};

cardnumber.addEventListener('input', changeImge, false);
