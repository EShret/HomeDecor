<template>
  <div class="catalogPG">
    <div class="container">
      <!-- bread crumbs -->
      <div class="crumbs">
        <span> Главная > Сезоны </span>
      </div>

      <!-- subCatalog -->
      <div class="subCatalog" v-if="catalogs.subCatalogsName.length != 0">
        <nuxt-link
          active-class="subCatalog__link-active"
          class="subCatalog__link"
          :to="`/${catalogs.catalogURL}`"
        >
          <span>Все</span>
        </nuxt-link>
        <nuxt-link
          active-class="subCatalog__link-active"
          class="subCatalog__link"
          :to="`/${catalogs.catalogURL}/${catalogs.subCatalogsName[index]._id}`"
          v-for="(catalog, index) in catalogs.subCatalogsName"
          :key="catalog._id"
        >
          <span>{{ catalogs.subCatalogsName[index].subcatalogTitle }}</span>
        </nuxt-link>
      </div>

      <!-- SETS -->
      <div class="sets">
        <div class="sets__body">
          <div class="sets__list">
            <nuxt-link
              class="set__link"
              to="/catalog/set"
              v-for="set in catalogFilter"
              :key="set._id"
            >
              <div class="set__img">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
            </nuxt-link>
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
export default {
  layout: "catalog",

  async asyncData({ $axios, params, error }) {
    try {
      const catalogs = await $axios.get(`/api/catalogs/url/${params.url}`);
      const sets = await $axios.$get(`/api/sets`);
      return {
        catalogs: catalogs.data,
        sets,
      };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  computed: {
    catalogFilter: function () {
      return this.sets.filter((set) => {
        // return this.filter == "all" || set.titleSets == this.filter;
        return (
          this.catalogs.catalogTitle === set.catalogName[0].catalogTitle ||
          this.catalogs.catalogTitle ===
            (set.catalogName[1] != null
              ? set.catalogName[1].catalogTitle
              : "") ||
          this.catalogs.catalogTitle ===
            (set.catalogName[2] != null
              ? set.catalogName[2].catalogTitle
              : "") ||
          this.catalogs.catalogTitle ===
            (set.catalogName[3] != null
              ? set.catalogName[3].catalogTitle
              : "") ||
          this.catalogs.catalogTitle ===
            (set.catalogName[4] != null ? set.catalogName[4].catalogTitle : "")
        );
      });
    },
  },
};
</script>