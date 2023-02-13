<template>
  <div class="cartPG">
    <div class="container">
      <!-- bread crumbs -->
      <div class="crumbs">
        <nuxt-link to="/">
          <span>Главная ></span>
        </nuxt-link>

        <nuxt-link to="/cart">
          <span> Корзина</span>
        </nuxt-link>
      </div>

      <!-- CART  -->
      <div class="empty_cart" v-if="!CART.length">
        <h1>PUSTO</h1>
      </div>

      <div class="cart" v-else>
        <div class="cart__title">
          <h1>Корзина</h1>
        </div>

        <div class="cart__body">
          <!-- BODY ITEM  -->
          <div class="body__item">
            <div class="subtitle">
              <h3>
                После оформления заказа, наш менеджер свяжется с вами, для
                согласования стоимости доставки. Сейчас вы ни за что не платите.
              </h3>
            </div>

            <div class="product__card" v-for="(product, i) in CART" :key="i">
              <div class="product__img">
                <img
                  oncontextmenu="return false;"
                  :src="`/uploads/paintings/resize/${product.img}`"
                />
              </div>

              <div class="product__content">
                <div class="product__title">
                  <h3>
                    {{ product.title }}
                  </h3>
                </div>

                <div class="product__params">
                  <div class="product__size">
                    <span class="params__head">Размер:</span>
                    <span>{{ product.size }} cм</span>
                  </div>

                  <div class="product__number">
                    <span class="params__head">Количество:</span>
                    <span
                      class="quantity__rem"
                      @click="decrementItem(i)"
                    ></span>
                    <span>{{ product.quantity }}</span>
                    <span
                      class="quantity__add"
                      @click="incrementItem(i)"
                    ></span>
                  </div>

                  <div class="product__params-border"></div>

                  <div class="remove__ico" @click="deleteFromCart(i)">
                    <img
                      oncontextmenu="return false;"
                      src="/img/ico/remove.svg"
                    />
                  </div>
                </div>

                <div class="product__price">
                  <span>{{ product.cost }} ман.</span>
                </div>
              </div>
            </div>
          </div>

          <!-- BODY ITEM  -->
          <div class="body__item">
            <ValidationObserver class="form" v-slot="{ invalid }" tag="div">
              <div class="form__title">
                <h2>Оформление заказа</h2>
              </div>

              <!-- form__item 1 -->
              <div class="form__item">
                <span class="item__head"> Вид доставки </span>
                <div class="item__body">
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors }"
                    class="item__input"
                    tag="div"
                  >
                    <div class="input__head">
                      <label for="pickup">
                        <span> Самовывоз </span>
                        <span
                          v-if="deliveryType === 'pickup'"
                          class="circle active"
                        ></span>
                        <span v-else class="circle"></span>
                      </label>
                      <span>{{ errors[0] }}</span>
                    </div>
                    <input
                      class="radio"
                      value="pickup"
                      type="radio"
                      name="typesDelivery"
                      id="pickup"
                      v-model="deliveryType"
                    />
                  </ValidationProvider>

                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors }"
                    class="item__input"
                    tag="div"
                  >
                    <div class="input__head">
                      <label for="delivery">
                        <span>Доставка</span>
                        <span
                          v-if="deliveryType === 'delivery'"
                          class="circle active"
                        ></span>
                        <span v-else class="circle"></span>
                      </label>
                      <span>{{ errors[0] }}</span>
                    </div>
                    <input
                      class="radio"
                      value="delivery"
                      type="radio"
                      name="typesDelivery"
                      id="delivery"
                      v-model="deliveryType"
                    />
                  </ValidationProvider>
                </div>
              </div>

              <!-- form__item 2 -->
              <div class="form__item">
                <span class="item__head"> Способ оплаты </span>
                <div class="item__body">
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors }"
                    class="item__input"
                    tag="div"
                  >
                    <div class="input__head">
                      <label for="cash">
                        <span>Наличными</span>
                        <span
                          v-if="paymentMethod === 'cash'"
                          class="circle active"
                        ></span>
                        <span v-else class="circle"></span>
                      </label>
                      <span>{{ errors[0] }}</span>
                    </div>
                    <input
                      class="radio"
                      value="cash"
                      type="radio"
                      name="paymentMethod"
                      id="cash"
                      v-model="paymentMethod"
                    />
                  </ValidationProvider>

                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors }"
                    class="item__input"
                    tag="div"
                  >
                    <div class="input__head">
                      <label for="onlinePayment">
                        <span>Онлайн оплата</span>
                        <span
                          v-if="paymentMethod === 'onlinePayment'"
                          class="circle active"
                        ></span>
                        <span v-else class="circle"></span>
                      </label>
                      <span>{{ errors[0] }}</span>
                    </div>
                    <input
                      class="radio"
                      value="onlinePayment"
                      type="radio"
                      name="paymentMethod"
                      id="onlinePayment"
                      v-model="paymentMethod"
                    />
                  </ValidationProvider>
                </div>
              </div>

              <!-- form__item 3 -->
              <div class="form__item" v-if="deliveryType === 'delivery'">
                <span class="item__head"> Адрес доставки </span>
                <ValidationProvider
                  rules="required"
                  v-slot="{ errors }"
                  class="item__input"
                  tag="div"
                >
                  <div class="input__head">
                    <label for="city" class="greyLabel">Город</label>
                    <span class="error-message">{{ errors[0] }}</span>
                  </div>
                  <input
                    class="cartInput"
                    type="text"
                    id="city"
                    v-model="сity"
                  />
                </ValidationProvider>

                <ValidationProvider
                  rules="required"
                  v-slot="{ errors }"
                  class="item__input"
                  tag="div"
                >
                  <div class="input__head">
                    <label for="address" class="greyLabel">Адрес</label>
                    <span class="error-message">{{ errors[0] }}</span>
                  </div>
                  <input
                    class="cartInput"
                    type="text"
                    id="address"
                    v-model="address"
                  />
                </ValidationProvider>
              </div>

              <!-- form__item 4 -->
              <div class="form__item">
                <span class="item__head"> Ваши контакты </span>
                <ValidationProvider
                  rules="required"
                  v-slot="{ errors }"
                  class="item__input"
                  tag="div"
                >
                  <div class="input__head">
                    <label for="name" class="greyLabel">Фамилия, имя</label>
                    <span class="error-message">{{ errors[0] }}</span>
                  </div>
                  <input
                    class="cartInput"
                    type="text"
                    id="name"
                    v-model="name"
                  />
                </ValidationProvider>

                <ValidationProvider
                  rules="required"
                  v-slot="{ errors }"
                  class="item__input"
                  tag="div"
                >
                  <div class="input__head">
                    <label for="phone" class="greyLabel">Номер телефона</label>
                    <span class="error-message">{{ errors[0] }}</span>
                  </div>
                  <input
                    class="cartInput"
                    v-facade="'+993 6# ##-##-##'"
                    placeholder="+993 62 65-65-65"
                    type="tel"
                    id="phone"
                    v-model="phone"
                  />
                </ValidationProvider>

                <div class="item__input">
                  <div class="input__head">
                    <label for="insta" class="greyLabel">Вы в Instagram</label>
                  </div>
                  <input
                    class="cartInput"
                    type="text"
                    id="insta"
                    placeholder="@home_decor_tm"
                    v-model="insta"
                  />
                </div>

                <ValidationProvider
                  rules="required"
                  v-slot="{ errors }"
                  class="item__input"
                  tag="div"
                  v-if="paymentMethod === 'onlinePayment'"
                >
                  <div class="input__head">
                    <label for="email" class="greyLabel">
                      E-mail (вышлем подтверждение заказа)
                    </label>
                    <span class="error-message">{{ errors[0] }}</span>
                  </div>
                  <input
                    class="cartInput"
                    type="email"
                    id="email"
                    v-model="email"
                  />
                </ValidationProvider>

                <div v-else class="item__input">
                  <div class="input__head">
                    <label for="email" class="greyLabel">
                      E-mail (вышлем подтверждение заказа)
                    </label>
                  </div>
                  <input
                    class="cartInput"
                    type="email"
                    id="email"
                    v-model="email"
                  />
                </div>

                <div class="item__input">
                  <div class="input__head">
                    <label for="comment" class="greyLabel"> Комментарий </label>
                  </div>
                  <textarea id="comment" v-model="comments"></textarea>
                </div>
              </div>

              <div class="totalCost">
                <span>Итого:</span>
                <span> {{ cartTotalCost }} ман.</span>
              </div>

              <button
                v-if="paymentMethod === 'onlinePayment'"
                class="sendOrder"
                :disabled="invalid"
                @click="
                  newOrder(),
                    allDeleteFromCart(),
                    emailToManagerSend(),
                    emailToClientSend()
                "
              >
                Оформить заказ
              </button>

              <button
                v-else
                class="sendOrder"
                :disabled="invalid"
                @click="newOrder(), allDeleteFromCart(), emailToManagerSend()"
              >
                Оформить заказ
              </button>

              <!-- <button
                class="sendOrder"
                :disabled="invalid"
                @click="emailToManagerSend()"
              >
                Оформить заказ
              </button> -->
            </ValidationObserver>
            <MyAccordion />
          </div>
        </div>
        <Advert />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  layout: "catalog",

  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data: () => ({
    deliveryType: "delivery",
    paymentMethod: "cash",
    сity: "",
    address: "",
    name: "",
    phone: "",
    insta: "",
    email: "",
    comments: "",
    totalCost: 0,
    status: "В ожидании",
  }),

  computed: {
    ...mapGetters(["CART"]),

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

  methods: {
    ...mapActions([
      "DELETE_FROM_CART",
      "DECREMENT_CART_ITEM",
      "INCREMENT_CART_ITEM",
      "ALL_DELETE_FROM_CART",
    ]),

    newOrder() {
      let formData = new FormData();
      formData.append("CART", JSON.stringify(this.CART));
      formData.append("totalCost", this.totalCost);
      formData.append("deliveryType", this.deliveryType);
      formData.append("paymentMethod", this.paymentMethod);
      formData.append("сity", this.сity);
      formData.append("address", this.address);
      formData.append("name", this.name);
      formData.append("phone", this.phone);
      formData.append("insta", this.insta);
      formData.append("email", this.email);
      formData.append("comments", this.comments);
      axios
        .post(`/api/orders`, formData)
        .then((response) => {
          this.postLoader = false;
          setTimeout(() => {
            this.$router.push("/");
          }, 500),
            this.$toast.success("Заказ принят 👍🏼", { duration: 6000 });
        })
        .catch((err) =>
          this.$toast.error(err.response.data.message, { duration: 5000 })
        );
    },

    emailToManagerSend() {
      let formData = {
        CART: JSON.stringify(this.CART),
        totalCost: this.totalCost,
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
      };
      this.$axios
        .post(`/api/emailToManager`, formData)
        .then((response) => {})
        .catch((err) =>
          this.$toast.error(err.response.data.message, { duration: 5000 })
        );
    },

    emailToClientSend() {
      let formData = {
        CART: JSON.stringify(this.CART),
        totalCost: this.totalCost,
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
      };
      this.$axios
        .post(`/api/emailToClient`, formData)
        .then((response) => {})
        .catch((err) =>
          this.$toast.error(err.response.data.message, { duration: 5000 })
        );
    },

    decrementItem(i) {
      this.DECREMENT_CART_ITEM(i);
    },

    incrementItem(i) {
      this.INCREMENT_CART_ITEM(i);
    },

    deleteFromCart(i) {
      this.DELETE_FROM_CART(i);
    },

    allDeleteFromCart() {
      setTimeout(() => {
        this.ALL_DELETE_FROM_CART();
      }, 550);
    },
  },
};
</script>