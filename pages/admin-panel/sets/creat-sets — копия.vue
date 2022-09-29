<template>
  <div class="setsCreatAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="setsCreat" />

    <!-- ============  admin content ============ -->
    <div class="admin__content">
      <div class="content__body">
        <div class="form">
          <ValidationObserver class="form__body" v-slot="{ invalid }" tag="div">
            <!-- row  -->
            <div class="form__row">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w20"
                tag="div"
              >
                <label>Наименование Cета</label>
                <input class="inptTxt" type="text" v-model="titleSets" />
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
                  accept="image/jpeg"
                  multiple
                  @change="handleFileUpload()"
                />

                <button class="add__files-button" @click="customAddFiles()">
                  Добавить фото
                </button>
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>

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

            <!-- row  -->
            <div class="form__row">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w40"
                tag="div"
              >
                <label>
                  Выбор Категории
                  <br />
                  <br />
                  <span style="color: red" v-if="catalogName.length > 5">
                    Больше 5 категорий на один сет выбирать нельзя
                  </span>
                </label>
                <!-- CATALOG  -->
                <multiselect
                  class="multiselect"
                  v-model="catalogName"
                  tag-placeholder="Добавить Категории"
                  placeholder="Выберите Категории"
                  :options="catalogs"
                  label="catalogTitle"
                  :multiple="true"
                  track-by="_id"
                ></multiselect>

                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <!-- =====================
                  SUBCATALOGS  
            ========================-->
            <!-- SUBCATALOG 1  -->
            <div class="form__row" v-if="catalogName.length >= 1">
              <div class="form__item w40">
                <label>
                  Выбор Подкатегорию из категории: "{{
                    catalogName[0].catalogTitle
                  }}"
                </label>
                <multiselect
                  class="multiselect"
                  v-model="subCatalogName1"
                  tag-placeholder="Добавить подкатегории"
                  placeholder="Выберите подкатегории"
                  :options="catalogName[0].subCatalogsName"
                  label="subcatalogTitle"
                  :multiple="true"
                  track-by="_id"
                ></multiselect>
              </div>
            </div>

            <!-- SUBCATALOG 2  -->
            <div class="form__row" v-if="catalogName.length >= 2">
              <div class="form__item w40">
                <label>
                  Выбор Подкатегорию из категории: "{{
                    catalogName[1].catalogTitle
                  }}"
                </label>
                <multiselect
                  class="multiselect"
                  v-model="subCatalogName2"
                  tag-placeholder="Добавить подкатегории"
                  placeholder="Выберите подкатегории"
                  :options="catalogName[1].subCatalogsName"
                  label="subcatalogTitle"
                  :multiple="true"
                  track-by="_id"
                ></multiselect>
              </div>
            </div>

            <!-- SUBCATALOG 3  -->
            <div class="form__row" v-if="catalogName.length >= 3">
              <div class="form__item w40">
                <label>
                  Выбор Подкатегорию из категории: "{{
                    catalogName[2].catalogTitle
                  }}"
                </label>
                <multiselect
                  class="multiselect"
                  v-model="subCatalogName3"
                  tag-placeholder="Добавить подкатегории"
                  placeholder="Выберите подкатегории"
                  :options="catalogName[2].subCatalogsName"
                  label="subcatalogTitle"
                  :multiple="true"
                  track-by="_id"
                ></multiselect>
              </div>
            </div>

            <!-- SUBCATALOG 4  -->
            <div class="form__row" v-if="catalogName.length >= 4">
              <div class="form__item w40">
                <label>
                  Выбор Подкатегорию из категории: "{{
                    catalogName[3].catalogTitle
                  }}"
                </label>
                <multiselect
                  class="multiselect"
                  v-model="subCatalogName4"
                  tag-placeholder="Добавить подкатегории"
                  placeholder="Выберите подкатегории"
                  :options="catalogName[3].subCatalogsName"
                  label="subcatalogTitle"
                  :multiple="true"
                  track-by="_id"
                ></multiselect>
              </div>
            </div>

            <!-- SUBCATALOG 5  -->
            <div class="form__row" v-if="catalogName.length >= 5">
              <div class="form__item w40">
                <label>
                  Выбор Подкатегорию из категории: "{{
                    catalogName[4].catalogTitle
                  }}"
                </label>
                <multiselect
                  class="multiselect"
                  v-model="subCatalogName5"
                  tag-placeholder="Добавить подкатегории"
                  placeholder="Выберите подкатегории"
                  :options="catalogName[4].subCatalogsName"
                  label="subcatalogTitle"
                  :multiple="true"
                  track-by="_id"
                ></multiselect>
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
      const paintings = await $axios.$get(`/api/paintings`);
      const subcatalogs = await $axios.$get(`/api/subcatalogs`);
      const catalogs = await $axios.$get(`/api/catalogs`);

      return {
        paintings,
        catalogs,
        subcatalogs,
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
    subCatalogName1: [],
    subCatalogName2: [],
    subCatalogName3: [],
    subCatalogName4: [],
    subCatalogName5: [],

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
      formData.append("subCatalogName1", JSON.stringify(this.subCatalogName1));
      formData.append("subCatalogName2", JSON.stringify(this.subCatalogName2));
      formData.append("subCatalogName3", JSON.stringify(this.subCatalogName3));
      formData.append("subCatalogName4", JSON.stringify(this.subCatalogName4));
      formData.append("subCatalogName5", JSON.stringify(this.subCatalogName5));
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
        .catch((err) =>
          this.$toast.error(err.response.data.message, { duration: 5000 })
        );
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