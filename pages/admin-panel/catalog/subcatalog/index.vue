<template>
  <div class="subcatalogListAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="subcatalog" :subcatalog="subcatalogs" />

    <!-- ============  admin content ============ -->
    <div class="admin__content">
      <div class="content__body">
        <div class="content__body-head">
          <span class="w5">№</span>
          <span class="w35">Наименование</span>
        </div>

        <div
          class="content__item"
          v-for="(subcatalog, index) in subcatalogs"
          :key="subcatalog._id"
        >
          <span class="w5">{{ index + 1 }}</span>
          <span class="w35">{{ subcatalog.subcatalogTitle }}</span>
          <span class="w15"></span>
          <span class="w15"></span>
          <span class="w15"></span>
          <div class="content__item-btn w15">
            <nuxt-link
              :to="`/admin-panel/catalog/subcatalog/${subcatalog._id}`"
            >
              <img src="/img/admin/edit.svg" />
            </nuxt-link>
            <img
              src="/img/admin/delete.svg"
              @click="subcatalogsDelete(subcatalog._id), reloadPage()"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",

  async asyncData({ $axios, error }) {
    try {
      const subcatalogs = await $axios.$get(`/api/subcatalogs`);
      return { subcatalogs };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  methods: {
    subcatalogsDelete(id) {
      this.$axios
        .delete(`/api/subcatalogs/` + id, {
          headers: {
            Authorization: this.$auth.$storage._state["_token.local"],
          },
        })
        .then(this.$toast.success("Удалено 👍🏼", { duration: 5000 }))
        .catch((err) =>
          this.$toast.error(err.response.data.message, { duration: 5000 })
        );
    },

    reloadPage() {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
  },
};
</script>