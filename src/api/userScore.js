/*
 * @Author: yukang 1172248038@qq.com
 * @Description:商品管理
 * @Date: 2020-10-03 11:27:37
 * @LastEditTime: 2020-12-11 18:24:31
 */
import request from "@/utils/request";

export function findUserScore(data) {
  return request({
    url: "/service/plat/admin/findUserScore",
    method: "post",
    data,
  });
}

export function deleteUserScore(data) {
  return request({
    url: "/service/plat/admin/deleteUserScore",
    method: "post",
    data,
  });
}

export function modifyUserScore(data) {
  return request({
    url: "/service/plat/admin/modifyUserScore",
    method: "post",
    data,
  });
}
export function addUserScore(data) {
  return request({
    url: "/service/plat/admin/addUserScore",
    method: "post",
    data,
  });
}
