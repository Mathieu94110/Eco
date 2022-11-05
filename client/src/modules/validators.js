export default function validators() {
  const isEmpty = (fieldName, fieldValue) => (!fieldValue ? `Le champ ${fieldName} est requis` : '');

  const minLength = (fieldName, fieldValue, min) => (fieldValue.length < min
    ? `Le champ ${fieldName} doit contenir au minimum ${min} caractères`
    : '');

  const maxLength = (fieldName, fieldValue, max) => (fieldValue.length > max
    ? `Le champ ${fieldName} doit contenir au maximum ${max} caractères`
    : '');

  const isNum = (fieldName, fieldValue) => {
    const isNumValue = /^\d+$/.test(fieldValue);
    return !isNumValue ? `Le ${fieldName} doit etre en chiffre` : '';
  };

  const isMinPrice = (fieldName, fieldValue, minPrice) => {
    const isMinPriceValue = /^\d+$/.test(fieldValue) && fieldValue >= minPrice;
    return !isMinPriceValue
      ? `Le ${fieldName} doit etre au minimum de ${minPrice}€`
      : '';
  };

  const isMaxPrice = (fieldName, fieldValue, maxPrice) => {
    const isMaxPriceValue = /^\d+$/.test(fieldValue) && fieldValue <= maxPrice;
    return !isMaxPriceValue
      ? `Le ${fieldName} doit etre au maximum de ${maxPrice}€`
      : '';
  };

  return {
    isEmpty, minLength, maxLength, isNum, isMinPrice, isMaxPrice,
  };
}
