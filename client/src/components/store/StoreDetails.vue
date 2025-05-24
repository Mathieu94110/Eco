<template>
  <div class="store-details">
    <div class="store-details__content">
      <div class="store-details__content__img">
        <img :src="storeData?.image_background" :alt="storeData?.name" />
      </div>
      <div class="store-details__content__info">
        <h5 class="store-details__content__info-title">{{ storeData?.name }}</h5>
        <ul class="store-details__content__info__details">
          <li class="store-details__content__info__details__domain-link">
            <span class="store-details__content__info__details__domain-link-key">Domaine: </span>
            <a class="store-details__content__info__details__domain-link-value"
              :href="`https://www.${storeData?.domain}`" target="_blank">{{ storeData?.domain }}</a>
          </li>
          <li class="store-details__content__info__details__domain-link">
            <span class="store-details__content__info__details__domain-link-key">Nombre de jeux: </span>
            <span class="store-details__content__info__details__domain-link-value">{{ storeData?.games_count }}</span>
          </li>
        </ul>
        <div class="store-details__content__info__description">
          <div v-html="storeData?.description" class="store-details__content__info__description-content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  storeData: any;
}>();
</script>

<style scoped lang="scss">
@use '../../assets/scss/mixins' as m;

.store-details {
  margin-top: 32px;
  padding-bottom: 32px;
  background: rgba(0, 0, 0, 0.9);

  &__content {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;

    &__img {
      & img {
        .img-fit-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    &__info {
      margin: 16px 0;
      padding: 20px;

      &-title {
        font-weight: 700;
        text-transform: uppercase;
        font-size: 20px;
        display: inline-block;
        margin-bottom: 12px;
        color: var(--secondary-2);

        & a {
          text-decoration: none;
        }
      }

      &__details {
        &__domain-link {
          color: #fff;

          & span {
            font-weight: 700;
          }

          & a {
            color: #fff;
          }

          &-title {
            font-weight: 700;
            margin-right: 10px;
            color: var(--primary-1);
          }

          &-key {
            color: var(--secondary-2);
            margin-right: 10px;
            font-size: 13px;
          }

          &-value {
            color: #fff;
            font-size: 13px;
          }
        }
      }

      &__description {
        font-size: 12px;
        font-weight: 400px;
        color: rgba(255, 255, 255, 0.9);

        &-content {
          margin: 24px 0;
        }
      }
    }
  }
}

@include m.sm {
  .store-details {
    &__content {
      &__img {
        min-height: 320px;
      }

      &__info {
        &-title {
          font-size: 32px;
        }

        &__details {
          &__domain-link {
            &-title {
              font-weight: 700;
              margin-right: 10px;
              color: var(--primary-1);
            }

            &-key {
              font-size: 16px;
            }

            &-value {
              font-size: 16px;
            }
          }
        }

        &__description {
          font-size: 16px;
        }
      }
    }
  }
}

@include m.lg {
  .store-details {
    .details-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;
      align-items: stretch;
    }
  }
}
</style>
