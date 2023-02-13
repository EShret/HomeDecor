<template>
  <div class="homePG">
    <!-- HEAD SECTION -->
    <section class="head" ref="hHead">
      <div class="head-img">
        <img
          oncontextmenu="return false;"
          class="img"
          :src="`/uploads/banners/resize/${
            banners[0] != null ? banners[0].coverImageName.filename : ''
          }`"
        />
      </div>
    </section>

    <!-- category SECTION -->
    <HPCatalogLost :stickyPX="stickyPX" />

    <div class="container">
      <!-- alterableCardList -->
      <section class="alterableCardList">
        <div class="title">
          <h1>Наша продукция</h1>
          <!-- <span>
            test = {{ test }} <br />
            heightHeader = {{ heightHeader }} <br />
            {{ stickyPX }}
          </span> -->
        </div>

        <div class="cardList">
          <nuxt-link
            class="card__link"
            :to="`${firstSec.link}`"
            v-for="firstSec in firstSec"
            :key="firstSec._id"
          >
            <div class="card__img">
              <img
                oncontextmenu="return false;"
                :src="`/uploads/fshp/resize/${firstSec.coverImageName.filename}`"
                class="img"
              />
            </div>

            <div class="card__title">
              <span>{{ firstSec.title }}</span>
            </div>

            <div class="card__desc">
              <p>{{ firstSec.desc }}</p>
            </div>
          </nuxt-link>
        </div>
      </section>

      <!-- photo__comments SECTION -->
      <section class="phComments">
        <div class="title">
          <h1>Фото отзывы наших заказчиков, выполненные работы</h1>
        </div>

        <div class="phComments__list">
          <nuxt-link
            class="phComment__link"
            :to="`/photo-reviews/${photoComment._id}`"
            v-for="photoComment in photoComments.slice(0, 4)"
            :key="photoComment._id"
          >
            <div class="phComment__img">
              <img
                oncontextmenu="return false;"
                :src="`/uploads/photo-comments/resize/${photoComment.coverImageName.filename}`"
                class="img"
              />
            </div>

            <div class="reviewer">
              <div class="reviewer__img">
                <img
                  oncontextmenu="return false;"
                  :src="`/uploads/reviewers/resize/${photoComment.reviewers[0].coverImageName.filename}`"
                  class="img"
                />
              </div>
              <div class="reviewer__txt">
                <span> Автор фото </span>
                <span>{{ photoComment.reviewers[0].name }}</span>
              </div>
            </div>
          </nuxt-link>
        </div>

        <div class="moreButton">
          <nuxt-link to="/photo-reviews">
            <span> Еще больше интерьеров </span>
          </nuxt-link>
        </div>
      </section>

      <!-- answersQuestions SECTION -->
      <section class="answersQuestions">
        <div class="title">
          <h1>
            Покупайте готовые изделия в нашем шоу-руме или заказывайте по вашему
            вкусу
          </h1>
        </div>

        <div class="answersQuestions__body">
          <nuxt-link class="item" to="/delivery-packing/#terms-of-production">
            <span class="item__title">
              Быстрое изготовление <br />
              от 1 до 5 рабочих дней <b>></b>
            </span>

            <span class="item__desc">
              Стандартный срок изготовления продукции от 3 до 5 рабочих дней,
              возможно изготовление в течении одного дня за дополнительную плату
              от 30 до 50% к цене
            </span>
          </nuxt-link>

          <nuxt-link class="item" to="/delivery-packing/#package">
            <span class="item__title">
              ВЫСОКОЕ КАЧЕСТВО НАШЕЙ ПРОДУКЦИИ <br />
              УПАКОВКА В ПОДАРОК <b>></b>
            </span>

            <span class="item__desc">
              Наша продукция проходит строгий контроль качества на всех этапах
              изготовления - от печати до упаковки, поэтому вы можете быть
              уверены в высоком качестве нашей продукции - постеров, картин,
              обоев. Упаковка прозрачным полиэтиленом входит в цену изделия
              Такке вы можете выбрать подарочную упаковку белой бумагой с
              атласной лентой, цвет ленты на Ваш вкус или эко упаковку
              коричневой крафт-бумагой с бечевкой - стильно, модно и экологично,
              внесите свой вклад в защиту окружающей среды
            </span>
          </nuxt-link>

          <nuxt-link class="item" to="/delivery-packing/#prices-payments">
            <span class="item__title">
              ЛЮБАЯ ФОРМА ОПЛАТЫ <br />
              НАЛИЧНЫЕ, БЕЗНАЛИЧНЫЕ <b>></b>
            </span>

            <span class="item__desc">
              Оплачивайте так как Вам удобно - наличными, карточкой через
              терминал, безналичным расчетом через банк, в ближайшее время будет
              доступна онлайн оплата через ИНТЕРНЕТ
            </span>
          </nuxt-link>

          <nuxt-link class="item" to="/delivery-packing/#delivery-packing">
            <span class="item__title">
              БЫСТРАЯ ДОСТАВКА ПО АШХАБАДУ <br />
              И ВСЕМУ ТУРКМЕНИСТАНУ <b>></b>
            </span>

            <span class="item__desc">
              Доставляем по г.Ашхабаду за один рабочий день или к указанным Вами
              дате и времени, наша служба доставки свяжется с Вами по готовности
              заказа. Стоимость доставки от 20 манат. Возможна доставка по
              Туркменистану, стоимость зависит от стоимости услуг доставки
              перевозчиков, Вы можете запросить информацию по телефонам <br />
              +993 00 00 00 00, +993 00 00 00 00
            </span>
          </nuxt-link>
        </div>

        <div class="moreButton">
          <nuxt-link to="/prices-payment">
            <span> Цены на нашу продукцию </span>
          </nuxt-link>
        </div>
      </section>

      <Advert action="firstBanner" />

      <!-- new__products SECTION -->
      <section class="new__products">
        <div class="new__products-body">
          <div class="new__products-head">
            <h1>Новинки</h1>
          </div>

          <!-- SETS SECTION -->
          <div class="sets">
            <div class="sets__body">
              <div class="sets__list" v-if="mobile === false">
                <nuxt-link
                  class="set__link"
                  ref="setLink"
                  :to="`/sets/${set._id}`"
                  v-for="set in sets.slice(0, 8)"
                  :key="set._id"
                >
                  <div class="set__img">
                    <img
                      oncontextmenu="return false;"
                      :src="`/uploads/sets/resize/${set.coverImageName[0]}`"
                      class="img"
                    />
                  </div>
                </nuxt-link>
              </div>

              <div class="sets__list" v-else>
                <nuxt-link
                  class="set__link"
                  ref="setLink"
                  :to="`/sets/${set._id}`"
                  v-for="set in sets.slice(0, 6)"
                  :key="set._id"
                >
                  <div class="set__img">
                    <img
                      oncontextmenu="return false;"
                      :src="`/uploads/sets/resize/${set.coverImageName[0]}`"
                      class="img"
                    />
                  </div>
                </nuxt-link>
              </div>

              <Advert action="secondBanner" />

              <div class="sets__list" v-if="mobile === false">
                <nuxt-link
                  class="set__link"
                  ref="setLink"
                  :to="`/sets/${set._id}`"
                  v-for="set in sets.slice(8, 16)"
                  :key="set._id"
                >
                  <div class="set__img">
                    <img
                      oncontextmenu="return false;"
                      :src="`/uploads/sets/resize/${set.coverImageName[0]}`"
                      class="img"
                    />
                  </div>
                </nuxt-link>
              </div>

              <div class="sets__list" v-else>
                <nuxt-link
                  class="set__link"
                  ref="setLink"
                  :to="`/sets/${set._id}`"
                  v-for="set in sets.slice(6, 14)"
                  :key="set._id"
                >
                  <div class="set__img">
                    <img
                      oncontextmenu="return false;"
                      :src="`/uploads/sets/resize/${set.coverImageName[0]}`"
                      class="img"
                    />
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>

          <div class="button__showMore">
            <nuxt-link to="/new">
              <span> Просмотреть еще </span>
            </nuxt-link>
          </div>
        </div>
      </section>

      <!-- advert SECTION -->
      <Advert action="thirdBanner" />

      <!-- instagram SECTION FFFAAAAKKKKEEEEEEE -->
      <!-- <section class="instagram">
        <div class="instagram__txt">
          <div class="instagram__head">
            <span>
              Подписывайтесь на наш <br />
              INSTAGRAM
            </span>
          </div>
          <div class="link__insta">
            <a href="https://www.instagram.com/home_decor_tm/" target="_blank">
              <img oncontextmenu="return false;" src="/img/ico/insta.svg" />
              <span> @HOME_DECOR_TM </span>
            </a>
          </div>
        </div>

        <div class="instagram__picture">
          paintings_Link 1
          <div class="instagram__Img" v-if="banners[4].linkBanner === ''">
            <img
              oncontextmenu="return false;"
              class="img"
              :src="`/uploads/banners/resize/${
                banners[4] != null ? banners[4].coverImageName.filename : ''
              }`"
            />
          </div>

          <a
            :href="`${banners[4].linkBanner}`"
            class="instagram__Img"
            v-if="
              banners[4].linkBanner != '' && banners[4].newTabLink === false
            "
          >
            <img
              oncontextmenu="return false;"
              class="img"
              :src="`/uploads/banners/resize/${
                banners[4] != null ? banners[4].coverImageName.filename : ''
              }`"
            />
          </a>

          <a
            :href="`${banners[4].linkBanner}`"
            target="_blank"
            rel="noopener noreferrer"
            class="instagram__Img"
            v-if="banners[4].linkBanner != '' && banners[4].newTabLink === true"
          >
            <img
              oncontextmenu="return false;"
              class="img"
              :src="`/uploads/banners/resize/${
                banners[4] != null ? banners[4].coverImageName.filename : ''
              }`"
            />
          </a>

          paintings_Link 2
          <div class="instagram__Img" v-if="banners[5].linkBanner === ''">
            <img
              oncontextmenu="return false;"
              class="img"
              :src="`/uploads/banners/resize/${
                banners[5] != null ? banners[5].coverImageName.filename : ''
              }`"
            />
          </div>

          <a
            :href="`${banners[5].linkBanner}`"
            class="instagram__Img"
            v-if="
              banners[5].linkBanner != '' && banners[5].newTabLink === false
            "
          >
            <img
              oncontextmenu="return false;"
              class="img"
              :src="`/uploads/banners/resize/${
                banners[5] != null ? banners[5].coverImageName.filename : ''
              }`"
            />
          </a>

          <a
            :href="`${banners[5].linkBanner}`"
            target="_blank"
            rel="noopener noreferrer"
            class="instagram__Img"
            v-if="banners[5].linkBanner != '' && banners[5].newTabLink === true"
          >
            <img
              oncontextmenu="return false;"
              class="img"
              :src="`/uploads/banners/resize/${
                banners[5] != null ? banners[5].coverImageName.filename : ''
              }`"
            />
          </a>

          paintings_Link 3
          <div class="instagram__Img" v-if="banners[6].linkBanner === ''">
            <img
              oncontextmenu="return false;"
              class="img"
              :src="`/uploads/banners/resize/${
                banners[6] != null ? banners[6].coverImageName.filename : ''
              }`"
            />
          </div>

          <a
            :href="`${banners[6].linkBanner}`"
            class="instagram__Img"
            v-if="
              banners[6].linkBanner != '' && banners[6].newTabLink === false
            "
          >
            <img
              oncontextmenu="return false;"
              class="img"
              :src="`/uploads/banners/resize/${
                banners[6] != null ? banners[6].coverImageName.filename : ''
              }`"
            />
          </a>

          <a
            :href="`${banners[6].linkBanner}`"
            target="_blank"
            rel="noopener noreferrer"
            class="instagram__Img"
            v-if="banners[6].linkBanner != '' && banners[6].newTabLink === true"
          >
            <img
              oncontextmenu="return false;"
              class="img"
              :src="`/uploads/banners/resize/${
                banners[6] != null ? banners[6].coverImageName.filename : ''
              }`"
            />
          </a>
        </div>
      </section> -->
    </div>
  </div>
</template>


<script>
import VueScrollClass from "vue-scroll-class";

export default {
  directives: {
    "scroll-class": VueScrollClass,
  },

  async asyncData({ $axios, params, error }) {
    try {
      const sets = await $axios.$get(`/api/sets`);
      const firstSec = await $axios.$get(`/api/firstSec_hp`);
      const photoComments = await $axios.$get(`/api/photoComments`);

      return {
        sets,
        firstSec,
        photoComments,
      };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  data: () => ({
    heightHeader: 0,
    stickyPX: 0,
    mobile: false,
  }),

  computed: {
    banners() {
      return this.$store.state.banners;
    },
  },

  mounted() {
    var heightHeade = this.$refs.hHead.offsetHeight;
    this.heightHeader = $(".header").height();

    if (this.$refs.hHead.clientWidth > 991) {
      this.stickyPX = heightHeade - this.heightHeader;
    } else {
      this.stickyPX = heightHeade;
    }

    var width__sec = $(".set__link").width();
    $(".set__link").css("height", width__sec);

    var width__sec_card = $(".card__link").width();
    $(".card__img").css("height", width__sec_card);

    var width__sec_card = $(".phComment__link").width();
    $(".phComment__img").css("height", width__sec_card);

    if (this.$refs.hHead.clientWidth < 992) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }

    // (function () {
    //   var a = document.querySelector(".category"),
    //     b = null;
    //   window.addEventListener("scroll", Ascroll, false);
    //   document.body.addEventListener("scroll", Ascroll, false);
    //   function Ascroll() {
    //     if (b == null) {
    //       var Sa = getComputedStyle(a, ""),
    //         s = "";
    //       for (var i = 0; i < Sa.length; i++) {
    //         if (
    //           Sa[i].indexOf("overflow") == 0 ||
    //           Sa[i].indexOf("padding") == 0 ||
    //           Sa[i].indexOf("border") == 0 ||
    //           Sa[i].indexOf("outline") == 0 ||
    //           Sa[i].indexOf("box-shadow") == 0
    //           // Sa[i].indexOf("background") == 0
    //         ) {
    //           s += Sa[i] + ": " + Sa.getPropertyValue(Sa[i]) + "; ";
    //         }
    //       }
    //       b = document.createElement("div");
    //       b.style.cssText =
    //         s + " box-sizing: border-box; width: " + a.offsetWidth + "px;";
    //       a.insertBefore(b, a.firstChild);
    //       var l = a.childNodes.length;
    //       for (var i = 1; i < l; i++) {
    //         b.appendChild(a.childNodes[1]);
    //       }
    //       a.style.height = b.getBoundingClientRect().height + "px";
    //       a.style.padding = "0";
    //       a.style.border = "0";
    //     }
    //     if (a.getBoundingClientRect().top <= 102) {
    //       b.className = "sticky fixed";
    //     } else {
    //       b.className = "sticky";
    //     }
    //     window.addEventListener(
    //       "resize",
    //       function () {
    //         a.children[0].style.width = getComputedStyle(a, "").width;
    //       },
    //       false
    //     );
    //   }
    // })();
  },
};
</script>