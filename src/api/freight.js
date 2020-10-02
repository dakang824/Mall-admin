import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/freight/getList",
    method: "post",
    data,
  });
}

export function doEdit(data) {
  return request({
    url: "/freight/doEdit",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/freight/doDelete",
    method: "post",
    data,
  });
}
