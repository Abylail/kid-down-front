<template>
  <fade>
    <div class="base-modal-wrapper" v-if="active" @click.self="closeHandle">

      <div class="base-modal-wrapper__window">
        <base-icon class="base-modal-wrapper__close" v-if="closeButton" size="20" @click.self="closeHandle">mdi-close</base-icon>
        <div class="base-modal-wrapper__title" v-if="title">{{ title }}</div>

        <slot/>
      </div>

    </div>
  </fade>
</template>

<script>
import fade from "@/components/transitions/fade";
import BaseIcon from "@/components/base/BaseIcon";
export default {
  name: "BaseModalWrapper",
  components: {BaseIcon, fade},
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: null
    },
    closeButton: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    active: false,
  }),
  methods: {
    // Открыть себя
    _open() {
      this.active = true;
      this.$nextTick(() => this.$emit("onShow"));
    },

    // Закрыть себя
    _close() {
      this.active = false;
      this.$emit("onHide");
    },

    // Закрыть себя (кнопка)
    closeHandle() {
      this.$modal.hide(this.name);
    },

    // Инициализация сервиса
    initModalService() {
      this.$modal.$event.$on("show", (name, payload) => {
        if (this.name === name) {
          this._open(payload);
        }
      });
      this.$modal.$event.$on("hide", name => {
        if (this.name === name) {
          this._close();
        }
      });
    }
  },
  beforeMount() {
    this.initModalService();
  },
  mounted() {
    if (this.$modal.$active === this.name) {
      this._open(this.$modal.$payload);
    }
  }
}
</script>

<style lang="scss" scoped>
.base-modal-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(3px);

  &__window {
    $padding: 12px;
    position: relative;
    border-radius: 5px;
    background: white;
    padding: $padding;
    max-height: 90vh;
    min-height: 100px;
    width: calc(95% - 2*#{$padding});
    background: rgba(56, 51, 51, 0.9);
    backdrop-filter: blur(3px);
    color: var(--text-color-primary);
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  &__title {
    line-height: 20px;
  }
}
</style>
