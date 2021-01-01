/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 全局商品类型
 * @Date: 2020-10-07 11:23:12
 * @LastEditTime: 2021-01-01 22:26:41
 */
import { getAllArtNav } from "@/api/navigation";
const state = {
  articleList: [],
  cate1: [
    {
      text: "首页",
      value: 1,
    },
    {
      text: "课件",
      value: 2,
    },
  ],
  // 二级栏目
  cate2: [],

  status: [
    {
      text: "未提交",
      value: 0,
    },
    {
      text: "审核中",
      value: 1,
    },
    {
      text: "审核通过",
      value: 2,
    },
    {
      text: "已发布",
      value: 3,
    },
    {
      text: "已退回",
      value: 4,
    },
    {
      text: "已下架",
      value: 5,
    },
  ],
};
const getters = {
  articleList: (state) => state.articleList,
};
const mutations = {
  ChangeArticleList(state, data) {
    state.articleList = data;
  },
  ChangeCate2(state, data) {
    state.cate2 = data;
  },
};
const actions = {
  async getAllArtNav({ commit }) {
    const {
      data: { navs },
    } = await getAllArtNav(this.queryForm);

    const data = navs.map((item) => ({ text: item.title, value: item.id }));
    commit("ChangeCate2", data);
  },
};
export default { state, getters, mutations, actions };
