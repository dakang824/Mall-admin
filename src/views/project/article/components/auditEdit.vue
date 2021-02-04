<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 编辑用户信息表单
 * @Date: 2020-12-06 18:40:37
 * @LastEditTime: 2021-02-04 20:47:27
-->
<template>
  <ele-form-dialog
    v-model="formData"
    label-position="left"
    :form-desc="formDesc"
    :rules="rules"
    :visible.sync="dialogFormVisible"
    :title="title"
    width="400px"
    :request-fn="handleSubmit"
    @closed="handleClosed"
  ></ele-form-dialog>
</template>

<script>
  import { auditArticle } from "@/api/list";
  export default {
    data() {
      return {
        title: "添加",
        dialogFormVisible: false,
        formData: {
          status: "",
        },
        formDesc: {
          status: {
            type: "radio",
            label: "审核结果:",
            options: [
              {
                value: 2,
                text: "通过",
              },
              {
                value: 4,
                text: "不通过",
              },
            ],
          },
        },
        rules: {
          title: { required: true, message: "标题必填" },
        },
      };
    },
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = "添加文章";
        } else {
          this.title = "编辑文章";
          this.formData = JSON.parse(JSON.stringify(row));
        }
        this.dialogFormVisible = true;
      },
      handleClosed() {
        this.formData = {};
      },

      async handleSubmit(data) {
        const {
          msg,
          data: { article },
        } = await auditArticle({ ...data, id: this.formData.id });
        this.$baseMessage(msg, "success");
        // 关闭弹窗
        this.dialogFormVisible = false;
        // 重置formData
        this.formData = {};
      },
    },
  };
</script>

<style lang="scss" scoped>
  ::v-deep {
    .el-dialog {
      .ele-form-btns {
        text-align: right;
      }
      .el-dialog__body {
        padding: 20px 20px 5px;
      }
    }
  }
</style>
