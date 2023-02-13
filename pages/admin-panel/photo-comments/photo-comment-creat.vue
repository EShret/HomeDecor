<template>
  <div class="photoCommentsCreatAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="photoCommentsCreat" :photoComments="photoComments" />

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
            </div>

            <!-- BUTTON -->
            <div class="form__row">
              <button
                v-if="disableButton === false"
                :disabled="invalid"
                class="addLink"
                @click="newPhotoComment((postLoader = true))"
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

  async asyncData({ $axios, error }) {
    try {
      const getReviewers = await $axios.$get(`/api/reviewers`);
      const getSets = await $axios.$get(`/api/sets`);
      const photoComments = await $axios.$get(`/api/photoComments`);

      return { getReviewers, getSets, photoComments };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  data: () => ({
    postLoader: false,
    disableButton: true,
    file: "",

    title: "",
    reviewers: [],
    sets: [],
  }),

  methods: {
    customAddFiles() {
      this.$refs.file.click();
    },

    newPhotoComment() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("reviewers", JSON.stringify(this.reviewers));
      formData.append("sets", JSON.stringify(this.sets));
      formData.append("file", this.file);
      axios
        .post(`/api/photoComments`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: this.$auth.$storage._state["_token.local"],
          },
        })
        .then((response) => {
          this.postLoader = false;
          setTimeout(() => {
            this.$router.push("/admin-panel/photo-comments");
          }, 500),
            this.$toast.success(`"${this.title}" создана 👍🏼`, {
              duration: 6000,
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
      this.disableButton = false;
    },
  },
};
</script>