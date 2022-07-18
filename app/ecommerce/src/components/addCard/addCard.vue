<template>
  <div class="card">
    <div class="card__product-img">
      <img class="card__img" :src="img" height="100" alt="product-image" />
    </div>
    <div class="card__content">
      <p class="card__title">
        {{ title }} <span v-if="id">#{{ id }}</span>
      </p>
      <p class="card__description" v-if="description">{{ description }}</p>
      <div class="card__content-bottom">
        <div class="card__price">
          <div class="card__price-items">
            <span>Prix:</span> <span>{{ price }} $</span>
          </div>
          <div class="card__price-items">
            <span>% de réduction:</span> <span>{{ percentage }}</span>
          </div>
          <div v-if="rating" class="card__price-items">
            <span>Avis vendeur: </span><span>{{ rating }} / 5</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card__footer">
      <div class="card__avatar">
        <img alt="avatar-image" :src="avatar" />
      </div>
      <p class="card__category">
        Catégorie: <span class="card__category--alt-color">{{ category }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: "",
      required: true,
    },
    title: {
      type: String,
      default: "",
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    id: {
      type: [String, Number],
      default: null,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    percentage: {
      type: Number,
      default: 0,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped lang="scss">
.icon {
  display: flex;
}
.card {
  margin: 20px;
  background-color: #15263f;
  color: #8bacd9;
  border-radius: 16px;
  padding: 16px;
  width: 200px;
  font-size: 1.2rem;
  box-shadow: 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    width: 200px;
    padding-bottom: 32px;
  }
  .card__product-img {
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
    &::before {
      @include hoverOpacity;
      background-color: cyan;
    }
    &::after {
      @include hoverOpacity;
    }
    &:hover {
      &::before {
        opacity: 0.5;
      }
      &::after {
        opacity: 1;
      }
    }
  }
  .card__content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 24px 0 16px 0;
    @media screen and (min-width: 768px) {
      gap: 16px;
      padding: 24px 0;
    }
    .card__title {
      height: 50px;
      color: white;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        color: #00fff8;
      }
    }
    .card__description {
      height: 155px;
      overflow: hidden;
      font-size: 1rem;
      line-height: 1.2rem;
      font-weight: lighter;
    }
    .card__content-bottom {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-top: 4px;
      font-size: 1rem;
      @media screen and (min-width: 768px) {
        padding-top: 6px;
      }
      > * {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
      }
      .card__price {
        color: #00fff8;
        display: block;
      }
      .card__price-items {
        display: flex;
        flex-direction: column;
      }
    }
  }
  .card__footer {
    display: flex;
    align-items: center;
    border-top: 1px solid #2e405a;
    gap: 16px;
    padding-top: 16px;
    .card__avatar {
      display: flex;
      border-radius: 90px;
      border: 1px solid white;
      img {
        width: 33px;
      }
    }
    .card__category--alt-color {
      color: white;
      cursor: pointer;
      &:hover {
        color: #00fff8;
      }
    }
  }
}
//Transition
.fade-enter-active,
.fade-leave-active {
  transition: 0.25s ease-out;
}
.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}
</style>
