<script lang="ts">
import { defineComponent, ref, inject, watch, onBeforeMount, toRefs, VNode } from "vue";
export default defineComponent({
  name: "Tab",
  setup() {
    const index = ref(0);
    const isActive = ref(false);

    const tabs = inject("TabsProvider");

    watch(
      () => tabs.selectedIndex,
      () => {
        isActive.value = index.value === tabs.selectedIndex;
      },
    );

    onBeforeMount(() => {
      index.value = tabs.count;
      tabs.count++;
      isActive.value = index.value === tabs.selectedIndex;
    });
    return { index, isActive };
  },
});
</script>

<template>
  <div class="tab" v-show="isActive">
    <slot></slot>
  </div>
</template>
