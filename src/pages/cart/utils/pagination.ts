import { addToQueryParams, getWordWithEnding } from '../../../helpers/helpers';
import { getItemsFromStorage } from './getItemsFromStorage';
import { renderCartItems } from './renderCartItems';

const ITEMS_PER_PAGE = 3;
const itemsNumberInfo = document.querySelector('.pagination__secondary-text') as HTMLElement;
const page = document.querySelector('#page') as HTMLElement;
const pageNumber = document.querySelector('#page-number') as HTMLElement;
const itemsPerPage = document.querySelector('#items-per-page') as HTMLElement;
const paginationSelects = document.querySelectorAll('.pagination__select');
const paginationLeftArrow = document.querySelector('.pagination__left-arrow') as HTMLElement;
const paginationRightArrow = document.querySelector('.pagination__right-arrow') as HTMLElement;
const pageOptions = document.querySelector('#page-options') as HTMLElement;
let pagesNumberValue: number;

const updateShowingItemsNumber = () => {
  const ITEMS_NUMBER = getItemsFromStorage().length;
  const productsWrapper = document.querySelector('.products-in-cart') as HTMLElement;

  let pageValue = +page?.innerText;

  if (pageValue > pagesNumberValue) {
    page.innerText = String(pagesNumberValue);
    pageValue = +page?.innerText;
  }

  const itemsPerPageValue = +itemsPerPage?.innerText;
  const currentPageFirstItem = +(pageValue * itemsPerPageValue - (itemsPerPageValue - 1));
  const currentPageLastItem =
    currentPageFirstItem + (itemsPerPageValue - 1) <= ITEMS_NUMBER
      ? currentPageFirstItem + (itemsPerPageValue - 1)
      : ITEMS_NUMBER;
  pagesNumberValue = Math.ceil(ITEMS_NUMBER / itemsPerPageValue);

  productsWrapper.innerHTML = '';
  renderCartItems(currentPageFirstItem, currentPageLastItem);

  addToQueryParams('page', String(pageValue));
  addToQueryParams('items-per-page', String(itemsPerPageValue));

  pageNumber.innerText = `of ${pagesNumberValue} ${getWordWithEnding(pagesNumberValue, 'page')}`;

  itemsNumberInfo.innerText =
    itemsPerPageValue === 1 || currentPageLastItem === currentPageFirstItem
      ? `Showing ${currentPageFirstItem} of ${ITEMS_NUMBER} items`
      : `Showing ${currentPageFirstItem}-${currentPageLastItem} of ${ITEMS_NUMBER} ${getWordWithEnding(
          ITEMS_NUMBER,
          'item'
        )}`;

  pageOptions.innerHTML = '';

  for (let i = 0; i < pagesNumberValue; i++) {
    pageOptions.insertAdjacentHTML('beforeend', `<li class="pagination__option">${i + 1}</li>`);
  }

  if (pageValue === 1) {
    paginationLeftArrow.classList.add('disabled');
  } else {
    paginationLeftArrow.classList.remove('disabled');
  }

  if (pageValue === pagesNumberValue) {
    paginationRightArrow.classList.add('disabled');
  } else {
    paginationRightArrow.classList.remove('disabled');
  }
};

export const paginationInit = (): void => {
  const ITEMS_NUMBER = getItemsFromStorage().length;
  const currentUrl = new URLSearchParams(window.location.search);
  const pageParam = currentUrl.get('page');
  const choosePage = pageParam || 1;
  const itemParam = currentUrl.get('items-per-page');
  const chooseParam = itemParam || ITEMS_PER_PAGE;

  itemsPerPage.innerText = String(chooseParam);
  page.innerText = String(choosePage);
  pagesNumberValue = ITEMS_NUMBER / ITEMS_PER_PAGE;
  updateShowingItemsNumber();

  paginationSelects.forEach(pagination => {
    const options = pagination.querySelector('.pagination__options-wrapper') as HTMLElement;
    const selectedValue = pagination.querySelector('.pagination__selected') as HTMLElement;

    pagination.addEventListener('click', () => {
      pagination.classList.toggle('active');
    });

    options.addEventListener('click', (e: MouseEvent) => {
      const option = e.target as HTMLInputElement;

      if (option?.classList.contains('pagination__option')) {
        selectedValue.innerHTML = option.innerText;
        updateShowingItemsNumber();
      }
    });
  });

  paginationLeftArrow.addEventListener('click', () => {
    const selectedPageValue = +page.innerText;

    if (selectedPageValue !== 1) {
      page.innerText = `${selectedPageValue - 1}`;
      updateShowingItemsNumber();
    }
  });

  paginationRightArrow.addEventListener('click', () => {
    const selectedPageValue = +page.innerText;

    if (selectedPageValue + 1 <= pagesNumberValue) {
      page.innerText = `${selectedPageValue + 1}`;
      updateShowingItemsNumber();
    }
  });
};
