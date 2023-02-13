<template>
  <div class="framesListAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="frames" :frames="frames" />

    <!-- ============  admin content ============ -->
    <div class="admin__content">
      <div class="content__body">
        <div class="content__body-head">
          <span class="w5">№</span>
          <span class="w35">Размеры рам</span>
        </div>

        <div
          class="content__item"
          v-for="(frame, index) in frames"
          :key="frame._id"
        >
          <span class="w5">{{ index + 1 }}</span>
          <span class="w35">{{ frame.frameName }} ({{ frame.frameSize }})</span>
          <span class="w15"></span>
          <span class="w15"></span>
          <span class="w15"></span>
          <div class="content__item-btn w15">
            <nuxt-link :to="`/admin-panel/paintings/frames/${frame._id}`">
              <img src="/img/admin/edit.svg" />
            </nuxt-link>
            <img
              src="/img/admin/delete.svg"
              @click="framesDelete(frame._id), reloadPage()"
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
      const frames = await $axios.$get(`/api/frames`);
      return { frames };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  methods: {
    framesDelete(id) {
      this.$axios
        .delete(`/api/frames/` + id, {
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