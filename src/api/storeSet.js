import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/storeSet/getList",
    method: "post",
    data,
  });
}

export function doEdit(data) {
  return request({
    url: "/storeSet/doEdit",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/storeSet/doDelete",
    method: "post",
    data,
  });
}
