/*
 * @Author: yukang 1172248038@qq.com
 * @Description:用户管理
 * @Date: 2020-12-06 18:25:36
 * @LastEditTime: 2020-12-06 18:34:31
 */
import request from "@/utils/request";

export function findUsers(data) {
  return request({
    url: "//service/plat/admin/findUsers",
    method: "post",
    data,
  });
}

export function addUser(data) {
  return request({
    url: "/service/plat/admin/addUser",
    method: "post",
    data,
  });
}

export function modifyUser(data) {
  return request({
    url: "/service/plat/admin/modifyUser",
    method: "post",
    data,
  });
}

export function deleteUser(data) {
  return request({
    url: "/service/plat/admin/deleteUser",
    method: "post",
    data,
  });
}

export function exportUsers(data) {
  return request({
    url: "/service/plat/admin/exportUsers",
    method: "post",
    data,
  });
}
