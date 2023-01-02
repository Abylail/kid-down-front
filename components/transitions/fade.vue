<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <slot />
  </transition>
</template>

<script>
export default {
  name: "fade",
  inheritAttrs: false
};
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .15s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
