/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-10-03 11:27:37
 * @LastEditTime: 2020-10-03 11:52:29
 */
import { mock } from "mockjs";

export default [
  {
    url: "/goods/getList",
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
              title: "@cparagraph(1, 5)",
              price: "@integer(60, 100)",
              total: "@integer(60, 100)",
              sales: "@integer(60, 100)",
              collec: "@integer(60, 100)",
              time: "@datetime",
              state: "@boolean",
            },
          ],
        }).data,
      };
    },
  },
  {
    url: "/goods/doEdit",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟保存成功",
      };
    },
  },
  {
    url: "/goods/doDelete",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟删除成功",
      };
    },
  },
];
