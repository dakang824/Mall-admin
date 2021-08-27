import request from "@/utils/request";

export function queryPageStat(data) {
  return request({
    url: "/service/plat/admin/queryPageStat",
    method: "post",
    data,
  });
}
export function getPageStatDetail(data) {
  return request({
    url: "/service/plat/admin/getPageStatDetail",
    method: "post",
    data,
  });
}
