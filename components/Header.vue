<template>
  <div class="container">
    <div class="menu__body">
      <div class="menu__logo">
        <nuxt-link to="/">
          <img
            oncontextmenu="return false;"
            src="/img/logo.svg"
            alt="Logo Home Decor"
          />
        </nuxt-link>
      </div>

      <div class="header__box">
        <div class="box__item">
          <a href="tel:+99362075335" class="tel">
            <img oncontextmenu="return false;" src="/img/ico/calling.svg" />
            <span>+993 62 07 53 35</span>
          </a>
        </div>

        <div class="box__item">
          <a
            href="https://www.instagram.com/home_decor_tm/"
            target="_blank"
            rel="noopener noreferrer"
            class="insta"
          >
            <img oncontextmenu="return false;" src="/img/ico/Instagram.svg" />
            <span>Новинки каждый день</span>
          </a>

          <div class="cart">
            <div class="cart__link" v-if="!CART.length" @click="emptyCart">
              <div class="cart_ico">
                <img oncontextmenu="return false;" src="/img/ico/cart.svg" />
              </div>
              <span>Корзина</span>
            </div>

            <nuxt-link class="cart__link" to="/cart" v-else>
              <div class="cart_ico">
                <img oncontextmenu="return false;" src="/img/ico/cart.svg" />
                <div v-if="CART.length" class="cart__length">
                  <span>{{ CART.length }}</span>
                </div>
              </div>
              <span>Корзина</span>
            </nuxt-link>
          </div>
        </div>
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

  methods: {
    emptyCart() {
      this.$toast.error("Ваша корзина пуста", { duration: 5000 });
    },
  },
};
</script>

