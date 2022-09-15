<template>
  <div class="admin">
    <div class="navigation">
      <div class="navigation__body">
        <div class="navigation__logo">
          <div class="st__logo">
            <a href="https://st.com.tm/" target="_blank">
              <img src="/img/admin/st.svg" />
            </a>
            <span>Админ панель</span>
          </div>

          <div class="homeDecor__logo">
            <a href="http://localhost:3000" target="_blank">
              <img src="/img/admin/adminLogo.svg" />
              <span>Home Decor</span>
            </a>
          </div>
        </div>

        <div class="admin__nav" v-if="$route.name !== 'login'">
          <nuxt-link
            v-if="$route.name === 'admin-panel'"
            class="adminMenu-link"
            active-class="adminMenu-link-active"
            to="/admin-panel"
          >
            <span> Заказы </span>
          </nuxt-link>

          <nuxt-link v-else class="adminMenu-link" to="/admin-panel">
            <span> Заказы </span>
          </nuxt-link>

          <nuxt-link
            class="adminMenu-link"
            active-class="adminMenu-link-active"
            to="/admin-panel/paintings"
          >
            <span> Картины </span>
          </nuxt-link>

          <nuxt-link
            class="adminMenu-link"
            active-class="adminMenu-link-active"
            to="/admin-panel/sets"
          >
            <span> Сеты </span>
          </nuxt-link>

          <nuxt-link
            class="adminMenu-link"
            active-class="adminMenu-link-active"
            to="/admin-panel/catalog"
          >
            <span> Категории </span>
          </nuxt-link>

          <nuxt-link
            class="adminMenu-link"
            active-class="adminMenu-link-active"
            to="/admin-panel/banners"
          >
            <span> Баннеры </span>
          </nuxt-link>
        </div>
      </div>
    </div>

    <main class="main">
      <Nuxt />
    </main>
  </div>
</template>


<script>
export default {
  middleware: "auth",
};
</script>


