<template>
  <div class="ordersEditAdmin">
    <!-- ============  Admin-head component ============ -->
    <Admin-head action="ordersEdit" :orders="allOrders" />

    <!-- ============  admin content ============ -->
    <div class="admin__content">
      <div class="content__body">
        <!-- ==================
             orderSetsList
        =================== -->
        <div class="orderSetsList">
          <div
            class="orderSet"
            v-for="(order, i) in orders.CART"
            :key="order._id"
          >
            <div class="product__img">
              <img :src="`/uploads/paintings/resize/${order.img}`" />
            </div>

            <div class="product__content">
              <div class="product__title">
                <h3>
                  {{ order.title }}
                </h3>
              </div>

              <div class="product__params">
                <div class="product__size">
                  <span class="params__head">Размер:</span>
                  <span>{{ order.size }} cм</span>
                </div>

                <div class="product__number">
                  <span class="params__head">Количество:</span>
                  <span class="quantity__rem" @click="decrementItem(i)"></span>
                  <span>{{ order.quantity }}</span>
                  <span class="quantity__add" @click="incrementItem(i)"></span>
                </div>

                <div class="product__params-border"></div>

                <div class="remove__ico" @click="remove(i)">
                  <img src="/img/ico/remove.svg" />
                </div>
              </div>

              <div class="product__price">
                <span>{{ order.cost }} ман.</span>
              </div>
            </div>
          </div>
          <div class="emptyFrame"></div>
        </div>

        <!-- ==================
                FORM
        =================== -->
        <div class="form">
          <ValidationObserver class="form__body" v-slot="{ invalid }" tag="div">
            <!-- row -->
            <div class="form__row">
              <div class="form__item w70">
                <span> Дата и время заказа </span>
                <span>
                  {{ $dateFns.format(orders.createdDate, "dd.MM.yyyy") }}
                  <b>{{ $dateFns.format(orders.createdDate, "hh:mm") }}</b>
                </span>
              </div>
            </div>

            <!-- row -->
            <div class="form__row">
              <div class="form__row-body w70">
                <div class="form__item painAndSize w45">
                  <span>Выбор Картины</span>
                  <select v-model="paintingsAddCart">
                    <option value="0" selected>Выбор Картины...</option>
                    <option
                      :value="painting"
                      v-for="painting in paintings"
                      :key="painting._id"
                    >
                      {{ painting.title }}
                    </option>
                  </select>
                </div>

                <div class="form__item painAndSize w45">
                  <span>Выбор Размера</span>
                  <select v-model="paintingsSizeAddCart">
                    <option value="0" selected>Выбор Размера...</option>
                    <option
                      :value="printSize"
                      v-for="printSize in printSize"
                      :key="printSize._id"
                    >
                      {{ printSize.prSize }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- row -->
            <div
              class="form__row"
              v-if="paintingsAddCart != 0 && paintingsSizeAddCart != 0"
              @click="paintingsFromCart()"
            >
              <div class="buttonAddToCart w70">
                <button class="w90">Добавить Картину в список заказа</button>
              </div>
            </div>

            <!-- row -->
            <div class="form__row">
              <div class="form__item w70">
                <span>Выбор Рамы</span>
                <select v-model="framesAddCart">
                  <option value="0" selected>Выбор Рамы...</option>
                  <option
                    :value="frame"
                    v-for="frame in frames"
                    :key="frame._id"
                  >
                    {{ frame.frameName }} ({{ frame.frameSize }} см.)
                  </option>
                </select>
              </div>
            </div>

            <!-- row -->
            <div
              class="form__row"
              v-if="framesAddCart != 0"
              @click="framesFromCart()"
            >
              <div class="buttonAddToCart w70">
                <button class="w90">Добавить Раму в список заказа</button>
              </div>
            </div>

            <!-- row -->
            <div class="form__row name">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w100"
                tag="div"
              >
                <label>Фамилия, имя </label>
                <input class="inptTxt" type="text" v-model="name" />
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <!-- row -->
            <div class="form__row">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w70"
                tag="div"
              >
                <label>Номер телефона </label>
                <input
                  class="inptTxt"
                  type="tel"
                  v-facade="'+993 6# ##-##-##'"
                  v-model="phone"
                />
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <!-- row -->
            <div class="form__row">
              <div class="input w20">
                <label for="pickup">Самовывоз</label>
                <input
                  class="radio"
                  value="pickup"
                  type="radio"
                  name="typesDelivery"
                  id="pickup"
                  v-model="deliveryType"
                />
              </div>

              <div class="input w20">
                <label for="delivery">Доставка</label>
                <input
                  class="radio"
                  value="delivery"
                  type="radio"
                  name="typesDelivery"
                  id="delivery"
                  v-model="deliveryType"
                />
              </div>
            </div>

            <div class="form__row">
              <div class="input w20">
                <label for="cash">Наличными</label>
                <input
                  class="radio"
                  value="cash"
                  type="radio"
                  name="paymentMethod"
                  id="cash"
                  v-model="paymentMethod"
                />
              </div>

              <div class="input w70">
                <label for="onlinePayment">Онлайн оплата</label>
                <input
                  class="radio"
                  value="onlinePayment"
                  type="radio"
                  name="paymentMethod"
                  id="onlinePayment"
                  v-model="paymentMethod"
                />
              </div>
            </div>

            <!-- row -->
            <div class="form__row" v-if="deliveryType === 'delivery'">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w70"
                tag="div"
              >
                <label> Город </label>
                <input class="inptTxt" type="text" v-model="сity" />
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <!-- row -->
            <div class="form__row" v-if="deliveryType === 'delivery'">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w70"
                tag="div"
              >
                <label> Адрес </label>
                <input class="inptTxt" type="text" v-model="address" />
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <!-- row -->
            <div class="form__row" v-if="paymentMethod === 'onlinePayment'">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="form__item w70"
                tag="div"
              >
                <label> E-mail </label>
                <input class="inptTxt" type="email" v-model="email" />
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <!-- row -->
            <div class="form__row" v-else>
              <div class="form__item w70">
                <label> E-mail </label>
                <input class="inptTxt" type="email" v-model="email" />
              </div>
            </div>

            <!-- row -->
            <div class="form__row">
              <div class="form__item w70">
                <label> Вы в Instagram </label>
                <input class="inptTxt" type="text" v-model="insta" />
              </div>
            </div>

            <!-- row -->
            <div class="form__row">
              <div class="form__item w70">
                <label> Комментарий </label>
                <textarea class="textareaTxt" v-model="comments"></textarea>
              </div>
            </div>

            <!-- row -->
            <div class="form__row">
              <div class="form__item totalCost w25">
                <span>Итого:</span>
                <span> {{ cartTotalCost }} ман.</span>
              </div>
            </div>

            <!-- row -->
            <div class="form__row">
              <div class="form__item w25">
                <span>Статус заказа</span>
                <select v-model="status">
                  <option value="В ожидании">В ожидании</option>
                  <option value="В работе">В работе</option>
                  <option value="Готов">Готов</option>
                  <option value="Отказано">Отказано</option>
                </select>
              </div>
            </div>

            <!-- BUTTON row -->
            <div class="form__row">
              <button
                v-if="disableButton === false"
                :disabled="invalid"
                class="addLink"
                @click="ordersUpdate((postLoader = true))"
              >
                <span :class="{ loader_active: postLoader }"> Сохранить </span>

                <div class="loader" :class="{ loader_active: postLoader }">
                  <div class="dot_anim"></div>
                </div>
              </button>

              <button v-else disabled class="addLink">Добавить <b>+</b></button>

              <nuxt-link class="cancelBtn" to="/admin-panel">
                Отмена
              </nuxt-link>
            </div>
          </ValidationObserver>
          <div class="emptyBl"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  layout: "admin",

  components: {
    Multiselect,
    ValidationProvider,
    ValidationObserver,
  },

  data: () => ({
    disableButton: false,
    postLoader: false,

    CART: [],
    deliveryType: "delivery",
    paymentMethod: "cash",
    сity: "",
    address: "",
    name: "",
    phone: "",
    insta: "",
    email: "",
    comments: "",
    status: "В ожидании",
    totalCost: 0,

    paintingsAddCart: 0,
    paintingsSizeAddCart: 0,
    framesAddCart: 0,
  }),

  async asyncData({ $axios, params, error }) {
    try {
      const orders = await $axios.get(`/api/orders/${params.id}`);
      const allOrders = await $axios.$get(`/api/orders`);
      const paintings = await $axios.$get(`/api/paintings`);
      const printSize = await $axios.$get(`/api/printSize`);
      const frames = await $axios.$get(`/api/frames`);

      return {
        orders: orders.data,
        paintings,
        printSize,
        frames,
        allOrders,
      };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },

  methods: {
    remove(index) {
      this.CART.splice(index, 1);
    },

    decrementItem(index) {
      if (this.CART[index].quantity > 1) {
        this.CART[index].quantity--;
      }
    },

    incrementItem(index) {
      this.CART[index].quantity++;
    },

    paintingsFromCart() {
      const data = {
        id: this.paintingsAddCart._id,
        title: this.paintingsAddCart.title,
        size: this.paintingsSizeAddCart.prSize,
        cost: this.paintingsSizeAddCart.pricePost,
        img: this.paintingsAddCart.coverImageName.filename,
        quantity: this.paintingsAddCart.quantity,
      };

      this.CART.push(data);
    },

    framesFromCart() {
      const data = {
        id: this.framesAddCart._id,
        title: this.framesAddCart.frameName,
        size: this.framesAddCart.frameSize,
        cost: this.framesAddCart.frameСost,
        img: this.framesAddCart.coverImageName.filename,
        quantity: this.framesAddCart.quantity,
      };

      this.CART.push(data);
    },

    ordersUpdate() {
      let formData = {
        CART: JSON.stringify(this.CART),
        deliveryType: this.deliveryType,
        paymentMethod: this.paymentMethod,
        сity: this.сity,
        address: this.address,
        name: this.name,
        phone: this.phone,
        insta: this.insta,
        email: this.email,
        comments: this.comments,
        status: this.status,
        totalCost: this.totalCost,
      };
      axios
        .patch(`/api/orders/${this.orders._id}`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.$auth.$storage._state["_token.local"],
          },
        })
        .then((response) => {
          this.postLoader = false;
          setTimeout(() => {
            this.$router.push("/admin-panel");
          }, 500),
            this.$toast.success("Заказ обработан 👍🏼", { duration: 5000 });
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message, { duration: 5000 });
        });
    },
  },

  computed: {
    cartTotalCost() {
      let result = [];

      if (this.CART.length) {
        for (let item of this.CART) {
          result.push(item.cost * item.quantity);
        }

        result = result.reduce(function (sum, el) {
          return sum + el;
        });

        this.totalCost = result;

        return result;
      } else {
        return 0;
      }
    },
  },

  mounted() {
    //==============================================
    this.deliveryType = this.orders.deliveryType;
    this.paymentMethod = this.orders.paymentMethod;
    this.сity = this.orders.сity;
    this.address = this.orders.address;
    this.name = this.orders.name;
    this.phone = this.orders.phone;
    this.insta = this.orders.insta;
    this.email = this.orders.email;
    this.comments = this.orders.comments;
    this.CART = this.orders.CART;
    this.totalCost = this.orders.totalCost;
    this.status = this.orders.status;
  },
};
</script>