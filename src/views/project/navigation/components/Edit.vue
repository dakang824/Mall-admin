<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 编辑用户信息表单
 * @Date: 2020-12-06 18:40:37
 * @LastEditTime: 2021-01-01 22:08:57
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
    @closed="handleClosed"
  ></ele-form-dialog>
</template>

<script>
  import { addArtNav, modifyArtNav } from "@/api/navigation";
  export default {
    props: {
      options: { type: Object, default: () => {} },
    },
    data() {
      return {
        title: "添加",
        dialogFormVisible: false,
        formData: {
          pos: 0,
          title: "",
          open_prof: "",
        },
        formDesc: {
          title: {
            type: "input",
            label: "导航名称",
            attrs: {
              clearable: true,
            },
          },
          open_prof: {
            type: "select",
            label: "是否配置专业",
            attrs: {
              clearable: true,
            },
            options: [
              {
                text: "是",
                value: 1,
              },
              {
                text: "否",
                value: 0,
              },
            ],
          },
          pos: {
            type: "number",
            label: "导航排序",
            attrs: {
              clearable: true,
            },
          },
        },
        rules: {
          title: { required: true, message: "模块名称必填" },
          prof_id: { required: true, message: "所属专业必选" },
        },
      };
    },
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = "添加导航";
        } else {
          this.title = "编辑导航";
          this.formData = JSON.parse(JSON.stringify(row));
        }
        this.dialogFormVisible = true;
      },
      handleClosed() {
        this.formData = {};
      },

      async handleSubmit(data) {
        if (this.title.includes("添加")) {
          const {
            msg,
            data: { nav },
          } = await addArtNav(this.formData);
          this.$baseMessage(msg, "success");
          this.$emit("add", nav);
        } else {
          const {
            msg,
            data: { nav },
          } = await modifyArtNav(this.formData);
          this.$baseMessage(msg, "success");
          this.$emit("update", nav);
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
      .ele-form-btns {
        text-align: right;
      }
      .el-dialog__body {
        padding: 20px 20px 5px;
      }
    }
  }
</style>
