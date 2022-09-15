<template>
  <section class="auth">
    <div class="auth__body">
      <div class="auth__img">
        <img src="/img/admin/likes.png" />
      </div>

      <div class="auth__form">
        <div class="form-body">
          <form @submit.prevent="userLogin">
            <h1>Авторизация</h1>

            <div>
              <label>Login</label>
              <input type="text" id="name" v-model="login.user" />
            </div>
            <div>
              <label>Password</label>
              <input type="password" id="password" v-model="login.password" />
            </div>
            <div>
              <button type="submit">Войти</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: "admin",

  data() {
    return {
      login: {
        user: "",
        password: "",
      },
    };
  },

  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.login,
        });
        this.$toast.success("Добро пожаловать!", { duration: 5000 });
        this.$router.push("/admin-panel");
      } catch (err) {
        this.$toast.error(err.response.data.message, { duration: 8000 });
      }
    },
  },
};
</script>