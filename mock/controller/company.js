/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-10-03 11:00:21
 * @LastEditTime: 2020-12-07 17:26:10
 */
import { mock } from "mockjs";

export default [
  {
    url: "/service/plat/admin/findAllCompany",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          companyList: {
            total: 3,
            list: [
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
            ],
            pageNum: 1,
            pageSize: 15,
            size: 3,
            startRow: 1,
            endRow: 3,
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
    url: "/service/plat/admin/deleteCompany",
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
  {
    url: "/service/plat/admin/addCompany",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          company: {
            id: 1,
            name: "分公司一部",
            status: 1,
          },
        },
        key: null,
      };
    },
  },
  {
    url: "/service/plat/admin/modifyCompany",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          company: {
            id: 1,
            name: "电力公司总部2323",
            status: null,
          },
        },
        key: null,
      };
    },
  },
];
