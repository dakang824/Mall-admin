import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/curd/getList",
    method: "post",
    data,
  });
}

export function doEdit(data) {
  return request({
    url: "/curd/doEdit",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/curd/doDelete",
    method: "post",
    data,
  });
}
