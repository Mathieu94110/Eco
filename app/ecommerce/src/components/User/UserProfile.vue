<template>
  <div class="user-profile-card" v-if="props.userInfos">
    <div class="user-profile-card__header">
      <div
        class="user-profile-card__image"
        :style="{
          'background-image': `url(${image ? image : mysteryImage})`,
        }"
      >
        <div class="user-profile-card__edit-image" v-if="isEditMode">
          <input
            type="file"
            id="file"
            class="user-profile-card__file-input"
            ref="fileInput"
            @input="onPickFile"
          />
          <label class="user-profile-card__label" for="file">
            <i
              class="fa-solid fa-pen-to-square user-profile-card__edit-icon"
            ></i>
            <p class="user-profile-card__file-name"></p>
          </label>
        </div>
      </div>
    </div>
    <div class="user-profile-card__body">
      <p
        class="user-profile-card__main-category"
        :class="{ active: isEditMode }"
      >
        <span>Pseudo</span>
        <span v-if="isEditMode"><input class="pl-5" v-model="userName" /> </span
        ><span v-else>{{ userName }}</span>
      </p>
      <p
        class="user-profile-card__sub-categories"
        :class="{ active: isEditMode }"
      >
        <span>Prénom</span>
        <span v-if="isEditMode"
          ><input class="pl-5" v-model="firstName" /> </span
        ><span v-else>{{ firstName }}</span>
      </p>
      <p
        class="user-profile-card__sub-categories"
        :class="{ active: isEditMode }"
      >
        <span>Nom</span>
        <span v-if="isEditMode"><input class="pl-5" v-model="lastName" /> </span
        ><span v-else>{{ lastName }}</span>
      </p>
      <p
        class="user-profile-card__sub-categories"
        :class="{ active: isEditMode }"
      >
        <span>Email</span
        ><span v-if="isEditMode"><input class="pl-5" v-model="email" /> </span
        ><span v-else>{{ email }}</span>
      </p>
      <p
        class="user-profile-card__sub-categories"
        :class="{ active: isEditMode }"
      >
        <span>Téléphone</span
        ><span v-if="isEditMode"><input class="pl-5" v-model="phone" /> </span
        ><span v-else>{{ phone }}</span>
      </p>
      <p
        class="user-profile-card__sub-categories"
        :class="{ active: isEditMode }"
      >
        <span>Adresse</span
        ><span v-if="isEditMode"><input class="pl-5" v-model="address" /></span
        ><span v-else>{{ address }}</span>
      </p>
      <p
        class="user-profile-card__sub-categories"
        :class="{ active: isEditMode }"
      >
        <span>Code postal</span>
        <span v-if="isEditMode"><input class="pl-5" v-model="zip" /></span>
        <span v-else>{{ zip }}</span>
      </p>
    </div>

    <div class="user-profile-card__footer">
      <span v-if="!isEditMode" @click="editProfileInfo()">
        <i class="fa-solid fa-pen-to-square user-profile-card__edit-icon"></i
      ></span>
      <span v-else @click="confirmInfo()">
        <i class="fa-solid fa-check user-profile-card__edit-icon"></i>
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, computed, defineEmits } from "vue";
import mysteryImage from "@/assets/images/mystery-image.png";

const props = defineProps(["userInfos"]);
const emit = defineEmits(["updateUser"]);

const isEditMode = ref(false);
const fileInput = ref(null);
const newUserInfos = {};

const image = computed({
  get() {
    return props.userInfos.image;
  },
  set(val) {
    newUserInfos.image = val;
  },
});

const userName = computed({
  get() {
    return props.userInfos.userName;
  },
  set(val) {
    newUserInfos.userName = val;
  },
});

const firstName = computed({
  get() {
    return props.userInfos.firstName;
  },
  set(val) {
    newUserInfos.firstName = val;
  },
});
const lastName = computed({
  get() {
    return props.userInfos.lastName;
  },
  set(val) {
    newUserInfos.lastName = val;
  },
});
const email = computed({
  get() {
    return props.userInfos.email;
  },
  set(val) {
    newUserInfos.email = val;
  },
});
const phone = computed({
  get() {
    return props.userInfos.phone;
  },
  set(val) {
    newUserInfos.phone = val;
  },
});

const address = computed({
  get() {
    return props.userInfos.address;
  },
  set(val) {
    newUserInfos.address = val;
  },
});

const zip = computed({
  get() {
    return props.userInfos.zip;
  },
  set(val) {
    newUserInfos.zip = val;
  },
});

function editProfileInfo() {
  isEditMode.value = true;
}
function confirmInfo() {
  emit("updateUser", newUserInfos);
  isEditMode.value = false;
}

function onPickFile() {
  let file = fileInput.value.files;
  if (file && file[0]) {
    let reader = new FileReader();
    reader.onload = (e) => {
      image.value = e.target.result;
    };

    reader.readAsDataURL(file[0]);
  }
}
</script>

<style scoped lang="scss">
.user-profile-card {
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
    position: relative;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 8px solid #4f95ff;
    box-shadow: 0 0 20px #00000033;
    cursor: pointer;
    background-size: cover;
    &:hover {
      width: 180px;
      height: 180px;
      border: 8px solid #42515a;
    }
  }
  &__file-input {
    opacity: 0;
    width: 0.1px;
    height: 0.1px;
    position: absolute;
  }
  &__file-name {
    position: absolute;
    bottom: -35px;
    left: 10px;
    font-size: 0.85rem;
    color: #555;
  }
  &__label {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 25px;
    background: linear-gradient(40deg, #ff6ec4, #7873f5);
    box-shadow: 0 4px 7px rgb(0 0 0 / 40%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s ease-out;
    left: 88%;
    top: 33%;
  }
  &__body {
    padding: 10px 20px;
    min-height: 320px;
    min-width: 340px;
  }
  &__main-category {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    font-size: 18px;
    font-weight: bold;
    color: #c2bdbd;
    :nth-child(odd) {
      color: #4f95ff;
    }
    &:hover {
      margin-top: 30px;
    }
  }

  &__sub-categories {
    padding: 8px 0;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    :nth-child(odd) {
      color: #4f95ff;
    }
    color: #c2bdbd;
  }
  &__footer {
    background-color: #4f95ff;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    padding: 20px 0 20px 0;
  }
  &__edit-icon {
    &:hover {
      font-size: 24px;
      color: #c2bdbd;
      cursor: pointer;
    }
  }
}
.active {
  &:hover {
    font-size: 16px;
    cursor: pointer;
    font-weight: 600;
    :nth-child(odd) {
      color: #c2bdbd;
    }
  }
}
</style>
