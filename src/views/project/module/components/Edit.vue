<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 编辑用户信息表单
 * @Date: 2020-12-06 18:40:37
 * @LastEditTime: 2021-02-19 11:43:49
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
  import { addModule, modifyModule } from "@/api/module";
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
          name: {
            type: "input",
            label: "模块名称",
            attrs: {
              clearable: true,
            },
          },
        },
        rules: {
          name: { required: true, message: "模块名称必填" },
          prof_id: { required: true, message: "所属专业必选" },
        },
      };
    },
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = "添加模块";
        } else {
          this.title = "编辑模块";
          row.role = row.roles;
          this.formData = JSON.parse(JSON.stringify(row));
        }
        this.formDesc = { ...this.formDesc, ...this.options.formDesc };
        this.dialogFormVisible = true;
      },
      handleClosed() {
        this.formData = {};
      },

      async handleSubmit(data) {
        if (this.title.includes("添加")) {
          const {
            msg,
            data: { module },
          } = await addModule(this.formData);
          this.$baseMessage(msg, "success");
          // this.$emit("add", module);
          this.$emit("fetchData", false);
        } else {
          const {
            msg,
            data: { module },
          } = await modifyModule(this.formData);
          this.$baseMessage(msg, "success");
          this.$emit("fetchData", false);
        }

        // 更新全局缓存模块管理数据
        await this.$store.dispatch("globalRequest/findModule");

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
