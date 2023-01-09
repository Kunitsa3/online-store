export const promoInput = document.querySelector('#promo-input') as HTMLInputElement;

export const promoInfo = document.querySelector('.promo-info') as HTMLElement;

const formesPromo = document.querySelector('.promo-form') as HTMLElement;
const totalPrice = document.querySelector('.total-price') as HTMLElement;
const discountPrice = document.querySelector('.discount-price') as HTMLElement;
const promoApply = document.querySelector('#promo-apply') as HTMLElement;

export const promocode = ['promo1', 'promo2', 'promo3'];

export function promo() {
  if (promocode.includes(promoInput.value)) {
    promoInfo.textContent = `${promoInput.value}. Скидка 10%`;
  }
}

promoInput.addEventListener('input', promo, false);

export function discount() {
  const pApply = document.querySelectorAll<HTMLElement>('#promo-apply p');

  if (!pApply.length) {
    discountPrice.textContent = `${totalPrice.textContent}`;
    totalPrice.classList.remove('price-discount');
    discountPrice.style.display = 'none';
  } else {
    const finalCost = (Number(totalPrice.textContent?.split(' ')[0]) * (100 - 10 * pApply.length)) / 100;
    discountPrice.textContent = `${finalCost} руб`;
    totalPrice.classList.add('price-discount');
    discountPrice.style.display = 'block';
  }
}

function deletePromo() {
  const pApply = document.querySelectorAll<HTMLElement>('#promo-apply p');

  for (let m = 0; m < pApply.length; m++) {
    pApply[m].addEventListener('click', () => {
      pApply[m].remove();
      discount();
    });
  }
}

function appendPromo() {
  const pApply = document.querySelectorAll<HTMLElement>('#promo-apply p');

  if (promoInput.value === 'promo1' || promoInput.value === 'promo2' || promoInput.value === 'promo3') {
    if (pApply.length === 0) {
      const pPromo = document.createElement('p');
      promoApply.append(pPromo);
      pPromo.textContent = `-${promoInput.value}. Скидка 10% (Удалить)`;
      discount();
      deletePromo();
    } else {
      for (let k = 0; k < pApply.length; k++) {
        if (pApply[k].textContent === `-${promoInput.value}. Скидка 10% (Удалить)`) {
          return;
        }
      }

      const pPromo = document.createElement('p');
      promoApply.append(pPromo);
      pPromo.textContent = `-${promoInput.value}. Скидка 10% (Удалить)`;
      discount();
      deletePromo();
    }
  }
}

const applyPromo = function (event: SubmitEvent) {
  event.preventDefault();
  appendPromo();
};

formesPromo.addEventListener('submit', applyPromo, false);
