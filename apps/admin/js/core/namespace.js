(function () {
  const app = window.DroneAdmin = {
    modules: [],
    pages: {},
    titles: {},
    docs: {},
    actions: {},
    changeActions: {},
    data: {},
    afterRender: {},
    beforeNavigate: [],
    closeHooks: [],
    registerModule(module) {
      this.modules.push(module);
      Object.assign(this.titles, module.titles || {});
      Object.assign(this.docs, module.docs || {});
      Object.assign(this.pages, module.pages || {});
      Object.assign(this.actions, module.actions || {});
      Object.assign(this.changeActions, module.changeActions || {});
      Object.assign(this.afterRender, module.afterRender || {});
      if (module.beforeNavigate) this.beforeNavigate.push(module.beforeNavigate);
      if (module.onClose) this.closeHooks.push(module.onClose);
    }
  };
})();
