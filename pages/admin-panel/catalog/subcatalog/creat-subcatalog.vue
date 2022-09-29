<template>
  <div class="subcatalogCreatAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="subcatalogCreat" />

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
                <label>Наименование Подкатегории</label>
                <input class="inptTxt" type="text" v-model="subcatalogTitle" />
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <!-- 4 row BUTTON -->
            <div class="form__row">
              <button
                :disabled="invalid"
                class="addLink"
                @click="newSubCatalog((postLoader = true))"
              >
                <span :class="{ loader_active: postLoader }">
                  Добавить <b>+</b>
                </span>

                <div class="loader" :class="{ loader_active: postLoader }">
                  <div class="dot_anim"></div>
                </div>
              </button>

              <nuxt-link class="cancelBtn" to="/admin-panel/catalog/subcatalog">
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

    subcatalogTitle: "",
  }),

  methods: {
    newSubCatalog() {
      let formData = new FormData();
      formData.append("subcatalogTitle", this.subcatalogTitle);
      axios
        .post(`/api/subcatalogs`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: this.$auth.$storage._state["_token.local"],
          },
        })
        .then((response) => {
          this.postLoader = false;
          setTimeout(() => {
            this.$router.push("/admin-panel/catalog/subcatalog");
          }, 500),
            this.$toast.success("Подкатегория создана 👍🏼", { duration: 6000 });
        })
        .catch((err) =>
          this.$toast.error(err.response.data.message, { duration: 5000 })
        );
    },
  },
};
</script>