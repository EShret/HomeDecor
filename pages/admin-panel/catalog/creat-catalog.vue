<template>
  <div class="catalogCreatAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="catalogCreat" />

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
                @click="newCatalog((postLoader = true))"
              >
                <span :class="{ loader_active: postLoader }">
                  Добавить <b>+</b>
                </span>

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
      const subcatalogs = await $axios.$get(`/api/subcatalogs`);

      return { subcatalogs };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  data: () => ({
    postLoader: false,

    catalogTitle: "",
    catalogURL: "",
    subCatalogsName: [],
  }),

  methods: {
    newCatalog() {
      let formData = new FormData();
      formData.append("catalogTitle", this.catalogTitle);
      formData.append("catalogURL", this.catalogURL);
      formData.append("subCatalogsName", JSON.stringify(this.subCatalogsName));
      axios
        .post(`/api/catalogs`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: this.$auth.$storage._state["_token.local"],
          },
        })
        .then((response) => {
          this.postLoader = false;
          setTimeout(() => {
            this.$router.push("/admin-panel/catalog");
          }, 500),
            this.$toast.success("Категория создана 👍🏼", { duration: 6000 });
        })
        .catch((err) =>
          this.$toast.error(err.response.data.message, { duration: 5000 })
        );
    },
  },

  mounted() {},
};
</script>