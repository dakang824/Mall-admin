/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 技能树管理
 * @Date: 2020-10-02 00:59:22
 * @LastEditTime: 2021-02-02 11:44:35
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
