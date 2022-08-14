<template>
  <div class="edit-add__card">
    <div class="edit-add__image">
      <slot name="image"></slot>
    </div>
    <div class="edit-add__content">
      <p class="edit-add__items">
        <span>Titre :</span>
        <slot name="title"></slot>
      </p>
      <p class="edit-add__items">
        <span>Description :</span>
        <slot name="description"></slot>
      </p>
      <div class="edit-add__items">
        <span>Prix :</span>
        <slot name="price"></slot>
      </div>
      <div class="edit-add__items">
        <span>Date de création :</span>
        <slot name="date"></slot>
      </div>
    </div>
    <div class="edit-add__footer">
      <span>Catégorie :</span>
      <slot name="category"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.icon {
  display: flex;
}

.edit-add {
  &__card {
    min-width: 320px;
    background-color: #15263f;
    color: #8bacd9;
    border-radius: 16px;
    padding: 16px 10px;
    font-size: 1.2rem;
    box-shadow: 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  }
  &__image {
    cursor: pointer;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    text-align: center;
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 12px 0 16px 0;
  }
  &__items {
    display: flex;
    flex-direction: column;
    > span {
      &:nth-child(odd) {
        color: #00fff8;
      }
      &:nth-child(even) {
        color: #fff;
      }
    }
  }
  &__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #2e405a;
    gap: 16px;
    padding-top: 16px;
    > span {
      &:nth-child(odd) {
        color: #00fff8;
        white-space: nowrap;
      }
      &:nth-child(even) {
        color: #fff;
      }
    }
  }
}
</style>
