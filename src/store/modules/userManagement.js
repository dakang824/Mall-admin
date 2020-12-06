/*
 * @Author: yukang 1172248038@qq.com
 * @Description:用户管理
 * @Date: 2020-12-06 22:27:09
 * @LastEditTime: 2020-12-07 00:31:53
 */
import { findAllProfession, findAllCompany } from "@/api/userManagement";
const state = {
  professions: [],
  companys: [],
};
const getters = {
  professions: (state) => state.professions,
};
const mutations = {
  Addprofessions(state, data) {
    state.professions = data;
  },
  AddCompanys(state, data) {
    state.companys = data;
  },
};
const actions = {
  async getData({ commit }) {
    // const {
    //   data: {
    //     companyList: { list: data },
    //   },
    // } = await findAllCompany({ pageNo: 1, pageSize: 50 });
    commit("AddCompanys", [
      {
        id: 1,
        name: "电力公司总部",
        status: 1,
      },
      {
        id: 2,
        name: "test01",
        status: 1,
      },
      {
        id: 3,
        name: "test02",
        status: 1,
      },
    ]);
    // const {
    //   data: {
    //     professionList: { list },
    //   },
    // } = await findAllProfession({ pageNo: 1, pageSize: 50 });
    commit("Addprofessions", [
      {
        id: 1,
        name: "电缆",
        status: 1,
      },
      {
        id: 2,
        name: "通信",
        status: 1,
      },
      {
        id: 3,
        name: "土建",
        status: 1,
      },
      {
        id: 4,
        name: "基建变电",
        status: 1,
      },
      {
        id: 5,
        name: "高压线路",
        status: 1,
      },
    ]);

    return state;
  },
};
export default { state, getters, mutations, actions };
