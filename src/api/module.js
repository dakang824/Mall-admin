/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 模块api
 * @Date: 2020-10-24 18:18:50
 * @LastEditTime: 2020-12-07 18:11:13
 */
import request from "@/utils/request";

export function findModule(data) {
  return request({
    url: "/service/plat/admin/findModule",
    method: "post",
    data,
  });
}

export function addModule(data) {
  return request({
    url: "/service/plat/admin/addModule",
    method: "post",
    data,
  });
}

export function modifyModule(data) {
  return request({
    url: "/service/plat/admin/modifyModule",
    method: "post",
    data,
  });
}

export function deleteModule(data) {
  return request({
    url: "/service/plat/admin/deleteModule",
    method: "post",
    data,
  });
}
