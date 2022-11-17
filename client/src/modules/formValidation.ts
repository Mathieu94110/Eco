import { reactive } from '@vue/reactivity';
import useValidators from '@/modules/validators';

const errors = reactive({});

export default function addFormValidation() {
  const {
    isEmpty, minLength, maxLength, isMinPrice, isMaxPrice,
  } = useValidators();

  const validateImageField = (fieldName, fieldValue) => {
    errors[fieldName] = isEmpty(fieldName, fieldValue);
  };

  const validateTitleField = (fieldName, fieldValue) => {
    if (!fieldValue) {
      errors[fieldName] = isEmpty(fieldName, fieldValue);
    } else if (fieldValue.length > 20) {
      errors[fieldName] = maxLength(fieldName, fieldValue, 20);
    } else {
      errors[fieldName] = minLength(fieldName, fieldValue, 4);
    }
  };
  const validateDescriptionField = (fieldName, fieldValue) => {
    if (!fieldValue) {
      errors[fieldName] = isEmpty(fieldName, fieldValue);
    } else if (fieldValue.length < 4) {
      errors[fieldName] = minLength(fieldName, fieldValue, 4);
    } else {
      errors[fieldName] = maxLength(fieldName, fieldValue, 200);
    }
  };

  const validateCategoryField = (fieldName, fieldValue) => {
    errors[fieldName] = isEmpty(fieldName, fieldValue);
  };

  const validatePriceField = (fieldName, fieldValue) => {
    if (!fieldValue) {
      errors[fieldName] = isEmpty(fieldName, fieldValue);
    } else if (fieldValue < 5) {
      errors[fieldName] = isMinPrice(fieldName, fieldValue, 5);
    } else {
      errors[fieldName] = isMaxPrice(fieldName, fieldValue, 9999);
    }
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
