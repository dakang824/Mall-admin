/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 计划汇总api
 * @Date: 2020-11-26 14:17:35
 * @LastEditTime: 2021-03-03 21:33:48
 */
import request from "@/utils/request";

export function importPlan(data) {
  return request({
    url: "/service/plat/admin/importPlan",
    method: "post",
    data,
  });
}

export function exportPlan(data) {
  return request({
    url: "/service/plat/admin/exportPlan",
    method: "post",
    data,
  });
}

export function getPlanTemplate(data) {
  return request({
    url: "/service/plat/admin/getPlanTemplate",
    method: "post",
    data,
  });
}

export function deletePlan(data) {
  return request({
    url: "/service/plat/admin/deletePlan",
    method: "post",
    data,
  });
}

export function findPlan(data) {
  return request({
    url: "/service/plat/admin/findPlan",
    method: "post",
    data,
  });
}

export function modifyPlan(data) {
  return request({
    url: "/service/plat/admin/modifyPlan",
    method: "post",
    data,
  });
}

export function addPlan(data) {
  return request({
    url: "/service/plat/admin/addPlan",
    method: "post",
    data,
  });
}

export function findCompanyTeachers(data) {
  return request({
    url: "/service/plat/admin/findCompanyTeachers",
    method: "post",
    data,
  });
}
