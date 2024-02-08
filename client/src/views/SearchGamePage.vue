<template>
  <div>
    <Title :title="{ primary: 'Rechercher', secondary: 'un jeu' }" />
    <SearchInput />
  </div>
</template>

<script setup lang="ts">
import Title from "@/components/common/Title.vue";
import SearchInput from "@/components/SearchInput/SearchInput.vue";
</script>

<style scoped lang="scss">
.search-game-page {
  min-height: 600px;
}
</style>
