import { ref } from "vue";

export const collapsed = ref(true);
export const toggleSidebar = () => (collapsed.value = !collapsed.value);
