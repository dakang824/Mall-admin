<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 导入文件模板
 * @Date: 2020-12-07 15:16:44
 * @LastEditTime: 2020-12-09 00:35:39
-->
<template>
  <ele-import
    :fields="fields"
    :filepath="filepath"
    dialog-width="700px"
    :formatter="formatter"
    :request-fn="requestFn"
    :rules="rules"
    :tips="tips"
    :title="title"
    :visible.sync="dialogFormVisible"
    @close="handleClosed"
    @finish="handleFinishImport"
  />
</template>

<script>
  import filters from "@/filters";
  import { addUser } from "@/api/userManagement";
  import { findAllCompany, findAllProfGroup } from "@/api/userManagement";
  import UserTemplate from "@/assets/files/user-template.xlsx";
  export default {
    components: {},
    props: {
      title: {
        type: String,
        default: "导入文件",
      },
    },
    data() {
      return {
        dialogFormVisible: false,
        tips: [
          "姓名必填",
          "账号必填",
          "密码必填",
          "角色必选",
          "所属公司必选",
          "专业组必选",
          "用户类型必选",
        ],
        fields: {
          name: "姓名",
          account: "账号",
          role: "角色",
          comp_id: "所属公司",
          prof_group_id: "专业组",
          type: "用户类型",
          pwd: "密码",
        },
        formatter: {
          role: {
            1: "学生",
            2: "老师",
          },
          type: {
            1: "临时工",
            2: "正式工",
          },
          prof_group_id: {},
          comp_id: {},
        },
        rules: {
          name: { required: true, message: "姓名必填" },
          account: { required: true, message: "账号必填" },
          role: { required: true, message: "角色必选" },
          comp_id: { required: true, message: "所属公司必选" },
          prof_group_id: { required: true, message: "专业组必选" },
          type: { required: true, message: "用户类型必选" },
          pwd: { required: true, message: "密码必填" },
        },
        // 注意, 只能是.xlsx的文件, .xls或者.cvs都会报错
        filepath: UserTemplate,
      };
    },
    methods: {
      async showImport(e) {
        const arr = await e.prof_group_id.options();
        arr.map((item) => {
          this.formatter.prof_group_id[item.value] = item.text;
        });
        const arr1 = await e.comp_id.options();
        arr1.map((item) => {
          this.formatter.comp_id[item.value] = item.text;
        });
        this.dialogFormVisible = true;
      },
      async requestFn(data) {
        data.map(async (item) => {
          const {
            msg,
            data: { user },
          } = await addUser(item);
        });
        return Promise.resolve();
      },
      handleClosed() {
        this.dialogFormVisible = false;
      },
      handleFinishImport() {
        this.$emit("fetchData", false);
      },
    },
  };
</script>

<style>
  .el-table {
    max-height: 450px;
    overflow: auto;
  }
</style>
