/*
 * @Author: yukang 1172248038@qq.com
 * @Description:　运费管理
 * @Date: 2020-10-02 09:38:00
 * @LastEditTime: 2021-01-21 22:57:54
 */
import request from "@/utils/request";

export function findQuestions(data) {
  return request({
    url: "/service/plat/admin/findQuestions",
    method: "post",
    data,
  });
}

export function addQuestion(data) {
  return request({
    url: "/service/plat/admin/addQuestion",
    method: "post",
    data,
  });
}
export function modifyQuestion(data) {
  return request({
    url: "/service/plat/admin/modifyQuestion",
    method: "post",
    data,
  });
}

export function deleteQuestion(data) {
  return request({
    url: "/service/plat/admin/deleteQuestion",
    method: "post",
    data,
  });
}

export function getQueTemplate(data) {
  return request({
    url: "/service/plat/admin/getQueTemplate",
    method: "post",
    data,
  });
}

export function importQuestion(data) {
  return request({
    url: "/service/plat/admin/importQuestion",
    method: "post",
    data,
  });
}

export function exportQuestion(data) {
  return request({
    url: "/service/plat/admin/exportQuestion",
    method: "post",
    data,
  });
}
