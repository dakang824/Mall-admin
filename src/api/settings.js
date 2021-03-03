/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-10-03 16:12:52
 * @LastEditTime: 2021-03-03 22:24:04
 */
import request from "@/utils/request";

export function addPlatAdmin(data) {
  return request({
    url: "/service/plat/admin/addPlatAdmin",
    method: "post",
    data,
  });
}

export function findPlatAdmin(data) {
  return request({
    url: "/service/plat/admin/findPlatAdmin",
    method: "post",
    data,
  });
}

export function deletePlatAdmin(data) {
  return request({
    url: "/service/plat/admin/deletePlatAdmin",
    method: "post",
    data,
  });
}

export function modifyPlatAdmin(data) {
  return request({
    url: "/service/plat/admin/modifyPlatAdmin",
    method: "post",
    data,
  });
}
