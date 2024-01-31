<template>
  <div class="the-footer">
    <div class="the-footer__top">
      <div class="the-footer__top__content">
        <div class="the-footer__top__content__item">
          <a href="#" class="the-footer__top__content__item-link"> Eco <span>games</span> </a>
          <p class="the-footer__top__content__item-text">
            Lorem ipsum dolor sitamt consectue adispicing duis soolici tudin ague suisomid. Nulla vullam dolor.
          </p>
        </div>

        <div class="the-footer__top__content__item">
          <h5 class="the-footer__top__content__item-title">Liens rapides</h5>
          <ul class="the-footer__top__content__item-links">
            <li><a href="#">Jeux</a></li>
            <li><a href="#">Produits</a></li>
            <li><a href="#">Réseaux sociaux</a></li>
            <li><a href="#">Communautée</a></li>
          </ul>
        </div>

        <div class="the-footer__top__content__item">
          <h5 class="the-footer__top__content__item-title">Support</h5>
          <ul class="the-footer__top__content__item-links">
            <li><a href="#">Documents & vie privée</a></li>
            <li><a href="#">Aide & Support</a></li>
            <li><a href="#">Jeu en direct</a></li>
            <li><a href="#">Nouveautés</a></li>
          </ul>
        </div>

        <div class="the-footer__top__content__item">
          <h5 class="the-footer__top__content__item-link">newsletter</h5>
          <p class="the-footer__top__content__item-text">
            Souscrivez à notre newsletter pour avoir nos dernières nouvelles.
          </p>

          <form class="the-footer__top__content__item__form">
            <div class="the-footer__top__content__item__form__content">
              <input
                type="text"
                class="the-footer__top__content__item__form__content-input"
                placeholder="Votre adresse email"
              />
              <button class="the-footer__top__content__item__form__content-button">
                <i class="fa-regular fa-envelope"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="the-footer__bottom">
      <div class="the-footer__bottom__content">
        <p class="the-footer__bottom__content-copyright">Copyright &copy; 2024 Mathieu Enault - All rights reserved.</p>
        <ul class="the-footer__bottom__content-links">
          <li><a href="#">Accueil</a></li>
          <li><a href="#">Aide</a></li>
          <li><a href="#">Contactez-nous</a></li>
          <li><a href="#">Termes & conditions</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.the-footer {
  &__top {
    background-color: #050415;
    padding: 60px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    &__content {
      row-gap: 24px;
      color: #fff;
      display: grid;
      padding: 20px;
      &__item {
        text-align: center;
        &-link {
          color: #fff;
          text-transform: uppercase;
          flex-wrap: nowrap;
          display: block;
          font-weight: 700;
          font-size: 32px;
          margin-bottom: 18px;
          & span {
            color: var(--primary-1);
          }
        }
        &-text {
          max-width: 380px;
          margin-right: auto;
          margin-left: auto;
        }
        &-title {
          margin-bottom: 12px;
          font-size: 20px;
          letter-spacing: 0.03em;
          font-weight: 700;
          text-transform: uppercase;
        }
        &-links {
          & li {
            margin: 6px 0;
            & a {
              color: rgba(255, 255, 255, 0.9);
              &:hover {
                color: #fff;
                text-decoration: underline;
              }
            }
          }
        }
        &__form {
          margin-top: 18px;
          &__content {
            height: 48px;
            max-width: 284px;
            width: 100%;
            margin-right: auto;
            margin-left: auto;
            transition: all 300ms ease-in-out;
            display: flex;
            align-items: stretch;
            justify-content: center;
            :has(.the-footer__top__content__item__form__content-input:focus) {
              box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            }
            &-input {
              border: none;
              border-radius: 0px;
            }
            &-button {
              background: #fff;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              padding: 0 10px;
              border: none;
            }
          }
        }
      }
    }
  }
  &__bottom {
    background: #04020e;
    padding: 20px 0;
    &__content {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1.6rem;
      display: flex;
      flex-direction: column;
      text-align: center;
      &-copyright {
        color: var(--primary-1);
      }
      &-links {
        flex-wrap: wrap;
        display: flex;
        justify-content: center;
        & > li {
          margin-left: 12px;
        }
        & a {
          color: #fff;
        }
      }
    }
  }
}
@media screen and (min-width: 768px) {
  .the-footer {
    &__top {
      &__content {
        grid-template-columns: repeat(2, 1fr);
        column-gap: 32px;
        justify-content: space-between;
        &__item {
          text-align: left;
          margin: auto 0;
          &-text {
            margin-left: 0;
          }
          &__form {
            &__content {
              justify-content: flex-start;
              margin-left: 0;
            }
          }
        }
      }
    }
    &__bottom {
      &__content {
        &-links {
          & > li {
            margin-left: 10px;
          }
          & a {
            margin-top: 0;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 992px) {
  .the-footer {
    flex-direction: row;
    text-align: center;
    &__bottom {
      &__content {
        &-links {
          & > li {
            margin-left: 15px;
          }
          justify-content: center;
        }
      }
    }
  }
}

@media screen and (min-width: 1200px) {
  .the-footer {
    &__top {
      &__content {
        grid-template-columns: 3fr 2fr 2fr 3fr;
        &__item {
          height: 210px;
        }
      }
    }
    &__bottom {
      &__content {
        &-links {
          & > li {
            margin-left: 20px;
          }
        }
      }
    }
  }
}
</style>
