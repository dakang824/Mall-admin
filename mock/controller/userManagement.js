/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-11-27 18:28:09
 * @LastEditTime: 2020-12-07 16:23:27
 */
import { mock } from "mockjs";

export default [
  {
    url: "/service/plat/admin/findUsers",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "success",
        totalCount: 999,
        data: mock({
          userList: {
            total: 1,
            "list|10": [
              {
                id: 1,
                name: "小明",
                code: null,
                nickname: null,
                icon: null,
                gender: null,
                birthday: null,
                qr_path: null,
                mobile: null,
                account: "xiaoming",
                pwd: "123456",
                union_id: null,
                wx_open_id: null,
                status: 1,
                roles: 1,
                type: 1,
                per: null,
                comp_id: 1,
                prof_group_id: 1,
                create_time: null,
                company: {
                  id: 1,
                  name: "电力公司总部",
                  status: 1,
                },
                prof_group: {
                  id: 1,
                  name: "专业1组",
                  status: 1,
                  itemList: [],
                },
              },
            ],
            pageNum: 1,
            pageSize: 10,
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
        }),
      };
    },
  },
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
    url: "/service/plat/admin/findAllCompany",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "success",
        totalCount: 999,
        data: mock({
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
            pageSize: 10,
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
        }),
      };
    },
  },

  {
    url: "/service/plat/admin/addUser",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          user: {
            id: 1,
            name: "赵明",
            code: null,
            nickname: null,
            icon: null,
            gender: null,
            birthday: null,
            qr_path: null,
            mobile: null,
            account: "xiaoming",
            pwd: "123456",
            union_id: null,
            wx_open_id: null,
            status: 1,
            roles: 1,
            type: 1,
            per: null,
            comp_id: 1,
            prof_group_id: 1,
            create_time: null,
            company: null,
            prof_group: null,
          },
        },
        key: null,
      };
    },
  },
  {
    url: "/service/plat/admin/modifyUser",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          user: {
            id: 1,
            name: "小明",
            code: null,
            nickname: null,
            icon: null,
            gender: null,
            birthday: null,
            qr_path: null,
            mobile: null,
            account: "xiaoming",
            pwd: "123456",
            union_id: null,
            wx_open_id: null,
            status: 1,
            roles: 1,
            type: 1,
            per: null,
            comp_id: 1,
            prof_group_id: 1,
            create_time: null,
            company: {
              id: 1,
              name: "电力公司总部",
              status: 1,
            },
            prof_group: {
              id: 1,
              name: "专业1组",
              status: 1,
              itemList: [],
            },
          },
        },
        key: null,
      };
    },
  },

  {
    url: "/service/plat/admin/deleteUser",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          userList: {
            total: 1,
            list: [
              {
                id: 1,
                name: "小明",
                code: null,
                nickname: null,
                icon: null,
                gender: null,
                birthday: null,
                qr_path: null,
                mobile: null,
                account: "xiaoming",
                pwd: "123456",
                union_id: null,
                wx_open_id: null,
                status: 1,
                roles: 1,
                type: 1,
                per: null,
                comp_id: 1,
                prof_group_id: 1,
                create_time: null,
                company: {
                  id: 1,
                  name: "电力公司总部",
                  status: 1,
                },
                prof_group: {
                  id: 1,
                  name: "专业1组",
                  status: 1,
                  itemList: [],
                },
              },
            ],
            pageNum: 1,
            pageSize: 10,
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
    url: "/service/plat/admin/exportUsers",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          excel_path: "data\\temp\\1607224331793.xlsx",
        },
        key: null,
      };
    },
  },
];
