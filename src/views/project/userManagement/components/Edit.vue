<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 编辑用户信息表单
 * @Date: 2020-12-06 18:40:37
 * @LastEditTime: 2020-12-06 23:18:25
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
    @request-success="handleSuccess"
    @closed="handleClosed"
  ></ele-form-dialog>
</template>

<script>
  export default {
    name: "FormDialog",
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
            label: "姓名",
          },
          account: {
            type: "input",
            label: "ERP号",
          },
          role: {
            type: "select",
            label: "角色",
            isOptions: true,
            options: [],
          },
          comp_id: {
            type: "select",
            label: "所属公司",
            prop: { text: "name", value: "id" },
            options: [],
          },
          prof_group_id: {
            type: "select",
            label: "专业组",
            options: [],
          },
          type: {
            type: "select",
            label: "用户类型",
            options: [],
          },
        },
        // 校检规则
        rules: {
          name: { required: true, message: "姓名必填" },
          account: { required: true, message: "ERP号必填" },
          role: { required: true, message: "角色必选" },
          comp_id: { required: true, message: "所属公司必选" },
          prof_group_id: { required: true, message: "专业组必选" },
          type: { required: true, message: "用户类型必选" },
        },
      };
    },
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = "添加";
        } else {
          this.title = "编辑";
          row.role = row.roles;
          this.formData = Object.assign({}, row);
        }
        const { roles, companys, typeOptions, professions } = this.options;
        this.formDesc.roles.options = roles;
        this.formDesc.comp_id.options = companys;
        this.formDesc.type.options = typeOptions;
        this.formDesc.prof_group_id = professions;
        this.dialogFormVisible = true;
      },
      handleClosed() {
        this.formData = {};
      },

      handleSuccess(data) {
        // 关闭弹窗
        this.dialogFormVisible = false;
        // 重置formData
        this.formData = {};
        this.$message.success("创建成功");
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
