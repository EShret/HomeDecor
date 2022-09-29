<template>
  <div class="container">
    <div class="menu__body catalog__header-body">
      <div class="menu__body-item">
        <div class="menu__logo">
          <nuxt-link to="/">
            <img src="/img/logo.svg" alt="Logo Home Decor" />
          </nuxt-link>
        </div>

        <div class="header__Item-list">
          <div class="header__Item">
            <nuxt-link class="header__link" to="/">
              <img src="/img/ico/insta.svg" />
              <span>Новинки каждый день</span>
            </nuxt-link>
          </div>

          <div class="header__Item">
            <nuxt-link class="header__link" to="/cart">
              <div class="cart_img">
                <img src="/img/ico/cart.svg" />
                <div v-if="CART.length" class="cart__length">
                  <span>{{ CART.length }}</span>
                </div>
              </div>
              <span>Корзина</span>
            </nuxt-link>
          </div>

          <!-- <div class="burger">
            <span></span>
          </div> -->
        </div>
      </div>
      <div class="menu__body-item">
        <CatalogList />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["CART"]),
  },
};
</script>