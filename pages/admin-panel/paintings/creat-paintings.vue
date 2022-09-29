<template>
  <div class="paintingsCreatAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="paintingsCreat" />

    <!-- ============  admin content ============ -->
    <div class="admin__content">
      <div class="content__body">
        <div class="form">
          <ValidationObserver class="form__body" v-slot="{ invalid }" tag="div">
            <!-- 1 row -->
            <div class="form__row">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w20"
                tag="div"
              >
                <label>Наименование Картины</label>
                <input class="inptTxt" type="text" v-model="title" />
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
                  accept="image/jpeg"
                  @change="handleFileUpload()"
                />
                <button class="add__files-button" @click="customAddFiles()">
                  Добавить фото
                </button>
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>
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
                <label>Размеры печати</label>
                <!-- Size POST -->
                <multiselect
                  class="multiselect"
                  v-model="printSizePost"
                  tag-placeholder="Размеры печати"
                  placeholder="Размеры печати"
                  :options="printSize"
                  label="prSize"
                  :multiple="true"
                  track-by="_id"
                ></multiselect>
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <!-- ROW -->
            <div class="form__row">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w40"
                tag="div"
              >
                <label>Размеры Рам</label>
                <!-- Size Frames -->
                <multiselect
                  class="multiselect"
                  v-model="sizeFrame"
                  tag-placeholder="Размеры Рам"
                  placeholder="Размеры Рам"
                  :options="frames"
                  label="frameSize"
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
      const printSize = await $axios.$get(`/api/printSize`);
      const frames = await $axios.$get(`/api/frames`);

      return {
        printSize,
        frames,
      };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  data: () => ({
    postLoader: false,
    disableButton: true,

    title: "",
    printSizePost: [],
    sizeFrame: [],

    file: "",
  }),

  methods: {
    customAddFiles() {
      this.$refs.file.click();
    },

    newPaintings() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("printSizePost", JSON.stringify(this.printSizePost));
      formData.append("sizeFrame", JSON.stringify(this.sizeFrame));

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
        .catch((err) =>
          this.$toast.error(err.response.data.message, { duration: 5000 })
        );
    },

    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.disableButton = false;
    },
  },
};
</script>