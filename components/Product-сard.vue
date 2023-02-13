<template>
  <div class="product__card">
    <div class="shell__product-img">
      <div
        class="product-img"
        :class="{
          vertical: painting.orientation === 'vertical',
          horizontal: painting.orientation === 'horizontal',
        }"
        @click="popup = true"
      >
        <img
          oncontextmenu="return false;"
          :src="`/uploads/paintings/resize/${painting.coverImageName.filename}`"
          class="product-preview"
        />
        <img
          oncontextmenu="return false;"
          src="/img/ico/zoom.svg"
          class="zoomIco"
        />
      </div>
    </div>

    <!-- ###### -- SELECT PRINT SIZE -- ###### -->
    <div class="product__detail">
      <select v-model="selectedPrintSizePost">
        <option value="0" disabled selected>Выберите размер печати</option>

        <option
          v-for="selectPrintSizePost in printSizeFilter"
          :key="selectPrintSizePost._id"
          :value="selectPrintSizePost"
        >
          <div class="size">{{ selectPrintSizePost.prSize }}см -</div>
          <div class="price">{{ selectPrintSizePost.pricePost }} ман.</div>
        </option>
      </select>

      <!-- ###### -- SELECT FRAME -- ###### -->
      <select
        v-model="selectedframes"
        v-if="this.$route.params.url != 'postcards'"
      >
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
            $route.params.url != 'postcards'
              ? selectedPrintSizePost != 0 && selectedframes != 0
                ? (postLoader = true)
                : (postLoader = false)
              : selectedPrintSizePost != 0
              ? (postLoader = true)
              : (postLoader = false)
        "
      >
        <span :class="{ loader_active: postLoader }"> Добавить в корзину </span>
        <span :class="{ loader_active: postLoader }">
          {{ summSinglePost.summ }} ман.
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
        oncontextmenu="return false;"
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
      if (this.$route.params.url != "postcards") {
        if (this.selectedPrintSizePost != 0 && this.selectedframes != 0) {
          const data = {
            id: painting._id,
            title: painting.title,
            size: printSize.prSize,
            cost: printSize.pricePost,
            img: painting.coverImageName.filename,
            quantity: painting.quantity,
          };

          this.ADD_TO_CART(data);
        } else if (
          this.selectedPrintSizePost === 0 &&
          this.selectedframes === 0
        ) {
          this.$toast.error("Выберите размер Печати и Рамы!", {
            duration: 5000,
          });
        } else if (this.selectedPrintSizePost === 0) {
          this.$toast.error("Выберите размер Печати!", {
            duration: 5000,
          });
        } else if (this.selectedframes === 0) {
          this.$toast.error("Выберите размер Рамы!", { duration: 5000 });
        }

        if (this.selectedframes != 0 && this.selectedframes != 1) {
          const data = {
            id: frameSize._id,
            title: frameSize.frameName,
            size: frameSize.frameSize,
            cost: frameSize.frameСost,
            img: frameSize.coverImageName.filename,
            quantity: frameSize.quantity,
          };

          this.ADD_TO_CART(data);
        }
      } else {
        if (this.selectedPrintSizePost != 0) {
          const data = {
            id: painting._id,
            title: painting.title,
            size: printSize.prSize,
            cost: printSize.pricePost,
            img: painting.coverImageName.filename,
            quantity: painting.quantity,
          };

          this.ADD_TO_CART(data);
        } else if (this.selectedPrintSizePost === 0) {
          this.$toast.error("Выберите размер печати!", { duration: 5000 });
        }
      }

      setTimeout(() => {
        this.postLoader = false;
      }, 1500);
    },
  },

  computed: {
    printSizeFilter: function () {
      var el = this.painting.printSizePost;

      return this.printSize.filter((size) => {
        return (
          size._id === (el[0] != null ? el[0]._id : "") ||
          size._id === (el[1] != null ? el[1]._id : "") ||
          size._id === (el[2] != null ? el[2]._id : "") ||
          size._id === (el[3] != null ? el[3]._id : "") ||
          size._id === (el[4] != null ? el[4]._id : "") ||
          size._id === (el[5] != null ? el[5]._id : "") ||
          size._id === (el[6] != null ? el[6]._id : "") ||
          size._id === (el[7] != null ? el[7]._id : "") ||
          size._id === (el[8] != null ? el[8]._id : "") ||
          size._id === (el[9] != null ? el[9]._id : "") ||
          size._id === (el[10] != null ? el[10]._id : "") ||
          size._id === (el[11] != null ? el[11]._id : "") ||
          size._id === (el[12] != null ? el[12]._id : "") ||
          size._id === (el[13] != null ? el[13]._id : "") ||
          size._id === (el[14] != null ? el[14]._id : "") ||
          size._id === (el[15] != null ? el[15]._id : "") ||
          size._id === (el[16] != null ? el[16]._id : "") ||
          size._id === (el[17] != null ? el[17]._id : "") ||
          size._id === (el[18] != null ? el[18]._id : "") ||
          size._id === (el[19] != null ? el[19]._id : "") ||
          size._id === (el[20] != null ? el[20]._id : "") ||
          size._id === (el[21] != null ? el[21]._id : "") ||
          size._id === (el[22] != null ? el[22]._id : "") ||
          size._id === (el[23] != null ? el[23]._id : "") ||
          size._id === (el[24] != null ? el[24]._id : "") ||
          size._id === (el[25] != null ? el[25]._id : "") ||
          size._id === (el[26] != null ? el[26]._id : "") ||
          size._id === (el[27] != null ? el[27]._id : "") ||
          size._id === (el[28] != null ? el[28]._id : "") ||
          size._id === (el[29] != null ? el[29]._id : "") ||
          size._id === (el[30] != null ? el[30]._id : "") ||
          size._id === (el[31] != null ? el[31]._id : "") ||
          size._id === (el[32] != null ? el[32]._id : "") ||
          size._id === (el[33] != null ? el[33]._id : "") ||
          size._id === (el[34] != null ? el[34]._id : "") ||
          size._id === (el[35] != null ? el[35]._id : "") ||
          size._id === (el[36] != null ? el[36]._id : "") ||
          size._id === (el[37] != null ? el[37]._id : "") ||
          size._id === (el[38] != null ? el[38]._id : "") ||
          size._id === (el[39] != null ? el[39]._id : "") ||
          size._id === (el[40] != null ? el[40]._id : "") ||
          size._id === (el[41] != null ? el[41]._id : "") ||
          size._id === (el[42] != null ? el[42]._id : "") ||
          size._id === (el[43] != null ? el[43]._id : "") ||
          size._id === (el[44] != null ? el[44]._id : "") ||
          size._id === (el[45] != null ? el[45]._id : "") ||
          size._id === (el[46] != null ? el[46]._id : "") ||
          size._id === (el[47] != null ? el[47]._id : "") ||
          size._id === (el[48] != null ? el[48]._id : "") ||
          size._id === (el[49] != null ? el[49]._id : "")
        );
      });
    },

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

  watch: {
    selectedPrintSizePost(newSelect, oldSelect) {
      if (newSelect != oldSelect) {
        this.selectedframes = 0;
      }
    },
  },

  mounted() {},

  props: {
    painting: {
      type: Object,
      default: () => [],
    },

    frames: {
      type: Array,
      default: () => [],
    },

    printSize: {
      type: Array,
      default: () => [],
    },
  },
};
</script>