/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-11-27 18:28:09
 * @LastEditTime: 2020-11-29 23:48:59
 */
import { mock } from "mockjs";

export default [
  {
    url: "/demo/getList",
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
              name: "@cname",
              erp: "@id",
              company: "@cname",
              type: "@cname",
              group: "@cname",
            },
          ],
        }).data,
      };
    },
  },
  {
    url: "/demo/doEdit",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟保存成功",
      };
    },
  },
  {
    url: "/demo/doDelete",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟删除成功",
      };
    },
  },
];
