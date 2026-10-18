function assertPositiveQuantity(quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError('Количество товара должно быть положительным целым числом.');
  }
}

function addToCart(cart, product, quantity) {
  assertPositiveQuantity(quantity);

  const existingItem = cart.find((item) => item.id === product.id);
  const nextQuantity = (existingItem ? existingItem.quantity : 0) + quantity;

  if (nextQuantity > product.stock) {
    throw new RangeError('Нельзя добавить больше товара, чем есть на складе.');
  }

  if (existingItem) {
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantity: nextQuantity } : item
    );
  }

  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, id, quantity) {
  assertPositiveQuantity(quantity);

  const existingItem = cart.find((item) => item.id === id);

  if (!existingItem) {
    return cart;
  }

  if (quantity > existingItem.stock) {
    throw new RangeError('Нельзя указать количество больше остатка на складе.');
  }

  return cart.map((item) =>
    item.id === id ? { ...item, quantity } : item
  );
}

function removeFromCart(cart, id) {
  return cart.filter((item) => item.id !== id);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);

  const normalizedPromoCode =
    typeof promoCode === 'string' ? promoCode.trim().toUpperCase() : '';

  const discount =
    normalizedPromoCode === 'SAVE10' && subtotal >= 20000
      ? Math.round(subtotal * 0.1)
      : 0;

  const delivery = subtotal < 50000 ? 30000 : 0;

  return {
    subtotal,
    discount,
    delivery,
    total: subtotal - discount + delivery,
  };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;