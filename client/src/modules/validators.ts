export default function validators() {
  const isEmpty = (fieldName: string, fieldValue: string | number) =>
    !fieldValue ? `Le champ ${fieldName} est requis` : "";

  const minLength = (fieldName: string, fieldValue: string, min: number) =>
    fieldValue.length < min
      ? `Le champ ${fieldName} doit contenir au minimum ${min} caractères`
      : "";

  const maxLength = (fieldName: string, fieldValue: string, max: number) =>
    fieldValue.length > max
      ? `Le champ ${fieldName} doit contenir au maximum ${max} caractères`
      : "";

  const isNum = (fieldName: string, fieldValue: any) => {
    const isNumValue = /^\d+$/.test(fieldValue);
    return !isNumValue ? `Le ${fieldName} doit etre en chiffre` : "";
  };

  const isMinPrice = (fieldName: string, fieldValue: any, minPrice: number) => {
    const isMinPriceValue = /^\d+$/.test(fieldValue) && fieldValue >= minPrice;
    return !isMinPriceValue
      ? `Le ${fieldName} doit etre au minimum de ${minPrice}€`
      : "";
  };

  const isMaxPrice = (fieldName: string, fieldValue: any, maxPrice: number) => {
    const isMaxPriceValue = /^\d+$/.test(fieldValue) && fieldValue <= maxPrice;
    return !isMaxPriceValue
      ? `Le ${fieldName} doit etre au maximum de ${maxPrice}€`
      : "";
  };

  return {
    isEmpty,
    minLength,
    maxLength,
    isNum,
    isMinPrice,
    isMaxPrice,
  };
}
