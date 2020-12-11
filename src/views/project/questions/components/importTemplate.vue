<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 导入文件模板
 * @Date: 2020-12-07 15:16:44
 * @LastEditTime: 2020-12-11 20:48:25
-->
<template>
  <ele-import
    :fields="fields"
    :filepath="filepath"
    dialog-width="750px"
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
  import { addQuestion } from "@/api/questions";
  import { findAllCompany, findAllProfGroup } from "@/api/userManagement";
  import QuestionsTemplate from "@/assets/files/questions-template.xlsx";
  export default {
    components: {},
    props: {
      title: {
        type: String,
        default: "题库导入",
      },
    },
    data() {
      return {
        dialogFormVisible: false,
        tips: ["题目类型", "题目", "专业", "模块", "答案"],
        fields: {
          content: "题目",
          prof_id: "专业",
          module_id: "模块",
          type: "题目类型",
          options: "答案",
        },
        formatter: {},
        rules: {
          content: { required: true, message: "题目必填" },
          prof_id: { required: true, message: "专业必填" },
          module_id: { required: true, message: "模块必填" },
          type: { required: true, message: "题目类型必填" },
          options: { required: true, message: "答案必填" },
        },
        // 注意, 只能是.xlsx的文件, .xls或者.cvs都会报错
        filepath: QuestionsTemplate,
      };
    },
    methods: {
      async showImport(e, professions, moduleLists) {
        this.formatter = {
          type: this.getValue(e.type.options),
          prof_id: this.getValue(professions),
          module_id: this.getValue(moduleLists),
        };
        this.dialogFormVisible = true;
      },
      getValue(arr) {
        return arr.reduce((a, b) => {
          a[b.value] = b.text;
          return a;
        }, {});
      },
      async requestFn(data) {
        data.map(async (item) => {
          item.options = JSON.stringify(
            item.options.split("/##/").map((item) => {
              const arr = item.split("--");
              return {
                content: arr[0],
                right: arr[1] == "正确" ? 1 : 0,
              };
            })
          );
          await addQuestion(item);
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
  .el-dialog__wrapper .el-table {
    max-height: 450px;
    overflow: auto;
  }
</style>
