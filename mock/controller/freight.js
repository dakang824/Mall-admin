import { mock } from "mockjs";

export default [
  {
    url: "/freight/getList",
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
              name: "江浙沪皖包邮",
              area: ["北京市", "天津市", "河北省", "山西省"],
              weight: "4",
              freight: "5",
              kg: "8",
              money: "8",
            },
          ],
        }).data,
      };
    },
  },
  {
    url: "/freight/doEdit",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟保存成功",
      };
    },
  },
  {
    url: "/freight/doDelete",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟删除成功",
      };
    },
  },
];
