<template>
  <div class="setPG">
    <div class="container">
      <!-- bread crumbs -->
      <div class="crumbs">
        <span> Главная > Сезоны </span>
      </div>
      <div class="setPG__body">
        <div class="set__preview-img">
          <!-- Preview SLIDER -->
          <div class="preview-img">
            <div class="swiper-wrapper">
              <div class="preview-img-slide swiper-slide">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
              <div class="preview-img-slide swiper-slide">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
              <div class="preview-img-slide swiper-slide">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
              <div class="preview-img-slide swiper-slide">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
              <div class="preview-img-slide swiper-slide">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
              <div class="preview-img-slide swiper-slide">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
            </div>
          </div>
          <div class="mini__preview-img">
            <div class="swiper-wrapper">
              <div class="mini__preview-img-slide swiper-slide">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
              <div class="mini__preview-img-slide swiper-slide">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
              <div class="mini__preview-img-slide swiper-slide">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
              <div class="mini__preview-img-slide swiper-slide">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
              <div class="mini__preview-img-slide swiper-slide">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
              <div class="mini__preview-img-slide swiper-slide">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
            </div>
          </div>
        </div>

        <!-- Set Products -->
        <div class="set__products">
          <div class="title">
            <h1>Деревянные лодочки</h1>
          </div>
          <div class="subTitle">
            <span>
              Мы подчеркнули размеры, используемые в данном интерьере.
            </span>
          </div>

          <div class="product__card">
            <div class="product-img" @click="popup = true">
              <img src="/img/catalog/img.jpg" class="product-preview" alt="" />
              <img src="/img/ico/zoom.svg" class="zoomIco" alt="" />
            </div>

            <div class="product__detail">
              <select>
                <option value="hz">
                  <div class="size">30x40 см</div>
                  <div class="price">100 ман.</div>
                </option>
              </select>

              <select>
                <option value="hz">
                  <div class="size">30x40 см</div>
                  <div class="price">100 ман.</div>
                </option>
              </select>

              <div class="addToCart">
                <span>Добавить в крозину</span>
                <span>| 150 ман.</span>
              </div>
            </div>
          </div>

          <div class="product__card">
            <div class="product-img" @click="popup = true">
              <img
                src="/img/catalog/Резюме.jpg"
                class="product-preview"
                alt=""
              />
              <img src="/img/ico/zoom.svg" class="zoomIco" alt="" />
            </div>

            <div class="product__detail">
              <select>
                <option value="hz">
                  <div class="size">30x40 см</div>
                  <div class="price">100 ман.</div>
                </option>
              </select>

              <select>
                <option value="hz">
                  <div class="size">30x40 см</div>
                  <div class="price">100 ман.</div>
                </option>
              </select>

              <div class="addToCart">
                <span>Добавить в крозину</span>
                <span>| 150 ман.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- popup -->
    <div class="popup" v-if="popup == true">
      <div class="popup_bg" @click="popup = false"></div>
      <img :src="`${srcImg}`" class="popup_img" />
    </div>
  </div>
</template>

<script>
export default {
  layout: "catalog",

  data: () => ({
    srcImg: "/img/catalog/img.jpg",
    popup: false,
  }),

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
          // slidesPerView: 5,
          speed: 1000,
        },
      },
    });
  },
};
</script>