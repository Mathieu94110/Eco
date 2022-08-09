<template>
  <div class="card" v-if="add">
    <div class="card__product-img" v-if="edit === false">
      <img
        class="card__img"
        :src="add.image"
        height="200"
        alt="product-image"
      />
    </div>
    <div
      v-if="edit === true"
      class="card__imagePreviewed"
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
    <div class="card__content">
      <p class="card__items">
        <span>Titre :</span>
        <input v-model="title" />
      </p>
      <p class="card__items">
        <span>Description :</span>
        <Field v-model="description" />
      </p>

      <div class="card__items">
        <span>Date de création :</span>
        <input v-model="date" />
      </div>

      <div class="card__items">
        <span>Prix :</span>
        <input v-model="price" />
      </div>
    </div>
    <div class="card__footer">
      <span>Catégorie :</span>
      <input v-model="category" />
    </div>
  </div>
</template>

<script>
import { Field } from "vee-validate";

export default {
  data() {
    return {
      editCard: false,
      edit: false,
      currentImage: null,
      title: null,
      description: null,
      date: null,
      price: null,
      category: null,
    };
  },
  props: ["add"],
  components: {
    Field,
  },
  methods: {
    onPickFile() {
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
  },
  watch: {
    edit(newValue) {
      this.editCard = newValue;
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  min-width: 320px;
  margin: 20px;
  text-align: center;
  background-color: rgba(7, 26, 53, 0.8);
  color: #8bacd9;
  border-radius: 16px;
  padding: 16px;
  font-size: 1.2rem;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;

  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    padding-bottom: 32px;
  }
  &__product-img {
    cursor: pointer;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    text-align: center;
    @mixin hoverOpacity {
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.25s ease-out;
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
    .card__content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-top: 4px;
      font-size: 1rem;
      @media screen and (min-width: 768px) {
        gap: 16px;
        padding: 24px 0;
      }

      @media screen and (min-width: 768px) {
        padding-top: 6px;
      }
      > * {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        font-weight: 600;
      }
      .card__items {
        display: flex;
        flex-direction: column;
        > span {
          &:nth-child(odd) {
            color: #00fff8;
          }
          &:nth-child(even) {
            color: #fff;
          }
        }
      }
    }
    .card__footer {
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 1px solid #2e405a;
      gap: 16px;
      padding-top: 16px;
      > span {
        &:nth-child(odd) {
          color: #00fff8;
        }
        &:nth-child(even) {
          color: #fff;
        }
      }
    }
  }
}
</style>
