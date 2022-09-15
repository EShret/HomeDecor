<template>
  <div class="admin__head">
    <div class="head__body">
      <div class="head__body-top">
        <div v-if="this.action === 'orders'" class="head__item">
          <h1>Заказы</h1>
        </div>

        <div v-if="this.action === 'paintings'" class="head__item">
          <h1>Картины</h1>
        </div>

        <div v-if="this.action === 'paintingsCreat'" class="head__item">
          <h1>Картины</h1>
        </div>

        <div v-if="this.action === 'paintingsEdit'" class="head__item">
          <h1>Картины</h1>
        </div>

        <!-- ===##########===  SETS  ===##########=== -->
        <div v-if="this.action === 'sets'" class="head__item">
          <h1>Сеты</h1>
        </div>

        <!-- ===##########===  SETS CREAT  ===##########=== -->
        <div v-if="this.action === 'setsCreat'" class="head__item">
          <h1>Сеты</h1>
        </div>

        <!-- ===##########===  SETS EDIT  ===##########=== -->
        <div v-if="this.action === 'setsEdit'" class="head__item">
          <h1>Сеты</h1>
        </div>

        <div v-if="this.action === 'catalog'" class="head__item">
          <h1>Категории</h1>
        </div>

        <div v-if="this.action === 'catalogCreat'" class="head__item">
          <h1>Категории</h1>
        </div>

        <div v-if="this.action === 'catalogsEdit'" class="head__item">
          <h1>Категории</h1>
        </div>

        <div v-if="this.action === 'subcatalog'" class="head__item">
          <h1>Подкатегории</h1>
        </div>

        <div v-if="this.action === 'subcatalogCreat'" class="head__item">
          <h1>Подкатегории</h1>
        </div>

        <div v-if="this.action === 'subcatalogsEdit'" class="head__item">
          <h1>Подкатегории</h1>
        </div>

        <div v-if="this.action === 'banners'" class="head__item">
          <h1>Баннеры</h1>
        </div>

        <div v-if="this.action === 'bannersCreat'" class="head__item">
          <h1>Баннеры</h1>
        </div>

        <div v-if="this.action === 'bannersEdit'" class="head__item">
          <h1>Баннеры</h1>
        </div>

        <div class="head__item">
          <div class="head__item-search">
            <input type="text" v-model="search" />
            <img src="/img/admin/search.svg" />
          </div>

          <div class="head__item-profil">
            <img @click="logout" src="/img/admin/logout.svg" />
            <span>Admin</span>
            <img src="/img/admin/ava.svg" />
          </div>
        </div>
      </div>

      <div v-if="this.action === 'orders'" class="head__body-bottom">
        <span>Список Заказов</span>
      </div>

      <div v-if="this.action === 'paintings'" class="head__body-bottom">
        <span>Список Картин</span>
        <nuxt-link class="addLink" to="/admin-panel/paintings/creat-paintings">
          Добавить <b>+</b>
        </nuxt-link>
      </div>

      <div v-if="this.action === 'paintingsCreat'" class="head__body-bottom">
        <span>Добавление Картины</span>
      </div>

      <div v-if="this.action === 'paintingsEdit'" class="head__body-bottom">
        <span>Изменение Картины</span>
      </div>

      <!-- ===##########===  SETS  ===##########=== -->
      <div v-if="this.action === 'sets'" class="head__body-bottom">
        <span>Список Cетов</span>
        <nuxt-link class="addLink" to="/admin-panel/sets/creat-sets">
          Добавить <b>+</b>
        </nuxt-link>
      </div>

      <!-- ===##########===  SETS CREAT  ===##########=== -->
      <div v-if="this.action === 'setsCreat'" class="head__body-bottom">
        <span>Создание Сета</span>
      </div>

      <!-- ===##########===  SETS EDIT  ===##########=== -->
      <div v-if="this.action === 'setsEdit'" class="head__body-bottom">
        <span>Изменение Сета</span>
      </div>

      <div v-if="this.action === 'catalog'" class="head__body-bottom">
        <span>Список Категории</span>
        <div class="head__button">
          <nuxt-link class="addLink" to="/admin-panel/catalog/creat-catalog">
            Добавить <b>+</b>
          </nuxt-link>
          <nuxt-link
            class="addLink subcatalog"
            to="/admin-panel/catalog/subcatalog"
          >
            <span>Подкатегории</span>
            <img src="/img/ico/arrow-white.svg" alt="" />
          </nuxt-link>
        </div>
      </div>

      <div v-if="this.action === 'catalogCreat'" class="head__body-bottom">
        <span>Создание Категории</span>
      </div>

      <div v-if="this.action === 'catalogsEdit'" class="head__body-bottom">
        <span>Изменение Категории</span>
      </div>

      <div v-if="this.action === 'subcatalog'" class="head__body-bottom">
        <span>Список Подкатегории</span>
        <div class="head__button">
          <nuxt-link
            class="addLink"
            to="/admin-panel/catalog/subcatalog/creat-subcatalog"
          >
            Добавить <b>+</b>
          </nuxt-link>
          <nuxt-link class="addLink catalogBack" to="/admin-panel/catalog">
            <img src="/img/ico/arrow-white-back.svg" alt="" />
            <span>Категории</span>
          </nuxt-link>
        </div>
      </div>

      <div v-if="this.action === 'subcatalogCreat'" class="head__body-bottom">
        <span>Создание Подкатегории</span>
      </div>

      <div v-if="this.action === 'subcatalogsEdit'" class="head__body-bottom">
        <span>Изменение Подкатегории</span>
      </div>

      <div v-if="this.action === 'banners'" class="head__body-bottom">
        <span>Список Баннеров</span>
        <!-- <nuxt-link class="addLink" to="/admin-panel/banners/creat-banners">
          Добавить <b>+</b>
        </nuxt-link> -->
      </div>

      <div v-if="this.action === 'bannersCreat'" class="head__body-bottom">
        <span>Создание Рекламного баннера</span>
      </div>

      <div v-if="this.action === 'bannersEdit'" class="head__body-bottom">
        <span>Изменение Рекламного баннера</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$auth.logout();
    },
  },

  async asyncData({ $axios, error }) {
    try {
      const banners = await $axios.get(`/api/banners`);
      return { banners };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  props: {
    action: { type: String },
  },

  data() {
    return {
      search: "",
    };
  },
};
</script>