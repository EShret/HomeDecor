<template>
  <div class="myAccordion">
    <!-- ACCORDION 1 -->
    <div
      class="accordionHead"
      :class="{ active: active1 }"
      @click="
        (active1 = !active1),
          (active2 = false),
          (active3 = false),
          (active4 = false),
          (active5 = false),
          (active6 = false),
          (active7 = false),
          (active8 = false),
          (active9 = false)
      "
    >
      <span>Что происходит после оформления заказа?</span>
      <span class="arrow"></span>
    </div>
    <transition name="div">
      <div class="accordionBody" v-if="active1">
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          consequuntur qui ratione similique et iusto saepe hic repellat
          assumenda fugiat recusandae iste quam, delectus cum voluptatem cumque
          perspiciatis deserunt molestias? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eveniet consequuntur qui ratione
          similique et iusto saepe hic repellat assumenda fugiat recusandae iste
          quam, delectus cum voluptatem cumque perspiciatis deserunt molestias?
        </span>
      </div>
    </transition>

    <!-- ACCORDION 2 -->
    <div
      class="accordionHead"
      :class="{ active: active2 }"
      @click="
        (active2 = !active2),
          (active1 = false),
          (active3 = false),
          (active4 = false),
          (active5 = false),
          (active6 = false),
          (active7 = false),
          (active8 = false),
          (active9 = false)
      "
    >
      <span>Время работы</span>
      <span class="arrow"></span>
    </div>
    <transition name="div">
      <div class="accordionBody" v-if="active2">
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          consequuntur qui ratione similique et iusto saepe hic repellat
          assumenda fugiat recusandae iste quam, delectus cum voluptatem cumque
          perspiciatis deserunt molestias? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eveniet consequuntur qui ratione
          similique et iusto saepe hic repellat assumenda fugiat recusandae iste
          quam, delectus cum voluptatem cumque perspiciatis deserunt molestias?
        </span>
      </div>
    </transition>

    <!-- ACCORDION 3 -->
    <div
      class="accordionHead"
      :class="{ active: active3 }"
      @click="
        (active3 = !active3),
          (active2 = false),
          (active1 = false),
          (active4 = false),
          (active5 = false),
          (active6 = false),
          (active7 = false),
          (active8 = false),
          (active9 = false)
      "
    >
      <span>Как происходит оплата</span>
      <span class="arrow"></span>
    </div>
    <transition name="div">
      <div class="accordionBody" v-if="active3">
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          consequuntur qui ratione similique et iusto saepe hic repellat
          assumenda fugiat recusandae iste quam, delectus cum voluptatem cumque
          perspiciatis deserunt molestias? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eveniet consequuntur qui ratione
          similique et iusto saepe hic repellat assumenda fugiat recusandae iste
          quam, delectus cum voluptatem cumque perspiciatis deserunt molestias?
        </span>
      </div>
    </transition>

    <!-- ACCORDION 4 -->
    <div
      class="accordionHead"
      :class="{ active: active4 }"
      @click="
        (active4 = !active4),
          (active2 = false),
          (active3 = false),
          (active1 = false),
          (active5 = false),
          (active6 = false),
          (active7 = false),
          (active8 = false),
          (active9 = false)
      "
    >
      <span>Доставка</span>
      <span class="arrow"></span>
    </div>
    <transition name="div">
      <div class="accordionBody" v-if="active4">
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          consequuntur qui ratione similique et iusto saepe hic repellat
          assumenda fugiat recusandae iste quam, delectus cum voluptatem cumque
          perspiciatis deserunt molestias? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eveniet consequuntur qui ratione
          similique et iusto saepe hic repellat assumenda fugiat recusandae iste
          quam, delectus cum voluptatem cumque perspiciatis deserunt molestias?
        </span>
      </div>
    </transition>

    <!-- ACCORDION 5 -->
    <div
      class="accordionHead"
      :class="{ active: active5 }"
      @click="
        (active5 = !active5),
          (active2 = false),
          (active3 = false),
          (active4 = false),
          (active1 = false),
          (active6 = false),
          (active7 = false),
          (active8 = false),
          (active9 = false)
      "
    >
      <span>Сроки</span>
      <span class="arrow"></span>
    </div>
    <transition name="div">
      <div class="accordionBody" v-if="active5">
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          consequuntur qui ratione similique et iusto saepe hic repellat
          assumenda fugiat recusandae iste quam, delectus cum voluptatem cumque
          perspiciatis deserunt molestias? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eveniet consequuntur qui ratione
          similique et iusto saepe hic repellat assumenda fugiat recusandae iste
          quam, delectus cum voluptatem cumque perspiciatis deserunt molestias?
        </span>
      </div>
    </transition>

    <!-- ACCORDION 6 -->
    <div
      class="accordionHead"
      :class="{ active: active6 }"
      @click="
        (active6 = !active6),
          (active2 = false),
          (active3 = false),
          (active4 = false),
          (active5 = false),
          (active1 = false),
          (active7 = false),
          (active8 = false),
          (active9 = false)
      "
    >
      <span>Упаковка</span>
      <span class="arrow"></span>
    </div>
    <transition name="div">
      <div class="accordionBody" v-if="active6">
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          consequuntur qui ratione similique et iusto saepe hic repellat
          assumenda fugiat recusandae iste quam, delectus cum voluptatem cumque
          perspiciatis deserunt molestias? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eveniet consequuntur qui ratione
          similique et iusto saepe hic repellat assumenda fugiat recusandae iste
          quam, delectus cum voluptatem cumque perspiciatis deserunt molestias?
        </span>
      </div>
    </transition>

    <!-- ACCORDION 7 -->
    <div
      class="accordionHead"
      :class="{ active: active7 }"
      @click="
        (active7 = !active7),
          (active2 = false),
          (active3 = false),
          (active4 = false),
          (active5 = false),
          (active6 = false),
          (active1 = false),
          (active8 = false),
          (active9 = false)
      "
    >
      <span>На какой бумаге печать</span>
      <span class="arrow"></span>
    </div>
    <transition name="div">
      <div class="accordionBody" v-if="active7">
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          consequuntur qui ratione similique et iusto saepe hic repellat
          assumenda fugiat recusandae iste quam, delectus cum voluptatem cumque
          perspiciatis deserunt molestias? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eveniet consequuntur qui ratione
          similique et iusto saepe hic repellat assumenda fugiat recusandae iste
          quam, delectus cum voluptatem cumque perspiciatis deserunt molestias?
        </span>
      </div>
    </transition>

    <!-- ACCORDION 8 -->
    <div
      class="accordionHead"
      :class="{ active: active8 }"
      @click="
        (active8 = !active8),
          (active2 = false),
          (active3 = false),
          (active4 = false),
          (active5 = false),
          (active6 = false),
          (active7 = false),
          (active1 = false),
          (active9 = false)
      "
    >
      <span>Какие рамы мы продаем</span>
      <span class="arrow"></span>
    </div>
    <transition name="div">
      <div class="accordionBody" v-if="active8">
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          consequuntur qui ratione similique et iusto saepe hic repellat
          assumenda fugiat recusandae iste quam, delectus cum voluptatem cumque
          perspiciatis deserunt molestias? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eveniet consequuntur qui ratione
          similique et iusto saepe hic repellat assumenda fugiat recusandae iste
          quam, delectus cum voluptatem cumque perspiciatis deserunt molestias?
        </span>
      </div>
    </transition>

    <!-- ACCORDION 9 -->
    <div
      class="accordionHead"
      :class="{ active: active9 }"
      @click="
        (active9 = !active9),
          (active2 = false),
          (active3 = false),
          (active4 = false),
          (active5 = false),
          (active6 = false),
          (active7 = false),
          (active8 = false),
          (active1 = false)
      "
    >
      <span>Паспарту</span>
      <span class="arrow"></span>
    </div>
    <transition name="div">
      <div class="accordionBody" v-if="active9">
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          consequuntur qui ratione similique et iusto saepe hic repellat
          assumenda fugiat recusandae iste quam, delectus cum voluptatem cumque
          perspiciatis deserunt molestias? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eveniet consequuntur qui ratione
          similique et iusto saepe hic repellat assumenda fugiat recusandae iste
          quam, delectus cum voluptatem cumque perspiciatis deserunt molestias?
        </span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    active1: false,
    active2: false,
    active3: false,
    active4: false,
    active5: false,
    active6: false,
    active7: false,
    active8: false,
    active9: false,
  }),

  mounted() {},
};
</script>

<style>
.accordionBody {
  height: 180px;
  overflow-y: auto;
}
.div-enter-active,
.div-leave-active {
  transition: all 0.5s;
}
.div-enter,
.div-leave-to {
  height: 0px;
}
</style>