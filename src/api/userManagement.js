/*
 * @Author: yukang 1172248038@qq.com
 * @Description:用户管理接口
 * @Date: 2020-08-12 23:39:57
 * @LastEditTime: 2020-12-03 21:29:56
 */
import request from "@/utils/request";

export function findAllUserRoles() {
  return request({
    url: "/service/plat/admin/findAllUserRoles",
    method: "get",
  });
}

export function checkUserStoreAccount(data) {
  return request({
    url: "/service/plat/admin/checkUserStoreAccount",
    method: "post",
    data,
  });
}

export function deleteUserStore(data) {
  return request({
    url: "/service/plat/admin/deleteUserStore",
    method: "post",
    data,
  });
}

export function addUserStore(data) {
  return request({
    url: "/service/plat/admin/addUserStore",
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

export function queryUsers(data) {
  return request({
    url: "/service/plat/admin/queryUsers",
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
