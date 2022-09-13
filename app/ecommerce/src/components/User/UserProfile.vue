<template>
  <div class="user-card" v-if="props.userInfos">
    <h1 class="mb-20">Informations du profil</h1>
    <div
      class="user-card__image"
      :style="{
        'background-image': `url(${
          props.userInfos.image ? props.userInfos.image : mysteryImage
        })`,
      }"
    ></div>
    <ul>
      <li class="user-card__item">
        <span>Pseudo:</span> <span>{{ props.userInfos.firstName }}</span>
      </li>
      <li class="user-card__item">
        <span> Prénom:</span> <span>{{ props.userInfos.firstName }}</span>
      </li>
      <li class="user-card__item">
        <span>Nom:</span> <span>{{ props.userInfos.lastName }}</span>
      </li>
      <li class="user-card__item">
        <span>Email:</span> <span>{{ props.userInfos.email }}</span>
      </li>
      <li class="user-card__item">
        <span>Téléphone: </span> <span>{{ props.userInfos.phone }}</span>
      </li>
      <li class="user-card__item">
        <span>Adresse: </span> <span>{{ props.userInfos.address }}</span>
      </li>
      <li class="user-card__item">
        <span>Code postal:</span> <span>{{ props.userInfos.zip }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import mysteryImage from "@/assets/images/mystery-image.png";

const props = defineProps(["userInfos"]);
</script>

<style scoped lang="scss">
.user-card {
  background-color: #4f95ff;
  width: 500px;
  padding: 20px;
  text-align: center;
  border: 1px solid #000;
  border-radius: 5px;
  box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.3);
  &__image {
    width: 120px;
    height: 120px;
    display: block;
    cursor: pointer;
    margin: 0 auto 14px;
    background-size: cover;
    background-position: center center;
  }
  &__item {
    display: flex;
    justify-content: space-between;

    font-size: 18px;
    font-weight: 600;

    :nth-child(odd) {
      text-decoration: underline;
    }
  }
}
</style>
