<template>
  <div class="banner">
    <div class="banner__content container">
      <div class="banner__content-badge">Rejoint le stream</div>
      <h1 class="banner__content-title">Les meilleurs jeux en ligne</h1>
      <p class="banner__content-lead-text">
        Jeu en direct avec de nombreux autres jeux. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercice.
      </p>
      <div class="banner__content__banner-btn">
        <span class="banner__content__banner-btn-btn-icon">
          <FontAwesomeIcon :icon="['fas', 'gamepad']" class="banner__content__banner-btn-btn-icon-gaming" />
        </span>
        <span class="btn-play-now btn-primary">Jouer maintenant</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faGamepad);
</script>

<style lang="scss" scoped>
@use '../../assets/scss/mixins' as m;

.banner {
  background-image: url("@/assets/images/banner-background.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: start;
  min-height: 768px;

  &__content {
    width: 100%;
    color: #fff;

    &-badge {
      padding: 4px 16px;
      font-weight: 600;
      font-size: 20px;
      letter-spacing: 0.1em;
      display: inline-block;
      margin-bottom: 25px;
      text-transform: uppercase;
    }

    &-title {
      font-size: 20px;
      font-weight: 400;
      letter-spacing: 0.09em;
      line-height: 1.2;
      max-width: 600px;
      margin-bottom: 40px;
      text-transform: uppercase;
    }

    &-lead-text {
      max-width: 600px;
    }

    &__banner-btn {
      display: flex;
      align-items: center;
      min-width: 140px;
      height: 45px;
      padding: 13px 16px;
      font-size: 16px;
      font-weight: 600;
      text-transform: uppercase;
      margin-top: 33px;

      &:hover {
        .btn-text {
          color: #fff;
        }
      }

      &-btn-icon {
        margin-right: 16px;

        &-gaming {
          width: 30px;
          height: 30px;
        }
      }

      &-play-now {
        padding: 13px 16px;
        font-size: 16px;
        font-weight: 600;
        text-transform: uppercase;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}

@include m.md {
  .banner {
    &__content {
      &-badge {
        font-size: 26px;
      }

      &-title {
        font-size: 48px;
      }

      &__banner-btn {
        &-btn-icon {
          &-gaming {
            width: 50px;
            height: 50px;
          }
        }
      }
    }
  }
}
</style>