<template>
  <div>
    <ul class="tabs__header">
      <li
        v-for="(tab, index) in tabs"
        :key="tab.title"
        @click="selectTab(index)"
        :class="{ tab__selected: index == selectedIndex }"
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
      console.log(state.tabs[0]);
    });

    return { ...toRefs(state), selectTab };
  },
});
</script>

<style lang="css">
ul.tabs__header {
  display: block;
  list-style: none;
  margin: 0 0 0 20px;
  padding: 0;
}

ul.tabs__header > li {
  padding: 15px 30px;
  border-radius: 10px;
  margin: 0;
  display: inline-block;
  margin-right: 5px;
  cursor: pointer;
  background-color: #fff;
  color: var(--secondary-1);
}

ul.tabs__header > li.tab__selected {
  font-weight: bold;
  border: 1px solid var(--secondary-1);
}

.tab {
  display: inline-block;
  color: black;
  padding: 20px;
  min-width: 800px;
  border-radius: 10px;
  min-height: 400px;
}

.tabs__light .tab {
  background-color: #fff;
}

.tabs__light li {
  background-color: #ddd;
  color: #aaa;
}

.tabs__light li.tab__selected {
  background-color: #fff;
  color: #83ffb3;
}

.tabs__dark .tab {
  background-color: #555;
  color: #eee;
}

.tabs__dark li {
  background-color: #ddd;
  color: #aaa;
}

.tabs__dark li.tab__selected {
  background-color: #555;
  color: white;
}
</style>
