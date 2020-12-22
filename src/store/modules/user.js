/*
 * @Author: yukang 1172248038@qq.com
 * @Description:修改登录
 * @Date: 2020-09-20 23:31:19
 * @LastEditTime: 2020-12-22 22:41:58
 */
/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description 登录、获取用户信息、退出登录、清除accessToken逻辑，不建议修改
 */

import Vue from "vue";
import { getUserInfo, login, logout } from "@/api/user";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/utils/accessToken";
import { resetRouter } from "@/router";
import { title, tokenName } from "@/config/settings";

const state = {
  accessToken: getAccessToken(),
  username: "",
  avatar: "",
  permissions: [],
  store: [],
  admin_info: {},
};
const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  permissions: (state) => state.permissions,
  store: (state) => state.store,
};
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
    setAccessToken(accessToken);
  },
  setusername(state, username) {
    state.username = username;
  },
  setAdminInfo(state, data) {
    state.admin_info = data;
  },
  setAvatar(state, avatar) {
    state.avatar = avatar;
  },
  setStore(state, store) {
    state.store = store;
  },
  setPermissions(state, permissions) {
    state.permissions = permissions;
  },
};
const actions = {
  setPermissions({ commit }, permissions) {
    commit("setPermissions", permissions);
  },
  async login({ commit }, userInfo) {
    const { data, msg } = await login(userInfo);
    const accessToken = data[tokenName];
    if (accessToken) {
      commit("setAccessToken", accessToken);
      const hour = new Date().getHours();
      const thisTime =
        hour < 8
          ? "早上好"
          : hour <= 11
          ? "上午好"
          : hour <= 13
          ? "中午好"
          : hour < 18
          ? "下午好"
          : "晚上好";
      Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`);
    } else {
      Vue.prototype.$baseMessage(msg, "error");
    }
  },
  async getUserInfo({ commit, state }) {
    const { data } = await getUserInfo(state.accessToken);
    if (!data) {
      Vue.prototype.$baseMessage("验证失败，请重新登录...", "error");
      return false;
    }
    let {
      pri = "admin",
      permissions = pri.split(","),
      name: username,
    } = data.admin_info;
    if (permissions && username && Array.isArray(permissions)) {
      const { logoPath: avatar } = data.store[0];
      commit("setPermissions", permissions);
      commit("setusername", username);
      commit(
        "setAvatar",
        avatar ? avatar : require("@/assets/default-avatar.gif")
      );
      commit("setAdminInfo", data.admin_info);
      commit("setStore", data.store);
      return permissions;
    } else {
      Vue.prototype.$baseMessage("用户信息接口异常", "error");
      return false;
    }
  },
  async logout({ dispatch }) {
    // await logout(state.accessToken);
    await dispatch("resetAccessToken");
    await resetRouter();
  },
  resetAccessToken({ commit }) {
    commit("setPermissions", []);
    commit("setAccessToken", "");
    removeAccessToken();
  },
};
export default { state, getters, mutations, actions };
