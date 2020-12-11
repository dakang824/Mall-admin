/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 全局商品类型
 * @Date: 2020-10-07 11:23:12
 * @LastEditTime: 2020-12-11 20:59:26
 */
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
  cate2: [
    {
      text: "公共",
      value: 1,
    },
    {
      text: "标准",
      value: 2,
    },
    {
      text: "技能树",
      value: 3,
    },
    {
      text: "影像",
      value: 4,
    },
    {
      text: "总结",
      value: 5,
    },
  ],
  cate3: [
    {
      text: "变电",
      value: 1,
    },
    {
      text: "信息",
      value: 2,
    },
    {
      text: "基站",
      value: 3,
    },
    {
      text: "通讯",
      value: 4,
    },
    {
      text: "电缆",
      value: 5,
    },
  ],

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
};
const actions = {};
export default { state, getters, mutations, actions };
