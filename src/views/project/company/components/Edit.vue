<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 编辑用户信息表单
 * @Date: 2020-12-06 18:40:37
 * @LastEditTime: 2021-02-19 11:43:19
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
  import { addCompany, modifyCompany } from "@/api/company";
  export default {
    props: {
      options: { type: Object, default: () => {} },
    },
    data() {
      return {
        title: "添加",
        dialogFormVisible: false,
        formData: {},
        formDesc: {},
        rules: {
          name: { required: true, message: "单位名称必填" },
        },
      };
    },
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = "添加单位";
        } else {
          this.title = "编辑单位";
          row.role = row.roles;
          this.formData = JSON.parse(JSON.stringify(row));
        }
        this.formDesc = this.options.formDesc;
        this.dialogFormVisible = true;
      },
      handleClosed() {
        this.formData = {};
      },

      async handleSubmit(data) {
        if (this.title.includes("添加")) {
          const {
            msg,
            data: { company },
          } = await addCompany(this.formData);
          this.$baseMessage(msg, "success");
          this.$emit("add", company);
        } else {
          const {
            msg,
            data: { company },
          } = await modifyCompany(this.formData);
          this.$baseMessage(msg, "success");
          this.$emit("update", company);
        }

        // 更新全局缓存单位管理数据
        await this.$store.dispatch("globalRequest/findAllCompany");

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
