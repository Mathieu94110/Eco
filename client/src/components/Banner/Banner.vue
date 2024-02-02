<template>
  <div class="banner">
    <div class="banner__content">
      <div class="banner__content-badge">Rejoint le stream</div>
      <h1 class="banner__content-title">Les meilleurs jeux en ligne</h1>
      <p class="banner__content-lead-text">
        Jeu en direct avec de nombreux autres jeux. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercice.
      </p>
      <div class="banner__content__banner-btn">
        <span class="banner__content__banner-btn-btn-icon">
          <i class="fa-solid fa-gamepad banner__content__banner-btn-btn-icon-gaming"></i
        ></span>
        <span class="btn-play-now btn-primary">Jouer maintenant</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.banner {
  background-image: url("@/assets/images/banner-background.jpeg");
  background: cover;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: start;
  min-height: 768px;
  &__content {
    width: 100%;
    color: #fff;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.6rem;

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

@media screen and (min-width: 800px) {
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
