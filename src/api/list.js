/*
 * @Author: yukang 1172248038@qq.com
 * @Description:文章管理
 * @Date: 2020-12-07 23:26:57
 * @LastEditTime: 2020-12-11 23:11:19
 */
import request from "@/utils/request";

export function findArticle(data) {
  return request({
    url: "/service/plat/admin/findArticle",
    method: "post",
    data,
  });
}

export function modifyArticle(data) {
  return request({
    url: "/service/plat/admin/modifyArticle",
    method: "post",
    data,
  });
}

export function addArticle(data) {
  return request({
    url: "/service/plat/admin/addArticle",
    method: "post",
    data,
  });
}

export function deleteArticle(data) {
  return request({
    url: "/service/plat/admin/deleteArticle",
    method: "post",
    data,
  });
}

export function auditArticle(data) {
  return request({
    url: "/service/plat/admin/auditArticle",
    method: "post",
    data,
  });
}
