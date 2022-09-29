<template>
  <div class="framesCreatAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="framesCreat" />

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
                :disabled="invalid"
                class="addLink"
                @click="newFrames((postLoader = true))"
              >
                <span :class="{ loader_active: postLoader }">
                  Добавить <b>+</b>
                </span>

                <div class="loader" :class="{ loader_active: postLoader }">
                  <div class="dot_anim"></div>
                </div>
              </button>

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

  data: () => ({
    postLoader: false,
    file: "",

    frameName: "",
    frameSize: "",
    frameСost: 0,
  }),

  methods: {
    customAddFiles() {
      this.$refs.file.click();
    },

    newFrames() {
      let formData = new FormData();
      formData.append("frameName", this.frameName);
      formData.append("frameSize", this.frameSize);
      formData.append("frameСost", this.frameСost);

      formData.append("file", this.file);
      axios
        .post(`/api/frames`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: this.$auth.$storage._state["_token.local"],
          },
        })
        .then((response) => {
          this.postLoader = false;
          setTimeout(() => {
            this.$router.push("/admin-panel/paintings/frames");
          }, 500),
            this.$toast.success("Рама создана 👍🏼", { duration: 6000 });
        })
        .catch((err) =>
          this.$toast.error(err.response.data.message, { duration: 5000 })
        );
    },

    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
  },
};
</script>