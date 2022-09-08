<template>
  <div
    class="card"
    :style="{
      padding: isFavoritePage ? '30px' : '16px',
      width: isFavoritePage ? '' : '250px',
      textAlign: isFavoritePage ? '' : 'center',
      maxHeight: '600px',
    }"
  >
    <div class="card__product-img">
      <img
        v-if="add.images"
        class="card__img"
        :src="add.images[0]"
        height="100"
        alt="product-image"
      />
    </div>
    <div class="card__content">
      <p class="card__title">
        {{ add.title }} <span>#{{ add.id }}</span>
      </p>
      <p class="card__description" v-if="add.description">
        {{ add.description }}
      </p>
      <div class="card__content-bottom">
        <div :class="isFavoritePage ? 'card__price-favorite' : 'card__price'">
          <div class="card__price-items">
            <span>Prix:</span> <span>{{ add.price }} $</span>
          </div>
          <div class="card__price-items">
            <span>% de réduction:</span>
            <span>{{ add.discountPercentage }}</span>
          </div>
          <div v-if="add.rating" class="card__price-items">
            <span>Avis vendeur: </span><span>{{ add.rating }} / 5</span>
          </div>
        </div>
        <div v-if="isFavoritePage" class="card__price-favorite">
          <div class="card__price-items">
            <span>Marque: </span><span>{{ add.brand }}</span>
          </div>

          <div class="card__price-items">
            <span>% de réduction: </span
            ><span>{{ add.discountPercentage }}</span>
          </div>
          <div class="card__price-items">
            <span>Stock: </span><span>{{ add.stock }}</span>
          </div>
          <div class="card__price-items">
            <span>Miniature: </span>
            <img
              v-if="add.images.length > 0"
              class="card__img"
              :src="add.images[0]"
              height="50"
              alt="product-image"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="card__footer">
      <div class="card__avatar">
        <img alt="avatar-image" :src="add.thumbnail" />
      </div>
      <div class="card__category">
        <div class="card__category-items">
          <span class="card__price-items">Catégorie:</span>
          <span class="card__category-items">{{ add.category }}</span>
        </div>
        <div class="card__category-items--alt-color" v-if="!isFavoritePage">
          <label :for="id" @click="sendToFavorites(add)">
            <i class="fas fa-heart"></i>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddCard",
  props: {
    add: {
      brand: {
        type: String,
      },
      category: {
        type: String,
      },
      description: {
        type: String,
      },
      discountPercentage: {
        type: Number,
      },
      id: {
        type: Number,
      },
      images: {
        type: [String],
      },
      price: {
        type: Number,
      },
      rating: {
        type: Number,
      },
      stock: {
        type: Number,
      },
      thumbnail: {
        type: String,
      },
      title: {
        type: String,
      },
    },
  },
  methods: {
    sendToFavorites(add) {
      this.$emit("addItem", add);
    },
  },
  computed: {
    isFavoritePage() {
      return this.$route.name == "FavoritesDetails";
    },
  },
};
</script>

<style scoped lang="scss">
.icon {
  display: flex;
}
.card {
  min-width: 300px;
  margin: 20px;
  background-color: #15263f;
  color: #fff;
  border-radius: 16px;
  font-size: 1.2rem;
  box-shadow: 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    padding-bottom: 32px;
  }
  &__product-img {
    cursor: pointer;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
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
  &__content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 24px 0 16px 0;
    @media screen and (min-width: 768px) {
      gap: 16px;
      padding: 24px 0;
    }
  }
  &__title {
    height: 50px;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      color: #00fff8;
    }
  }
  &__description {
    height: auto;
    overflow: hidden;
    font-size: 1rem;
    line-height: 1.2rem;
    font-weight: lighter;
  }
  &__content-bottom {
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
      gap: 8px;
      font-weight: 600;
    }
  }
  &__price {
    display: block;
  }
  &__price-favorite {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 0;
  }
  &__price-items {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
    :nth-child(odd) {
      color: #00fff8;
    }
  }
  &__footer {
    display: flex;
    align-items: center;
    border-top: 1px solid #2e405a;
    gap: 16px;
    padding-top: 16px;
  }
  &__avatar {
    display: flex;
    border-radius: 90px;
    border: 1px solid white;
    img {
      width: 33px;
    }
  }
  &__category {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  &__category-items {
    :first-child {
      color: #00fff8;
    }
    &--alt-color {
      padding: 10px;
      color: white;
      cursor: pointer;
      &:hover {
        color: rgb(250, 75, 75);
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
