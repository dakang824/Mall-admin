/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 全局商品类型
 * @Date: 2020-10-07 11:23:12
 * @LastEditTime: 2020-12-06 16:36:18
 */
import { findAllCategory, findSubCategoryByCateId } from "@/api/goods";
import { data } from "autoprefixer";
const state = {
  category: [],
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
  ChangeSubCategory(state, category) {
    state.subCategory = category;
  },
};
const actions = {
  async findAllCategory({ commit }) {
    const {
      data: { category },
    } = await findAllCategory();
    category.map((item) => {
      item.subCategoryList.unshift({
        id: "",
        name: "全部",
      });
    });
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
