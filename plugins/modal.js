import Vue from "vue";

const service = {
  install(_vue) {
    this.event = new Vue();
    const modalService = {
      $active: null,
      $payload: null,
      $event: this.event,
      show: (modalName, payload=null, save=true) => {
        if (modalName === modalService.$active) return;
        if (save && modalService.$active) {
          modalService.hide(modalService.$active, false);
        }
        modalService.$payload = payload;
        service.event.$emit("show", modalName, payload);
        modalService.$active = modalName;
      },
      hide: (modalName) => {
        service.event.$emit("hide", modalName);
        modalService.$active = null;
        modalService.$payload = null;
      },
    }
    _vue.prototype.$modal = modalService;
  }
}

Vue.use(service)
