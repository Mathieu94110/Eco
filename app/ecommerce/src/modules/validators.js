export default function validators() {
  const isEmpty = (fieldName, fieldValue) => {
    return !fieldValue ? "Le champ " + fieldName + " est requis" : "";
  };

  const minLength = (fieldName, fieldValue, min) => {
    return fieldValue.length < min
      ? `Le champ ${fieldName} doit contenir au minimum ${min} caractères`
      : "";
  };

  const maxLength = (fieldName, fieldValue, max) => {
    return fieldValue.length > max
      ? `Le champ ${fieldName} doit contenir au maximum ${max} caractères`
      : "";
  };

  const isNum = (fieldName, fieldValue) => {
    let isNum = /^\d+$/.test(fieldValue);
    return !isNum ? "Le " + fieldName + " doit etre en chiffre" : "";
  };

  const isMinPrice = (fieldName, fieldValue, minPrice) => {
    let isMinPrice = /^\d+$/.test(fieldValue) && fieldValue >= minPrice;
    return !isMinPrice
      ? "Le " + fieldName + ` doit etre au minimum de ${minPrice}€`
      : "";
  };

  return { isEmpty, minLength, maxLength, isNum, isMinPrice };
}
