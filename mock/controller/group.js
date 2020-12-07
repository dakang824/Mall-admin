/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-10-02 00:59:22
 * @LastEditTime: 2020-12-07 19:13:14
 */
import { mock } from "mockjs";

export default [
  {
    url: "/service/plat/admin/findAllProfGroup",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          profGroup: {
            total: 8,
            list: [
              {
                id: 1,
                name: "专业1组",
                status: 1,
                itemList: [],
              },
              {
                id: 2,
                name: "专业1组",
                status: 1,
                itemList: [
                  {
                    id: 2,
                    group_id: 2,
                    prof_id: 1,
                    prof: {
                      id: 1,
                      name: "电缆",
                      status: 1,
                    },
                  },
                  {
                    id: 3,
                    group_id: 2,
                    prof_id: 2,
                    prof: {
                      id: 2,
                      name: "通信",
                      status: 1,
                    },
                  },
                ],
              },
              {
                id: 3,
                name: "专业一组",
                status: 1,
                itemList: [
                  {
                    id: 4,
                    group_id: 3,
                    prof_id: 1,
                    prof: {
                      id: 1,
                      name: "电缆",
                      status: 1,
                    },
                  },
                  {
                    id: 5,
                    group_id: 3,
                    prof_id: 2,
                    prof: {
                      id: 2,
                      name: "通信",
                      status: 1,
                    },
                  },
                ],
              },
              {
                id: 4,
                name: "专业二组",
                status: 1,
                itemList: [
                  {
                    id: 6,
                    group_id: 4,
                    prof_id: 3,
                    prof: {
                      id: 3,
                      name: "土建",
                      status: 1,
                    },
                  },
                  {
                    id: 7,
                    group_id: 4,
                    prof_id: 4,
                    prof: {
                      id: 4,
                      name: "基建变电",
                      status: 1,
                    },
                  },
                  {
                    id: 8,
                    group_id: 4,
                    prof_id: 5,
                    prof: {
                      id: 5,
                      name: "高压线路",
                      status: 1,
                    },
                  },
                ],
              },
              {
                id: 5,
                name: "专业三组",
                status: 1,
                itemList: [
                  {
                    id: 9,
                    group_id: 5,
                    prof_id: 3,
                    prof: {
                      id: 3,
                      name: "土建",
                      status: 1,
                    },
                  },
                  {
                    id: 10,
                    group_id: 5,
                    prof_id: 4,
                    prof: {
                      id: 4,
                      name: "基建变电",
                      status: 1,
                    },
                  },
                ],
              },
              {
                id: 6,
                name: "专业四组",
                status: 1,
                itemList: [],
              },
              {
                id: 7,
                name: "专业四组",
                status: 1,
                itemList: [
                  {
                    id: 11,
                    group_id: 7,
                    prof_id: 4,
                    prof: {
                      id: 4,
                      name: "基建变电",
                      status: 1,
                    },
                  },
                  {
                    id: 12,
                    group_id: 7,
                    prof_id: 5,
                    prof: {
                      id: 5,
                      name: "高压线路",
                      status: 1,
                    },
                  },
                ],
              },
              {
                id: 8,
                name: "test002",
                status: 1,
                itemList: [
                  {
                    id: 13,
                    group_id: 8,
                    prof_id: 4,
                    prof: {
                      id: 4,
                      name: "基建变电",
                      status: 1,
                    },
                  },
                  {
                    id: 14,
                    group_id: 8,
                    prof_id: 5,
                    prof: {
                      id: 5,
                      name: "高压线路",
                      status: 1,
                    },
                  },
                  {
                    id: 15,
                    group_id: 8,
                    prof_id: 1,
                    prof: {
                      id: 1,
                      name: "电缆",
                      status: 1,
                    },
                  },
                  {
                    id: 16,
                    group_id: 8,
                    prof_id: 1,
                    prof: {
                      id: 1,
                      name: "电缆",
                      status: 1,
                    },
                  },
                ],
              },
            ],
            pageNum: 1,
            pageSize: 15,
            size: 8,
            startRow: 1,
            endRow: 8,
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
    url: "/service/plat/admin/addProfGroup",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          profGroup: {
            id: 3,
            name: "专业一组",
            status: 1,
            itemList: [
              {
                id: 4,
                group_id: 3,
                prof_id: 1,
                prof: {
                  id: 1,
                  name: "电缆",
                  status: 1,
                },
              },
              {
                id: 5,
                group_id: 3,
                prof_id: 2,
                prof: {
                  id: 2,
                  name: "通信",
                  status: 1,
                },
              },
            ],
          },
        },
        key: null,
      };
    },
  },
  {
    url: "/service/plat/admin/modifyProfGroup",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          profGroup: {
            id: 8,
            name: "test002",
            status: null,
            itemList: null,
          },
        },
        key: null,
      };
    },
  },
  {
    url: "/service/plat/admin/deleteProfGroup",
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
    url: "/service/plat/admin/addProfToGroup",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          profGroupItem: {
            id: 15,
            group_id: 8,
            prof_id: 1,
            prof: null,
          },
        },
        key: null,
      };
    },
  },
  {
    url: "/service/plat/admin/deleteProfFromGroup",
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
