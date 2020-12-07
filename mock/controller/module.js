/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 模块管理api
 * @Date: 2020-10-24 18:18:50
 * @LastEditTime: 2020-12-07 18:13:20
 */
import { mock } from "mockjs";

export default [
  {
    url: "/service/plat/admin/findModule",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          moduleList: {
            total: 1,
            list: [
              {
                id: 1,
                name: "模块一",
                prof_id: 2,
                prof: null,
              },
            ],
            pageNum: 1,
            pageSize: 15,
            size: 1,
            startRow: 1,
            endRow: 1,
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
    url: "/service/plat/admin/addModule",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          module: {
            id: 1,
            name: "模块一",
            prof_id: 1,
            prof: null,
          },
        },
        key: null,
      };
    },
  },
  {
    url: "/service/plat/admin/modifyModule",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          module: {
            id: 1,
            name: "模块一",
            prof_id: 2,
            prof: null,
          },
        },
        key: null,
      };
    },
  },
  {
    url: "/service/plat/admin/deleteModule",
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
