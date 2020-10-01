import { mock } from "mockjs";

export default [
  {
    url: "/category/getList",
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
              type: "蔬菜",
              child: [
                "叶菜类",
                "西红柿/茄果类",
                "花菜/球茎类",
                "土豆/根茎类",
                "菌菇类",
                "豆类/芽苗类",
                "葱姜蒜椒",
                "豆制品",
              ],
            },
          ],
        }).data,
      };
    },
  },
  {
    url: "/category/doEdit",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟保存成功",
      };
    },
  },
  {
    url: "/category/doDelete",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟删除成功",
      };
    },
  },
];
