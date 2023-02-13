<template>
  <div class="catalogPG">
    <div class="container">
      <!-- bread crumbs -->
      <!-- <Crumbs action="photoComments" /> -->
      <div class="crumbs">
        <nuxt-link to="/">
          <span>Главная ></span>
        </nuxt-link>
        <nuxt-link to="">
          <span>Фото отзывы</span>
        </nuxt-link>
      </div>

      <!-- PHOTO COMMENTS -->
      <div class="sets">
        <div class="sets__body">
          <div class="sets__list">
            <nuxt-link
              class="set__link"
              :to="`/photo-reviews/${photoComment._id}`"
              v-for="photoComment in photoComments"
              :key="photoComment._id"
            >
              <div class="set__img">
                <img
                  oncontextmenu="return false;"
                  :src="`/uploads/photo-comments/resize/${photoComment.coverImageName.filename}`"
                  class="img"
                />
              </div>

              <div class="reviewer">
                <div class="reviewer__img">
                  <img
                    oncontextmenu="return false;"
                    :src="`/uploads/reviewers/resize/${photoComment.reviewers[0].coverImageName.filename}`"
                    class="img"
                  />
                </div>

                <div class="reviewer__txt">
                  <span> Автор фото </span>
                  <span>{{ photoComment.reviewers[0].name }}</span>
                </div>
              </div>
            </nuxt-link>
          </div>
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

  async asyncData({ $axios, error }) {
    try {
      const photoComments = await $axios.$get(`/api/photoComments`);
      return { photoComments };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  mounted() {
    var width__sec = $(".set__link").width();
    $(".set__link").css("height", width__sec);
  },
};
</script>