<template>
  <div class="catalogPG">
    <div class="container">
      <!-- bread crumbs -->
      <div class="crumbs">
        <span> Главная > Сезоны </span>
      </div>

      <!-- subCatalog -->
      <div class="subCatalog">
        <select v-model="selectSubcatalog">
          <option value="0">Все</option>
          <option
            v-for="subcatalog in subcatalog"
            :key="subcatalog._id"
            :value="subcatalog.subcatalogTitle"
          >
            {{ subcatalog.subcatalogTitle }}
          </option>
        </select>
        <!-- <div class="subCatalog__link" @click="selectSubcatalog = 0">
          <span>Все</span>
        </div>
        <div
          class="subCatalog__link"
          v-for="subcatalog in subcatalog"
          :key="subcatalog._id"
          @click="selectSubcatalog = subcatalog.subcatalogTitle"
        >
          <span>{{ subcatalog.subcatalogTitle }}</span>
        </div> -->
        <!-- <nuxt-link
          active-class="subCatalog__link-active"
          class="subCatalog__link"
          to="/catalog"
        >
          <span>Все</span>
        </nuxt-link> -->
      </div>

      <!-- SETS -->
      <div class="sets">
        <div class="sets__body">
          <div class="sets__list">
            <nuxt-link
              class="set__link"
              to="/catalog/set"
              v-for="set in filteredSets"
              :key="set._id"
              .
            >
              <div class="set__img">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
            </nuxt-link>
            <!-- <nuxt-link class="set__link" to="/catalog/set">
              <div class="set__img">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
            </nuxt-link>
            <nuxt-link class="set__link" to="/catalog/set">
              <div class="set__img">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
            </nuxt-link>
            <nuxt-link class="set__link" to="/catalog/set">
              <div class="set__img">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
            </nuxt-link>
            <nuxt-link class="set__link" to="/">
              <div class="set__img">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
            </nuxt-link>
            <nuxt-link class="set__link" to="/">
              <div class="set__img">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
            </nuxt-link>
            <nuxt-link class="set__link" to="/">
              <div class="set__img">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
            </nuxt-link>
            <nuxt-link class="set__link" to="/">
              <div class="set__img">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
            </nuxt-link> -->
          </div>
          <nuxt-link class="more__button" to="/">
            <span>Просмотреть еще</span>
          </nuxt-link>
        </div>
      </div>

      <!-- advert -->
      <Advert />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  layout: "catalog",

  data: () => ({
    subcatalog: [],
    selectSubcatalog: 0,
  }),

  async asyncData({ $axios, params, error }) {
    try {
      const catalogs = await $axios.$get(`/api/catalogs/${params.id}`);
      const sets = await $axios.$get(`/api/sets`);

      return {
        subcatalog: catalogs.subCatalogsName,
        sets: sets.data,
      };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  computed: {
    filteredSets: function () {
      return this.sets.filter((set) => {
        // return (
        //   this.selectSubcatalog == 0 || set.(!!!) == this.selectSubcatalog
        // ! Выбор категорий и подкатегорий
        // );
      });
    },
  },
};
</script>