<template>
  <div class="orders">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="orders" :orders="orders" />

    <!-- ============  admin content ============ -->
    <div class="admin__content">
      <div class="content__body">
        <div class="content__body-head">
          <span class="w5">№</span>
          <span class="w20">Имя клиента</span>
          <span class="w20">Номер телефона</span>
          <span class="w15">Дата</span>
          <span class="w20">Состояние заказа</span>
          <span class="w20"></span>
        </div>

        <div
          class="content__item"
          v-for="(order, index) in orders"
          :key="order._id"
        >
          <span class="w5">{{ index + 1 }}</span>
          <span class="w20">{{ order.name }}</span>
          <span class="w20">{{ order.phone }}</span>
          <span class="w15">
            {{ $dateFns.format(order.createdDate, "dd.MM.yyyy") }}
            <b>{{ $dateFns.format(order.createdDate, "hh:mm") }}</b>
          </span>
          <span class="w20 orderStatus">
            <span
              v-if="order.status === 'В ожидании'"
              style="background-color: orange"
            ></span>
            <span
              v-else-if="order.status === 'В работе'"
              style="background-color: purple"
            ></span>
            <span
              v-else-if="order.status === 'Готов'"
              style="background-color: #28ae5e"
            ></span>
            <span
              v-else-if="order.status === 'Отказано'"
              style="background-color: #f04f30"
            ></span>
            {{ order.status }}
          </span>
          <div class="content__item-btn w20">
            <nuxt-link :to="`/admin-panel/${order._id}`">
              <img src="/img/admin/edit.svg" />
            </nuxt-link>
            <!-- <img
              src="/img/admin/delete.svg"
              @click="paintingsDelete(painting._id), reloadPage()"
            /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  layout: "admin",

  async asyncData({ $axios, error }) {
    try {
      const orders = await $axios.$get(`/api/orders`);

      return { orders };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },
};
</script>