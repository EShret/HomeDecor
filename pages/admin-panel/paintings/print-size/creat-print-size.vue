<template>
  <div class="printSizeCreatAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="printSizeCreat" />

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
                @click="newPrintSize((postLoader = true))"
              >
                <span :class="{ loader_active: postLoader }">
                  Добавить <b>+</b>
                </span>

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

  data: () => ({
    postLoader: false,

    prSize: "",
    pricePost: 0,
  }),

  methods: {
    newPrintSize() {
      let formData = new FormData();
      formData.append("prSize", this.prSize);
      formData.append("pricePost", this.pricePost);
      axios
        .post(`/api/printSize`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: this.$auth.$storage._state["_token.local"],
          },
        })
        .then((response) => {
          this.postLoader = false;
          setTimeout(() => {
            this.$router.push("/admin-panel/paintings/print-size");
          }, 500),
            this.$toast.success("Размер печати добавлен 👍🏼", {
              duration: 6000,
            });
        })
        .catch((err) =>
          this.$toast.error(err.response.data.message, { duration: 5000 })
        );
    },
  },
};
</script>