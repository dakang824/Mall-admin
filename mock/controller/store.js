/*
 * @Author: 禹康
 * @Date: 2020-10-03 09:17:16
 * @LastEditTime: 2020-10-03 10:06:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-beautiful-template\mock\controller\store.js
 */
import { mock } from "mockjs";

export default [
  {
    url: "/store/getList",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "success",
        totalCount: 999,
        data: mock({
          "data|10": [
            {
              id: "@id",
              storeName: "@cname",
              account: "@guid",
              password: "@guid",
              role: ["菜品", "菜盒"],
              collec: 4,
              state: 1,
            },
          ],
        }).data,
      };
    },
  },
  {
    url: "/store/doEdit",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟保存成功",
      };
    },
  },
  {
    url: "/store/doDelete",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟删除成功",
      };
    },
  },
];
