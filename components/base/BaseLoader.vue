<template>

  <!-- DEFAULT -->
  <div
    class="base-loader base-loader--default" :class="{colorReverse}"
    :style="[{height: `${size}px`}, {width: `${size}px`}]"
    v-if="type === 'default'"
  />

  <!-- LINE DOTS -->
  <div
    class="base-loader base-loader--line-dots" :class="{colorReverse}"
    v-else-if="type === 'lineDots'"
  ><div></div><div></div><div></div><div></div></div>

</template>

<script>
export default {
  name: "BaseLoader",
  props: {
    size: {
      type: String,
      default: "20"
    },
    type: {
      type: String,
      default: "default",
      validator: t => ["default", "lineDots"].includes(t)
    },
    colorReverse: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.base-loader {
  display: inline-block;

  // DEFAULT
  &--default {
    $border-width: 5px;
    &:after {
      content: " ";
      display: block;
      width: calc(100% - #{$border-width*2});
      height: calc(100% - #{$border-width*2});
      position: relative;
      border-radius: 50%;
      border: $border-width solid;
      border-color: var(--loader-color) transparent var(--loader-color) transparent;
      animation: default-animation 1.2s linear infinite;
    }

    // Смена цвета
    &.colorReverse {
      &:after {
        border-color: var(--loader-color-reverse) transparent var(--loader-color-reverse) transparent;
      }
    }
  }

  // LINE DOTS
  &--line-dots {
    position: relative;
    height: 13px;
    width: 80px !important;
    div {
      position: absolute;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: var(--loader-color);
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
      &:nth-child(1) {
        left: 8px;
        animation: lds-ellipsis1 0.6s infinite;
      }
      &:nth-child(2) {
        left: 8px;
        animation: lds-ellipsis2 0.6s infinite;
      }
      &:nth-child(3) {
        left: 32px;
        animation: lds-ellipsis2 0.6s infinite;
      }
      &:nth-child(4) {
        left: 56px;
        animation: lds-ellipsis3 0.6s infinite;
      }
    }
  }

}

@keyframes default-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
