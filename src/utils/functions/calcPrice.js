export function calcPrice(price, discount) {
  if (!discount) return price;

  const discountAmount = (price * discount) / 100;
  return (price - discountAmount).toFixed(2);
}
