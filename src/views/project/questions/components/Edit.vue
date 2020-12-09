<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 编辑用户信息表单
 * @Date: 2020-12-06 18:40:37
 * @LastEditTime: 2020-12-09 21:58:53
-->
<template>
  <ele-form-dialog
    v-model="formData"
    label-position="left"
    :form-desc="formDesc"
    :rules="rules"
    :visible.sync="dialogFormVisible"
    :title="title"
    width="620px"
    :request-fn="handleSubmit"
    :order="['type', 'content', 'prof_id', 'module_id']"
    @closed="handleClosed"
  ></ele-form-dialog>
</template>

<script>
  import { addQuestion, modifyQuestion } from "@/api/questions";
  export default {
    props: {
      options: { type: Object, default: () => {} },
    },
    data() {
      return {
        title: "添加",
        dialogFormVisible: false,
        formData: {},
        formDesc: {
          content: {
            type: "textarea",
            label: "题目",
            attrs: {
              clearable: true,
            },
          },
          options: {
            label: "答案",
            type: "dynamic",
            attrs: {
              delimiter: "正确",
              columns: [
                {
                  type: "el-input",
                  valueKey: "content",
                  attrs: {
                    clearable: true,
                    placeholder: "请输入答案",
                  },
                  style: {
                    width: "370px",
                  },
                },
                {
                  type: "el-checkbox",
                  valueKey: "right",
                  attrs: {
                    "true-label": 1,
                    "false-label": 0,
                  },
                },
              ],
            },
          },
        },
        rules: {
          type: { required: true, message: "题目类型必选" },
          content: { required: true, message: "题目必填" },
          module_id: { required: true, message: "模块必选" },
          prof_id: { required: true, message: "专业必选" },
          options: { required: true, message: "答案必填" },
        },
      };
    },
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = "添加题库";
        } else {
          this.title = "编辑题库";
          row.role = row.roles;
          row.pwdTwo = row.pwd;
          this.formData = JSON.parse(JSON.stringify(row));
          this.formData.queOptions.map((item) => (item.right = item.rig));
          this.formData.options = this.formData.queOptions;
        }
        this.formDesc = { ...this.options.formDesc, ...this.formDesc };
        this.dialogFormVisible = true;
      },
      handleClosed() {
        this.formData = {};
      },

      async handleSubmit(data) {
        const formData = JSON.parse(JSON.stringify(this.formData));
        const arr = formData.options.filter((item) => item.right == 1);
        if (arr.length === 0) {
          this.$baseMessage("请选择正确答案", "warning");
          return;
        }
        if (formData.type == 1 && arr.length > 1) {
          this.$baseMessage("此题为单选题,只能有一个正确答案", "warning");
          return;
        } else if (formData.type == 2 && arr.length == 1) {
          this.$baseMessage("此题为多选题,至少有两个正确答案", "warning");
          return;
        } else if (formData.type == 3) {
          if (formData.options.length !== 2) {
            this.$baseMessage(
              "此题为判断题,答案只能有两种,分别为对&错",
              "warning"
            );
            return;
          } else if (arr.length == 2) {
            this.$baseMessage("此题为判断题,只有一个正确答案", "warning");
            return;
          }
        }

        formData.options = JSON.stringify(formData.options);
        if (this.title.includes("添加")) {
          const {
            msg,
            data: { user },
          } = await addQuestion(formData);
          this.$baseMessage(msg, "success");
          this.$emit("fetchData", false);
        } else {
          const {
            msg,
            data: { user },
          } = await modifyQuestion(formData);
          this.$baseMessage(msg, "success");
          this.$emit("update", user);
        }
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
      .el-form-item--small.el-form-item {
        text-align: right;
      }
      .el-dialog__body {
        padding: 20px 20px 5px;
      }
    }
  }
</style>
