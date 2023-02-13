<template>
  <div class="bannersCreatAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="bannersCreat" :banners="banners" />

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
                <label>Наименование Баннера</label>
                <input class="inptTxt" type="text" v-model="titleBanner" />
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>

              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w10"
                tag="div"
              >
                <label>Фото баннера</label>
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
              <div class="addFileName">
                <span>{{ file.name }}</span>
              </div>
            </div>

            <!-- 1 row -->
            <div class="form__row">
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
                @click="newBanner((postLoader = true))"
              >
                <span :class="{ loader_active: postLoader }">
                  Добавить <b>+</b>
                </span>

                <div class="loader" :class="{ loader_active: postLoader }">
                  <div class="dot_anim"></div>
                </div>
              </button>

              <button v-else disabled class="addLink">Добавить <b>+</b></button>
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

  async asyncData({ $axios, error }) {
    try {
      const banners = await $axios.$get(`/api/banners`);
      return { banners };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  data: () => ({
    postLoader: false,
    disableButton: true,

    titleBanner: "",
    file: "",
    linkBanner: "",
    newTabLink: false,
  }),

  methods: {
    customAddFiles() {
      this.$refs.file.click();
    },

    newBanner() {
      let formData = new FormData();
      formData.append("titleBanner", this.titleBanner);
      formData.append("linkBanner", this.linkBanner);
      formData.append("newTabLink", this.newTabLink);
      formData.append("file", this.file);
      axios
        .post(`/api/banners`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: this.$auth.$storage._state["_token.local"],
          },
        })
        .then((response) => {
          this.postLoader = false;
          setTimeout(() => {
            this.$router.push("/admin-panel/banners");
          }, 500),
            this.$toast.success(`"${this.titleBanner}" создана 👍🏼`, {
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