<template>
  <div class="user-profile-card" v-if="props.userInfos">
    <div class="user-profile-card__header">
      <div
        class="user-profile-card__image"
        :style="{
          'background-image': `url(${
            props.userInfos.image ? props.userInfos.image : mysteryImage
          })`,
        }"
      ></div>
    </div>
    <div class="user-profile-card__body">
      <p class="user-profile-card__main-category">
        <span>Pseudo</span> <span>{{ props.userInfos.firstName }}</span>
      </p>
      <p class="user-profile-card__sub-categories">
        <span>Prénom</span> {{ props.userInfos.firstName }}
      </p>
      <p class="user-profile-card__sub-categories">
        <span>Nom</span> {{ props.userInfos.lastName }}
      </p>
      <p class="user-profile-card__sub-categories">
        <span>Email</span> {{ props.userInfos.email }}
      </p>
      <p class="user-profile-card__sub-categories">
        <span>Téléphone</span> {{ props.userInfos.phone }}
      </p>
      <p class="user-profile-card__sub-categories">
        <span>Adresse</span> {{ props.userInfos.address }}
      </p>
      <p class="user-profile-card__sub-categories">
        <span>Code postal</span> {{ props.userInfos.zip }}
      </p>
    </div>

    <div class="user-profile-card__footer"></div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import mysteryImage from "@/assets/images/mystery-image.png";

const props = defineProps(["userInfos"]);
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  transition: 0.3s;
}

body {
  font-family: "Montserrat";
  background-color: #b8b6b6;
  color: #fdfdfd;
}

.user-profile-card {
  max-width: 320px;

  margin: 150px auto 0;
  background-color: #42515a;
  box-shadow: 0 10px 90px #00000024;
  text-align: center;
  font-size: 20px;
  border-radius: 15px;

  &__header {
    position: relative;
    height: 48px;
  }
  &__image {
    width: 130px;
    height: 130px;
    border-radius: 1000px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 8px solid #4f95ff;
    box-shadow: 0 0 20px #00000033;
    cursor: pointer;
    margin: 0 auto 14px;
    background-size: cover;
    &:hover {
      width: 180px;
      height: 180px;
      border: 8px solid #42515a;
    }
  }

  &__body {
    padding: 10px 20px;
    min-height: 320px;
    min-width: 300px;
  }
  &__main-category {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    font-size: 18px;
    font-weight: bold;
    color: #c2bdbd;
    &:hover {
      margin-top: 30px;
      font-size: 22px;
      :nth-child(odd) {
        color: #4f95ff;
      }
    }
  }

  &__sub-categories {
    padding: 8px 0;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #c2bdbd;
    &:hover {
      font-size: 16px;
      color: #ffffff;
      :nth-child(odd) {
        color: #4f95ff;
      }
    }
  }
  &__footer {
    background-color: #4f95ff;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    padding: 20px 0 20px 0;
  }
}
</style>
