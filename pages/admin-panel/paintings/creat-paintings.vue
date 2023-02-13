<template>
  <div class="paintingsCreatAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="paintingsCreat" :paintings="paintings" />

    <!-- ============  admin content ============ -->
    <div class="admin__content">
      <div class="content__body">
        <div class="form">
          <ValidationObserver class="form__body" v-slot="{ invalid }" tag="div">
            <!-- row -->
            <div class="form__row">
              <span class="warning">Заполняйте строго по примерам</span>
            </div>

            <!-- 1 row -->
            <div class="form__row">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w20"
                tag="div"
              >
                <label>Наименование Картины</label>
                <input
                  class="inptTxt"
                  type="text"
                  placeholder="Новый постер"
                  v-model="title"
                />
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>

              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w20"
                tag="div"
              >
                <label>Выбор ориентации постера</label>
                <select class="inptTxt" v-model="orientation">
                  <option value="horizontal">Горизонтальная</option>
                  <option value="vertical">Вертикальная</option>
                </select>
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>

              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w10"
                tag="div"
              >
                <label>Фото товара</label>
                <input
                  type="file"
                  id="file"
                  ref="file"
                  accept="image/jpeg, image/jpg, image/png"
                  @change="handleFileUpload()"
                />
                <button class="add__files-button" @click="customAddFiles()">
                  Добавить фото
                </button>
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>

              <div class="imgSize">
                <span>
                  vertival: <b>520x740 px</b> <br />
                  horizontal: <b>740x520 px</b>
                </span>
              </div>

              <div class="addFileName">
                <span>{{ file.name }}</span>
              </div>
            </div>

            <!-- ROW -->
            <div class="form__row">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w40"
                tag="div"
              >
                <label>Размеры печати и рамы</label>
                <!-- Size POST -->
                <multiselect
                  class="multiselect"
                  v-model="printSizePost"
                  tag-placeholder="Размеры печати и рамы"
                  placeholder="Размеры печати и рамы"
                  :options="printSize"
                  label="prSize"
                  :multiple="true"
                  track-by="_id"
                ></multiselect>
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <!-- row -->
            <div class="form__row">
              <button
                v-if="disableButton === false"
                :disabled="invalid"
                class="addLink"
                @click="newPaintings((postLoader = true))"
              >
                <span :class="{ loader_active: postLoader }">
                  Добавить <b>+</b>
                </span>

                <div class="loader" :class="{ loader_active: postLoader }">
                  <div class="dot_anim"></div>
                </div>
              </button>

              <button v-else disabled class="addLink">Добавить <b>+</b></button>
              <nuxt-link class="cancelBtn" to="/admin-panel/paintings">
                Отмена
              </nuxt-link>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  layout: "admin",

  components: {
    Multiselect,
    ValidationProvider,
    ValidationObserver,
  },

  async asyncData({ $axios, error }) {
    try {
      const paintings = await $axios.$get(`/api/paintings`);
      const printSize = await $axios.$get(`/api/printSize`);
      const frames = await $axios.$get(`/api/frames`);

      return {
        printSize,
        frames,
        paintings,
      };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  data: () => ({
    postLoader: false,
    disableButton: true,

    title: "",
    orientation: "horizontal",
    printSizePost: [],

    file: "",
  }),

  methods: {
    customAddFiles() {
      this.$refs.file.click();
    },

    newPaintings() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("orientation", this.orientation);
      formData.append("printSizePost", JSON.stringify(this.printSizePost));

      formData.append("file", this.file);
      axios
        .post(`/api/paintings`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: this.$auth.$storage._state["_token.local"],
          },
        })
        .then((response) => {
          this.postLoader = false;
          setTimeout(() => {
            this.$router.push("/admin-panel/paintings");
          }, 500),
            this.$toast.success("Картина создана 👍🏼", { duration: 6000 });
        })
        .catch((err) => {
          if (err.response.status == 403) {
            this.$toast.error(err.response.data.message, { duration: 5000 });
            this.$auth.logout();
            setTimeout(() => {
              this.$router.push("/login");
            }, 10);
          } else {
            this.$toast.error(err.response.data.message, { duration: 5000 });
          }
        });
    },

    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.disableButton = false;
    },
  },
};
</script>