import { reactive } from "@vue/reactivity";
import useValidators from "@/modules/validators";

const errors = reactive({});

export default function addFormValidation() {
  const { isEmpty, minLength, maxLength, isMinPrice } = useValidators();

  const validateImageField = (fieldName, fieldValue) => {
    errors[fieldName] = isEmpty(fieldName, fieldValue);
  };

  const validateTitleField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : fieldValue.length > 20
      ? maxLength(fieldName, fieldValue, 20)
      : minLength(fieldName, fieldValue, 4);
  };
  const validateDescriptionField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : fieldValue.length < 4
      ? minLength(fieldName, fieldValue, 4)
      : maxLength(fieldName, fieldValue, 200);
  };

  const validateCategoryField = (fieldName, fieldValue) => {
    errors[fieldName] = isEmpty(fieldName, fieldValue);
  };

  const validatePriceField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : isMinPrice(fieldName, fieldValue, 5);
  };

  return {
    errors,
    validateTitleField,
    validateDescriptionField,
    validateCategoryField,
    validatePriceField,
    validateImageField,
  };
}
