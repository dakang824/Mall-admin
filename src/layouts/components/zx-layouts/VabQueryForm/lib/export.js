"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _VabQueryForm = require("zx-layouts/VabQueryForm");

var _VabQueryForm2 = _interopRequireDefault(_VabQueryForm);

var _VabQueryFormTopPanel = require("zx-layouts/VabQueryForm/VabQueryFormTopPanel");

var _VabQueryFormTopPanel2 = _interopRequireDefault(_VabQueryFormTopPanel);

var _VabQueryFormBottomPanel = require("zx-layouts/VabQueryForm/VabQueryFormBottomPanel");

var _VabQueryFormBottomPanel2 = _interopRequireDefault(
  _VabQueryFormBottomPanel
);

var _VabQueryFormLeftPanel = require("zx-layouts/VabQueryForm/VabQueryFormLeftPanel");

var _VabQueryFormLeftPanel2 = _interopRequireDefault(_VabQueryFormLeftPanel);

var _VabQueryFormRightPanel = require("zx-layouts/VabQueryForm/VabQueryFormRightPanel");

var _VabQueryFormRightPanel2 = _interopRequireDefault(_VabQueryFormRightPanel);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  install: function install(Vue) {
    Vue.component("vab-query-form", _VabQueryForm2.default);
    Vue.component("vab-query-form-left-panel", _VabQueryFormLeftPanel2.default);
    Vue.component(
      "vab-query-form-right-panel",
      _VabQueryFormRightPanel2.default
    );
    Vue.component("vab-query-form-top-panel", _VabQueryFormTopPanel2.default);
    Vue.component(
      "vab-query-form-bottom-panel",
      _VabQueryFormBottomPanel2.default
    );
  },
};
