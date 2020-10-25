import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/finance/getList",
    method: "post",
    data,
  });
}

export function doEdit(data) {
  return request({
    url: "/finance/doEdit",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/finance/doDelete",
    method: "post",
    data,
  });
}
