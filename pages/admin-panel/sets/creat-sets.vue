<template>
  <div class="setsCreatAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="setsCreat" :sets="sets" />

    <!-- ============  admin content ============ -->
    <div class="admin__content">
      <div class="content__body">
        <div class="form">
          <ValidationObserver class="form__body" v-slot="{ invalid }" tag="div">
            <!-- row -->
            <div class="form__row">
              <span class="warning">Заполняйте строго по примерам</span>
            </div>

            <!-- row  -->
            <div class="form__row">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w20"
                tag="div"
              >
                <label>Наименование Cета</label>
                <input
                  class="inptTxt"
                  type="text"
                  placeholder="Новый сет"
                  v-model="titleSets"
                />
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>

              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w10"
                tag="div"
              >
                <label>Фотоки сета</label>
                <input
                  type="file"
                  id="file"
                  ref="files"
                  accept="image/jpeg, image/jpg, image/png"
                  multiple
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
                <ul>
                  <li v-for="file in files" :key="file.key">
                    <span>{{ file.name }}</span>
                  </li>
                </ul>
                <span
                  class="removeFiles"
                  v-if="files.length >= 1"
                  @click="removeFile()"
                >
                  x
                </span>
              </div>
            </div>

            <!-- row  -->
            <div class="form__row">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w40"
                tag="div"
              >
                <label>Выберите картины</label>
                <!-- KARTINY -->
                <multiselect
                  class="multiselect"
                  v-model="paintingsName"
                  tag-placeholder="Добавить картины"
                  placeholder="Выберите картины"
                  :options="paintings"
                  label="title"
                  :multiple="true"
                  track-by="_id"
                ></multiselect>
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <!-- =====================
                    CATALOGS  
            ========================-->
            <div class="form__row">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w40"
                tag="div"
              >
                <label> Выбор Категории </label>
                <span style="color: red" v-if="catalogName.length >= 5">
                  Нельзя выбрать больше 20 категорий на один сет
                </span>
                <br />
                <!-- CATALOG  -->
                <!-- <multiselect
                  class="multiselect"
                  v-model="catalogName"
                  tag-placeholder="Добавить Категории"
                  placeholder="Выберите Категории"
                  :options="catalogs"
                  label="catalogTitle"
                  :multiple="true"
                  track-by="_id"
                ></multiselect> -->

                <CustomSelect
                  :options="catalogs"
                  displayProperty="catalogTitle"
                  valueProperty="catalogTitle"
                  placeholder="Клик для выбора Категории..."
                  :vmodel="catalogName"
                  v-model="catalogName"
                ></CustomSelect>

                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <!-- =====================
                  SUBCATALOGS  
            ========================-->
            <!-- SUBCATALOG  -->
            <div class="form__row">
              <div class="form__item w40">
                <label> Выбор Подкатегорию </label>
                <span style="color: red" v-if="catalogName.length >= 20">
                  Нельзя выбрать больше 20 подкатегорий на один сет
                </span>

                <multiselect
                  class="multiselect"
                  v-model="subCatalogName"
                  tag-placeholder="Добавить подкатегории"
                  placeholder="Выберите подкатегории"
                  :options="subcatalogs"
                  label="subcatalogTitle"
                  :multiple="true"
                  track-by="_id"
                ></multiselect>

                <!-- <CustomSelect
                  :options="subcatalogs"
                  displayProperty="subcatalogTitle"
                  valueProperty="subcatalogTitle"
                  placeholder="Клик для выбора Подкатегории..."
                  :vmodel="subCatalogName"
                  v-model="subCatalogName"
                ></CustomSelect> -->
              </div>
            </div>

            <!-- 4 row -->
            <div class="form__row">
              <button
                v-if="disableButton === false"
                :disabled="invalid"
                class="addLink"
                @click="newSets((postLoader = true))"
              >
                <span :class="{ loader_active: postLoader }">
                  Добавить <b>+</b>
                </span>

                <div class="loader" :class="{ loader_active: postLoader }">
                  <div class="dot_anim"></div>
                </div>
              </button>

              <button v-else disabled class="addLink">Добавить <b>+</b></button>
              <nuxt-link class="cancelBtn" to="/admin-panel/sets">
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
import CustomSelect from "@/components/admin/CustomSelect.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  layout: "admin",

  components: {
    Multiselect,
    ValidationProvider,
    ValidationObserver,
    CustomSelect,
  },

  async asyncData({ $axios, error }) {
    try {
      const paintings = await $axios.$get(`/api/paintings`);
      const subcatalogs = await $axios.$get(`/api/subcatalogs`);
      const catalogs = await $axios.$get(`/api/catalogs`);
      const sets = await $axios.$get(`/api/sets`);

      return {
        paintings,
        catalogs,
        subcatalogs,
        sets,
      };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  data: () => ({
    postLoader: false,
    disableButton: true,

    titleSets: "",
    paintingsName: [],
    catalogName: [],
    subCatalogName: [],

    files: [],
  }),

  methods: {
    customAddFiles() {
      this.$refs.files.click();
    },

    removeFile() {
      this.files.splice(0);
      this.disableButton = true;
    },

    newSets() {
      const formData = new FormData();

      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append("files", file);
      }

      formData.append("titleSets", this.titleSets);
      formData.append("paintingsName", JSON.stringify(this.paintingsName));
      formData.append("catalogName", JSON.stringify(this.catalogName));
      formData.append("subCatalogName", JSON.stringify(this.subCatalogName));
      axios
        .post(`/api/sets`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: this.$auth.$storage._state["_token.local"],
          },
        })
        .then((response) => {
          this.postLoader = false;
          setTimeout(() => {
            this.$router.push("/admin-panel/sets");
          }, 800),
            this.$toast.success("Сет создан 👍🏼", { duration: 6000 });
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
      let uploadedFiles = this.$refs.files.files;
      var i;
      for (i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }

      this.disableButton = false;
    },
  },
};
</script>