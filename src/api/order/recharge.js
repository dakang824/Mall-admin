import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/order/recharge/getList",
    method: "post",
    data,
  });
}

export function doEdit(data) {
  return request({
    url: "/order/recharge/doEdit",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/order/recharge/doDelete",
    method: "post",
    data,
  });
}
