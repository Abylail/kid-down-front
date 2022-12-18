<template>
  <span
    class="mdi"
    :class="[iconName]"
    :style="[{fontSize: `${size}px`}]"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: "BaseIcon",
  props: {
    size: {
      type: String,
      default: "24"
    }
  },
  computed: {
    // Название иконки
    iconName() {
      return this.$slots.default?.[0]?.text.trim();
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@mdi/font/css/materialdesignicons.min.css";
</style>
