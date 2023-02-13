<template>
  <div class="paintingsEditAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="paintingsEdit" :paintings="AllPaintings" />

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

              <div v-if="disableButton === true" class="but_new_fail w15">
                <button @click="addFile(), (disableButton = false)">
                  Перезаписать фото
                </button>
              </div>

              <div class="coverIMG paintingsEditIMG" :class="orientation">
                <img
                  :src="`/uploads/paintings/${paintings.coverImageName.filename}`"
                />
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
            <!-- Size Frames -->
            <!-- <div class="form__row">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w40"
                tag="div"
              >
                <label>Размеры Рам</label>
                <multiselect
                  class="multiselect"
                  v-model="sizeFrame"
                  tag-placeholder="Размеры Рам"
                  placeholder="Размеры Рам"
                  :options="frames"
                  label="frameName"
                  :multiple="true"
                  track-by="_id"
                ></multiselect>
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div> -->

            <!-- 4 row -->
            <div class="form__row">
              <button
                v-if="disableButton === false"
                :disabled="invalid"
                class="addLink"
                @click="paintingsUpdate((postLoader = true))"
              >
                <span :class="{ loader_active: postLoader }"> Сохранить </span>

                <div class="loader" :class="{ loader_active: postLoader }">
                  <div class="dot_anim"></div>
                </div>
              </button>

              <button v-else disabled class="addLink">Сохранить</button>
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

  async asyncData({ $axios, params, error }) {
    try {
      const paintings = await $axios.get(`/api/paintings/${params.id}`);
      const AllPaintings = await $axios.$get(`/api/paintings`);
      const printSize = await $axios.$get(`/api/printSize`);
      const frames = await $axios.$get(`/api/frames`);

      return {
        paintings: paintings.data,
        printSize,
        AllPaintings,
        frames,
      };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  data: () => ({
    disableButton: false,
    newAddedFiles: "",
    postLoader: false,

    title: "",
    orientation: "",
    printSizePost: [],

    file: "",
    coverImageName: "",
  }),

  methods: {
    customAddFiles() {
      this.$refs.file.click();
    },

    paintingsUpdate(newAddedFiles) {
      if (this.newAddedFiles.length == 0) {
        var finalImages = this.coverImageName;
      } else {
        var finalImages = this.newAddedFiles;
      }
      let formData = {
        title: this.title,
        orientation: this.orientation,
        printSizePost: JSON.stringify(this.printSizePost),

        coverImageName: finalImages,
      };
      axios
        .patch(`/api/paintings/${this.paintings._id}`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.$auth.$storage._state["_token.local"],
          },
        })
        .then((response) => {
          this.postLoader = false;
          setTimeout(() => {
            this.$router.push("/admin-panel/paintings");
          }, 500),
            this.$toast.success("Проект обновлен 👍🏼", { duration: 5000 });
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
      this.disableButton = true;
    },

    addFile(newAddedFiles) {
      let formData = new FormData();
      let file = this.file;
      formData.append("file", file);
      formData.append("orientation", this.orientation);
      axios
        .post(`/api/paintings/addFile`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: this.$auth.$storage._state["_token.local"],
          },
        })
        .then(
          (response) => (this.newAddedFiles = response.data),
          this.$toast.success("Изображение перезаписана", { duration: 5000 })
        )
        .catch((err) =>
          this.$toast.error(err.response.data.message, { duration: 5000 })
        );
    },
  },

  mounted() {
    this.title = this.paintings.title;
    this.orientation = this.paintings.orientation;
    this.printSizePost = this.paintings.printSizePost;

    this.coverImageName = this.paintings.coverImageName;
  },
};
</script>