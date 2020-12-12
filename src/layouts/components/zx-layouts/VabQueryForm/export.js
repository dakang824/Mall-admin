import VabQueryForm from "zx-layouts/VabQueryForm";
import VabQueryFormTopPanel from "zx-layouts/VabQueryForm/VabQueryFormTopPanel";
import VabQueryFormBottomPanel from "zx-layouts/VabQueryForm/VabQueryFormBottomPanel";
import VabQueryFormLeftPanel from "zx-layouts/VabQueryForm/VabQueryFormLeftPanel";
import VabQueryFormRightPanel from "zx-layouts/VabQueryForm/VabQueryFormRightPanel";
export default {
  install(Vue) {
    Vue.component("VabQueryForm", VabQueryForm);
    Vue.component("VabQueryFormLeftPanel", VabQueryFormLeftPanel);
    Vue.component("VabQueryFormRightPanel", VabQueryFormRightPanel);
    Vue.component("VabQueryFormTopPanel", VabQueryFormTopPanel);
    Vue.component("VabQueryFormBottomPanel", VabQueryFormBottomPanel);
  },
};
