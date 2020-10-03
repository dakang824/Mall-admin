import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/produce/getList",
    method: "post",
    data,
  });
}

export function doEdit(data) {
  return request({
    url: "/produce/doEdit",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/produce/doDelete",
    method: "post",
    data,
  });
}
