<template>
  <div class="bannersEditAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="bannersEdit" :banners="allbanners" />

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
                <label>Наименование баннера</label>
                <input class="inptTxt" type="text" v-model="titleBanner" />
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
                <span v-if="allbanners[0].titleBanner === banners.titleBanner">
                  <b>1920x650 px</b>
                </span>

                <span v-else>
                  <b>1220x250 px</b>
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

              <div class="coverIMG bannersEditIMG">
                <img
                  :src="`/uploads/banners/${banners.coverImageName.filename}`"
                />
              </div>
            </div>

            <!-- 1 row -->
            <div
              class="form__row"
              v-if="allbanners[0].titleBanner != banners.titleBanner"
            >
              <div class="form__item w15">
                <label>Ссылка</label>
                <input class="inptTxt" type="text" v-model="linkBanner" />
              </div>

              <div class="form__item newTabLink">
                <label for="checkbox-Link">
                  Открывать сслыку в новом окне?
                </label>
                <input
                  type="checkbox"
                  id="checkbox-Link"
                  value="true"
                  v-model="newTabLink"
                />
              </div>
            </div>

            <!-- 4 row -->
            <div class="form__row">
              <button
                v-if="disableButton === false"
                :disabled="invalid"
                class="addLink"
                @click="bannersUpdate((postLoader = true))"
              >
                <span :class="{ loader_active: postLoader }"> Сохранить </span>

                <div class="loader" :class="{ loader_active: postLoader }">
                  <div class="dot_anim"></div>
                </div>
              </button>

              <button v-else disabled class="addLink">Сохранить</button>
              <nuxt-link class="cancelBtn" to="/admin-panel/banners">
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
      const banners = await $axios.get(`/api/banners/${params.id}`);
      const allbanners = await $axios.$get(`/api/banners`);

      return {
        banners: banners.data,
        allbanners,
      };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  data: () => ({
    disableButton: false,
    newAddedFiles: "",
    postLoader: false,
    file: "",
    coverImageName: "",
    titleBanner: "",
    linkBanner: "",
    newTabLink: false,
  }),

  methods: {
    customAddFiles() {
      this.$refs.file.click();
    },

    bannersUpdate(newAddedFiles) {
      if (this.newAddedFiles.length == 0) {
        var finalImages = this.coverImageName;
      } else {
        var finalImages = this.newAddedFiles;
      }
      let formData = {
        titleBanner: this.titleBanner,
        linkBanner: this.linkBanner,
        newTabLink: this.newTabLink,
        coverImageName: finalImages,
      };
      axios
        .patch(`/api/banners/${this.banners._id}`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.$auth.$storage._state["_token.local"],
          },
        })
        .then((response) => {
          this.postLoader = false;
          setTimeout(() => {
            this.$router.push("/admin-panel/banners");
          }, 500),
            this.$toast.success(`"${this.titleBanner}" обновлена 👍🏼`, {
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

    addFile(newAddedFiles) {
      let formData = new FormData();
      let file = this.file;
      formData.append("file", file);
      axios
        .post(`/api/banners/addFile`, formData, {
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
    this.titleBanner = this.banners.titleBanner;
    this.linkBanner = this.banners.linkBanner;
    this.newTabLink = this.banners.newTabLink;
    this.coverImageName = this.banners.coverImageName;
  },
};
</script>