<template>
  <div class="admin">
    <div class="navigation">
      <div class="navigation__body">
        <div class="navigation__logo">
          <div class="st__logo">
            <a href="https://st.com.tm/" target="_blank">
              <img src="/img/admin/st.svg" />
            </a>
            <span>Админ панель</span>
          </div>

          <div class="homeDecor__logo">
            <a href="http://localhost:3000" target="_blank">
              <img src="/img/admin/adminLogo.svg" />
              <span>Home Decor</span>
            </a>
          </div>
        </div>

        <div class="admin__nav" v-if="$route.name !== 'login'">
          <nuxt-link
            v-if="$route.name === 'admin-panel'"
            class="adminMenu-link"
            active-class="adminMenu-link-active"
            to="/admin-panel"
          >
            <span> Заказы </span>
          </nuxt-link>

          <nuxt-link v-else class="adminMenu-link" to="/admin-panel">
            <span> Заказы </span>
          </nuxt-link>

          <div class="adminMenu-link" :class="paintingsClassObject">
            <span> Картины </span>

            <div class="adminMenu-sublink__body">
              <nuxt-link
                to="/admin-panel/paintings"
                class="adminMenu-sublink"
                active-class="adminMenu-sublink-active"
                v-if="$route.name === 'admin-panel-paintings'"
              >
                <span> Картины </span>
              </nuxt-link>

              <nuxt-link
                to="/admin-panel/paintings"
                class="adminMenu-sublink"
                v-else
              >
                <span> Картины </span>
              </nuxt-link>

              <nuxt-link
                to="/admin-panel/paintings/frames"
                class="adminMenu-sublink"
                active-class="adminMenu-sublink-active"
              >
                <span> Рамы </span>
              </nuxt-link>

              <nuxt-link
                to="/admin-panel/paintings/print-size"
                class="adminMenu-sublink"
                active-class="adminMenu-sublink-active"
              >
                <span> Размеры печати </span>
              </nuxt-link>
            </div>
          </div>

          <nuxt-link
            class="adminMenu-link"
            active-class="adminMenu-link-active"
            to="/admin-panel/sets"
          >
            <span> Сеты </span>
          </nuxt-link>

          <div class="adminMenu-link" :class="photoCommentClassObject">
            <span>Фото отзывы</span>

            <div class="adminMenu-sublink__body">
              <nuxt-link
                to="/admin-panel/photo-comments"
                class="adminMenu-sublink"
                active-class="adminMenu-sublink-active"
                v-if="$route.name === 'admin-panel-photo-comments'"
              >
                <span> Фото отзывы </span>
              </nuxt-link>

              <nuxt-link
                to="/admin-panel/photo-comments"
                class="adminMenu-sublink"
                v-else
              >
                <span> Фото отзывы </span>
              </nuxt-link>

              <nuxt-link
                to="/admin-panel/photo-comments/reviewers"
                class="adminMenu-sublink"
                active-class="adminMenu-sublink-active"
              >
                <span> Авторы отзывов </span>
              </nuxt-link>
            </div>
          </div>

          <div class="adminMenu-link" :class="catalogClassObject">
            <span>Категории</span>

            <div class="adminMenu-sublink__body">
              <nuxt-link
                to="/admin-panel/catalog"
                class="adminMenu-sublink"
                active-class="adminMenu-sublink-active"
                v-if="$route.name === 'admin-panel-catalog'"
              >
                <span> Категории </span>
              </nuxt-link>

              <nuxt-link
                to="/admin-panel/catalog"
                class="adminMenu-sublink"
                v-else
              >
                <span> Категории </span>
              </nuxt-link>

              <nuxt-link
                to="/admin-panel/catalog/subcatalog"
                class="adminMenu-sublink"
                active-class="adminMenu-sublink-active"
              >
                <span> Подкатегории </span>
              </nuxt-link>
            </div>
          </div>

          <div class="adminMenu-link" :class="otherClassObject">
            <span>Прочее</span>

            <div class="adminMenu-sublink__body">
              <nuxt-link
                to="/admin-panel/first-sec-hp"
                class="adminMenu-sublink"
                active-class="adminMenu-sublink-active"
              >
                <span> 1-ая секция глав.Экрана </span>
              </nuxt-link>

              <nuxt-link
                to="/admin-panel/banners"
                class="adminMenu-sublink"
                active-class="adminMenu-sublink-active"
              >
                <span> Баннеры </span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <main class="main">
      <Nuxt />
    </main>
  </div>
</template>


<script>
import axios from "axios";

export default {
  middleware: "auth",

  methods: {
    verifycation: function () {
      axios
        .get(`/api/verify`, {
          headers: {
            Authorization: this.$auth.$storage._state["_token.local"],
          },
        })
        .then((response) => {})
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

  computed: {
    paintingsClassObject: function () {
      return {
        "adminMenu-link-active":
          this.$route.name === "admin-panel-paintings" ||
          this.$route.name === "admin-panel-paintings-creat-paintings" ||
          this.$route.name === "admin-panel-paintings-id" ||
          this.$route.name === "admin-panel-paintings-frames" ||
          this.$route.name === "admin-panel-paintings-frames-creat-frames" ||
          this.$route.name === "admin-panel-paintings-frames-id" ||
          this.$route.name === "admin-panel-paintings-print-size" ||
          this.$route.name ===
            "admin-panel-paintings-print-size-creat-print-size" ||
          this.$route.name === "admin-panel-paintings-print-size-id",
      };
    },

    catalogClassObject: function () {
      return {
        "adminMenu-link-active":
          this.$route.name === "admin-panel-catalog" ||
          this.$route.name === "admin-panel-catalog-creat-catalog" ||
          this.$route.name === "admin-panel-catalog-id" ||
          this.$route.name === "admin-panel-catalog-subcatalog" ||
          this.$route.name ===
            "admin-panel-catalog-subcatalog-creat-subcatalog" ||
          this.$route.name === "admin-panel-catalog-subcatalog-id",
      };
    },

    otherClassObject: function () {
      return {
        "adminMenu-link-active":
          this.$route.name === "admin-panel-first-sec-hp" ||
          this.$route.name === "admin-panel-first-sec-hp-creat-fshp" ||
          this.$route.name === "admin-panel-first-sec-hp-id" ||
          this.$route.name === "admin-panel-banners" ||
          this.$route.name === "admin-panel-banners-creat-banners" ||
          this.$route.name === "admin-panel-banners-id",
      };
    },

    photoCommentClassObject: function () {
      return {
        "adminMenu-link-active":
          this.$route.name === "admin-panel-photo-comments" ||
          this.$route.name ===
            "admin-panel-photo-comments-photo-comment-creat" ||
          this.$route.name === "admin-panel-photo-comments-id" ||
          this.$route.name === "admin-panel-photo-comments-reviewers" ||
          this.$route.name ===
            "admin-panel-photo-comments-reviewers-creat-reviewers" ||
          this.$route.name === "admin-panel-photo-comments-reviewers-id",
      };
    },
  },

  mounted: function () {
    if (this.$route.path != "/login") {
      this.verifycation();
    }
  },
};
</script>


