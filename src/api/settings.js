/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-10-03 16:12:52
 * @LastEditTime: 2021-03-03 19:37:38
 */
import request from "@/utils/request";

export function addPlatAdmin(data) {
  return request({
    url: "/service/plat/admin/addPlatAdmin",
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
