<template>
  <!-- category SECTION -->
  <div class="shell__categoryList-hp">
    <section class="category" v-scroll-class:sticky="stickyPX">
      <div class="container">
        <div class="category__list">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="catalog in catalogs"
              :key="catalog._id"
            >
              <nuxt-link
                class="category__item"
                active-class="category__item-active"
                :to="`/${catalog.catalogURL}`"
              >
                <span>
                  {{ catalog.catalogTitle }}
                </span>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="replacement"></div>
        <div class="slider__nav">
          <div class="slider-button-prev">
            <img oncontextmenu="return false;" src="/img/ico/arrow.svg" />
          </div>
          <div class="slider-button-next">
            <img oncontextmenu="return false;" src="/img/ico/arrow.svg" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import VueScrollClass from "vue-scroll-class";

export default {
  directives: {
    "scroll-class": VueScrollClass,
  },

  data: () => ({}),

  props: {
    stickyPX: {
      type: Number,
      default: 0,
    },
  },

  mounted() {
    // swiper
    const category__list = new Swiper(".category__list", {
      keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
      },
      navigation: {
        prevEl: ".slider-button-prev",
        nextEl: ".slider-button-next",
      },
      slidesPerView: 10,
      // mousewheel: {
      //   sensitivity: 1,
      // },
      speed: 1000,
      simulateTouch: false,
      spaceBetween: 10,
      watchOverflow: true,
      freeMode: true,
      slidesPerView: 10,
      breakpoints: {
        1441: {
          slidesPerView: 10,
        },

        1220: {
          slidesPerView: 7,
        },

        991: {
          slidesPerView: 5,
        },

        480: {
          slidesPerView: 5,
        },

        200: {
          slidesPerView: 3,
        },
      },
    });
  },

  computed: {
    catalogs() {
      return this.$store.state.catalogs;
    },
  },
};
</script>