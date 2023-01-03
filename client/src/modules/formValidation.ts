import { reactive } from "vue";
import useValidators from "@/modules/validators";
// import type { FormValidationErrors } from "@/shared/interfaces";

const errors: any = reactive({});

export default function addFormValidation() {
  const { isEmpty, minLength, maxLength, isMinPrice, isMaxPrice } =
    useValidators();

  const validateImageField = (fieldName: string, fieldValue: string) => {
    errors[fieldName] = isEmpty(fieldName, fieldValue);
  };

  const validateTitleField = (fieldName: string, fieldValue: string) => {
    if (!fieldValue) {
      errors[fieldName] = isEmpty(fieldName, fieldValue);
    } else if (fieldValue.length > 20) {
      errors[fieldName] = maxLength(fieldName, fieldValue, 20);
    } else {
      errors[fieldName] = minLength(fieldName, fieldValue, 4);
    }
  };
  const validateDescriptionField = (fieldName: string, fieldValue: string) => {
    if (!fieldValue) {
      errors[fieldName] = isEmpty(fieldName, fieldValue);
    } else if (fieldValue.length < 4) {
      errors[fieldName] = minLength(fieldName, fieldValue, 4);
    } else {
      errors[fieldName] = maxLength(fieldName, fieldValue, 200);
    }
  };

  const validateCategoryField = (fieldName: string, fieldValue: string) => {
    errors[fieldName] = isEmpty(fieldName, fieldValue);
  };

  const validatePriceField = (fieldName: string, fieldValue: number) => {
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
