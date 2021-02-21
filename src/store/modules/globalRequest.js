/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 全局请求数据缓存
 * @Date: 2020-10-07 11:23:12
 * @LastEditTime: 2021-02-21 12:50:53
 */
import { findAllProfession } from "@/api/professions";
import { findModule } from "@/api/module";
import { findAllCompany } from "@/api/company";
import { findAllProfGroup } from "@/api/group";

const state = {
  professions: [],
  professionsKeyVal: {},
  moduleLists: [],
  moduleListsKeyVal: {},
  companyLists: [],
  companyListsKeyVal: {},
  profGroups: [],
  profGroupsKeyVal: {},
};
const getters = {
  errorLogs: (state) => state.errorLogs,
};
const mutations = {
  addProfessions: (state, data) => {
    state.professions = data;
  },
  professionsKeyVal: (state, data) => {
    state.professionsKeyVal = data;
  },

  addModuleLists: (state, data) => {
    state.moduleLists = data;
  },
  moduleListsKeyVal: (state, data) => {
    state.moduleListsKeyVal = data;
  },

  addCompanyLists: (state, data) => {
    state.companyLists = data;
  },
  companyListsKeyVal: (state, data) => {
    state.companyListsKeyVal = data;
  },

  addProfGroups: (state, data) => {
    state.profGroups = data;
  },
  profGroupsKeyVal: (state, data) => {
    state.profGroupsKeyVal = data;
  },
};
const actions = {
  // 获取专业数据
  async findAllProfession({ commit }) {
    const {
      data: {
        professionList: { list },
      },
    } = await findAllProfession({ pageNo: 1, pageSize: 150 });

    const professionLists = list.map((item) => {
      return { text: item.name, value: item.id };
    });

    const professionsKeyVal = professionLists.reduce((a, b) => {
      a[b.value] = b.text;
      return a;
    }, {});

    commit("addProfessions", professionLists);
    commit("professionsKeyVal", professionsKeyVal);
  },
  // 获取模块数据
  async findModule({ commit }) {
    const {
      data: {
        moduleList: { list },
      },
    } = await findModule({ pageNo: 1, pageSize: 150 });

    const moduleLists = list.map((item) => {
      return { text: item.name, value: item.id, prof_id: item.prof.id };
    });

    const moduleListsKeyVal = moduleLists.reduce((a, b) => {
      a[b.value] = b.text;
      return a;
    }, {});

    commit("addModuleLists", moduleLists);
    commit("moduleListsKeyVal", moduleListsKeyVal);
  },

  // 获取单位数据
  async findAllCompany({ commit }) {
    const {
      data: {
        companyList: { list },
      },
    } = await findAllCompany({ pageNo: 1, pageSize: 150 });

    const companyLists = list.map((item) => {
      return { text: item.name, value: item.id };
    });

    const companyListsKeyVal = companyLists.reduce((a, b) => {
      a[b.value] = b.text;
      return a;
    }, {});

    commit("addCompanyLists", companyLists);
    commit("companyListsKeyVal", companyListsKeyVal);
  },

  // 获取专业组数据
  async findAllProfGroup({ commit }) {
    const {
      data: {
        profGroup: { list },
      },
    } = await findAllProfGroup({ pageNo: 1, pageSize: 150 });

    const profGroups = list.map((item) => {
      return { text: item.name, value: item.id };
    });

    const profGroupsKeyVal = profGroups.reduce((a, b) => {
      a[b.value] = b.text;
      return a;
    }, {});

    commit("addProfGroups", profGroups);
    commit("profGroupsKeyVal", profGroupsKeyVal);
  },
};
export default { state, getters, mutations, actions };
