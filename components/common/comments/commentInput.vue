<template>
  <div class="comment-input">
    <slot name="activator" :activator="showBackdropHandle">
      <div class="comment-input__fake-input" @click="showBackdropHandle()">Добавить комментарий</div>
    </slot>
    <div class="comment-input__backdrop" v-if="showBackdrop">

    </div>
  </div>
</template>

<script>
export default {
  name: "commentInput",
  data: () => ({
    showBackdrop: false,
  }),
  methods: {
    showBackdropHandle() {
      this.showBackdrop = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-input {

  &__fake-input {
    height: 30px;
    line-height: 30px;
    font-size: var(--font-size-mini);
    color: var(--text-color-extra);
    margin: 0 15px 15px;
    padding: 0 15px;
    border: 1px solid var(--text-color-extra);
    border-radius: 30px;
    background: var(--background-color-primary);
  }

  &__backdrop {
    position: fixed;
    top: 50%;
    left: 50%;
  }

}
</style>
