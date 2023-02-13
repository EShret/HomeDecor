<template>
  <div class="reviewersEditAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="reviewersEdit" :reviewers="allReviewers" />

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
                <label>Имя</label>
                <input class="inptTxt" type="text" v-model="name" />
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
                  <b>512x512 px</b>
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

              <div class="coverIMG rewieversEditIMG">
                <img
                  :src="`/uploads/reviewers/resize/${reviewers.coverImageName.filename}`"
                />
              </div>
            </div>

            <!-- BUTTON -->
            <div class="form__row">
              <button
                v-if="disableButton === false"
                :disabled="invalid"
                class="addLink"
                @click="reviewersUpdate((postLoader = true))"
              >
                <span :class="{ loader_active: postLoader }">
                  Добавить <b>+</b>
                </span>

                <div class="loader" :class="{ loader_active: postLoader }">
                  <div class="dot_anim"></div>
                </div>
              </button>

              <button v-else disabled class="addLink">Добавить <b>+</b></button>
              <nuxt-link
                class="cancelBtn"
                to="/admin-panel/photo-comments/reviewers"
              >
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
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  layout: "admin",

  components: {
    ValidationProvider,
    ValidationObserver,
  },

  async asyncData({ $axios, params, error }) {
    try {
      const reviewers = await $axios.get(`/api/reviewers/${params.id}`);
      const allReviewers = await $axios.$get(`/api/reviewers`);

      return {
        reviewers: reviewers.data,
        allReviewers,
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
    name: "",
  }),

  methods: {
    customAddFiles() {
      this.$refs.file.click();
    },

    reviewersUpdate() {
      if (this.newAddedFiles.length == 0) {
        var finalImages = this.coverImageName;
      } else {
        var finalImages = this.newAddedFiles;
      }
      let formData = {
        name: this.name,
        coverImageName: finalImages,
      };
      axios
        .patch(`/api/reviewers/${this.reviewers._id}`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.$auth.$storage._state["_token.local"],
          },
        })
        .then((response) => {
          this.postLoader = false;
          setTimeout(() => {
            this.$router.push("/admin-panel/photo-comments/reviewers");
          }, 500),
            this.$toast.success(`"${this.name}" обновлена 👍🏼`, {
              duration: 5000,
            });
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message, { duration: 5000 });
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
        .post(`/api/reviewers/addFile`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: this.$auth.$storage._state["_token.local"],
          },
        })
        .then(
          (response) => (this.newAddedFiles = response.data),
          this.$toast.success("Изображение перезаписана", { duration: 5000 })
        )
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
  },

  mounted() {
    this.name = this.reviewers.name;
    this.coverImageName = this.reviewers.coverImageName;
  },
};
</script>