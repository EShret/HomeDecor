<template>
  <div class="catalogsEditAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="catalogsEdit" />

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
                <label>Наименование Категории</label>
                <input class="inptTxt" type="text" v-model="catalogTitle" />
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>

              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w20"
                tag="div"
              >
                <label>URL Категории</label>
                <input class="inptTxt" type="text" v-model="catalogURL" />
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <!-- row  -->
            <div class="form__row">
              <div class="form__item w40">
                <label>Выберите подкотегорию</label>
                <multiselect
                  class="multiselect"
                  v-model="subCatalogsName"
                  tag-placeholder="Добавить подкатегорию"
                  placeholder="Выберите подкатегорию"
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
                  :vmodel="subCatalogsName"
                  v-model="subCatalogsName"
                /> -->
              </div>
            </div>

            <!-- 4 row BUTTON -->
            <div class="form__row">
              <button
                :disabled="invalid"
                class="addLink"
                @click="catalogUpdate((postLoader = true))"
              >
                <span :class="{ loader_active: postLoader }"> Сохранить </span>

                <div class="loader" :class="{ loader_active: postLoader }">
                  <div class="dot_anim"></div>
                </div>
              </button>

              <nuxt-link class="cancelBtn" to="/admin-panel/catalog">
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

  async asyncData({ $axios, params, error }) {
    try {
      const catalogs = await $axios.$get(`/api/catalogs/${params.id}`);
      const subcatalogs = await $axios.$get(`/api/subcatalogs`);
      return { catalogs, subcatalogs };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  data: () => ({
    disableButton: false,
    postLoader: false,
    subcatalogs: [],

    catalogTitle: "",
    catalogURL: "",
    subCatalogsName: [],
  }),

  methods: {
    catalogUpdate() {
      let formData = {
        catalogTitle: this.catalogTitle,
        catalogURL: this.catalogURL,
        subCatalogsName: JSON.stringify(this.subCatalogsName),
      };
      axios
        .patch(`/api/catalogs/${this.catalogs._id}`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.$auth.$storage._state["_token.local"],
          },
        })
        .then((response) => {
          this.postLoader = false;
          setTimeout(() => {
            this.$router.push("/admin-panel/catalog");
          }, 500),
            this.$toast.success("Категория обновлена 👍🏼", { duration: 5000 });
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message, { duration: 5000 });
        });
    },
  },

  mounted() {
    this.catalogTitle = this.catalogs.catalogTitle;
    this.catalogURL = this.catalogs.catalogURL;
    this.subCatalogsName = this.catalogs.subCatalogsName;
  },
};
</script>