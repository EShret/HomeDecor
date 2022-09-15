<template>
  <div class="setsListAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="sets" />

    <!-- ============  admin content ============ -->
    <div class="admin__content">
      <div class="content__body">
        <div class="content__body-head">
          <span class="w5">№</span>
          <span class="w35">Наименование</span>
        </div>

        <div class="content__item" v-for="(set, index) in sets" :key="set._id">
          <span class="w5">{{ index + 1 }}</span>
          <span class="w35">{{ set.titleSets }}</span>
          <span class="w15"></span>
          <span class="w15"></span>
          <span class="w15"></span>
          <div class="content__item-btn w15">
            <nuxt-link :to="`/admin-panel/sets/${set._id}`">
              <img src="/img/admin/edit.svg" />
            </nuxt-link>
            <img
              src="/img/admin/delete.svg"
              @click="setsDelete(set._id), reloadPage()"
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
      const sets = await $axios.$get(`/api/sets`);
      return { sets };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  methods: {
    setsDelete(id) {
      this.$axios
        .delete(`/api/sets/` + id, {
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