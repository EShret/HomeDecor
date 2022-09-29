<template>
  <div class="catalogPG">
    <div class="container">
      <!-- bread crumbs -->
      <Crumbs :catalogs="catalogs" />

      <!-- subCatalog -->
      <div class="subCatalog" v-if="catalogs.subCatalogsName.length != 0">
        <nuxt-link class="subCatalog__link" :to="`/${catalogs.catalogURL}`">
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
              :to="`/${catalogs.catalogURL}/sets/${set._id}`"
              v-for="set in subcatalogFilter"
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

  mounted() {
    var width__sec = $(".set__link").width();
    $(".set__link").css("height", width__sec);
  },

  computed: {
    subcatalogFilter: function () {
      return this.sets.filter((set) => {
        return (
          this.$route.params.id ===
            (set.subCatalogName[0] != null ? set.subCatalogName[0]._id : 0) ||
          this.$route.params.id ===
            (set.subCatalogName[1] != null ? set.subCatalogName[1]._id : 0) ||
          this.$route.params.id ===
            (set.subCatalogName[2] != null ? set.subCatalogName[2]._id : 0) ||
          this.$route.params.id ===
            (set.subCatalogName[3] != null ? set.subCatalogName[3]._id : 0) ||
          this.$route.params.id ===
            (set.subCatalogName[4] != null ? set.subCatalogName[4]._id : 0) ||
          this.$route.params.id ===
            (set.subCatalogName[5] != null ? set.subCatalogName[5]._id : 0) ||
          this.$route.params.id ===
            (set.subCatalogName[6] != null ? set.subCatalogName[6]._id : 0) ||
          this.$route.params.id ===
            (set.subCatalogName[7] != null ? set.subCatalogName[7]._id : 0) ||
          this.$route.params.id ===
            (set.subCatalogName[8] != null ? set.subCatalogName[8]._id : 0) ||
          this.$route.params.id ===
            (set.subCatalogName[9] != null ? set.subCatalogName[9]._id : 0) ||
          this.$route.params.id ===
            (set.subCatalogName[10] != null ? set.subCatalogName[10]._id : 0) ||
          this.$route.params.id ===
            (set.subCatalogName[11] != null ? set.subCatalogName[11]._id : 0) ||
          this.$route.params.id ===
            (set.subCatalogName[12] != null ? set.subCatalogName[12]._id : 0) ||
          this.$route.params.id ===
            (set.subCatalogName[13] != null ? set.subCatalogName[13]._id : 0) ||
          this.$route.params.id ===
            (set.subCatalogName[14] != null ? set.subCatalogName[14]._id : 0) ||
          this.$route.params.id ===
            (set.subCatalogName[15] != null ? set.subCatalogName[15]._id : 0) ||
          this.$route.params.id ===
            (set.subCatalogName[16] != null ? set.subCatalogName[16]._id : 0) ||
          this.$route.params.id ===
            (set.subCatalogName[17] != null ? set.subCatalogName[17]._id : 0) ||
          this.$route.params.id ===
            (set.subCatalogName[18] != null ? set.subCatalogName[18]._id : 0) ||
          this.$route.params.id ===
            (set.subCatalogName[19] != null ? set.subCatalogName[19]._id : 0)
        );
      });
    },
  },
};
</script>