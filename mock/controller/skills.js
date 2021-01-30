/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-10-02 00:59:22
 * @LastEditTime: 2021-01-30 22:38:24
 */
import { mock } from "mockjs";

export default [
  {
    url: "/service/plat/admin/findSkillTree",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          skillTree: {
            total: 2,
            list: [
              {
                id: 1,
                name: "一级测试技能树",
                prof_id: 1,
                up_id: 0,
                pos: 100,
                level: 1,
                downSkillTree: [
                  {
                    id: 5,
                    name: "二级级技能树",
                    prof_id: 1,
                    up_id: 1,
                    pos: 100,
                    level: 2,
                    downSkillTree: [],
                  },
                ],
              },
              {
                id: 2,
                name: "一级技能树",
                prof_id: 1,
                up_id: 0,
                pos: 100,
                level: 1,
                downSkillTree: [
                  {
                    id: 3,
                    name: "一级技能树",
                    prof_id: 1,
                    up_id: 2,
                    pos: 100,
                    level: 2,
                    downSkillTree: [
                      {
                        id: 6,
                        name: "三级技能树",
                        prof_id: 1,
                        up_id: 3,
                        pos: 100,
                        level: 3,
                        downSkillTree: [],
                      },
                      {
                        id: 7,
                        name: "三级技能树",
                        prof_id: 1,
                        up_id: 3,
                        pos: 100,
                        level: 3,
                        downSkillTree: [
                          {
                            id: 8,
                            name: "四季级技能树",
                            prof_id: 1,
                            up_id: 7,
                            pos: 100,
                            level: 4,
                            downSkillTree: [
                              {
                                id: 9,
                                name: "五级级技能树",
                                prof_id: 1,
                                up_id: 8,
                                pos: 100,
                                level: 5,
                                downSkillTree: [
                                  {
                                    id: 10,
                                    name: "六级级技能树",
                                    prof_id: 1,
                                    up_id: 9,
                                    pos: 100,
                                    level: 6,
                                    downSkillTree: [],
                                  },
                                  {
                                    id: 11,
                                    name: "六级级技能树",
                                    prof_id: 1,
                                    up_id: 9,
                                    pos: 100,
                                    level: 6,
                                    downSkillTree: [],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: 4,
                    name: "二级级技能树",
                    prof_id: 1,
                    up_id: 2,
                    pos: 100,
                    level: 2,
                    downSkillTree: [],
                  },
                ],
              },
            ],
            pageNum: 1,
            pageSize: 30,
            size: 2,
            startRow: 1,
            endRow: 2,
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
    url: "/service/plat/admin/addSkillTree",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          skillTree: {
            id: 5,
            name: "二级级技能树",
            prof_id: 1,
            up_id: 1,
            pos: null,
            level: 2,
            downSkillTree: null,
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
