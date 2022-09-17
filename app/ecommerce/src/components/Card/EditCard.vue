<template>
  <div class="edit-card">
    <div class="edit-card__validate-button-wrapper mb-20">
      <buttton
        v-if="currentState"
        type="button"
        class="btn btn-primary"
        :key="component"
        @click="$emit('updateCard', card)"
        >Valider</buttton
      >
    </div>
    <CardLayout v-if="add">
      <template #image>
        <div class="edit-card__product-img" v-if="!edit">
          <img
            class="edit-card__img"
            :src="add.image"
            height="200"
            alt="product-image"
          />
        </div>
        <div
          v-else
          class="edit-card__imagePreviewed"
          :style="{ 'background-image': `url(${card.image})` }"
        ></div>
        <input
          id="image"
          name="image"
          accept="image/*"
          ref="fileInput"
          type="file"
          @input="onPickFile"
        />
      </template>
      <template #title>
        <input v-model="title" class="edit-card__inputs" />
      </template>
      <template #description>
        <textarea v-model="description" class="edit-card__inputs"></textarea>
      </template>
      <template #price>
        <input v-model="price" class="edit-card__inputs" />
      </template>
      <template #date>
        <span>{{ new Date(add.date).toLocaleDateString() }}</span>
      </template>
      <template #category>
        <select v-model="category" class="edit-card__inputs">
          <option value="Informatique">Informatique</option>
          <option value="Téléphones, tablettes">Téléphones, tablettes</option>
          <option value="Électro">Électro</option>
          <option value="Rangements">Rangements</option>
          <option value="Vetements">Vetements</option>
          <option value="Cosmétiques">Cosmétiques</option>
          <option value="Vidéo, son">Vidéo, son</option>
          <option value="Auto, moto">Auto, moto</option>
          <option value="Autres">Autres</option>
        </select>
      </template>
    </CardLayout>
  </div>
</template>

<script>
import CardLayout from "../Layout/CardLayout.vue";

export default {
  data() {
    return {
      editCard: false,
      edit: false,
      card: {},
    };
  },
  props: ["add", "currentState"],
  components: {
    CardLayout,
  },
  methods: {
    onPickFile() {
      this.edit = true;
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.card.image = e.target.result;
        };
        reader.readAsDataURL(file[0]);
      }
    },
  },
  mounted() {
    if (this.add) {
      this.card = this.add;
    }
  },
  computed: {
    title: {
      get() {
        return this.card.title;
      },
      set(val) {
        this.card.title = val;
      },
    },

    description: {
      get() {
        return this.card.description;
      },
      set(val) {
        this.card.description = val;
      },
    },
    price: {
      get() {
        return this.card.price;
      },
      set(val) {
        this.card.price = val;
      },
    },
    category: {
      get() {
        return this.card.category;
      },
      set(val) {
        this.card.category = val;
      },
    },
  },
  watch: {
    edit(newValue) {
      this.editCard = newValue;
    },
  },
};
</script>

<style scoped lang="scss">
.edit-card {
  &__validate-button-wrapper {
    width: 100%;
    text-align: center;
  }
  &__product-img {
    cursor: pointer;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    text-align: center;
  }
  &__imagePreviewed {
    width: 200px;
    height: 200px;
    display: block;
    cursor: pointer;
    margin: 0 auto 14px;
    background-size: cover;
    background-position: center center;
  }
  &__inputs {
    font-weight: 600;

    > options {
      height: 40px;
      width: 100%;
    }
  }
}
</style>
