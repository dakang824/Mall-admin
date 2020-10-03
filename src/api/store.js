import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/store/getList",
    method: "post",
    data,
  });
}

export function doEdit(data) {
  return request({
    url: "/store/doEdit",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/store/doDelete",
    method: "post",
    data,
  });
}
