const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

const ids = (items) => items.map(({ id }) => id);
const getByIds = (productIds) =>
  productIds.map((id) => products.find((product) => product.id === id));

describe('sortProductsByPrice', () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(ids(sortProductsByPrice(products, 'asc'))).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
    expect(ids(sortProductsByPrice(products))).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const selected = getByIds([1, 3, 4]);
    expect(ids(sortProductsByPrice(selected, 'asc'))).toEqual([3, 4, 1]);
  });

  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    expect(ids(sortProductsByPrice(products, 'desc'))).toEqual([1, 2, 4, 5, 6, 3]);
  });

  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const selected = getByIds([3, 1, 4]);
    expect(ids(sortProductsByPrice(selected, 'desc'))).toEqual([1, 4, 3]);
  });

  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const selected = getByIds([5, 2, 6]);
    expect(ids(sortProductsByPrice(selected, 'desc'))).toEqual([2, 5, 6]);
  });

  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const selected = getByIds([1, 3, 4]);
    sortProductsByPrice(selected, 'asc');
    expect(ids(selected)).toEqual([1, 3, 4]);
  });

  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const selected = getByIds([1, 3, 4]);
    sortProductsByPrice(selected, 'desc');
    expect(ids(selected)).toEqual([1, 3, 4]);
  });

  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    sortProductsByPrice(products);
    expect(ids(products)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});