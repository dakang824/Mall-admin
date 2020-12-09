/*
 * @Author: yukang 1172248038@qq.com
 * @Description:　运费管理
 * @Date: 2020-10-02 09:38:00
 * @LastEditTime: 2020-12-09 21:26:16
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
