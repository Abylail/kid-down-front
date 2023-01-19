<template>
  <div class="base-backdrop__background" :class="{active: active}" @click.self.stop="closeSelf" @touchmove.prevent.stop>
    <div class="base-backdrop__window" :class="[{'base-backdrop__window--full-page': fullPage}, {active: active}]" ref="dragWrapper" :style="dragStyle">
      <div class="base-backdrop__holder" @touchmove.prevent.stop="dragging" @touchstart.prevent.stop="startDrag" @touchend.prevent.stop="stopDrag"/>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseBackdrop",
  props: {
    active: {
      type: Boolean
    },
    fullPage: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    // Включать ли драг?
    isDragging: false,
    // Стартовая точка для драга
    startYPosition: null,
    // Активная позиция драга
    activeYPosition: null,
    // Последняя позиция драга до активеной
    prevActiveYPosition: null,
  }),
  computed: {
    // Стиль для изменение драга
    dragStyle() {
      if (!this.isDragging) return {};
      return {
        transition: "0s",
        top: `${this.activeYPosition}px`,
        bottom: "auto",
        // transform: translate(0, ${this.activeYPosition - this.startYPosition}px)
      }
    }
  },
  methods: {
    // Закрыться
    closeSelf() {
      this.$emit("update:active", false);
    },

    dragging(event) {
      if (this.isDragging) {
        let touch = event.changedTouches[0];
        // Блочу если уходит вверх
        if (touch.clientY < this.startYPosition) {
          this.activeYPosition = this.startYPosition;
          return
        }
        this.prevActiveYPosition = this.activeYPosition;
        this.activeYPosition = touch.clientY;
      }
    },

    startDrag(event) {
      let touch = event.touches[0];
      const elementYPosition = this.$refs.dragWrapper.getBoundingClientRect()?.y || touch.clientY;
      this.startYPosition = elementYPosition;
      this.activeYPosition = elementYPosition;
      this.prevActiveYPosition = null;
      this.isDragging = true;
    },

    stopDrag() {
      this.isDragging = false;
      if (this.prevActiveYPosition && this.prevActiveYPosition < this.activeYPosition) {
        this.closeSelf();
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.base-backdrop {

  &__background {
    opacity: 0;
    visibility: hidden;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: var(--background-reverse-transparent);
    transition: 0.3s;

    &.active {
      opacity: 1;
      visibility: visible;
    }
  }

  &__window {
    max-height: 600px;
    background: var(--background-color-primary);
    position: fixed;
    z-index: 11;
    //transform: translate(0, 100%);
    opacity: 1;
    bottom: -100%;
    left: 0;
    right: 0;
    padding-bottom: 18px;
    transition: 0.3s;
    border-radius: 16px 16px 0 0;

    // на полную страницу
    &--full-page {
      max-height: none;
      height: 75vh;
    }

    &.active {
      bottom: 0;
    }
  }

  &__holder {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    &:after {
      display: inline-block;
      content: "";
      height: 5px;
      width: 100px;
      background: gray;
      border-radius: 10px;
    }
  }

}
</style>
