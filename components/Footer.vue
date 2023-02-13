<template>
  <div class="container">
    <div class="footer__body">
      <div class="footer__content">
        <!-- LOGO -->
        <div class="footer__logo">
          <img oncontextmenu="return false;" src="/img/logo.svg" />
        </div>

        <!-- 2 SECTION -->
        <div class="footer__box">
          <!-- column -->
          <div class="box__column">
            <a
              href="https://www.instagram.com/home_decor_tm/"
              target="_blank"
              rel="noopener noreferrer"
              class="column__item"
            >
              <img oncontextmenu="return false;" src="/img/ico/about.svg" />
              <span>О нас</span>
            </a>

            <nuxt-link to="/photo-reviews" class="column__item">
              <img
                oncontextmenu="return false;"
                src="/img/ico/img_сomment.svg"
              />
              <span>Фото отзывы</span>
            </nuxt-link>

            <nuxt-link to="/relationship" class="column__item">
              <img oncontextmenu="return false;" src="/img/ico/community.svg" />
              <span>Сотрудничество</span>
            </nuxt-link>
          </div>

          <!-- column -->
          <div class="box__column">
            <nuxt-link to="/frames-accessories" class="column__item">
              <img oncontextmenu="return false;" src="/img/ico/ram.svg" />
              <span>Рамы и крепления</span>
            </nuxt-link>

            <nuxt-link to="/prices-payment" class="column__item">
              <img oncontextmenu="return false;" src="/img/ico/price.svg" />
              <span>Цены и оплата</span>
            </nuxt-link>

            <nuxt-link
              to="/delivery-packing/#delivery-packing"
              class="column__item"
            >
              <img oncontextmenu="return false;" src="/img/ico/delivery.svg" />
              <span>Доставка и упаковка</span>
            </nuxt-link>
          </div>
        </div>

        <!-- 3 SECTION -->
        <div class="footer__box">
          <!-- row -->
          <div class="box__row">
            <a href="tel:+99362075335" class="row__item">
              <img oncontextmenu="return false;" src="/img/ico/call.svg" />
              <span>+993 62 07 53 35</span>
            </a>

            <a href="tel:+99312945240" class="row__item">
              <img oncontextmenu="return false;" src="/img/ico/calling.svg" />
              <span>+993 12 94 52 40</span>
            </a>

            <div class="row__item">
              <img
                oncontextmenu="return false;"
                src="/img/ico/collection.svg"
              />
              <span>+993 12 94 52 41</span>
            </div>
          </div>

          <!-- row -->
          <div class="box__row">
            <a href="mailto:homedecortm2022@gmail.com" class="row__item">
              <img oncontextmenu="return false;" src="/img/ico/mail-plus.svg" />
              <span>homedecortm2022@gmail.com</span>
            </a>

            <a href="mailto:info@homedecortm.com" class="row__item">
              <img
                oncontextmenu="return false;"
                src="/img/ico/mail-favourite.svg"
              />
              <span>info@homedecortm.com</span>
            </a>
          </div>

          <!-- row -->
          <div class="box__row">
            <a
              href="https://www.instagram.com/home_decor_tm/"
              target="_blank"
              rel="noopener noreferrer"
              class="row__item"
            >
              <img oncontextmenu="return false;" src="/img/ico/instav3.svg" />
              <span>@home_decor_tm</span>
            </a>

            <div class="row__item">
              <img oncontextmenu="return false;" src="/img/ico/icq.svg" />
              <span>+993 62 07 53 35</span>
            </div>

            <div class="row__item">
              <img oncontextmenu="return false;" src="/img/ico/imo.svg" />
              <span>+993 62 07 53 35</span>
            </div>
          </div>

          <!-- row -->
          <div class="box__row">
            <div class="row__item">
              <img oncontextmenu="return false;" src="/img/ico/map.svg" />
              <span>
                пр. С.Туркменбаши, 25/22 г.Ашхабад, 744005, Туркменистан
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="footer__policy">
        <nuxt-link to="/user-agreement">
          <span>Пользовательское соглашение</span>
        </nuxt-link>

        <nuxt-link to="/privacy">
          <span>Политика конфиденциальности</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>