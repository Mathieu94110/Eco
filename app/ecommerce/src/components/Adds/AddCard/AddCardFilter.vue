<template>
  <div
    style="
      padding: 20px;
      display: flex;
      flex-direction: column;
      width: 220px;
      justify-content: space-evenly;
    "
    :style="{ left: sideBarClosed ? '75px' : '270px' }"
  >
    <section style="margin-bottom: 20px">
      <h3 style="margin-bottom: 10px">Rechercher</h3>
      <input
        :value="search"
        @input="$emit('updateFilter', { search: $event.target.value })"
        type="text"
        placeholder="Rechercher"
      />
    </section>
    <section>
      <h3 style="margin-bottom: 10px">Trier par prix</h3>
      <div
        style="margin-bottom: 5px"
        v-for="(priceRange, index) of [
          [0, 10000],
          [800, 1000],
          [1000, 1500],
          [1500, 2000],
          [2000, 10000],
        ]"
        v-bind:key="index"
      >
        <input
          :checked="priceRange[0] === priceRange[0]"
          type="radio"
          @input="$emit('updateFilter', { priceRange })"
          name="priceRange"
          :id="priceRange[0] + ''"
          style="margin-right: 10px"
        />
        <label :for="priceRange[0] + ''">
          {{
            priceRange[0] === 0
              ? "Tous les prix"
              : priceRange[0] === 2000
              ? "Plus de 2000€"
              : `Entre ${priceRange[0]}€ et ${priceRange[1]}€`
          }}
        </label>
      </div>
    </section>
    <section style="padding: 10px 0px; display: flex; flex-direction: column">
      <h3 style="margin-bottom: 10px">Trier par categories</h3>
      <div style="max-height: 200px; overflow-y: auto">
        <p
          class="category"
          :class="{ selected: category === category }"
          v-for="(category, index) in [
            'Tout',
            'smartphones',
            'fragrances',
            'skincare',
            'tops',
            'furniture',
            'home-decoration',
            'groceries',
            'womens-dresses',
            'womens-shoes',
            'mens-shirts',
            'mens-shoes',
            'mens-watches',
            'womens-watches',
            'womens-bags',
            'womens-jewellery',
            'sunglasses',
            'automotive',
            'motorcycle',
            'lighting',
          ]"
          v-bind:key="index"
          @click="$emit('updateFilter', { category })"
        >
          {{ category }}
        </p>
      </div>
    </section>
    <small style="margin-bottom: 5px">
      Nombre de résultats:
      <strong>{{ (adds, ads, add) }}</strong>
    </small>
    <button class="reset-button" @click="$emit('updateFilter', {})">
      Supprimer les filtres
    </button>
  </div>
</template>
<script>
import { toRef, ref, inject } from "vue";
export default {
  setup(props) {
    const search = toRef(props, "filters.search");
    const priceRange = toRef(props, "filters.priceRange");
    const category = toRef(props, "filters.category");
    const sideBarClosed = inject("collapsed");
    const adds = ref(props.add);
    const ads = ref("props.add");
    const add = toRef(props, "add");
    return { search, priceRange, category, adds, ads, add, sideBarClosed };
  },
};
</script>

<style lang="scss" scoped>
.category {
  font-size: 14px;
  line-height: 18px;
  padding-bottom: 5px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.selected {
  font-weight: bold;
  text-decoration: underline;
}
.reset-button {
  color: #fff;
  background: red;
  padding: 10px 20px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
}
</style>
