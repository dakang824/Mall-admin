/*
 * @Author: yukang 1172248038@qq.com
 * @Description:退款订单
 * @Date: 2020-11-11 23:14:23
 * @LastEditTime: 2020-12-11 13:48:46
 */
import request from "@/utils/request";

export function findTest(data) {
  return request({
    url: "/service/plat/admin/findTest",
    method: "post",
    data,
  });
}

export function modifyTest(data) {
  return request({
    url: "/service/plat/admin/modifyTest",
    method: "post",
    data,
  });
}

export function addTest(data) {
  return request({
    url: "/service/plat/admin/addTest",
    method: "post",
    data,
  });
}

export function findTestQues(data) {
  return request({
    url: "/service/plat/admin/findTestQues",
    method: "post",
    data,
  });
}

export function deleteTest(data) {
  return request({
    url: "/service/plat/admin/deleteTest",
    method: "post",
    data,
  });
}
