/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 全局商品类型
 * @Date: 2020-10-07 11:23:12
 * @LastEditTime: 2020-10-07 12:44:17
 */
import { findAllCategory, findSubCategoryByCateId } from "@/api/goods";
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
      value: 3,
    },
    {
      label: "菜谱",
      value: 4,
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
    // const data = category.map((item) => {
    //   let children = [];
    //   for (let key of item.subCategoryList) {
    //     children.push({ label: key.name, value: key.id, pos: key.pos });
    //   }
    //   return {
    //     label: item.name,
    //     value: item.id,
    //     pos: item.pos,
    //     children,
    //   };
    // });

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
