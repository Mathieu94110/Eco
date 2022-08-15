<template>
  <div class="edit-card">
    <input
      v-if="currentState"
      type="button"
      class="edit-card__validate"
      :key="component"
      @click="sendChanges(add)"
      value="Valider"
    />

    <EditAddCard v-if="add">
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
          :style="{ 'background-image': `url(${currentImage})` }"
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
    </EditAddCard>
  </div>
</template>

<script>
import EditAddCard from "../Layout/EditAddCard.vue";

export default {
  data() {
    return {
      editCard: false,
      edit: false,
      currentImage: null,
      titleValue: null,
      descriptionValue: null,
      priceValue: null,
      categoryValue: null,
    };
  },
  props: ["add", "currentState"],
  components: {
    EditAddCard,
  },
  methods: {
    onPickFile() {
      this.edit = true;
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.currentImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
      }
    },
    sendChanges(add) {
      console.log(add);
    },
  },
  mounted() {
    if (this.add) {
      this.titleValue = this.add.title;
      this.descriptionValue = this.add.description;
      this.priceValue = this.add.price;
      this.categoryValue = this.add.category;
    }
  },
  computed: {
    title: {
      get() {
        return this.titleValue;
      },
      set(val) {
        this.titleValue = val;
      },
    },

    description: {
      get() {
        return this.descriptionValue;
      },
      set(val) {
        this.descriptionValue = val;
      },
    },
    price: {
      get() {
        return this.priceValue;
      },
      set(val) {
        this.priceValue = val;
      },
    },
    category: {
      get() {
        return this.categoryValue;
      },
      set(val) {
        this.categoryValue = val;
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
  &__validate {
    display: flex;
    margin: 0 auto 20px;
    background-image: linear-gradient(#42a1ec, #0070c9);
    border: 1px solid #0077cc;
    border-radius: 4px;
    color: #ffffff;
    cursor: pointer;
    font-size: 17px;
    font-weight: 400;
    letter-spacing: -0.022em;
    min-width: 30px;
    padding: 4px 15px;
    height: 40px;
    &:hover {
      background-image: linear-gradient(#51a9ee, #147bcd);
      border-color: #169cfc;
      text-decoration: none;
    }
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
