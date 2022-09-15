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
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  layout: "admin",

  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data: () => ({
    postLoader: false,
    disableButton: true,

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
    file: "",
  }),

  methods: {
    customAddFiles() {
      this.$refs.file.click();
    },

    newPaintings() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("sizePrice", JSON.stringify(this.sizePrice));
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