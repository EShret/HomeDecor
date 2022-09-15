<template>
  <div class="catalogPG">
    <div class="container">
      <!-- bread crumbs -->
      <div class="crumbs">
        <span> Главная > Сезоны </span>
      </div>

      <!-- subCatalog -->
      <div class="subCatalog">
        <nuxt-link
          active-class="subCatalog__link-active"
          class="subCatalog__link"
          to="/catalog"
        >
          <span>Все</span>
        </nuxt-link>

        <nuxt-link
          active-class="subCatalog__link-active"
          class="subCatalog__link"
          to="/ads"
        >
          <span>Зима</span>
        </nuxt-link>

        <nuxt-link
          active-class="subCatalog__link-active"
          class="subCatalog__link"
          to="/asd"
        >
          <span>Весна</span>
        </nuxt-link>

        <nuxt-link
          active-class="subCatalog__link-active"
          class="subCatalog__link"
          to="/asd"
        >
          <span>Лето</span>
        </nuxt-link>
      </div>

      <!-- SETS -->
      <div class="sets">
        <div class="sets__body">
          <div class="sets__list">
            <nuxt-link class="set__link" to="/catalog/set">
              <div class="set__img">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
            </nuxt-link>
            <nuxt-link class="set__link" to="/catalog/set">
              <div class="set__img">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
            </nuxt-link>
            <nuxt-link class="set__link" to="/catalog/set">
              <div class="set__img">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
            </nuxt-link>
            <nuxt-link class="set__link" to="/catalog/set">
              <div class="set__img">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
            </nuxt-link>
            <nuxt-link class="set__link" to="/">
              <div class="set__img">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
            </nuxt-link>
            <nuxt-link class="set__link" to="/">
              <div class="set__img">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
            </nuxt-link>
            <nuxt-link class="set__link" to="/">
              <div class="set__img">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
            </nuxt-link>
            <nuxt-link class="set__link" to="/">
              <div class="set__img">
                <img src="/img/catalog/img.jpg" class="img" alt="" />
              </div>
            </nuxt-link>
          </div>
          <nuxt-link class="more__button" to="/">
            <span>Просмотреть еще</span>
          </nuxt-link>
        </div>
      </div>

      <!-- advert -->
      <Advert />
    </div>
  </div>
</template>

<script>
export default {
  layout: "catalog",
};
</script>