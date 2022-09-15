<template>
  <!-- category SECTION -->
  <section class="category">
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
    <div class="slider__nav">
      <div class="slider-button-prev">
        <img src="/img/ico/arrow.svg" />
      </div>
      <div class="slider-button-next">
        <img src="/img/ico/arrow.svg" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
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
      mousewheel: {
        sensitivity: 1,
      },
      speed: 1000,
      simulateTouch: false,
      spaceBetween: 10,
      watchOverflow: true,
      freeMode: true,
    });
  },

  computed: {
    catalogs() {
      return this.$store.state.catalogs;
    },
  },
};
</script>