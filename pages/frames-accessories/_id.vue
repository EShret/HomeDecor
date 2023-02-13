<template>
  <div class="singleFramePG">
    <div class="container">
      <!-- bread crumbs -->
      <div class="crumbs">
        <nuxt-link to="/">
          <span>Главная ></span>
        </nuxt-link>

        <nuxt-link to="/cart">
          <span>Рамы и крепления ></span>
        </nuxt-link>

        <nuxt-link to="/cart">
          <span>{{ frames.frameName }} {{ frames.frameSize }}</span>
        </nuxt-link>
      </div>

      <!-- singleFramePG -->
      <div class="singleFramePG__body">
        <div class="body__item">
          <div class="frame__img">
            <img
              oncontextmenu="return false;"
              :src="`/uploads/paintings/${frames.coverImageName.filename}`"
              class="img"
            />
          </div>
        </div>
        <div class="body__item">
          <div class="frame__info">
            <div class="title">
              <h1>{{ frames.frameName }}, {{ frames.frameSize }}</h1>
            </div>

            <div class="detail">
              <div class="cost">
                <span>
                  {{ frames.frameSize }}
                </span>
                <span> {{ summSinglePost.summ }} ман.</span>
              </div>

              <div class="number">
                <span class="labelQuin">Количество:</span>
                <div class="quantity">
                  <span class="quantity__rem" @click="decrement()"></span>
                  <span class="quantity_numb">{{ frameQuan }}</span>
                  <span class="quantity__add" @click="increment"></span>
                </div>
              </div>

              <!-- ###### -- BUTTON ADD TO CART -- ###### -->
              <div
                class="addToCart"
                @click="addToCart(frames, frameQuan, (postLoader = true))"
              >
                <span :class="{ loader_active: postLoader }">
                  Добавить в корзину
                </span>

                <div class="loader" :class="{ loader_active: postLoader }">
                  <div class="dot_anim"></div>
                </div>
              </div>

              <!-- <div class="addToCart" @click="addToCart(frames, frameQuan)">
                <span>Добавить в корзину</span>
              </div> -->

              <div class="fromToCart">
                <nuxt-link to="/cart"> Перейти в корзину </nuxt-link>
              </div>
            </div>
          </div>
          <MyAccordion />
        </div>
      </div>
      <Advert />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  layout: "catalog",

  async asyncData({ $axios, params, error }) {
    try {
      const frames = await $axios.get(`/api/frames/${params.id}`);
      return {
        frames: frames.data,
      };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  data: () => ({
    frameQuan: 1,
    postLoader: false,
  }),

  methods: {
    ...mapActions(["FRAME_ADD_TO_CART"]),

    addToCart(frames, frameQuan) {
      const data = {
        id: frames._id,
        title: frames.frameName,
        size: frames.frameSize,
        cost: frames.frameСost,
        img: frames.coverImageName.filename,
        quantity: frameQuan,
      };

      this.FRAME_ADD_TO_CART(data);

      setTimeout(() => {
        this.postLoader = false;
      }, 1500);
    },

    decrement() {
      if (this.frameQuan > 1) {
        this.frameQuan--;
      }
    },

    increment() {
      this.frameQuan++;
    },
  },

  computed: {
    summSinglePost: function () {
      return {
        summ: this.frames.frameСost * this.frameQuan,
      };
    },
  },
};
</script>