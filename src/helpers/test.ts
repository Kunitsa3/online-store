import { itemsData } from './item';
import { routeGood, routeMain, routeCart } from './routes';

test('1-First value for itemsData', () => {
  expect(itemsData[0].id).toBe(1);
});

test('2-itemsData length', () => {
  expect(itemsData).toHaveLength(30);
});

test('3-itemsData to contain ', () => {
  expect(itemsData[0].name).toContain('елк');
});

test('4-itemsData to Be Greater Than ', () => {
  expect(itemsData[3].id).toBeGreaterThan(1);
});

test('5-itemsData to Be Less Than Or Equal ', () => {
  expect(itemsData[3].id).toBeLessThanOrEqual(5);
});

test('6-routeGood contain .html ', () => {
  expect(routeGood).toContain('.html');
});

test('7-routeGood to Match (/html/)', () => {
  expect(routeGood).toMatch(/html/);
});

test('8-routeGood not to be Banana', () => {
  expect(routeGood).not.toBe('Banana');
});

test('9-routeMain toEqual index.html', () => {
  expect(routeMain).toEqual('index.html');
});

test('10-routeCart length', () => {
  expect(routeCart).toHaveLength(17);
});
