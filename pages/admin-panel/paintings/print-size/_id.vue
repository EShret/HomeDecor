<template>
  <div class="printSizeEditAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="printSizeEdit" />

    <!-- ============  admin content ============ -->
    <div class="admin__content">
      <div class="content__body">
        <div class="form">
          <ValidationObserver class="form__body" v-slot="{ invalid }" tag="div">
            <!-- ROW -->
            <div class="form__row">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w15"
                tag="div"
              >
                <label>Размер печати</label>
                <input class="inptTxt" type="text" v-model="prSize" />
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>

              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w10"
                tag="div"
              >
                <label>Стоимость печати</label>
                <input class="inptTxt" type="number" v-model="pricePost" />
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <!-- BUTTON -->
            <div class="form__row">
              <button
                :disabled="invalid"
                class="addLink"
                @click="printSizeUpdate((postLoader = true))"
              >
                <span :class="{ loader_active: postLoader }"> Сохранить </span>

                <div class="loader" :class="{ loader_active: postLoader }">
                  <div class="dot_anim"></div>
                </div>
              </button>

              <nuxt-link
                class="cancelBtn"
                to="/admin-panel/paintings/print-size"
              >
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
      const printSize = await $axios.get(`/api/printSize/${params.id}`);

      return {
        printSize: printSize.data,
      };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  data: () => ({
    postLoader: false,

    prSize: "",
    pricePost: 0,
  }),

  methods: {
    printSizeUpdate(newAddedFiles) {
      let formData = {
        prSize: this.prSize,
        pricePost: this.pricePost,
      };
      axios
        .patch(`/api/printSize/${this.printSize._id}`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.$auth.$storage._state["_token.local"],
          },
        })
        .then((response) => {
          this.postLoader = false;
          setTimeout(() => {
            this.$router.push("/admin-panel/paintings/print-size");
          }, 500),
            this.$toast.success("Размер печати обновлен 👍🏼", {
              duration: 5000,
            });
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message, { duration: 5000 });
        });
    },
  },

  mounted() {
    this.prSize = this.printSize.prSize;
    this.pricePost = this.printSize.pricePost;
  },
};
</script>