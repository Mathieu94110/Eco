<script setup lang="ts"></script>

<template>
  <div>
    <div class="login__title">
      <slot name="title" />
    </div>
    <h2 class="login__subtitle-main">
      <slot name="subtitle-main" />
    </h2>
    <div class="login__subtitle-secondary">
      <slot name="subtitle-secondary" />
    </div>
    <main class="login__form-items">
      <slot name="group" />
    </main>
    <slot name="signin-error"></slot>
    <div class="login__footer">
      <slot name="login-footer"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.login {
  margin: 10px;
  padding: 10px;
  width: auto;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 5px;
  box-shadow: 0px 9px 30px rgba(255, 255, 255, 0.1);
  text-align: center;

  &__logo {
    font-size: 60px;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #fff;
    margin: 0 auto;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  &__title {
    color: var(--primary-1);
    font-weight: 600;
    padding: 10px 0;
  }

  h1 {
    font-size: 18px;
  }

  &__button-disabled {
    &:hover {
      cursor: not-allowed;
    }
  }

  &__form-group {
    position: relative;
    padding-top: 10px;
  }

  &__form-field {

    &:required,
    &:invalid {
      box-shadow: none;
    }

    &::placeholder {
      color: transparent;
    }

    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 12px;
    color: #fff;
    padding: 6px;
    background: transparent;
    transition: border-color 0.2s;

    &::placeholder {
      color: transparent;
    }
  }

  &__form-label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 12px;
    color: #fff;
  }

  &__form-items {
    &-error {
      margin: 8px auto;
    }

    &--error {
      color: var(--danger);
      font-weight: bold;
      font-size: 12px;
      width: auto;
    }
  }

  &__subtitle-main {
    color: #fff;
    font-weight: 600;
    padding: 10px 0;
    font-size: 15px;
  }

  &__subtitle-secondary {
    color: var(--primary-1);
    text-decoration: underline;
    font-weight: 600;

    &:hover {
      cursor: pointer;
    }
  }

  .login__form-field:focus {
    ~.login__form-label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 14px;
      color: var(--primary-1);
      font-weight: 700;
    }

    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, var(--primary-1), var(--primary-1));
    border-image-slice: 1;
  }
}

.login__form-field {
  &:placeholder-shown~.login__form-label {
    font-size: 16px;
    cursor: text;
    top: 20px;
  }
}

@media screen and (min-width: 768px) {
  .login {
    margin: 0;
    padding: 14px 10px;
    width: 500px;

    h1 {
      font-size: 26px;
    }

    &__title {
      padding: 6px;
    }

    &__subtitle-main {
      font-size: 20px;
      padding: 6px;
    }

    &__subtitle-secondary {
      color: var(--primary-1);
      font-weight: 600;
      font-size: 20px;
      padding: 6px;
    }

    &__form-field {
      font-size: 22px;
    }

    &__form-label {
      font-size: 20px;
    }

    &__form-items {
      &-error {
        height: 20px;
      }

      &--error {
        width: auto;
        font-size: 16px;
      }
    }
  }

  .login__form-field:focus {
    ~.login__form-label {
      font-size: 18px !important;
    }
  }

  .login__form-field {
    &:placeholder-shown~.login__form-label {
      font-size: 1.3rem;
    }
  }
}
</style>
