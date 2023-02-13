<template>
  <div class="photoCommentsPG">
    <div class="container">
      <!-- bread crumbs -->
      <div class="crumbs">
        <nuxt-link to="/">
          <span>Главная ></span>
        </nuxt-link>
        <nuxt-link to="/interiors">
          <span>Фото отзывы ></span>
        </nuxt-link>
        <nuxt-link to="">
          <span>{{ photoComments.reviewers[0].name }}</span>
        </nuxt-link>
      </div>

      <div class="photoCommentsPG__body">
        <div class="photoComm__preview-img">
          <img
            class="img"
            :src="`/uploads/photo-comments/resize/${photoComments.coverImageName.filename}`"
          />
        </div>

        <div class="photoComm__content">
          <div class="author">
            <div class="author__img">
              <img
                class="img"
                :src="`/uploads/reviewers/resize/${photoComments.reviewers[0].coverImageName.filename}`"
              />
            </div>

            <div class="author__name">
              <span>АВТОР ФОТО</span>
              <span>{{ photoComments.reviewers[0].name }}</span>
            </div>
          </div>

          <div class="links__sets">
            <div class="title">
              <span>
                Ссылки на раскладки, которые используются в этом интерьере:
              </span>
            </div>

            <div class="link__list">
              <nuxt-link
                class="link"
                :to="`/sets/${set._id}`"
                v-for="set in photoComments.sets"
                :key="set._id"
              >
                <img src="/img/ico/link.svg" alt="" />
                <span>{{ set.titleSets }}</span>
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
      const photoComments = await $axios.get(`/api/photoComments/${params.id}`);

      return {
        photoComments: photoComments.data,
      };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  mounted() {
    var width__sec = $(".photoComm__preview-img").width();
    $(".photoComm__preview-img").css("height", width__sec);
  },
};
</script>