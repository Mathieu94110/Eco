import { ref } from "vue";

export const collapsed = ref(false);
export const toggleSidebar = () => (collapsed.value = !collapsed.value);
