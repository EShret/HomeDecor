<template>
  <div class="homePG">
    <!-- HEAD SECTION -->
    <section class="head">
      <div class="head-img">
        <img class="img" src="/img/home/head/heder.jpg" />
      </div>
      <div class="container">
        <div class="head__body">
          <div class="head__body-txt">
            <span>
              Создайте уютную <br />
              атмосферу вашего дома <br />
              вметсе с нами
            </span>
          </div>
          <div class="head-body-img">
            <img src="/img/home/head/1.jpg" />
            <img src="/img/home/head/2.jpg" />
            <img src="/img/home/head/3.jpg" />
          </div>
        </div>
      </div>
    </section>

    <!-- category SECTION -->
    <CatalogList />

    <div class="container">
      <!-- new__products SECTION -->
      <section class="new__products">
        <div class="new__products-body">
          <div class="new__products-head">
            <h1>Новинки недели</h1>
          </div>
          <div class="new__products-list">
            <div class="list__item">
              <nuxt-link to="/">
                <img class="img" src="/img/home/new-products/set.jpg" alt="" />
              </nuxt-link>
            </div>
            <div class="list__item">
              <nuxt-link to="/">
                <img class="img" src="/img/home/new-products/set.jpg" alt="" />
              </nuxt-link>
            </div>
            <div class="list__item">
              <nuxt-link to="/">
                <img class="img" src="/img/home/new-products/set.jpg" alt="" />
              </nuxt-link>
            </div>
            <div class="list__item">
              <nuxt-link to="/">
                <img class="img" src="/img/home/new-products/set.jpg" alt="" />
              </nuxt-link>
            </div>
            <div class="list__item">
              <nuxt-link to="/">
                <img class="img" src="/img/home/new-products/set.jpg" alt="" />
              </nuxt-link>
            </div>
            <div class="list__item">
              <nuxt-link to="/">
                <img class="img" src="/img/home/new-products/set.jpg" alt="" />
              </nuxt-link>
            </div>
            <div class="list__item">
              <nuxt-link to="/">
                <img class="img" src="/img/home/new-products/set.jpg" alt="" />
              </nuxt-link>
            </div>
            <div class="list__item">
              <nuxt-link to="/">
                <img class="img" src="/img/home/new-products/set.jpg" alt="" />
              </nuxt-link>
            </div>
          </div>
          <div class="gift">
            <nuxt-link class="gift__bg" to="/">
              <img class="img" src="/img/home/gift.jpg" />
            </nuxt-link>
          </div>
          <div class="new__products-list">
            <div class="list__item">
              <nuxt-link to="/">
                <img class="img" src="/img/home/new-products/set.jpg" alt="" />
              </nuxt-link>
            </div>
            <div class="list__item">
              <nuxt-link to="/">
                <img class="img" src="/img/home/new-products/set.jpg" alt="" />
              </nuxt-link>
            </div>
            <div class="list__item">
              <nuxt-link to="/">
                <img class="img" src="/img/home/new-products/set.jpg" alt="" />
              </nuxt-link>
            </div>
            <div class="list__item">
              <nuxt-link to="/">
                <img class="img" src="/img/home/new-products/set.jpg" alt="" />
              </nuxt-link>
            </div>
            <div class="list__item">
              <nuxt-link to="/">
                <img class="img" src="/img/home/new-products/set.jpg" alt="" />
              </nuxt-link>
            </div>
            <div class="list__item">
              <nuxt-link to="/">
                <img class="img" src="/img/home/new-products/set.jpg" alt="" />
              </nuxt-link>
            </div>
            <div class="list__item">
              <nuxt-link to="/">
                <img class="img" src="/img/home/new-products/set.jpg" alt="" />
              </nuxt-link>
            </div>
            <div class="list__item">
              <nuxt-link to="/">
                <img class="img" src="/img/home/new-products/set.jpg" alt="" />
              </nuxt-link>
            </div>
          </div>
          <div class="button__showMore">
            <nuxt-link to="/">
              <span> Просмотреть еще </span>
            </nuxt-link>
          </div>
        </div>
      </section>

      <!-- advert SECTION -->
      <Advert />

      <!-- instagram SECTION -->
      <section class="instagram">
        <div class="instagram__txt">
          <div class="instagram__head">
            <span>
              Подписывайтесь на наш <br />
              INSTAGRAM
            </span>
          </div>
          <div class="link__insta">
            <nuxt-link to="/">
              <img src="/img/ico/insta.svg" />
              <span> @HOME_DECOR_TM </span>
            </nuxt-link>
          </div>
        </div>

        <div class="instagram__picture">
          <nuxt-link class="instagram__Img" to="/">
            <img class="img" src="/img/home/instaPicture.jpg" />
          </nuxt-link>

          <nuxt-link class="instagram__Img" to="/">
            <img class="img" src="/img/home/instaPicture.jpg" />
          </nuxt-link>

          <nuxt-link class="instagram__Img" to="/">
            <img class="img" src="/img/home/instaPicture.jpg" />
          </nuxt-link>
        </div>
      </section>
    </div>
  </div>
</template>


<script>
export default {
  async asyncData({ $axios, params, error }) {
    try {
      const catalogs = await $axios.get(`/api/catalogs/url/${params.url}`);
      const sets = await $axios.$get(`/api/sets`);
      return {
        catalogs: catalogs.data,
        sets,
      };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  mounted() {
    (function () {
      var a = document.querySelector(".category"),
        b = null;
      window.addEventListener("scroll", Ascroll, false);
      document.body.addEventListener("scroll", Ascroll, false);
      function Ascroll() {
        if (b == null) {
          var Sa = getComputedStyle(a, ""),
            s = "";
          for (var i = 0; i < Sa.length; i++) {
            if (
              Sa[i].indexOf("overflow") == 0 ||
              Sa[i].indexOf("padding") == 0 ||
              Sa[i].indexOf("border") == 0 ||
              Sa[i].indexOf("outline") == 0 ||
              Sa[i].indexOf("box-shadow") == 0
              // Sa[i].indexOf("background") == 0
            ) {
              s += Sa[i] + ": " + Sa.getPropertyValue(Sa[i]) + "; ";
            }
          }
          b = document.createElement("div");
          b.style.cssText =
            s + " box-sizing: border-box; width: " + a.offsetWidth + "px;";
          a.insertBefore(b, a.firstChild);
          var l = a.childNodes.length;
          for (var i = 1; i < l; i++) {
            b.appendChild(a.childNodes[1]);
          }
          a.style.height = b.getBoundingClientRect().height + "px";
          a.style.padding = "0";
          a.style.border = "0";
        }
        if (a.getBoundingClientRect().top <= 102) {
          b.className = "sticky fixed";
        } else {
          b.className = "sticky";
        }
        window.addEventListener(
          "resize",
          function () {
            a.children[0].style.width = getComputedStyle(a, "").width;
          },
          false
        );
      }
    })();
  },
};
</script>