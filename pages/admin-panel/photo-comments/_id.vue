<template>
  <div class="photoCommentsEditAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="photoCommentsEdit" :photoComments="allPhotoComments" />

    <!-- ============  admin content ============ -->
    <div class="admin__content">
      <div class="content__body">
        <div class="form">
          <ValidationObserver class="form__body" v-slot="{ invalid }" tag="div">
            <!-- row -->
            <div class="form__row">
              <span class="warning">Заполняйте строго по примерам</span>
            </div>

            <!-- row -->
            <div class="form__row">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w20"
                tag="div"
              >
                <label>Наименование</label>
                <input class="inptTxt" type="text" v-model="title" />
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>

              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w30"
                tag="div"
              >
                <label>Выберите автора фото отзыва</label>
                <multiselect
                  class="multiselect"
                  v-model="reviewers"
                  tag-placeholder="Добавить картины"
                  placeholder="Выберите картины"
                  :options="getReviewers"
                  label="name"
                  track-by="_id"
                ></multiselect>
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <!-- row -->
            <div class="form__row">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w30"
                tag="div"
              >
                <label>Сеты использованные в фото отзыве</label>
                <multiselect
                  class="multiselect"
                  v-model="sets"
                  tag-placeholder="Добавить картины"
                  placeholder="Выберите картины"
                  :options="getSets"
                  label="titleSets"
                  track-by="_id"
                  :multiple="true"
                ></multiselect>
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>

              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w10"
                tag="div"
              >
                <label>Фото</label>
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
                  <b>1200x1200 px</b>
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

              <div class="coverIMG photoCommentsEditIMG">
                <img
                  :src="`/uploads/photo-comments/resize/${photoComments.coverImageName.filename}`"
                />
              </div>
            </div>

            <!-- BUTTON -->
            <div class="form__row">
              <button
                v-if="disableButton === false"
                :disabled="invalid"
                class="addLink"
                @click="photoCommentsUpdate((postLoader = true))"
              >
                <span :class="{ loader_active: postLoader }">
                  Добавить <b>+</b>
                </span>

                <div class="loader" :class="{ loader_active: postLoader }">
                  <div class="dot_anim"></div>
                </div>
              </button>

              <button v-else disabled class="addLink">Добавить <b>+</b></button>
              <nuxt-link class="cancelBtn" to="/admin-panel/photo-comments">
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
      const allPhotoComments = await $axios.$get(`/api/photoComments`);
      const photoComments = await $axios.get(`/api/photoComments/${params.id}`);
      const getReviewers = await $axios.$get(`/api/reviewers`);
      const getSets = await $axios.$get(`/api/sets`);

      return {
        getReviewers,
        getSets,
        photoComments: photoComments.data,
        allPhotoComments,
      };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  data: () => ({
    postLoader: false,
    disableButton: false,
    file: "",
    newAddedFiles: "",

    title: "",
    reviewers: [],
    sets: [],
  }),

  methods: {
    customAddFiles() {
      this.$refs.file.click();
    },

    photoCommentsUpdate() {
      if (this.newAddedFiles.length == 0) {
        var finalImages = this.coverImageName;
      } else {
        var finalImages = this.newAddedFiles;
      }
      let formData = {
        title: this.title,
        reviewers: JSON.stringify(this.reviewers),
        sets: JSON.stringify(this.sets),
        coverImageName: finalImages,
      };
      axios
        .patch(`/api/photoComments/${this.photoComments._id}`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.$auth.$storage._state["_token.local"],
          },
        })
        .then((response) => {
          this.postLoader = false;
          setTimeout(() => {
            this.$router.push("/admin-panel/photo-comments");
          }, 500),
            this.$toast.success(`"${this.title}" обновлена 👍🏼`, {
              duration: 5000,
            });
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

    addFile() {
      let formData = new FormData();
      let file = this.file;
      formData.append("file", file);
      axios
        .post(`/api/photoComments/addFile`, formData, {
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
    this.title = this.photoComments.title;
    this.reviewers = this.photoComments.reviewers;
    this.sets = this.photoComments.sets;

    this.coverImageName = this.photoComments.coverImageName;
  },
};
</script>