<template>
  <div class="setPG">
    <div class="container">
      <!-- bread crumbs -->
      <Crumbs :catalogs="catalogs" :set="sets" action="set" />

      <div class="setPG__body">
        <div class="set__preview-img">
          <!-- Preview SLIDER -->
          <div class="preview-img">
            <div class="swiper-wrapper">
              <div
                class="preview-img-slide swiper-slide"
                v-for="set in sets.coverImageName"
                :key="set._id"
              >
                <img :src="`/uploads/sets/${set}`" class="img" />
              </div>
            </div>
          </div>
          <div class="mini__preview-img">
            <div class="swiper-wrapper">
              <div
                class="mini__preview-img-slide swiper-slide"
                v-for="set in sets.coverImageName"
                :key="set._id"
              >
                <img :src="`/uploads/sets/${set}`" class="img" />
              </div>
            </div>
          </div>
        </div>

        <!-- Set Products -->
        <div class="set__products">
          <div class="title">
            <h1>{{ sets.titleSets }}</h1>
          </div>
          <div class="subTitle">
            <span>
              Эти постеры не доступны для скачивания, так как это нарушит
              авторские права. Но вы можете заказать у нас печать этих постеров.
              Мы печатаем постеры на профессиональной матовой фотобумаге
              плотностью 190 гр/м2.
            </span>
          </div>

          <ProductCard
            v-for="painting in sets.paintingsName"
            :key="painting._id"
            :painting="painting"
            :frames="frames"
          />

          <nuxt-link class="link__fromCart" to="/cart">
            <span>Перейти в карзину</span>
          </nuxt-link>

          <MyAccordion />
        </div>
      </div>
      <Advert />
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/Product-сard.vue";
import MyAccordion from "@/components/MyAccordion.vue";

export default {
  layout: "catalog",

  components: {
    ProductCard,
    MyAccordion,
  },

  async asyncData({ $axios, params, error }) {
    try {
      const catalogs = await $axios.get(`/api/catalogs/url/${params.url}`);
      const sets = await $axios.$get(`/api/sets/${params.id}`);
      const frames = await $axios.$get(`/api/frames`);
      return {
        catalogs: catalogs.data,
        sets,
        frames,
      };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  data: () => ({}),

  methods: {},

  computed: {},

  mounted() {
    var height = $(".preview-img-slide").width();
    $(".preview-img-slide").css("height", height);

    var height = $(".mini__preview-img-slide").width();
    $(".mini__preview-img-slide").css("height", height);

    // swiper
    var preview_img = new Swiper(".preview-img", {
      slidesPerView: 1,
      mousewheel: {
        sensitivity: 1,
      },
      speed: 1000,
      watchOverflow: true,
      thumbs: {
        swiper: {
          el: ".mini__preview-img",
          slidesPerView: 5,
          spaceBetween: 10,
          speed: 1000,
        },
      },
    });
  },
};
</script>