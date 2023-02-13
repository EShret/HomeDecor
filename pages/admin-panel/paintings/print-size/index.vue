<template>
  <div class="printSizeListAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="printSize" :printSize="printSize" />

    <!-- ============  admin content ============ -->
    <div class="admin__content">
      <div class="content__body">
        <div class="content__body-head">
          <span class="w5">№</span>
          <span class="w35">Размеры печати</span>
        </div>

        <div
          class="content__item"
          v-for="(printSize, index) in printSize"
          :key="printSize._id"
        >
          <span class="w5">{{ index + 1 }}</span>
          <span class="w35">{{ printSize.prSize }}</span>
          <span class="w15"></span>
          <span class="w15"></span>
          <span class="w15"></span>
          <div class="content__item-btn w15">
            <nuxt-link
              :to="`/admin-panel/paintings/print-size/${printSize._id}`"
            >
              <img src="/img/admin/edit.svg" />
            </nuxt-link>
            <img
              src="/img/admin/delete.svg"
              @click="printSizeDelete(printSize._id), reloadPage()"
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
      const printSize = await $axios.$get(`/api/printSize`);
      return { printSize };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  methods: {
    printSizeDelete(id) {
      this.$axios
        .delete(`/api/printSize/` + id, {
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