<template>
  <div class="admin__head">
    <div class="head__body">
      <div class="head__body-top">
        <!-- ===##########===  orders  ===##########=== -->
        <div v-if="this.action === 'orders'" class="head__item">
          <h1>Заказы</h1>
        </div>

        <!-- ===##########===  orders  ===##########=== -->
        <div v-if="this.action === 'ordersEdit'" class="head__item">
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

        <!-- ===##########===  firstSecHp  ===##########=== -->
        <div v-if="this.action === 'firstSecHp'" class="head__item">
          <h1>Первая секция главной страницы</h1>
        </div>

        <!-- ===##########===  firstSecHp CREAT  ===##########=== -->
        <div v-if="this.action === 'firstSecHpCreat'" class="head__item">
          <h1>Первая секция главной страницы</h1>
        </div>

        <!-- ===##########===  firstSecHp EDIT  ===##########=== -->
        <div v-if="this.action === 'firstSecHpEdit'" class="head__item">
          <h1>Первая секция главной страницы</h1>
        </div>

        <!-- ===##########===  reviewers  ===##########=== -->
        <div v-if="this.action === 'reviewers'" class="head__item">
          <h1>Авторы отзывов</h1>
        </div>

        <!-- ===##########===  reviewers CREAT  ===##########=== -->
        <div v-if="this.action === 'reviewersCreat'" class="head__item">
          <h1>Авторы отзывов</h1>
        </div>

        <!-- ===##########===  reviewers EDIT  ===##########=== -->
        <div v-if="this.action === 'reviewersEdit'" class="head__item">
          <h1>Авторы отзывов</h1>
        </div>

        <!-- ===##########===  photoComments  ===##########=== -->
        <div v-if="this.action === 'photoComments'" class="head__item">
          <h1>Фото отзывы</h1>
        </div>

        <!-- ===##########===  photoComments CREAT  ===##########=== -->
        <div v-if="this.action === 'photoCommentsCreat'" class="head__item">
          <h1>Фото отзывы</h1>
        </div>

        <!-- ===##########===  photoComments EDIT  ===##########=== -->
        <div v-if="this.action === 'photoCommentsEdit'" class="head__item">
          <h1>Фото отзывы</h1>
        </div>

        <!-- ============================================================== -->
        <!-- #########################.  SEARCH. #########################. -->
        <!-- ============================================================== -->
        <div class="head__item">
          <div class="head__item-search">
            <input type="text" v-model="search" />
            <img src="/img/admin/search.svg" />

            <div class="search__list" v-if="search.length > 0">
              <!-- ORDERS SEARCH  -->
              <div
                class="list__body"
                v-if="this.action === 'orders' || this.action === 'ordersEdit'"
              >
                <nuxt-link
                  v-for="orders in ordersSearch"
                  :key="orders._id"
                  :to="`/admin-panel/${orders._id}`"
                >
                  {{ orders.phone }}
                </nuxt-link>
              </div>

              <!-- PAINTINGS SEARCH -->
              <div
                class="list__body"
                v-if="
                  this.action === 'paintings' ||
                  this.action === 'paintingsEdit' ||
                  this.action === 'paintingsCreat'
                "
              >
                <nuxt-link
                  v-for="painting in paintingsSearch"
                  :key="painting._id"
                  :to="`/admin-panel/paintings/${painting._id}`"
                >
                  {{ painting.title }}
                </nuxt-link>
              </div>

              <!-- FRAMES SEARCH  -->
              <div
                class="list__body"
                v-if="
                  this.action === 'frames' ||
                  this.action === 'framesEdit' ||
                  this.action === 'framesCreat'
                "
              >
                <nuxt-link
                  v-for="frame in framesSearch"
                  :key="frame._id"
                  :to="`/admin-panel/paintings/frames/${frame._id}`"
                >
                  {{ frame.frameName }} ({{ frame.frameSize }})
                </nuxt-link>
              </div>

              <!-- PRINT SIZE SEARCH  -->
              <div
                class="list__body"
                v-if="
                  this.action === 'printSize' ||
                  this.action === 'printSizeEdit' ||
                  this.action === 'printSizeCreat'
                "
              >
                <nuxt-link
                  v-for="printSize in printSizeSearch"
                  :key="printSize._id"
                  :to="`/admin-panel/paintings/print-size/${printSize._id}`"
                >
                  {{ printSize.prSize }}
                </nuxt-link>
              </div>

              <!-- SETS SEARCH  -->
              <div
                class="list__body"
                v-if="
                  this.action === 'sets' ||
                  this.action === 'setsEdit' ||
                  this.action === 'setsCreat'
                "
              >
                <nuxt-link
                  v-for="set in setsSearch"
                  :key="set._id"
                  :to="`/admin-panel/sets/${set._id}`"
                >
                  {{ set.titleSets }}
                </nuxt-link>
              </div>

              <!-- CATALOG SEARCH -->
              <div
                class="list__body"
                v-if="
                  this.action === 'catalog' ||
                  this.action === 'catalogsEdit' ||
                  this.action === 'catalogCreat'
                "
              >
                <nuxt-link
                  v-for="catalog in catalogSearch"
                  :key="catalog._id"
                  :to="`/admin-panel/catalog/${catalog._id}`"
                >
                  {{ catalog.catalogTitle }}
                </nuxt-link>
              </div>

              <!-- SUBCATALOGS SEARCH -->
              <div
                class="list__body"
                v-if="
                  this.action === 'subcatalog' ||
                  this.action === 'subcatalogsEdit' ||
                  this.action === 'subcatalogCreat'
                "
              >
                <nuxt-link
                  v-for="subcatalog in subcatalogSearch"
                  :key="subcatalog._id"
                  :to="`/admin-panel/catalog/subcatalog/${subcatalog._id}`"
                >
                  {{ subcatalog.subcatalogTitle }}
                </nuxt-link>
              </div>

              <!-- BANNERS SEARCH -->
              <div
                class="list__body"
                v-if="
                  this.action === 'banners' ||
                  this.action === 'bannersEdit' ||
                  this.action === 'bannersCreat'
                "
              >
                <nuxt-link
                  v-for="banner in bannersSearch"
                  :key="banner._id"
                  :to="`/admin-panel/banners/${banner._id}`"
                >
                  {{ banner.titleBanner }}
                </nuxt-link>
              </div>

              <!-- firstSecHp SEARCH -->
              <div
                class="list__body"
                v-if="
                  this.action === 'firstSecHp' ||
                  this.action === 'firstSecHpEdit' ||
                  this.action === 'firstSecHpCreat'
                "
              >
                <nuxt-link
                  v-for="firstSec in firstSecSearch"
                  :key="firstSec._id"
                  :to="`/admin-panel/first-sec-hp/${firstSec._id}`"
                >
                  {{ firstSec.title }}
                </nuxt-link>
              </div>

              <!-- photoComments SEARCH -->
              <div
                class="list__body"
                v-if="
                  this.action === 'photoComments' ||
                  this.action === 'photoCommentsEdit' ||
                  this.action === 'photoCommentsCreat'
                "
              >
                <nuxt-link
                  v-for="photoComment in photoCommentsSearch"
                  :key="photoComment._id"
                  :to="`/admin-panel/photo-comments/${photoComment._id}`"
                >
                  {{ photoComment.title }}
                </nuxt-link>
              </div>

              <!-- photoComments SEARCH -->
              <div
                class="list__body"
                v-if="
                  this.action === 'reviewers' ||
                  this.action === 'reviewersEdit' ||
                  this.action === 'reviewersCreat'
                "
              >
                <nuxt-link
                  v-for="reviewer in reviewersSearch"
                  :key="reviewer._id"
                  :to="`/admin-panel/photo-comments/reviewers/${reviewer._id}`"
                >
                  {{ reviewer.name }}
                </nuxt-link>
              </div>
            </div>

            <!-- <div v-if="search.length === 0" class="search__list">
              <span>NOT</span>
            </div> -->
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

      <!-- ===##########===  ORDERS  ===##########=== -->
      <div v-if="this.action === 'ordersEdit'" class="head__body-bottom">
        <span>Подробности заказа</span>
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

      <!-- ===##########===  catalog  ===##########=== -->
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

      <!-- ===##########===  catalog CREAT  ===##########=== -->
      <div v-if="this.action === 'catalogCreat'" class="head__body-bottom">
        <span>Создание Категории</span>
      </div>

      <!-- ===##########===  catalog EDIT  ===##########=== -->
      <div v-if="this.action === 'catalogsEdit'" class="head__body-bottom">
        <span>Изменение Категории</span>
      </div>

      <!-- ===##########===  subcatalog  ===##########=== -->
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

      <!-- ===##########===  subcatalog CREAT  ===##########=== -->
      <div v-if="this.action === 'subcatalogCreat'" class="head__body-bottom">
        <span>Создание Подкатегории</span>
      </div>

      <!-- ===##########===  subcatalog EDIT  ===##########=== -->
      <div v-if="this.action === 'subcatalogsEdit'" class="head__body-bottom">
        <span>Изменение Подкатегории</span>
      </div>

      <!-- ===##########===  banners  ===##########=== -->
      <div v-if="this.action === 'banners'" class="head__body-bottom">
        <span>Список Баннеров </span>
        <nuxt-link
          class="addLink"
          to="/admin-panel/banners/creat-banners"
          v-if="banners.length <= 6"
        >
          Добавить <b>+</b>
        </nuxt-link>
      </div>

      <!-- ===##########===  banners CREAT  ===##########=== -->
      <div v-if="this.action === 'bannersCreat'" class="head__body-bottom">
        <span>Создание Рекламного баннера</span>
      </div>

      <!-- ===##########===  banners EDIT  ===##########=== -->
      <div v-if="this.action === 'bannersEdit'" class="head__body-bottom">
        <span>Изменение Рекламного баннера</span>
      </div>

      <!-- ===##########===  firstSecHp  ===##########=== -->
      <div v-if="this.action === 'firstSecHp'" class="head__body-bottom">
        <span>Список </span>
        <nuxt-link
          class="addLink"
          to="/admin-panel/first-sec-hp/creat-fshp"
          v-if="firstSec.length <= 3"
        >
          Добавить <b>+</b>
        </nuxt-link>
      </div>

      <!-- ===##########===  firstSecHp CREAT  ===##########=== -->
      <div v-if="this.action === 'firstSecHpCreat'" class="head__body-bottom">
        <span>Создание</span>
      </div>

      <!-- ===##########===  firstSecHp EDIT  ===##########=== -->
      <div v-if="this.action === 'firstSecHpEdit'" class="head__body-bottom">
        <span>Изменение</span>
      </div>

      <!-- ===##########===  reviewers  ===##########=== -->
      <div v-if="this.action === 'reviewers'" class="head__body-bottom">
        <span>Список авторов</span>
        <nuxt-link
          class="addLink"
          to="/admin-panel/photo-comments/reviewers/creat-reviewers"
        >
          Добавить <b>+</b>
        </nuxt-link>
      </div>

      <!-- ===##########===  reviewers CREAT  ===##########=== -->
      <div v-if="this.action === 'reviewersCreat'" class="head__body-bottom">
        <span>Создание автора</span>
      </div>

      <!-- ===##########===  reviewers EDIT  ===##########=== -->
      <div v-if="this.action === 'reviewersEdit'" class="head__body-bottom">
        <span>Изменение автора</span>
      </div>

      <!-- ===##########===  photoComments  ===##########=== -->
      <div v-if="this.action === 'photoComments'" class="head__body-bottom">
        <span>Список фото отзывов</span>
        <nuxt-link
          class="addLink"
          to="/admin-panel/photo-comments/photo-comment-creat"
        >
          Добавить <b>+</b>
        </nuxt-link>
      </div>

      <!-- ===##########===  photoComments CREAT  ===##########=== -->
      <div
        v-if="this.action === 'photoCommentsCreat'"
        class="head__body-bottom"
      >
        <span>Создание фото отзыва</span>
      </div>

      <!-- ===##########===  photoComments EDIT  ===##########=== -->
      <div v-if="this.action === 'photoCommentsEdit'" class="head__body-bottom">
        <span>Изменение фото отзыва</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },

  computed: {
    ordersSearch() {
      return this.orders.filter((item) => {
        return (
          item.phone.indexOf(this.search) !== -1 ||
          item.name.indexOf(this.search) !== -1
        );
      });
    },

    paintingsSearch() {
      return this.paintings.filter((item) => {
        return item.title.indexOf(this.search) !== -1;
      });
    },

    framesSearch() {
      return this.frames.filter((item) => {
        return (
          item.frameName.indexOf(this.search) !== -1 ||
          item.frameSize.indexOf(this.search) !== -1
        );
      });
    },

    printSizeSearch() {
      return this.printSize.filter((item) => {
        return item.prSize.indexOf(this.search) !== -1;
      });
    },

    setsSearch() {
      return this.sets.filter((item) => {
        return item.titleSets.indexOf(this.search) !== -1;
      });
    },

    catalogSearch() {
      return this.catalog.filter((item) => {
        return item.catalogTitle.indexOf(this.search) !== -1;
      });
    },

    subcatalogSearch() {
      return this.subcatalog.filter((item) => {
        return item.subcatalogTitle.indexOf(this.search) !== -1;
      });
    },

    bannersSearch() {
      return this.banners.filter((item) => {
        return item.titleBanner.indexOf(this.search) !== -1;
      });
    },

    firstSecSearch() {
      return this.firstSec.filter((item) => {
        return item.title.indexOf(this.search) !== -1;
      });
    },

    photoCommentsSearch() {
      return this.photoComments.filter((item) => {
        return item.title.indexOf(this.search) !== -1;
      });
    },

    reviewersSearch() {
      return this.reviewers.filter((item) => {
        return item.name.indexOf(this.search) !== -1;
      });
    },

    catalogs() {
      return this.$store.state.catalogs;
    },
  },

  methods: {
    logout() {
      this.$auth.logout();
    },
  },

  props: {
    action: { type: String },

    orders: {
      type: Array,
      default: () => [],
    },

    paintings: {
      type: Array,
      default: () => [],
    },

    frames: {
      type: Array,
      default: () => [],
    },

    printSize: {
      type: Array,
      default: () => [],
    },

    sets: {
      type: Array,
      default: () => [],
    },

    catalog: {
      type: Array,
      default: () => [],
    },

    subcatalog: {
      type: Array,
      default: () => [],
    },

    banners: {
      type: Array,
      default: () => [],
    },

    firstSec: {
      type: Array,
      default: () => [],
    },

    photoComments: {
      type: Array,
      default: () => [],
    },

    reviewers: {
      type: Array,
      default: () => [],
    },
  },

  mounted() {},
};
</script>