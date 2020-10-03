/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-10-03 11:00:21
 * @LastEditTime: 2020-10-03 11:16:31
 */
import { mock } from "mockjs";

export default [
  {
    url: "/produce/getList",
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
              area: "@province",
            },
          ],
        }).data,
      };
    },
  },
  {
    url: "/produce/doEdit",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟保存成功",
      };
    },
  },
  {
    url: "/produce/doDelete",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟删除成功",
      };
    },
  },
];
