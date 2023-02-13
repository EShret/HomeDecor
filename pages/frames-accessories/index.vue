<template>
  <div class="framesPG">
    <div class="container">
      <!-- bread crumbs -->
      <div class="crumbs">
        <nuxt-link to="/">
          <span>Главная ></span>
        </nuxt-link>

        <nuxt-link to="/cart">
          <span>Рамы и крепления</span>
        </nuxt-link>
      </div>

      <!-- framesPG -->
      <div class="framesPG__body">
        <div class="title">
          <h1>Рамы и крепления</h1>
        </div>

        <div class="frames">
          <div class="frames__body">
            <div class="frame__link" v-for="frame in frames" :key="frame._id">
              <nuxt-link :to="`/frames-accessories/${frame._id}`">
                <div class="frame__img">
                  <img
                    oncontextmenu="return false;"
                    :src="`/uploads/paintings/resize/${frame.coverImageName.filename}`"
                    class="img"
                  />
                </div>

                <div class="frame__info">
                  <span>{{ frame.frameName }} {{ frame.frameSize }}</span>
                  <span>{{ frame.frameСost }} ман.</span>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <Advert />
    </div>
  </div>
</template>

<script>
export default {
  layout: "catalog",

  async asyncData({ $axios, params, error }) {
    try {
      const frames = await $axios.$get(`/api/frames`);
      return {
        frames,
      };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },
};
</script>