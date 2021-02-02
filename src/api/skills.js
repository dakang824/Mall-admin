/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 技能树管理
 * @Date: 2020-10-02 00:59:22
 * @LastEditTime: 2021-02-02 16:44:37
 */
import request from "@/utils/request";

export function addSkillTree(data) {
  return request({
    url: "/service/plat/admin/addSkillTree",
    method: "post",
    data,
  });
}

export function modifySkillTree(data) {
  return request({
    url: "/service/plat/admin/modifySkillTree",
    method: "post",
    data,
  });
}

export function findSkillTree(data) {
  return request({
    url: "/service/plat/admin/findSkillTree",
    method: "post",
    data,
  });
}

export function publicSkillTree(data) {
  return request({
    url: "/service/plat/admin/publicSkillTree",
    method: "post",
    data,
  });
}

export function canclePublicSkillTree(data) {
  return request({
    url: "/service/plat/admin/canclePublicSkillTree",
    method: "post",
    data,
  });
}

export function deleteSkillTree(data) {
  return request({
    url: "/service/plat/admin/deleteSkillTree",
    method: "post",
    data,
  });
}

export function querySkillTreeScore(data) {
  return request({
    url: "/service/plat/admin/querySkillTreeScore",
    method: "post",
    data,
  });
}
