import { IGoods } from '../../../helpers/item';

export function itemFilter(items: IGoods[]): IGoods[] {
  let filteredItems = items;
  const currentUrl = new URLSearchParams(window.location.search);
  const categoryParam = currentUrl.get('category');
  const brandParam = currentUrl.get('brand');
  const [minPrice, maxPrice] = currentUrl.get('price')?.split('-') || [];
  const [minStock, maxStock] = currentUrl.get('warehouse')?.split('-') || [];

  if (categoryParam) {
    filteredItems = items.filter(item => item.category === categoryParam.split('-').join(' '));
  }

  if (brandParam) {
    filteredItems = filteredItems.filter(item => item.brand === brandParam);
  }

  if (minPrice) {
    filteredItems = filteredItems.filter(item => {
      return item.cost >= +minPrice && item.cost <= +maxPrice;
    });
  }

  if (minStock) {
    filteredItems = filteredItems.filter(item => item.warehouse >= +minStock && item.warehouse <= +maxStock);
  }

  return filteredItems;
}
