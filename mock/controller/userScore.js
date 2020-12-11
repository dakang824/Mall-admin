/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-10-03 11:27:37
 * @LastEditTime: 2020-12-11 18:02:39
 */
import { mock } from "mockjs";

export default [
  {
    url: "/service/plat/admin/findUserScore",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          userScores: {
            total: 1,
            list: [
              {
                id: 1,
                user_id: 1,
                user_account: "xiaoming",
                name: "小明",
                test_name: "模拟考测试1",
                type: 1,
                prof_id: 1,
                prof_name: "专业1",
                score: 80,
                test_time: "2020-12-11",
                company_id: 1,
                company_name: "电力公司总部",
                pic_path: null,
              },
            ],
            pageNum: 1,
            pageSize: 30,
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
    url: "/service/plat/admin/addUserScore",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          userScore: {
            id: 1,
            user_id: 1,
            user_account: "xiaoming",
            name: "赵明",
            test_name: "模拟考测试1",
            type: 1,
            prof_id: 1,
            prof_name: "专业1",
            score: 80,
            test_time: "2020-12-11",
            company_id: 1,
            company_name: "电力公司总部",
            pic_path: null,
          },
        },
        key: null,
      };
    },
  },
  {
    url: "/service/plat/admin/modifyUserScore",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          userScore: {
            id: 1,
            user_id: 1,
            user_account: "xiaoming",
            name: "小明",
            test_name: null,
            type: null,
            prof_id: null,
            prof_name: null,
            score: null,
            test_time: null,
            company_id: 1,
            company_name: "电力公司总部",
            pic_path: null,
          },
        },
        key: null,
      };
    },
  },
  {
    url: "/service/plat/admin/deleteUserScore",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          userScores: {
            total: 1,
            list: [
              {
                id: 1,
                user_id: 1,
                user_account: "xiaoming",
                name: "小明",
                test_name: "模拟考测试1",
                type: 1,
                prof_id: 1,
                prof_name: "专业1",
                score: 80,
                test_time: "2020-12-11",
                company_id: 1,
                company_name: "电力公司总部",
                pic_path: null,
              },
            ],
            pageNum: 1,
            pageSize: 30,
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
];
