<template>
  <div
    class="myMultiselect"
    @click="focused = !focused"
    @blur="focused = false"
    tabindex="-1"
    ref="parent"
  >
    <div
      class="myMultiselect__selected"
      v-for="(option, index) in formatedOptions"
      :key="option._id"
      v-show="option.checked"
    >
      <span class="myMultiselect__selected-txt">
        {{ option[displayProperty] }}
      </span>

      <span
        class="myMultiselect__remove"
        @click="
          preventClose($event);
          handleOptionClick(index);
        "
      >
        &times;
      </span>
    </div>

    <div class="myMultiselect__selected-placeholder" v-if="vmodel.length === 0">
      {{ placeholder }}
    </div>

    <div
      class="myMultiselect__options"
      v-show="focused"
      :style="{ top: optionsTop }"
      @click="preventClose"
    >
      <div
        class="myMultiselect__option"
        :class="{ 'myMultiselect__option--checked': option.checked }"
        v-for="(option, index) in formatedOptions"
        :key="option._id"
        @click="handleOptionClick(index)"
      >
        <div class="myMultiselect__check"></div>
        <div class="myMultiselect__txt">
          {{ option[displayProperty] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    focused: false,
    optionsTop: "45px",
  }),

  computed: {
    formatedOptions() {
      let fo = this.options.map((option) => {
        let checked = this.value.some((v) => v === option[this.valueProperty]);
        return { ...option, checked };
      });

      return fo;
    },
  },

  methods: {
    fixTop() {
      this.optionsTop = this.$refs.parent.clientHeight + 5 + "px";
    },

    preventClose(e) {
      e.stopPropagation();
    },

    handleOptionClick(index) {
      let clickedValue = this.options[index][this.valueProperty];
      let newValue = [...this.value];

      let existIndex = this.value.findIndex((v) => v === clickedValue);

      if (existIndex === -1) {
        newValue.push(clickedValue);
      } else {
        newValue.splice(existIndex, 1);
      }

      this.$emit("input", newValue);
      setTimeout(this.fixTop, 100);
    },
  },

  mounted() {
    this.fixTop();
  },

  props: {
    vmodel: {
      type: Array,
      default: () => [],
    },

    options: {
      type: Array,
      default: () => [],
    },

    value: {
      default: () => [],
    },

    placeholder: {
      type: String,
      default: "Click",
    },

    displayProperty: {
      type: String,
      default: "name",
    },

    valueProperty: {
      type: String,
      default: "value",
    },
  },
};
</script>