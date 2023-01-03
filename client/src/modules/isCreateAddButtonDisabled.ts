import type { UserInterface } from "@/shared/interfaces";
import { computed } from "vue";

export default function createAddButtonState(user: any, errors: any) {
  const isCreateAddButtonDisabled = computed(() => {
    let disabled = true;
    for (const prop in user) {
      if (!user[prop] || errors[prop]) {
        disabled = true;
        break;
      }
      disabled = false;
    }
    return disabled;
  });
  return { isCreateAddButtonDisabled };
}
