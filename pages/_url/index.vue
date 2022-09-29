<template>
  <div class="catalogPG">
    <div class="container">
      <!-- bread crumbs -->
      <Crumbs action="catalogs" :catalogs="catalogs" />

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
          <span>{{ catalog.subcatalogTitle }}</span>
        </nuxt-link>
      </div>

      <!-- SETS -->
      <div class="sets">
        <div class="sets__body">
          <div class="sets__list">
            <nuxt-link
              class="set__link"
              :to="`/${catalogs.catalogURL}/sets/${set._id}`"
              v-for="set in catalogFilter"
              :key="set._id"
            >
              <div class="set__img">
                <img
                  :src="`/uploads/sets/${set.coverImageName[0]}`"
                  class="img"
                />
              </div>
            </nuxt-link>
          </div>
          <!-- <nuxt-link class="more__button" to="/">
            <span>Просмотреть еще</span>
          </nuxt-link> -->
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

  data: () => ({}),

  mounted() {
    var width__sec = $(".set__link").width();
    $(".set__link").css("height", width__sec);
  },

  computed: {
    catalogFilter: function () {
      return this.sets.filter((set) => {
        return (
          set.catalogName[0] === this.catalogs.catalogTitle ||
          set.catalogName[1] === this.catalogs.catalogTitle ||
          set.catalogName[2] === this.catalogs.catalogTitle ||
          set.catalogName[3] === this.catalogs.catalogTitle ||
          set.catalogName[4] === this.catalogs.catalogTitle
        );
      });
    },
  },
};
</script>