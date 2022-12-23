<template>
  <div class="base-textarea">
    <div v-if="title" class="base-textarea__title" :class="{active: titleTop}">{{ title }}</div>
    <textarea
      class="base-textarea__input"
      :class="[{'base-textarea__input--background': background}, {'base-textarea__input--no-border': noBorder}]"
      :value="value"
      :placeholder="placeholder"
      :rows="rows"
      ref="input"
      @input="inputHandle($event)"
      @focus="focused"
      @blur="blured"
    />
  </div>
</template>

<script>
export default {
  name: "BaseTextarea",
  props: {
    value: {
      type: String,
    },
    title: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    rows: { // Колличество начальных линий (минимальные для показа)
      type: [String, Number],
      default: "1"
    },
    background: { // Заполнить зфон
      type: Boolean,
      default: false
    },
    noBorder: { // Скрыть border
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    // Инпут активен
    active: false,

    lineHeight: 21,
  }),
  computed: {
    // Тайтл вверх
    titleTop() {
      return !!this.value || this.active;
    },

    // Минимальная высота
    minHeight() {
      return ((parseInt(this.rows) || 1) * this.lineHeight) + 22;
    },
  },
  methods: {
    // Ввод
    inputHandle(event) {
      this.$emit("input", event.target.value);
      this.heightControl();
    },

    // Контроль высоты
    heightControl() {
      if (!this.$refs.input) return;
      this.$refs.input.style.height = "0";
      let inputHeight = this.$refs.input.scrollHeight;
      if (inputHeight < this.minHeight) inputHeight = this.minHeight;
      this.$refs.input.style.height = `${inputHeight - 22}px`;
    },

    // На фокусе
    focused() {
      this.active = true;
      this.$emit("focus");
    },

    blured() {
      this.active = false;
      this.$emit("blur");
    },

    // Сфокусироваться на инпуте
    $focus() {
      this.$refs.input.focus();
    }
  },
  mounted() {
    this.heightControl()
  }
}
</script>

<style lang="scss" scoped>
$side-space: 8px;
$top-space: 18px;
$bottom-space: 4px;
.base-textarea {
  position: relative;
  margin: 15px 0;

  &__title {
    position: absolute;
    font-size: var(--font-size-text);
    color: var(--text-color-secondary);
    transition: .2s;
    top: 13px;
    left: 8px;
    &.active {
      color: var(--text-color-secondary);
      top: 5px !important;
      font-size: var(--font-size-mini) !important;
    }
  }

  &__input {
    font-size: var(--font-size-text);
    background-color: transparent;
    width: calc(100% - 2*#{$side-space + 1});
    border: 1px solid var(--text-color-secondary);
    color: var(--text-color-primary);
    outline: none;
    padding: $top-space $side-space $bottom-space;
    border-radius: 5px;
    height: auto;
    line-height: 21px;
    resize: none;

    &--no-border {
      border: none;
    }
    &--background {
      background: var(--background-color-secondary);
    }
  }

}
</style>
