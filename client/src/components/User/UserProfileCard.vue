<script setup lang="ts">
import { reactive, defineProps, ref, computed, watch } from "vue";
import mysteryImage from "@/assets/images/mystery-image.png";
import type { newUserInfoInterface } from "@/shared/interfaces";

// import mysteryImage from "../../assets/images/mystery-image.png";
const state: newUserInfoInterface = reactive({
  newUserInfos: {},
});

const props = defineProps(["userInfos"]);

const emit = defineEmits(["updateUser"]);

const isEditMode = ref(false);
const fileInput = ref(null);

const image = computed({
  get() {
    return state.newUserInfos.image;
  },
  set(val) {
    state.newUserInfos.image = val;
  },
});

const userName = computed({
  get() {
    return state.newUserInfos.userName;
  },
  set(val) {
    state.newUserInfos.userName = val;
  },
});

const firstName = computed({
  get() {
    return state.newUserInfos.firstName;
  },
  set(val) {
    state.newUserInfos.firstName = val;
  },
});
const lastName = computed({
  get() {
    return state.newUserInfos.lastName;
  },
  set(val) {
    state.newUserInfos.lastName = val;
  },
});
const email = computed({
  get() {
    return state.newUserInfos.email;
  },
  set(val) {
    state.newUserInfos.email = val;
  },
});
const phone = computed({
  get() {
    return state.newUserInfos.phone;
  },
  set(val) {
    state.newUserInfos.phone = val;
  },
});

const address = computed({
  get() {
    return state.newUserInfos.address;
  },
  set(val) {
    state.newUserInfos.address = val;
  },
});

const zip = computed({
  get() {
    return state.newUserInfos.zip;
  },
  set(val) {
    state.newUserInfos.zip = val;
  },
});

function editProfileInfo() {
  isEditMode.value = true;
}
function confirmInfo() {
  emit("updateUser", state.newUserInfos);
  isEditMode.value = false;
}

function onPickFile(e: Event) {
  const target = e.target as HTMLInputElement;
  const files = target.files;
  if (files && files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      state.newUserInfos.image = files[0];
    };

    reader.readAsDataURL(files[0]);
  }
}

const userInfos = computed(() => props.userInfos);

watch(userInfos, (newValue) => {
  state.newUserInfos = newValue;
});
</script>

<template>
  <div class="user-profile-card" v-if="state.newUserInfos">
    <div class="user-profile-card__header">
      <div
        class="user-profile-card__image"
        :style="{
          'background-image': `url(${image ? image : mysteryImage})`,
        }"
      >
        <div class="user-profile-card__edit-image" v-if="isEditMode">
          <label for="file">
            <span class="user-profile-card__label" for="file">
              <i
                class="fa-solid fa-pen-to-square user-profile-card__edit-icon"
              ></i>
            </span>
            <input
              type="file"
              id="file"
              class="user-profile-card__file-input"
              @input="onPickFile"
            />
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
        <span v-if="isEditMode"
          ><input
            data-test="userName"
            class="pl-5 font-600"
            v-model="userName"
          /> </span
        ><span v-else>{{ userName }}</span>
      </p>
      <p
        class="user-profile-card__sub-categories"
        :class="{ active: isEditMode }"
      >
        <span>Prénom</span>
        <span v-if="isEditMode"
          ><input
            data-test="firstName"
            class="pl-5 font-600"
            v-model="firstName"
          /> </span
        ><span v-else>{{ firstName }}</span>
      </p>
      <p
        class="user-profile-card__sub-categories"
        :class="{ active: isEditMode }"
      >
        <span>Nom</span>
        <span v-if="isEditMode"
          ><input
            data-test="lastName"
            class="pl-5 font-600"
            v-model="lastName"
          /> </span
        ><span v-else>{{ lastName }}</span>
      </p>
      <p
        class="user-profile-card__sub-categories"
        :class="{ active: isEditMode }"
      >
        <span>Email</span
        ><span v-if="isEditMode"
          ><input
            data-test="email"
            class="pl-5 font-600"
            v-model="email"
          /> </span
        ><span v-else>{{ email }}</span>
      </p>
      <p
        class="user-profile-card__sub-categories"
        :class="{ active: isEditMode }"
      >
        <span>Téléphone</span
        ><span v-if="isEditMode"
          ><input
            data-test="phone"
            class="pl-5 font-600"
            v-model="phone"
          /> </span
        ><span v-else>{{ phone }}</span>
      </p>
      <p
        class="user-profile-card__sub-categories"
        :class="{ active: isEditMode }"
      >
        <span>Adresse</span
        ><span v-if="isEditMode"
          ><input
            data-test="address"
            class="pl-5 font-600"
            v-model="address" /></span
        ><span v-else>{{ address }}</span>
      </p>
      <p
        class="user-profile-card__sub-categories"
        :class="{ active: isEditMode }"
      >
        <span>Code postal</span>
        <span v-if="isEditMode"
          ><input data-test="zip" class="pl-5 font-600" v-model="zip"
        /></span>
        <span v-else>{{ zip }}</span>
      </p>
    </div>

    <div class="user-profile-card__footer">
      <span
        id="edit-profile"
        v-if="!isEditMode"
        @click="editProfileInfo()"
        @keydown="editProfileInfo()"
      >
        <i class="fa-solid fa-pen-to-square user-profile-card__edit-icon"></i
      ></span>
      <span
        v-else
        id="confirm-info"
        @click="confirmInfo()"
        @keydown="confirmInfo()"
      >
        <i class="fa-solid fa-check user-profile-card__edit-icon"></i>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../../assets/scss/mixins" as m;
.user-profile-card {
  width: 80%;
  background-color: var(--gray-3);
  box-shadow: 0 10px 90px #00000024;
  text-align: center;
  font-size: 20px;
  border-radius: 15px;
  &__header {
    position: relative;
    height: 48px;
  }
  &__body {
    padding: 10px 20px;
    min-height: 320px;
    min-width: 0px;
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
    color: var(--primary-color);
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s ease-out;
    left: 88%;
    top: 33%;
  }

  &__image {
    width: 90px;
    height: 90px;
    border-radius: 1000px;
    position: relative;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 8px solid var(--primary-1);
    box-shadow: 0 0 20px #00000033;
    cursor: pointer;
    background-size: cover;
  }
  &__main-category input,
  &__sub-categories input {
    :nth-child(odd) {
      color: var(--primary-1);
    }
    color: var(--gray-1);
  }
  &__sub-categories {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    :nth-child(odd) {
      color: var(--primary-1);
    }
    color: var(--gray-1);
  }
  &__main-category {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    font-size: 18px;
    font-weight: bold;
    color: var(--gray-1);
    :nth-child(odd) {
      color: var(--primary-1);
    }
    &:hover {
      margin-top: 30px;
    }
  }
  &__footer {
    background-color: var(--primary-1);
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    padding: 20px 0 20px 0;
  }
  &__edit-icon {
    &:hover {
      font-size: 24px;
      color: var(--gray-1);
      cursor: pointer;
    }
  }
}
.active {
  &:hover {
    span:first-child {
      font-size: 16px;
      cursor: pointer;
      font-weight: 600;
      color: var(--gray-1);
    }
  }
}
@include m.sm {
  .user-profile-card {
    width: auto;

    &__image {
      width: 130px;
      height: 130px;
      &:hover {
        width: 180px;
        height: 180px;
        border: 8px solid var(--gray-3);
      }
    }
    &__body {
      width: 400px;
    }
    &__sub-categories {
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      :nth-child(odd) {
        color: var(--primary-1);
      }
      color: var(--gray-1);
    }
  }
}
</style>
