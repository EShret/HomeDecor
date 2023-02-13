<template>
  <div class="convertPG">
    <div class="convertPG__body">
      <div class="container">
        <div class="convertPG__header">
          <nuxt-link class="header__link" to="/convert"> Баннеры </nuxt-link>
          <nuxt-link
            class="header__link"
            active-class="active"
            to="/convert/sets"
          >
            Сеты
          </nuxt-link>
          <nuxt-link
            class="header__link"
            active-class="active"
            to="/convert/paintings"
          >
            Постеры
          </nuxt-link>
          <nuxt-link
            class="header__link"
            active-class="active"
            to="/convert/frames"
          >
            Рамы
          </nuxt-link>
        </div>

        <div class="convertPG__list">
          <div
            class="list__item"
            v-for="(painting, i) in paintings"
            :key="painting._id"
          >
            <div class="item__body">
              <span>{{ i + 1 }}) {{ painting.title }}</span>
              <button
                @click="
                  convertFile(
                    painting.coverImageName.path,
                    painting.coverImageName.filename,
                    painting.orientation
                  )
                "
              >
                convert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.convertPG {
  padding: 150px 0px 50px 0px;

  .convertPG__body {
    .convertPG__header {
      border-bottom: 2px solid #949494;
      padding: 0px 0px 30px 0px;
      margin: 0px 0px 20px 0px;

      .header__link {
        font-size: 20px;
        font-weight: 700;
        padding: 8px 30px;

        &.active {
          background: #7893ad;
          color: white;
          border-radius: 20px;
        }
      }
    }

    .convertPG__list {
      .list__item {
        border-bottom: 1px solid rgb(63, 63, 63);
        padding: 0px 0px 20px 0px;
        margin: 0px 0px 20px 0px;

        .item__body {
          padding: 0px 30px;
          width: 40%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          span {
            width: 80%;
            overflow: hidden;
            font-size: 20px;
          }

          button {
            padding: 5px 15px;
            font-size: 14px;
            background-color: rgb(1, 164, 1);
            border-radius: 10px;
            color: white;
          }
        }
      }
    }
  }
}
</style>

<script>
import axios from "axios";
export default {
  async asyncData({ $axios, error }) {
    try {
      const paintings = await $axios.$get(`/api/paintings`);
      return { paintings };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  data: () => ({}),

  methods: {
    convertFile(imgPath, imgName, imgOrientation) {
      let formData = {
        imgPath: imgPath,
        imgName: imgName,
        imgOrientation: imgOrientation,
      };
      axios
        .post(`/api/paintings/convertFile`, formData)
        .then((response) => {
          this.$toast.success("Баннер конвертирован", { duration: 5000 });
        })
        .catch((err) =>
          this.$toast.error(err.response.data.message, { duration: 5000 })
        );
    },
  },
};
</script>