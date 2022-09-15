<template>
  <div class="container">
    <div class="menu__body">
      <div class="menu__logo">
        <nuxt-link to="/">
          <img src="/img/logo.svg" alt="Logo Home Decor" />
        </nuxt-link>
      </div>

      <div class="header__Item-list">
        <div class="header__Item">
          <nuxt-link
            active-class="header__link-active"
            class="header__link"
            to="/"
          >
            <img src="/img/ico/insta.svg" />
            <span>Новинки каждый день</span>
          </nuxt-link>
        </div>

        <div class="header__Item">
          <nuxt-link
            active-class="header__link-active"
            class="header__link"
            to="/"
          >
            <img src="/img/ico/cart.svg" />
            <span>Корзина</span>
          </nuxt-link>
        </div>

        <div class="burger">
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

