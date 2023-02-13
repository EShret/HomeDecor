<template>
  <div class="deliveryPaymentPG">
    <div class="container">
      <!-- bread crumbs -->
      <div class="crumbs">
        <nuxt-link to="/">
          <span>Главная ></span>
        </nuxt-link>

        <nuxt-link to="#">
          <span>Доставка и оплата</span>
        </nuxt-link>
      </div>

      <div class="deliveryPaymentPG__body">
        <div class="title" id="prices-payments">
          <h1>Доставка и оплата</h1>
        </div>
        <MyAccordion />
      </div>
      <Advert />
    </div>
  </div>
</template>

<script>
export default {
  layout: "catalog",
};
</script>