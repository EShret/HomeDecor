module.exports = {
  server: {
    port: process.env.PORT,
    host: "localhost",
  },

  env: {
    baseUrl: process.env.BASE_URL,
  },


  head: {
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: "theme-color", content: "#000000" },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: "/js/jquery.min.js",
        body: true,
      },

      {
        src: "/js/swiper-bundle.min.js",
        body: true,
      },
    ],
  },

  loading: {
    color: "orange",
    height: "2px",
    throttle: 0
  },

  css: [
    "~assets/scss/style.scss",
    "~assets/css/swiper-bundle.min.css",
  ],

  plugins: [
    { src: "~/plugins/multi-select.js" },
    { src: "~plugins/vee-validate", mode: "client" }
  ],

  components: true,

  telemetry: false,

  router: {
    prefetchLinks: false,
    extendRoutes(routes) {
      // routes.push({
      //   name: 'admin-catalog',
      //   path: '/admin-panel/sets',
      //   component: 'pages/admin-panel/index.vue'
      // })
      //   routes.push({
      //     name: 'admin-catalog_url',
      //     path: '/admin-catalog/:url?',
      //     component: 'pages/emal-admin-panel/catalog/_url.vue'
      //   }),
      //   routes.push({
      //     name: 'creat-catalog',
      //     path: '/admin-catalog/creat-catalog',
      //     component: 'pages/emal-admin-panel/catalog/creat-catalog.vue'
      //   }),
      //   routes.push({
      //     name: 'product',
      //     path: '/catalog/:url?/:id?',
      //     component: 'pages/catalog/products/_id.vue'
      //   })
    }
  },

  buildModules: [
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    "@nuxtjs/toast",
    'nuxt-lazy-load',
  ],

  axios: { baseURL: process.env.BASE_URL, proxy: true },
  proxy: { "/api/": `${process.env.BASE_URL}` },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/api/auth/login",
            method: "post",
            propertyName: "token",
          },
          logout: { url: "/api/auth/logout", method: "post" },
          user: { url: "/api/auth/user", method: "get", propertyName: "user" },
        },
      },
    },
  },

  build: {
    extractCSS: true,
    transpile: ["vee-validate/dist/rules"],
  }
};
