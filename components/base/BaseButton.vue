<template>
  <button
    class="base-button"
    :class="[`base-button--type-${type}`, `base-button--size-${size}`, {'base-button--loading': loading}, {'base-button--min-content': minContent}]"
    @click="$emit('click', $event)"
  >
    <slot v-if="!loading"/>
    <base-loader v-else type="lineDots" :color-reverse="reverseColorLoader"/>
  </button>
</template>

<script>
import BaseLoader from "@/components/base/BaseLoader";
export default {
  name: "BaseButton",
  components: {BaseLoader},
  props: {
    type: {
      type: String,
      default: "default",
      validator: t => ["primary", "default"].includes(t),
    },
    loading: {
      type: Boolean,
      default: false
    },
    minContent: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "medium",
      validator: s => ["medium", "mini"].includes(s),
    }
  },
  computed: {
    // Реверсивный лоудер
    reverseColorLoader() {
      return ["default"].includes(this.type);
    }
  },
}
</script>

<style lang="scss" scoped>
.base-button {
  width: 100%;
  text-align: center;
  border-radius: 100px;
  transition: .1s;
  border: none;
  &:active {opacity: .7}

  // TYPES
  &--type-default {
    background: transparent;
    color: var(--text-color-primary);
    border: 1px solid var(--text-color-primary);
    &:active {background: rgba(255, 255, 255, .3)}
  }

  &--type-primary {
    background: var(--color-reverse);
    color: var(--text-color-reverse);
  }

  // SIZES
  &--size-medium {
    padding: 4px 16px;
    line-height: 24px;
    font-size: var(--font-size-text);
    min-height: 32px;
  }
  &--size-mini {
    padding: 2px 8px;
    line-height: 20px;
    min-height: 24px;
    font-size: var(--font-size-mini);
  }

  // OPTIONS
  &--min-content {
    width: min-content;
  }
}
</style>
