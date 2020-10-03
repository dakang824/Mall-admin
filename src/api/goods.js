import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/goods/getList",
    method: "post",
    data,
  });
}

export function doEdit(data) {
  return request({
    url: "/goods/doEdit",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/goods/doDelete",
    method: "post",
    data,
  });
}
