/*
 * @Author: 禹康
 * @Date: 2020-10-03 09:17:16
 * @LastEditTime: 2020-12-07 18:00:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-beautiful-template\mock\controller\store.js
 */
import { mock } from "mockjs";

export default [
  {
    url: "/service/plat/admin/findAllProfession",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          professionList: {
            total: 5,
            list: [
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
            ],
            pageNum: 1,
            pageSize: 30,
            size: 5,
            startRow: 1,
            endRow: 5,
            pages: 1,
            prePage: 0,
            nextPage: 0,
            isFirstPage: true,
            isLastPage: true,
            hasPreviousPage: false,
            hasNextPage: false,
            navigatePages: 8,
            navigatepageNums: [1],
            navigateFirstPage: 1,
            navigateLastPage: 1,
          },
        },
        key: null,
      };
    },
  },
  {
    url: "/service/plat/admin/addProfession",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          profession: {
            id: 1,
            name: "电缆",
            status: 1,
          },
        },
        key: null,
      };
    },
  },
  {
    url: "/service/plat/admin/modifyProfession",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          profession: {
            id: 1,
            name: "testtest00",
            status: null,
          },
        },
        key: null,
      };
    },
  },
  {
    url: "/service/plat/admin/deleteProfession",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {},
        key: null,
      };
    },
  },
];
