<template>
  <div class="card" v-if="add">
    <div class="card__product-img">
      <img
        class="card__img"
        :src="add.image"
        height="200"
        alt="product-image"
      />
    </div>
    <div class="card__content">
      <p class="card__items">
        <span>Titre :</span>
        <span>{{ add.title }}</span>
      </p>
      <p class="card__items">
        <span>Description :</span>
        <span>{{ add.description }}</span>
      </p>

      <div class="card__items">
        <span>Date de création :</span>
        <span>{{ new Date(add.date).toLocaleDateString() }}</span>
      </div>

      <div class="card__items">
        <span>Prix :</span>
        <span>{{ add.price }} €</span>
      </div>
    </div>
    <div class="card__footer">
      <span>Catégorie :</span>
      <span>{{ add.category }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editCard: false,
    };
  },
  props: ["add", "edit"],

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
</style>
