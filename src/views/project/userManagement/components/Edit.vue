<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 编辑用户信息表单
 * @Date: 2020-12-06 18:40:37
 * @LastEditTime: 2021-02-04 18:40:07
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
    :order="['name', 'account', 'pwd', 'pwdTwo']"
    @closed="handleClosed"
  ></ele-form-dialog>
</template>

<script>
  import { addUser, modifyUser } from "@/api/userManagement";
  var sha1 = require("sha1");
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
          pwd: {
            type: "input",
            label: "密码",
            attrs: {
              clearable: true,
              type: "password",
            },
          },
          pwdTwo: {
            type: "input",
            label: "确认密码",
            attrs: {
              clearable: true,
              type: "password",
            },
          },
        },
        oldPwd: "",
        rules: {
          name: { required: true, message: "姓名必填" },
          account: { required: true, message: "账号必填" },
          role: { required: true, message: "角色必选" },
          comp_id: { required: true, message: "所属公司必选" },
          prof_group_id: { required: true, message: "专业组必选" },
          type: { required: true, message: "用户类型必选" },
          pwd: { required: true, message: "密码必填" },
          pwdTwo: { required: true, message: "确认密码必填" },
        },
      };
    },
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = "添加用户";
        } else {
          this.title = "编辑用户";
          row.role = row.roles;
          row.pwdTwo = row.pwd;
          this.oldPwd = row.pwd;
          this.formData = JSON.parse(JSON.stringify(row));
        }
        this.formDesc = { ...this.formDesc, ...this.options.formDesc };
        this.dialogFormVisible = true;
      },
      handleClosed() {
        this.formData = {};
      },

      async handleSubmit(data) {
        if (this.formData.pwd !== this.formData.pwdTwo) {
          this.$baseMessage("密码不匹配,请重新输入", "error");
          return false;
        }
        const { formData, oldPwd } = this;
        if (oldPwd === formData.pwd) {
          delete formData.pwd;
          delete formData.pwdTwo;
        } else {
          formData.pwd = sha1(formData.pwd);
          formData.pwdTwo = sha1(formData.pwdTwo);
        }
        if (this.title.includes("添加")) {
          const {
            msg,
            data: { user },
          } = await addUser(formData);
          this.$baseMessage(msg, "success");
          this.$emit("fetchData", false);
        } else {
          const {
            msg,
            data: { user },
          } = await modifyUser(formData);
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
