import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/category/getList",
    method: "post",
    data,
  });
}

export function doEdit(data) {
  return request({
    url: "/category/doEdit",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/category/doDelete",
    method: "post",
    data,
  });
}
