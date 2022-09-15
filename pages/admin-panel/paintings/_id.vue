<template>
  <div class="paintingsEditAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="paintingsEdit" />

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

              <div v-if="disableButton === true" class="but_new_fail w15">
                <button @click="addFile(), (disableButton = false)">
                  Перезаписать фото
                </button>
              </div>

              <div class="coverIMG">
                <img
                  :src="`/uploads/paintings/${paintings.coverImageName.filename}`"
                />
              </div>
            </div>

            <div class="form__column">
              <!-- 1 row -->
              <div
                class="form__row w30"
                v-for="(item, index) of sizePrice"
                :key="item"
              >
                <div class="indexnum">
                  <span>{{ index + 1 }}</span>
                </div>
                <ValidationProvider
                  v-slot="{ errors }"
                  class="form__item w50"
                  tag="div"
                >
                  <label>Размер</label>
                  <input
                    class="inptTxt"
                    type="text"
                    v-model="sizePrice[index].size"
                  />
                  <span class="error-message">{{ errors[0] }}</span>
                </ValidationProvider>

                <ValidationProvider
                  v-slot="{ errors }"
                  class="form__item w50"
                  tag="div"
                >
                  <label>Стоимость</label>
                  <input
                    class="inptTxt"
                    type="number"
                    v-model="sizePrice[index].price"
                  />
                  <span class="error-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>

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
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  layout: "admin",

  components: {
    ValidationProvider,
    ValidationObserver,
  },

  async asyncData({ $axios, params, error }) {
    try {
      const paintings = await $axios.get(`/api/paintings/${params.id}`);

      return {
        paintings: paintings.data,
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

    title: "",
    sizePrice: [
      {
        size: "",
        price: "",
      },

      {
        size: "",
        price: "",
      },

      {
        size: "",
        price: "",
      },

      {
        size: "",
        price: "",
      },

      {
        size: "",
        price: "",
      },

      {
        size: "",
        price: "",
      },
    ],
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
        sizePrice: JSON.stringify(this.sizePrice),
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
    this.sizePrice = this.paintings.sizePrice;
    this.coverImageName = this.paintings.coverImageName;
  },
};
</script>