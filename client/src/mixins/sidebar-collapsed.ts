import { ref } from "vue";

export const collapsed = ref<boolean>(true);
export const toggleSidebar: () => boolean = () => (collapsed.value = !collapsed.value);
