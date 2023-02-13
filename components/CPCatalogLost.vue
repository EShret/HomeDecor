<template>
  <!-- category SECTION -->
  <div class="shell__categoryList-cp">
    <section class="category">
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
export default {
  data: () => ({}),

  mounted() {
    var catalogList = $("#itemTwo"),
      scrollPrev = 0,
      header = $(".catalog__header");

    $(window).scroll(function () {
      var scrolled = $(window).scrollTop();

      if (scrolled > 100 && scrolled > scrollPrev) {
        catalogList.addClass("out");
        header.addClass("out");
      } else {
        catalogList.removeClass("out");
      }
      scrollPrev = scrolled;
    });

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