<template>
  <div class="base-input">
    <div v-if="title" class="base-input__title" :class="{active: titleTop}" @click="$focus()">{{ title }}</div>
    <input
      class="base-input__input"
      :class="[{'base-input__input--background': background}, {'base-input__input--no-border': noBorder}]"
      :value="value"
      :type="type"
      :placeholder="placeholder"
      ref="input"
      @input="inputHandle($event.target.value)"
      @focus="active = true"
      @blur="active = false"
    />
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    value: {
      type: [String, Number],
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
    background: { // Заполнить зфон
      type: Boolean,
      default: false
    },
    noBorder: { // Скрыть border
      type: Boolean,
      default: false
    },
  },
  data: () => ({
    // Инпут активен
    active: false,
  }),
  computed: {
    // Тайтл вверх
    titleTop() {
      return !!this.value || this.active;
    },
  },
  methods: {
    // Ввод
    inputHandle(val) {
      this.$emit("input", val);
    },

    // Сфокусироваться на инпуте
    $focus() {
      this.$refs.input.focus();
    }
  }
}
</script>

<style lang="scss" scoped>
$side-space: 8px;
$top-space: 18px;
.base-input {
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
    padding: $top-space $side-space 4px;
    border-radius: 5px;
    height: 21px;
    line-height: 21px;
    z-index: 1;

    &--no-border {
      border: none;
    }
    &--background {
      background: var(--background-color-secondary);
    }
  }

}
</style>
