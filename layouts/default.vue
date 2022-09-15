<template>
  <div class="wrapper">
    <header v-scroll-class:header-active="20" class="header">
      <Header />
    </header>

    <main class="main">
      <Nuxt />
    </main>

    <footer class="footer">
      <Footer />
    </footer>
  </div>
</template>

<script>
import VueScrollClass from "vue-scroll-class";

export default {
  directives: {
    "scroll-class": VueScrollClass,
  },
};
</script>