<template>
  <div class="store-item">
    <div class="store-item__img">
      <img :src="storeItem?.image_background" :alt="storeItem?.id" />
    </div>
    <div class="store-item__content">
      <h5 class="store-item__content-title">
        <router-link :to="`stores/${storeItem.id}`">
          {{ storeItem?.name }}
        </router-link>
      </h5>
      <ul class="store-item__content-info">
        <li>
          <span>Domaine: </span>
          <a :href="`https://www.${storeItem?.domain}`" target="_blank">{{ storeItem?.domain }}</a>
        </li>
        <li>
          <span>Nombre de jeux: </span>
          {{ storeItem?.games_count }}
        </li>
      </ul>
      <p class="store-item__content-game" v-if="storeItem?.games">Jeux:</p>
      <ul class="store-item__content__game-link">
        <li v-for="item in storeItem?.games" class="store-item__content__game-link-link" :key="item.id">
          <router-link :to="`games/${item.id}`">{{ item.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ storeItem: any }>();
</script>

<style scoped lang="scss">
.store-item {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  min-height: 120px;
  margin: 16px 0;
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 16px;
    &-title {
      letter-spacing: 0.04em;
      color: #0b082d;
      font-size: 16px;
      display: inline-block;
      transition: var(--transition-default);
      text-transform: uppercase;
      font-weight: 700;

      &:hover {
        color: #000;
        opacity: 0.9;
      }
      & a {
        color: #fff;
      }
    }
    &-info {
      & > li {
        display: block;
        color: #fff;
        & span {
          font-weight: 700;
        }
        & a {
          color: #fff;
        }
      }
    }
    &-game {
      color: #fff;
      font-weight: 700;
    }
    &__game-link {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      &-link {
        background-color: #b9198e;
        border-radius: 100vh;
        padding-right: 8px;
        padding-left: 8px;
        min-height: 23px;
        font-weight: 500;
        & a {
          text-decoration: none;
          color: #fff;
          font-size: 13px;
          display: inline-block;
          transform: translateY(-3px);
          font-style: italic;
        }
      }
    }
  }
}

@media screen and (min-width: 600px) {
  .store-item {
    &__content {
      padding: 16px;
    }
  }
}
@media screen and (min-width: 992px) {
  .store-item {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
