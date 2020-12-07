/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 分类管理
 * @Date: 2020-10-02 00:59:22
 * @LastEditTime: 2020-12-07 19:09:34
 */
import request from "@/utils/request";

export function findAllProfGroup(data) {
  return request({
    url: "/service/plat/admin/findAllProfGroup",
    method: "post",
    data,
  });
}

export function addProfGroup(data) {
  return request({
    url: "/service/plat/admin/addProfGroup",
    method: "post",
    data,
  });
}

export function modifyProfGroup(data) {
  return request({
    url: "/service/plat/admin/modifyProfGroup",
    method: "post",
    data,
  });
}

export function deleteProfGroup(data) {
  return request({
    url: "/service/plat/admin/deleteProfGroup",
    method: "post",
    data,
  });
}

export function addProfToGroup(data) {
  return request({
    url: "/service/plat/admin/addProfToGroup",
    method: "post",
    data,
  });
}

export function deleteProfFromGroup(data) {
  return request({
    url: "/service/plat/admin/deleteProfFromGroup",
    method: "post",
    data,
  });
}
