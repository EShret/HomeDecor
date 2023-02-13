<template>
  <div class="pricesPG">
    <div class="container">
      <!-- bread crumbs -->
      <div class="crumbs">
        <nuxt-link to="/">
          <span>Главная ></span>
        </nuxt-link>

        <nuxt-link to="#">
          <span> Цены</span>
        </nuxt-link>
      </div>

      <!-- pricesPG -->
      <div class="pricesPG__body">
        <div class="title">
          <h1>Цены</h1>
        </div>

        <div class="pricesPG__content">
          <div class="body__side">
            <div class="item">
              <div class="body__title">
                <span>Печать</span>
              </div>
              <div class="body__description">
                <span>
                  Мы печатаем постеры на профессиональной матовой фотобумаге
                  <br />
                  плотностью 190 гр/м2.
                </span>
              </div>
              <div class="body__content row">
                <div class="content__column">
                  <span>21x30 = 50 ман</span>
                  <span>30x40 = 75 ман</span>
                  <span>40x50 = 100 ман</span>
                </div>
                <div class="content__column">
                  <span>50x70 = 150 ман</span>
                  <span>23x23 = 55 ман</span>
                  <span>50x50 = 120 ман</span>
                </div>
              </div>
            </div>

            <div class="item">
              <div class="body__title">
                <span>Рамы</span>
              </div>
              <div class="body__description">
                <span>
                  Рамы сделаны из ДВП, поэтому они не тяжелые. Защитный лист из
                  пластика, он безопасен, тк невозможно разбить. Так же он не
                  искажает изображение.
                </span>
              </div>
              <div class="body__content column">
                <span>21x30 = 50 ман</span>
                <span>30x40 = 75 ман</span>
                <span>40x50 = 100 ман</span>
                <span>50x70 = 150 ман</span>
              </div>
            </div>

            <div class="item">
              <div class="body__title">
                <span>Доставка</span>
              </div>
              <div class="body__description">
                <span> Доставка по всему Туркменистану. </span>
              </div>
              <div class="body__content column">
                <span>Доставка по Ашхабаду– от 20 манат</span>
                <span>Доставка в велаяты – от 50 манат</span>
                <span>
                  Самовывоз пр. С.Туркменбаши, 25/22 г.Ашхабад, (10:00 - 18:00,
                  пн-пт) – бесплатно
                </span>
              </div>
            </div>
          </div>
          <div class="body__side">
            <MyAccordion />
          </div>
        </div>
        <Advert />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "catalog",
};
</script>