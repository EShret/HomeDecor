<template>
  <div class="framesEditAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="framesEdit" />

    <!-- ============  admin content ============ -->
    <div class="admin__content">
      <div class="content__body">
        <div class="form">
          <ValidationObserver class="form__body" v-slot="{ invalid }" tag="div">
            <!-- ROW -->
            <div class="form__row">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w15"
                tag="div"
              >
                <label>Наименование Рамы</label>
                <input class="inptTxt" type="text" v-model="frameName" />
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

              <div v-if="disableButton === true" class="but_new_fail w15">
                <button @click="addFile(), (disableButton = false)">
                  Перезаписать фото
                </button>
              </div>

              <div class="coverIMG">
                <img
                  v-if="frames.coverImageName != null"
                  :src="`/uploads/frames/${frames.coverImageName.filename}`"
                />
              </div>
            </div>

            <!-- ROW -->
            <div class="form__row">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w15"
                tag="div"
              >
                <label>Размер рамы</label>
                <input
                  class="inptTxt"
                  type="text"
                  placeholder="30x40"
                  v-model="frameSize"
                />
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>

              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w10"
                tag="div"
              >
                <label>Стоимость</label>
                <input class="inptTxt" type="number" v-model="frameСost" />
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <!-- BUTTON -->
            <div class="form__row">
              <button
                v-if="disableButton === false"
                :disabled="invalid"
                class="addLink"
                @click="framesUpdate((postLoader = true))"
              >
                <span :class="{ loader_active: postLoader }"> Сохранить </span>

                <div class="loader" :class="{ loader_active: postLoader }">
                  <div class="dot_anim"></div>
                </div>
              </button>

              <button v-else disabled class="addLink">Сохранить</button>

              <nuxt-link class="cancelBtn" to="/admin-panel/paintings/frames">
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
      const frames = await $axios.get(`/api/frames/${params.id}`);

      return {
        frames: frames.data,
      };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  data: () => ({
    postLoader: false,
    disableButton: false,
    newAddedFiles: "",
    file: "",
    coverImageName: "",

    frameName: "",
    frameSize: "",
    frameСost: 0,
  }),

  methods: {
    customAddFiles() {
      this.$refs.file.click();
    },

    framesUpdate(newAddedFiles) {
      if (this.newAddedFiles.length == 0) {
        var finalImages = this.coverImageName;
      } else {
        var finalImages = this.newAddedFiles;
      }
      let formData = {
        frameName: this.frameName,
        frameSize: this.frameSize,
        frameСost: this.frameСost,

        coverImageName: finalImages,
      };
      axios
        .patch(`/api/frames/${this.frames._id}`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.$auth.$storage._state["_token.local"],
          },
        })
        .then((response) => {
          this.postLoader = false;
          setTimeout(() => {
            this.$router.push("/admin-panel/paintings/frames");
          }, 500),
            this.$toast.success("Данные Рамы обновлено 👍🏼", { duration: 5000 });
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message, { duration: 5000 });
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
      axios
        .post(`/api/frames/addFile`, formData, {
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
    this.frameName = this.frames.frameName;
    this.frameSize = this.frames.frameSize;
    this.frameСost = this.frames.frameСost;

    this.coverImageName = this.frames.coverImageName;
  },
};
</script>