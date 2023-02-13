<template>
  <div class="subcatalogsEditAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="subcatalogsEdit" :subcatalog="allSubcatalogs" />

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

              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w20"
                tag="div"
              >
                <label>Приоритет</label>
                <input class="inptTxt" type="number" v-model="priority" />
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <!-- 4 row BUTTON -->
            <div class="form__row">
              <button
                :disabled="invalid"
                class="addLink"
                @click="subcatalogUpdate((postLoader = true))"
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
    priority: 0,
  }),

  async asyncData({ $axios, params, error }) {
    try {
      const subcatalogs = await $axios.$get(`/api/subcatalogs/${params.id}`);
      const allSubcatalogs = await $axios.$get(`/api/subcatalogs`);

      return { subcatalogs, allSubcatalogs };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  methods: {
    subcatalogUpdate() {
      let formData = {
        subcatalogTitle: this.subcatalogTitle,
        priority: this.priority,
      };
      axios
        .patch(`/api/subcatalogs/${this.subcatalogs._id}`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.$auth.$storage._state["_token.local"],
          },
        })
        .then((response) => {
          this.postLoader = false;
          setTimeout(() => {
            this.$router.push("/admin-panel/catalog/subcatalog");
          }, 500),
            this.$toast.success("Подкатегория обновлена 👍🏼", {
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
  },

  mounted() {
    this.subcatalogTitle = this.subcatalogs.subcatalogTitle;
    this.priority = this.subcatalogs.priority;
  },
};
</script>