<template>
  <div class="card" v-if="post">
    <div class="card__post-form" @submit="checkForm" method="post">
      <div
        style="
          height: 40px;
          margin: 20px 0px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        "
      >
        <label for="name">Titre</label>
        <div class="form-field">{{ post.title }}</div>
      </div>

      <div
        style="
          height: 60px;
          margin: 20px 0px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        "
      >
        <label for="name">Détails</label>
        <div class="form-field">{{ post.details }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostCreated",
  data() {
    return {
      post: null,
    };
  },
  props: ["currentPost"],
  watch: {
    currentPost(newValue) {
      this.post = newValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: 700;
  color: #181818;
  &__post-form {
    width: 300px;
    margin: 20px;
    padding: 20px;
    font-size: 20px;
    text-align: center;
    text-shadow: 0px 2px 2px #bbbbbb;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    border-radius: 5%;
  }
  &__buttons-wrapper {
    display: flex;
    justify-content: space-evenly;
  }
  &__buttons {
    align-items: center;
    background-color: #fff;
    border: 2px solid #000;
    box-sizing: border-box;
    color: #000;
    cursor: pointer;
    display: inline-flex;
    fill: #000;
    font-family: Inter, sans-serif;
    font-size: 16px;
    font-weight: 600;
    height: 30px;
    justify-content: center;
    letter-spacing: -0.8px;
    line-height: 24px;
    min-width: 60px;
    outline: 0;
    padding: 0 4px;
    text-align: center;
    text-decoration: none;
    transition: all 0.3s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

    &:focus {
      color: #171e29;
    }

    &:hover {
      border-color: #06f;
      color: #06f;
      fill: #06f;
    }

    &:active {
      border-color: #06f;
      color: #06f;
      fill: #06f;
    }
  }
  .form-field {
    display: block;
    width: 100%;
    padding: 8px 16px;
    line-height: 25px;
    font-size: 14px;
    font-weight: 500;
    font-family: inherit;
    border-radius: 6px;
    -webkit-appearance: none;
    color: var(--input-color);
    border: 1px solid var(--input-border);
    background: var(--input-background);
    transition: border 0.3s ease;
    &::placeholder {
      color: var(--input-placeholder);
    }
    &:focus {
      outline: none;
      border-color: var(--input-border-focus);
    }
  }
}
</style>
