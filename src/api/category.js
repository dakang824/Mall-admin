/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 分类管理
 * @Date: 2020-10-02 00:59:22
 * @LastEditTime: 2020-10-08 14:30:29
 */
import request from "@/utils/request";

export function deleteSubCategory(data) {
  return request({
    url: "/service/plat/admin/deleteSubCategory",
    method: "post",
    data,
  });
}

export function addCategory(data) {
  return request({
    url: "/service/plat/admin/addCategory",
    method: "post",
    data,
  });
}

export function addSubCategory(data) {
  return request({
    url: "/service/plat/admin/addSubCategory",
    method: "post",
    data,
  });
}

export function deleteCategory(data) {
  return request({
    url: "/service/plat/admin/deleteCategory",
    method: "post",
    data,
  });
}

export function modifyCategory(data) {
  return request({
    url: "/service/plat/admin/modifyCategory",
    method: "post",
    data,
  });
}
