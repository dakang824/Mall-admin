const totalCount = 3;
const List = [
  {
    "id|1-10": 1,
    account: "@guid",
    userName: "@cname",
    mobile: "@phone",
    role: "城市合伙人",
    state: "启用",
  },
  {
    "id|1-10": 1,
    account: "@guid",
    userName: "@cname",
    mobile: "@phone",
    role: "加盟商",
    state: "启用",
  },
  {
    "id|1-10": 1,
    account: "@guid",
    userName: "@cname",
    mobile: "@phone",
    role: "餐厅",
    state: "启用",
  },
  {
    "id|1-10": 1,
    account: "@guid",
    userName: "@cname",
    mobile: "@phone",
    role: "城市合伙人",
    state: "启用",
  },
  {
    "id|1-10": 1,
    account: "@guid",
    userName: "@cname",
    mobile: "@phone",
    role: "加盟商",
    state: "启用",
  },
  {
    "id|1-10": 1,
    account: "@guid",
    userName: "@cname",
    mobile: "@phone",
    role: "餐厅",
    state: "启用",
  },
  {
    "id|1-10": 1,
    account: "@guid",
    userName: "@cname",
    mobile: "@phone",
    role: "城市合伙人",
    state: "启用",
  },
  {
    "id|1-10": 1,
    account: "@guid",
    userName: "@cname",
    mobile: "@phone",
    role: "加盟商",
    state: "启用",
  },
  {
    "id|1-10": 1,
    account: "@guid",
    userName: "@cname",
    mobile: "@phone",
    role: "餐厅",
    state: "启用",
  },
  {
    "id|1-10": 1,
    account: "@guid",
    userName: "@cname",
    mobile: "@phone",
    role: "餐厅",
    state: "启用",
  },
];
export default [
  {
    url: "/userManagement/getList",
    type: "post",
    response: (config) => {
      const { title = "", pageNo = 1, pageSize = 20 } = config.body;
      let mockList = List.filter((item) => {
        if (title && item.title.indexOf(title) < 0) return false;
        return true;
      });
      const pageList = mockList.filter(
        (item, index) =>
          index < pageSize * pageNo && index >= pageSize * (pageNo - 1)
      );
      return {
        code: 200,
        msg: "success",
        totalCount,
        data: pageList,
      };
    },
  },
  {
    url: "/userManagement/doEdit",
    type: "post",
    response: () => {
      return {
        code: 200,
        msg: "模拟保存成功",
      };
    },
  },
  {
    url: "/userManagement/doDelete",
    type: "post",
    response: () => {
      return {
        code: 200,
        msg: "模拟删除成功",
      };
    },
  },
];
