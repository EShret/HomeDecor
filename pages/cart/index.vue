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
      <div class="empty_cart" v-if="CART.length === 0">
        <h1>PUSTO</h1>
      </div>

      <div class="cart" v-else>
        <div class="cart__title">
          <h1>Корзина</h1>
        </div>
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
                v-if="CART[i].length === 2"
                :src="`/uploads/paintings/${
                  CART[i][0] != null ? CART[i][0].coverImageName.filename : ''
                }`"
              />
              <img
                v-else
                :src="`/uploads/frames/${CART[i].coverImageName.filename}`"
              />
            </div>

            <div class="product__content">
              <div class="product__title">
                <h3 v-if="CART[i].length === 2">
                  {{ CART[i][0].title }}
                </h3>
                <h3 v-else>
                  {{ CART[i].frameName }}
                </h3>
              </div>

              <div class="product__params">
                <div class="product__size" v-if="CART[i].length === 2">
                  <span class="params__head">Размер:</span>
                  <span>{{ CART[i][1].prSize }} cм</span>
                </div>

                <div class="product__size" v-else>
                  <span class="params__head">Размер:</span>
                  <span>{{ CART[i].frameSize }} cм</span>
                </div>

                <div class="product__number" v-if="CART[i].length === 2">
                  <span class="params__head">Количество:</span>
                  <span class="quantity__add"></span>
                  <span>{{ CART[i][0].quantity }}</span>
                  <span class="quantity__rem"></span>
                </div>

                <div class="product__number" v-else>
                  <span class="params__head">Количество:</span>
                  <span class="quantity__add"></span>
                  <span>{{ CART[i].quantity }}</span>
                  <span class="quantity__rem"></span>
                </div>

                <div class="product__params-border"></div>

                <div class="remove__ico" @click="deleteFromCart(i)">
                  <img src="/img/ico/remove.svg" />
                </div>
              </div>

              <div class="product__price" v-if="CART[i].length === 2">
                <span>{{ CART[i][1].pricePost }} ман.</span>
              </div>

              <div class="product__price" v-else>
                <span>{{ CART[i].frameСost }} ман.</span>
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
                  v-model="model1"
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
                  v-model="model2"
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
                  v-model="model3"
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
                  type="tel"
                  id="phone"
                  v-model="model4"
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
                  v-model="model5"
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
                  v-model="model5"
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
                  v-model="model5"
                />
              </div>

              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                class="item__input"
                tag="div"
              >
                <div class="input__head">
                  <label for="comment" class="greyLabel"> Комментарий </label>
                  <span class="error-message">{{ errors[0] }}</span>
                </div>
                <textarea id="comment" v-model="model5"></textarea>
              </ValidationProvider>
            </div>

            <div class="totalCost">
              <span>Итого:</span>
              <span> {{ cartTotalCost }} ман.</span>
            </div>

            <button class="sendOrder" :disabled="invalid">
              Оформить заказ
            </button>
          </ValidationObserver>
          <MyAccordion />
        </div>
      </div>
      <Advert />
    </div>
  </div>
</template>

<script>
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
    model4: "",
  }),

  computed: {
    ...mapGetters(["CART"]),

    cartTotalCost() {
      let result = [];

      if (this.CART.length) {
        for (let item of this.CART) {
          result.push(item.frameСost * item.quantity);
        }

        result = result.reduce(function (sum, el) {
          return sum + el;
        });

        return result;
      } else {
        return 0;
      }
    },
  },

  methods: {
    ...mapActions(["DELETE_FROM_CART"]),

    deleteFromCart(i) {
      this.DELETE_FROM_CART(i);
    },
  },

  mounted() {
    $.mask.definitions["9"] = "";
    $.mask.definitions["d"] = "[0-9]";
    $("#phone").mask("+993 6ddddddd", {
      autoclear: false,
    });
  },
};
</script>