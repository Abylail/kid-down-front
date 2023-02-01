<template>
  <div class="base-options">
    <div class="base-options__activator"><slot :activate="activate"/></div>
    <div class="base-options__options-wrapper" v-if="showOptions" v-click-outside="closeOptions">
      <div
        class="base-options__option"
        v-for="option in options" :key="option.actionCode"
        @click.prevent.stop="selectOption(option)"
      >{{ option.name }}</div>
    </div>
  </div>
</template>

<script>
import vClickOutside from "vue-click-outside";

export default {
  name: "BaseOptions",
  props: {
    options: {
      type: Array,
      default: () => [] // {name, actionCode}
    }
  },
  data: () => ({
    showOptions: false,
  }),
  methods: {
    // Открыть опции
    activate() {
      this.showOptions = true;
    },

    // Закрыть опции
    closeOptions() {
      this.showOptions = false;
    },

    // Выбрать опцию
    selectOption(option) {
      this.$emit(`click:${option.actionCode}`, option);
      this.closeOptions();
    }
  },
  directives: {
    'click-outside': vClickOutside,
  },
}
</script>

<style lang="scss" scoped>
.base-options {
  position: relative;

  &__activator {
    cursor: pointer;
  }

  &__options-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 5px;
    overflow: hidden;
  }

  &__option {
    background: var(--background-color-secondary);
    padding: 10px 15px;
    cursor: pointer;
    font-size: var(--font-size-subtext);
    &:not(:last-child) {
      border-bottom: 1px solid var(--background-color-extra);
    }
  }

}
</style>
