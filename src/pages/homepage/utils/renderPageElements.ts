import { addFilter, addProducts, addProductsSmall } from './addProducts';
import { itemFilter } from './filter';
import { itemSort } from './sort';
import { itemSearch } from './search';
import { itemsData } from '../../../helpers/item';
import { addRangeFilter } from './rangeFilter';

const productsWrapper = document.querySelector('.good-items') as HTMLElement;

export const renderProducts = (): void => {
  const currentUrl = new URLSearchParams(window.location.search);
  const viewParam = currentUrl.get('view');
  const sortedItemsArray = itemSort(itemsData);
  const searchedItemsArray = itemSearch(sortedItemsArray);
  const itemSmall = document.querySelector('.items-quantity-small') as HTMLElement;
  const itemBig = document.querySelector('.items-quantity-big') as HTMLElement;

  productsWrapper.innerHTML = '';

  if (viewParam === 'small') {
    searchedItemsArray.forEach(itemDetails => {
      addProductsSmall(itemDetails);
    });
    itemSmall.classList.add('blue-size');
    itemBig.classList.add('main-size');
    itemSmall.classList.remove('main-size');
    itemBig.classList.remove('blue-size');
  } else {
    searchedItemsArray.forEach(itemDetails => {
      addProducts(itemDetails);
    });
    itemBig.classList.add('blue-size');
    itemSmall.classList.add('main-size');
    itemSmall.classList.remove('blue-size');
    itemBig.classList.remove('main-size');
  }
};

export const renderFiltersAndQuantityBlock = (): void => {
  const currentUrl = new URLSearchParams(window.location.search);
  const categoryParam = currentUrl.get('category');
  const brandParam = currentUrl.get('brand');
  const sortedItemsArray = itemSort(itemsData);
  const searchedItemsArray = itemSearch(sortedItemsArray);
  const filteredItemsArray = itemFilter(searchedItemsArray);
  const productsBlockHeader = document.querySelector('.shop-items-header') as HTMLElement;
  const itemsQuantityTitle = document.querySelector('.items-quantity-title') as HTMLElement;
  const copyButton = document.querySelector('.copy-btn') as HTMLElement;
  const noItemsTitle = document.querySelector('.no-products') as HTMLElement;
  addFilter('category', '.categories-wrapper', searchedItemsArray, categoryParam, filteredItemsArray);
  addFilter('brand', '.brands-wrapper', searchedItemsArray, brandParam, filteredItemsArray);
  addRangeFilter(filteredItemsArray, 'cost', 'CostRangeSlider');
  addRangeFilter(filteredItemsArray, 'warehouse', 'WarehouseRangeSlider');
  itemsQuantityTitle.innerText = `Найдено товаров: ${filteredItemsArray.length}`;
  copyButton.style.backgroundColor = '$main';

  if (!filteredItemsArray.length) {
    productsBlockHeader.style.display = 'none';
    noItemsTitle.style.display = 'flex';
  } else {
    productsBlockHeader.style.display = 'block';
    noItemsTitle.style.display = 'none';
  }
};

export const renderPageElements = (): void => {
  renderProducts();
  renderFiltersAndQuantityBlock();
};
