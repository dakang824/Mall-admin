import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/demo/getList",
    method: "post",
    data,
  });
}

export function doEdit(data) {
  return request({
    url: "/demo/doEdit",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/demo/doDelete",
    method: "post",
    data,
  });
}
