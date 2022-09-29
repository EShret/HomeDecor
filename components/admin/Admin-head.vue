<template>
  <div class="admin__head">
    <div class="head__body">
      <div class="head__body-top">
        <div v-if="this.action === 'orders'" class="head__item">
          <h1>Заказы</h1>
        </div>

        <!-- ===##########===  paintings  ===##########=== -->
        <div v-if="this.action === 'paintings'" class="head__item">
          <h1>Картины</h1>
        </div>

        <!-- ===##########===  paintings CREAT  ===##########=== -->
        <div v-if="this.action === 'paintingsCreat'" class="head__item">
          <h1>Картины</h1>
        </div>

        <!-- ===##########===  paintings EDIT  ===##########=== -->
        <div v-if="this.action === 'paintingsEdit'" class="head__item">
          <h1>Картины</h1>
        </div>

        <!-- ===##########===  FRAMES  ===##########=== -->
        <div v-if="this.action === 'frames'" class="head__item">
          <h1>Рамки</h1>
        </div>

        <!-- ===##########===  FRAMES CREAT  ===##########=== -->
        <div v-if="this.action === 'framesCreat'" class="head__item">
          <h1>Рамки</h1>
        </div>

        <!-- ===##########===  FRAMES EDIT  ===##########=== -->
        <div v-if="this.action === 'framesEdit'" class="head__item">
          <h1>Рамки</h1>
        </div>

        <!-- ===##########===  PRINT SIZE  ===##########=== -->
        <div v-if="this.action === 'printSize'" class="head__item">
          <h1>Размеры печати</h1>
        </div>

        <!-- ===##########===  PRINT SIZE CREAT  ===##########=== -->
        <div v-if="this.action === 'printSizeCreat'" class="head__item">
          <h1>Размеры печати</h1>
        </div>

        <!-- ===##########===  PRINT SIZE EDIT  ===##########=== -->
        <div v-if="this.action === 'printSizeEdit'" class="head__item">
          <h1>Размеры печати</h1>
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

        <!-- ===##########===  catalog  ===##########=== -->
        <div v-if="this.action === 'catalog'" class="head__item">
          <h1>Категории</h1>
        </div>

        <!-- ===##########===  catalog Creat  ===##########=== -->
        <div v-if="this.action === 'catalogCreat'" class="head__item">
          <h1>Категории</h1>
        </div>

        <!-- ===##########===  catalog EDIT  ===##########=== -->
        <div v-if="this.action === 'catalogsEdit'" class="head__item">
          <h1>Категории</h1>
        </div>

        <!-- ===##########===  subcatalog  ===##########=== -->
        <div v-if="this.action === 'subcatalog'" class="head__item">
          <h1>Подкатегории</h1>
        </div>

        <!-- ===##########===  subcatalog Creat  ===##########=== -->
        <div v-if="this.action === 'subcatalogCreat'" class="head__item">
          <h1>Подкатегории</h1>
        </div>

        <!-- ===##########===  subcatalog EDIT  ===##########=== -->
        <div v-if="this.action === 'subcatalogsEdit'" class="head__item">
          <h1>Подкатегории</h1>
        </div>

        <!-- ===##########===  banners  ===##########=== -->
        <div v-if="this.action === 'banners'" class="head__item">
          <h1>Баннеры</h1>
        </div>

        <!-- ===##########===  banners CREAT  ===##########=== -->
        <div v-if="this.action === 'bannersCreat'" class="head__item">
          <h1>Баннеры</h1>
        </div>

        <!-- ===##########===  banners EDIT  ===##########=== -->
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

      <!-- ======================================================================================================  -->
      <!-- ======================================================================================================  -->
      <!-- ======================================================================================================  -->
      <!-- ======================================================================================================  -->

      <!-- ===##########===  ORDERS  ===##########=== -->
      <div v-if="this.action === 'orders'" class="head__body-bottom">
        <span>Список Заказов</span>
      </div>

      <!-- ===##########===  PAINTINGS  ===##########=== -->
      <div v-if="this.action === 'paintings'" class="head__body-bottom">
        <span>Список Картин</span>
        <div class="head__button">
          <nuxt-link
            class="addLink"
            to="/admin-panel/paintings/creat-paintings"
          >
            Добавить <b>+</b>
          </nuxt-link>

          <nuxt-link
            class="addLink subcatalog"
            to="/admin-panel/paintings/frames"
          >
            <span>Рамки</span>
            <img src="/img/ico/arrow-white.svg" alt="" />
          </nuxt-link>

          <nuxt-link
            class="addLink subcatalog"
            to="/admin-panel/paintings/print-size"
          >
            <span>Размеры печати</span>
            <img src="/img/ico/arrow-white.svg" alt="" />
          </nuxt-link>
        </div>
      </div>

      <!-- ===##########===  PAINTINGS  ===##########=== -->
      <div v-if="this.action === 'paintingsCreat'" class="head__body-bottom">
        <span>Добавление Картины</span>
      </div>

      <!-- ===##########===  PAINTINGS  ===##########=== -->
      <div v-if="this.action === 'paintingsEdit'" class="head__body-bottom">
        <span>Изменение Картины</span>
      </div>

      <!-- ===##########===  FRAMES  ===##########=== -->
      <div v-if="this.action === 'frames'" class="head__body-bottom">
        <span>Список Рамок</span>
        <div class="head__button">
          <nuxt-link
            class="addLink"
            to="/admin-panel/paintings/frames/creat-frames"
          >
            Добавить <b>+</b>
          </nuxt-link>
          <nuxt-link class="addLink catalogBack" to="/admin-panel/paintings">
            <img src="/img/ico/arrow-white-back.svg" alt="" />
            <span>Картины</span>
          </nuxt-link>
        </div>
      </div>

      <!-- ===##########===  FRAMES  ===##########=== -->
      <div v-if="this.action === 'framesCreat'" class="head__body-bottom">
        <span>Добавление Рамки</span>
      </div>

      <!-- ===##########===  FRAMES  ===##########=== -->
      <div v-if="this.action === 'framesEdit'" class="head__body-bottom">
        <span>Изменение Рамки</span>
      </div>

      <!-- ===##########===  PRINT SIZE  ===##########=== -->
      <div v-if="this.action === 'printSize'" class="head__body-bottom">
        <span>Список Размеров печати</span>
        <div class="head__button">
          <nuxt-link
            class="addLink"
            to="/admin-panel/paintings/print-size/creat-print-size"
          >
            Добавить <b>+</b>
          </nuxt-link>
          <nuxt-link class="addLink catalogBack" to="/admin-panel/paintings">
            <img src="/img/ico/arrow-white-back.svg" alt="" />
            <span>Картины</span>
          </nuxt-link>
        </div>
      </div>

      <!-- ===##########===  PRINT SIZE  ===##########=== -->
      <div v-if="this.action === 'printSizeCreat'" class="head__body-bottom">
        <span>Добавление Размеров печати</span>
      </div>

      <!-- ===##########===  PRINT SIZE  ===##########=== -->
      <div v-if="this.action === 'printSizeEdit'" class="head__body-bottom">
        <span>Изменение Размеров печати</span>
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