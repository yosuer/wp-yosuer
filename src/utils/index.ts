const formatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});

export const formatPrice = (price: string | number) => {
  return formatter.format(Number(price));
};
