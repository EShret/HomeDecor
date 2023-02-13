<template>
  <!-- advert SECTION -->
  <section class="advert">
    <!-- ==================
           BANNER #1 
    ====================-->
    <div
      class="advert__body"
      v-if="action === '' && randomBanner === 0 && banners[1].linkBanner === ''"
    >
      <img
        oncontextmenu="return false;"
        class="img"
        :src="`/uploads/banners/resize/${
          banners[1] != null ? banners[1].coverImageName.filename : ''
        }`"
      />
    </div>

    <a
      :href="`${banners[1].linkBanner}`"
      class="advert__body"
      v-if="
        action === '' &&
        randomBanner === 0 &&
        banners[1].linkBanner != '' &&
        banners[1].newTabLink === false
      "
    >
      <img
        oncontextmenu="return false;"
        class="img"
        :src="`/uploads/banners/resize/${
          banners[1] != null ? banners[1].coverImageName.filename : ''
        }`"
      />
    </a>

    <a
      :href="`${banners[1].linkBanner}`"
      target="_blank"
      rel="noopener noreferrer"
      class="advert__body"
      v-if="
        action === '' &&
        randomBanner === 0 &&
        banners[1].linkBanner != '' &&
        banners[1].newTabLink === true
      "
    >
      <img
        oncontextmenu="return false;"
        class="img"
        :src="`/uploads/banners/resize/${
          banners[1] != null ? banners[1].coverImageName.filename : ''
        }`"
      />
    </a>

    <!-- ==================
           BANNER #2 
    ====================-->
    <div
      class="advert__body"
      v-if="action === '' && randomBanner === 1 && banners[2].linkBanner === ''"
    >
      <img
        oncontextmenu="return false;"
        class="img"
        :src="`/uploads/banners/resize/${
          banners[2] != null ? banners[2].coverImageName.filename : ''
        }`"
      />
    </div>

    <a
      :href="`${banners[2].linkBanner}`"
      class="advert__body"
      v-if="
        action === '' &&
        randomBanner === 1 &&
        banners[2].linkBanner != '' &&
        banners[2].newTabLink === false
      "
    >
      <img
        oncontextmenu="return false;"
        class="img"
        :src="`/uploads/banners/resize/${
          banners[2] != null ? banners[2].coverImageName.filename : ''
        }`"
      />
    </a>

    <a
      :href="`${banners[2].linkBanner}`"
      target="_blank"
      rel="noopener noreferrer"
      class="advert__body"
      v-if="
        action === '' &&
        randomBanner === 1 &&
        banners[2].linkBanner != '' &&
        banners[2].newTabLink === true
      "
    >
      <img
        oncontextmenu="return false;"
        class="img"
        :src="`/uploads/banners/resize/${
          banners[2] != null ? banners[2].coverImageName.filename : ''
        }`"
      />
    </a>

    <!-- ==================
           BANNER #3
    ====================-->
    <div
      class="advert__body"
      v-if="action === '' && randomBanner === 2 && banners[3].linkBanner === ''"
    >
      <img
        oncontextmenu="return false;"
        class="img"
        :src="`/uploads/banners/resize/${
          banners[3] != null ? banners[3].coverImageName.filename : ''
        }`"
      />
    </div>

    <a
      :href="`${banners[3].linkBanner}`"
      class="advert__body"
      v-if="
        action === '' &&
        randomBanner === 2 &&
        banners[3].linkBanner != '' &&
        banners[3].newTabLink === false
      "
    >
      <img
        oncontextmenu="return false;"
        class="img"
        :src="`/uploads/banners/resize/${
          banners[3] != null ? banners[3].coverImageName.filename : ''
        }`"
      />
    </a>

    <a
      :href="`${banners[3].linkBanner}`"
      target="_blank"
      rel="noopener noreferrer"
      class="advert__body"
      v-if="
        action === '' &&
        randomBanner === 2 &&
        banners[3].linkBanner != '' &&
        banners[3].newTabLink === true
      "
    >
      <img
        oncontextmenu="return false;"
        class="img"
        :src="`/uploads/banners/resize/${
          banners[3] != null ? banners[3].coverImageName.filename : ''
        }`"
      />
    </a>

    <!-- ====================================================================== -->
    <!-- HOME PAGE ADVERT  -->
    <!-- ====================================================================== -->

    <!-- ==================
           BANNER #1 
    ====================-->
    <div
      class="advert__body"
      v-if="action === 'firstBanner' && banners[1].linkBanner === ''"
    >
      <img
        oncontextmenu="return false;"
        class="img"
        :src="`/uploads/banners/resize/${
          banners[1] != null ? banners[1].coverImageName.filename : ''
        }`"
      />
    </div>

    <a
      :href="`${banners[1].linkBanner}`"
      class="advert__body"
      v-if="
        action === 'firstBanner' &&
        banners[1].linkBanner != '' &&
        banners[1].newTabLink === false
      "
    >
      <img
        oncontextmenu="return false;"
        class="img"
        :src="`/uploads/banners/resize/${
          banners[1] != null ? banners[1].coverImageName.filename : ''
        }`"
      />
    </a>

    <a
      :href="`${banners[1].linkBanner}`"
      target="_blank"
      rel="noopener noreferrer"
      class="advert__body"
      v-if="
        action === 'firstBanner' &&
        banners[1].linkBanner != '' &&
        banners[1].newTabLink === true
      "
    >
      <img
        oncontextmenu="return false;"
        class="img"
        :src="`/uploads/banners/resize/${
          banners[1] != null ? banners[1].coverImageName.filename : ''
        }`"
      />
    </a>

    <!-- ==================
           BANNER #2 
    ====================-->
    <div
      class="advert__body"
      v-if="action === 'secondBanner' && banners[2].linkBanner === ''"
    >
      <img
        oncontextmenu="return false;"
        class="img"
        :src="`/uploads/banners/resize/${
          banners[2] != null ? banners[2].coverImageName.filename : ''
        }`"
      />
    </div>

    <a
      :href="`${banners[2].linkBanner}`"
      class="advert__body"
      v-if="
        action === 'secondBanner' &&
        banners[2].linkBanner != '' &&
        banners[2].newTabLink === false
      "
    >
      <img
        oncontextmenu="return false;"
        class="img"
        :src="`/uploads/banners/resize/${
          banners[2] != null ? banners[2].coverImageName.filename : ''
        }`"
      />
    </a>

    <a
      :href="`${banners[2].linkBanner}`"
      target="_blank"
      rel="noopener noreferrer"
      class="advert__body"
      v-if="
        action === 'secondBanner' &&
        banners[2].linkBanner != '' &&
        banners[2].newTabLink === true
      "
    >
      <img
        oncontextmenu="return false;"
        class="img"
        :src="`/uploads/banners/resize/${
          banners[2] != null ? banners[2].coverImageName.filename : ''
        }`"
      />
    </a>

    <!-- ==================
           BANNER #3
    ====================-->
    <div
      class="advert__body"
      v-if="action === 'thirdBanner' && banners[3].linkBanner === ''"
    >
      <img
        oncontextmenu="return false;"
        class="img"
        :src="`/uploads/banners/resize/${
          banners[3] != null ? banners[3].coverImageName.filename : ''
        }`"
      />
    </div>

    <a
      :href="`${banners[3].linkBanner}`"
      class="advert__body"
      v-if="
        action === 'thirdBanner' &&
        banners[3].linkBanner != '' &&
        banners[3].newTabLink === false
      "
    >
      <img
        oncontextmenu="return false;"
        class="img"
        :src="`/uploads/banners/resize/${
          banners[3] != null ? banners[3].coverImageName.filename : ''
        }`"
      />
    </a>

    <a
      :href="`${banners[3].linkBanner}`"
      target="_blank"
      rel="noopener noreferrer"
      class="advert__body"
      v-if="
        action === 'thirdBanner' &&
        banners[3].linkBanner != '' &&
        banners[3].newTabLink === true
      "
    >
      <img
        oncontextmenu="return false;"
        class="img"
        :src="`/uploads/banners/resize/${
          banners[3] != null ? banners[3].coverImageName.filename : ''
        }`"
      />
    </a>
  </section>
</template>

<script>
export default {
  props: {
    action: {
      type: String,
      default: "",
    },
  },

  data: () => ({
    randomBanner: 0,
  }),

  mounted() {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    this.randomBanner = getRandomInt(3);
  },

  computed: {
    banners() {
      return this.$store.state.banners;
    },

    catalogs() {
      return this.$store.state.catalogs;
    },
  },
};
</script>