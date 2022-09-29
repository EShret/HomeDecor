<template>
  <div class="product__card">
    <div class="product-img" @click="popup = true">
      <img
        :src="`/uploads/paintings/${painting.coverImageName.filename}`"
        class="product-preview"
      />
      <img src="/img/ico/zoom.svg" class="zoomIco" />
    </div>

    <!-- ###### -- SELECT PRINT SIZE -- ###### -->
    <div class="product__detail">
      <select v-model="selectedPrintSizePost">
        <option value="0" disabled selected>Выберите размер печати</option>

        <option
          v-for="selectPrintSizePost in painting.printSizePost"
          :key="selectPrintSizePost._id"
          :value="selectPrintSizePost"
        >
          <div class="size">{{ selectPrintSizePost.prSize }}см -</div>
          <div class="price">{{ selectPrintSizePost.pricePost }} ман.</div>
        </option>
      </select>

      <!-- ###### -- SELECT FRAME -- ###### -->
      <select v-model="selectedframes">
        <option value="0" disabled selected>Выберите раму</option>
        <option value="1">Без рамы</option>

        <option
          v-for="selectFrame in frames"
          :key="selectFrame._id"
          :value="selectFrame"
          v-show="selectedPrintSizePost.prSize === selectFrame.frameSize"
        >
          {{ selectFrame.frameName }} ({{ selectFrame.frameSize }}) -
          {{ selectFrame.frameСost }} ман.
        </option>
      </select>

      <!-- ###### -- BUTTON ADD TO CART -- ###### -->
      <div
        class="addToCart"
        @click="
          addToCart(selectedPrintSizePost, selectedframes, painting),
            selectedPrintSizePost != 0
              ? (postLoader = true)
              : (postLoader = false)
        "
      >
        <span :class="{ loader_active: postLoader }">Добавить в крозину</span>
        <span :class="{ loader_active: postLoader }">
          | {{ summSinglePost.summ }} ман.
        </span>

        <div class="loader" :class="{ loader_active: postLoader }">
          <div class="dot_anim"></div>
        </div>
      </div>
    </div>

    <!-- popup -->
    <div class="popup" v-if="popup == true">
      <div class="popup_bg" @click="popup = false"></div>
      <img
        :src="`/uploads/paintings/${painting.coverImageName.filename}`"
        class="popup_img"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    popup: false,
    postLoader: false,

    selectedPrintSizePost: 0,
    selectedframes: 0,
  }),

  methods: {
    ...mapActions(["ADD_TO_CART"]),

    addToCart(printSize, frameSize, painting) {
      //   console.log(printSize, frameSize, painting);'
      if (this.selectedPrintSizePost != 0) {
        const data = [painting, printSize];

        this.ADD_TO_CART(data);
        if (this.selectedframes != 0 && this.selectedframes != 1) {
          this.ADD_TO_CART(frameSize);
        }
        setTimeout(() => {
          this.postLoader = false;
        }, 1500);
      } else {
        this.$toast.error("Выберите размер печати!", { duration: 5000 });
      }
    },
  },

  computed: {
    summSinglePost: function () {
      if (this.selectedframes != 0 && this.selectedframes != 1) {
        return {
          summ:
            this.selectedPrintSizePost.pricePost +
            this.selectedframes.frameСost,
        };
      } else if (this.selectedPrintSizePost != 0) {
        return {
          summ: this.selectedPrintSizePost.pricePost,
        };
      } else {
        return {
          summ: 0,
        };
      }
    },
  },

  props: {
    painting: {
      type: Object,
      default: () => [],
    },

    frames: {
      type: Array,
      default: () => [],
    },
  },
};
</script>