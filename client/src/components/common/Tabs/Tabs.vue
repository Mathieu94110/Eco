<template>
  <div>
    <ul class="tabs__header">
      <li
        class="tabs__header-link"
        v-for="(tab, index) in tabs"
        :key="tab.title"
        @click="selectTab(index)"
        :class="{ 'tabs__header-link--selected': index == selectedIndex }"
      >
        {{ tab.props.title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, provide, onMounted, onBeforeMount, toRefs, VNode } from "vue";

interface TabProps {
  title: string;
}

export default defineComponent({
  name: "Tabs",
  setup(_, { slots }) {
    const state = reactive({
      selectedIndex: 0,
      tabs: [] as VNode<TabProps>[],
      count: 0,
    });

    provide("TabsProvider", state);

    const selectTab = (i: number) => {
      state.selectedIndex = i;
    };

    onBeforeMount(() => {
      if (slots.default) {
        state.tabs = slots.default().filter((child) => child.type.name === "Tab");
      }
    });

    onMounted(() => {
      selectTab(0);
    });

    return { ...toRefs(state), selectTab };
  },
});
</script>

<style scoped lang="scss">
.tabs {
  &__header {
    display: block;
    list-style: none;
    padding: 0;
    &-link {
      padding: 4px 8px;
      border-radius: 10px;
      display: inline-block;
      margin: 5px;
      cursor: pointer;
      background-color: #fff;
      color: var(--secondary-1);
      &--selected {
        font-weight: bold;
        border: 1px solid var(--secondary-1);
      }
    }
  }
}

@media screen and (min-width: 600px) {
  .tabs {
    &__header {
      &-link {
        padding: 15px 30px;
      }
    }
  }
}
</style>
