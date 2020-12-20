/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 全局商品类型
 * @Date: 2020-10-07 11:23:12
 * @LastEditTime: 2020-12-20 22:22:10
 */
import { findAllCategory, findSubCategoryByCateId } from "@/api/goods";
import { data } from "autoprefixer";
const state = {
  category: [],
  categoryAll: [],
  subCategory: [],
  goodsType: [
    {
      label: "菜盒",
      value: 1,
    },
    {
      label: "菜品",
      value: 2,
    },
    {
      label: "设备",
      value: 4,
    },
    {
      label: "菜谱",
      value: 8,
    },
  ],
};
const getters = {
  category: (state) => state.category,
};
const mutations = {
  ChangeCategory(state, category) {
    state.category = category;
  },
  ChangeCategoryAll(state, category) {
    state.categoryAll = category;
  },
  ChangeSubCategory(state, category) {
    state.subCategory = category;
  },
};
const actions = {
  async findAllCategory({ commit }) {
    const {
      data: { category },
    } = await findAllCategory();
    const categoryAll = JSON.parse(JSON.stringify(category));
    categoryAll.map((item) => {
      item.subCategoryList.unshift({
        id: "",
        name: "全部",
      });
    });
    commit("ChangeCategoryAll", categoryAll);
    commit("ChangeCategory", category);
  },
  async findSubCategoryByCateId({ commit }, params) {
    const {
      data: { subCategory },
    } = await findSubCategoryByCateId(params);
    commit("ChangeSubCategory", subCategory);
  },
};
export default { state, getters, mutations, actions };
