<template>
  <div class="setPG">
    <div class="container">
      <!-- bread crumbs -->
      <div class="crumbs">
        <nuxt-link to="/">
          <span>Главная ></span>
        </nuxt-link>

        <nuxt-link to="">
          <span>{{ sets.titleSets }} </span>
        </nuxt-link>
      </div>

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
                <img
                  oncontextmenu="return false;"
                  :src="`/uploads/sets/${set}`"
                  class="img"
                />
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
                <img
                  oncontextmenu="return false;"
                  :src="`/uploads/sets/resize/${set}`"
                  class="img"
                />
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
            v-for="painting in paintingsFilter"
            :key="painting._id"
            :painting="painting"
            :frames="frames"
            :printSize="printSize"
          />

          <nuxt-link class="link__fromCart" to="/cart" v-if="CART.length">
            <span>Перейти в карзину</span>
          </nuxt-link>

          <div class="link__fromCart" @click="emptyCart()" v-else>
            <span>Перейти в карзину</span>
          </div>

          <MyAccordion />
        </div>
      </div>
      <Advert />
      <div class="similar__sets-body">
        <div class="similar__sets-title">
          <span>Похожие сеты</span>
        </div>
        <!-- SETS SECTION -->
        <div class="sets">
          <div class="sets__body">
            <div class="sets__list">
              <nuxt-link
                class="set__link"
                :to="`/sets/${set._id}`"
                v-for="set in similarSets"
                :key="set._id"
              >
                <div class="set__img">
                  <img
                    oncontextmenu="return false;"
                    :src="`/uploads/sets/resize/${set.coverImageName[0]}`"
                    class="img"
                  />
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
import ProductCard from "@/components/Product-сard.vue";
import MyAccordion from "@/components/MyAccordion.vue";
import { mapGetters } from "vuex";

export default {
  layout: "catalog",

  components: {
    ProductCard,
    MyAccordion,
  },

  async asyncData({ $axios, params, error }) {
    try {
      const sets = await $axios.$get(`/api/sets/${params.id}`);
      const paintings = await $axios.$get(`/api/paintings`);
      const printSize = await $axios.$get(`/api/printSize`);
      const allSets = await $axios.$get(`/api/sets`);
      const frames = await $axios.$get(`/api/frames`);
      return {
        sets,
        allSets,
        frames,
        paintings,
        printSize,
      };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  data: () => ({
    isTrue: true,
  }),

  methods: {
    emptyCart() {
      this.$toast.error("Ваша корзина пуста", { duration: 5000 });
    },
  },

  computed: {
    ...mapGetters(["CART"]),

    paintingsFilter: function () {
      var el = this.sets.paintingsName;

      return this.paintings.filter((painting) => {
        return (
          painting._id === (el[0] != null ? el[0]._id : "") ||
          painting._id === (el[1] != null ? el[1]._id : "") ||
          painting._id === (el[2] != null ? el[2]._id : "") ||
          painting._id === (el[3] != null ? el[3]._id : "") ||
          painting._id === (el[4] != null ? el[4]._id : "") ||
          painting._id === (el[5] != null ? el[5]._id : "") ||
          painting._id === (el[6] != null ? el[6]._id : "") ||
          painting._id === (el[7] != null ? el[7]._id : "") ||
          painting._id === (el[8] != null ? el[8]._id : "") ||
          painting._id === (el[9] != null ? el[9]._id : "") ||
          painting._id === (el[10] != null ? el[10]._id : "") ||
          painting._id === (el[11] != null ? el[11]._id : "") ||
          painting._id === (el[12] != null ? el[12]._id : "") ||
          painting._id === (el[13] != null ? el[13]._id : "") ||
          painting._id === (el[14] != null ? el[14]._id : "") ||
          painting._id === (el[15] != null ? el[15]._id : "") ||
          painting._id === (el[16] != null ? el[16]._id : "") ||
          painting._id === (el[17] != null ? el[17]._id : "") ||
          painting._id === (el[18] != null ? el[18]._id : "") ||
          painting._id === (el[19] != null ? el[19]._id : "")
        );
      });
    },

    similarSets: function () {
      return this.allSets.filter((set) => {
        return (
          set.catalogName[0] === this.sets.catalogName[0] ||
          (set.subCatalogName[0] != null
            ? set.subCatalogName[0].subcatalogTitle
            : "") ===
            (this.sets.subCatalogName[0] != null
              ? this.sets.subCatalogName[0].subcatalogTitle
              : "") ||
          set.catalogName[1] === this.sets.catalogName[1] ||
          (set.subCatalogName[1] != null
            ? set.subCatalogName[1].subcatalogTitle
            : "") ===
            (this.sets.subCatalogName[1] != null
              ? this.sets.subCatalogName[1].subcatalogTitle
              : "") ||
          set.catalogName[2] === this.sets.catalogName[2] ||
          (set.subCatalogName[2] != null
            ? set.subCatalogName[2].subcatalogTitle
            : "") ===
            (this.sets.subCatalogName[2] != null
              ? this.sets.subCatalogName[2].subcatalogTitle
              : "") ||
          set.catalogName[3] === this.sets.catalogName[3] ||
          (set.subCatalogName[3] != null
            ? set.subCatalogName[3].subcatalogTitle
            : "") ===
            (this.sets.subCatalogName[3] != null
              ? this.sets.subCatalogName[3].subcatalogTitle
              : "") ||
          set.catalogName[4] === this.sets.catalogName[4] ||
          (set.subCatalogName[4] != null
            ? set.subCatalogName[4].subcatalogTitle
            : "") ===
            (this.sets.subCatalogName[4] != null
              ? this.sets.subCatalogName[4].subcatalogTitle
              : "")
        );
      });
    },
  },

  mounted() {
    var width__sec = $(".set__link").width();
    $(".set__link").css("height", width__sec);

    var height = $(".preview-img-slide").width();
    $(".preview-img-slide").css("height", height);

    var height = $(".mini__preview-img-slide").width();
    $(".mini__preview-img-slide").css("height", height);

    // swiper
    var preview_img = new Swiper(".preview-img", {
      slidesPerView: 1,
      // mousewheel: {
      //   sensitivity: 1,
      // },
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