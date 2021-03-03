<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 编辑用户信息表单
 * @Date: 2020-12-06 18:40:37
 * @LastEditTime: 2021-03-03 23:07:37
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
  import { mapState } from "vuex";
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
          account: {
            type: "input",
            label: "登录账号",
            attrs: {
              clearable: true,
            },
          },
          pwd: {
            type: "input",
            label: "密码",
            attrs: {
              clearable: true,
              type: "password",
            },
          },
          towPwd: {
            type: "input",
            label: "重复密码",
            attrs: {
              clearable: true,
              type: "password",
            },
          },
          name: {
            type: "input",
            label: "真实姓名",
            attrs: {
              clearable: true,
            },
          },
          mobile: {
            type: "input",
            label: "电话",
            attrs: {
              clearable: true,
            },
          },
          email: {
            type: "input",
            label: "邮箱",
            attrs: {
              clearable: true,
            },
          },
          fun_pri: {
            type: "select",
            label: "功能权限",
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
                value: 2,
              },
            ],
          },
          data_pri_prof: {
            type: "select",
            label: "专业权限",
            attrs: {
              clearable: true,
              multiple: true,
            },
            options: async () => {
              await this.$store.dispatch("globalRequest/findAllProfession");
              return this.professions;
            },
          },
          data_pri_company: {
            type: "select",
            label: "公司权限",
            attrs: {
              clearable: true,
              multiple: true,
            },
            options: async () => {
              await this.$store.dispatch("globalRequest/findAllCompany");
              return this.companyLists;
            },
          },
        },
        rules: {
          account: { required: true, message: "登录账号必填" },
          pwd: { required: true, message: "密码必填" },
          towPwd: { required: true, message: "重复密码必填" },
          name: { required: true, message: "真实姓名必填" },
          mobile: { required: true, message: "电话必填" },
          fun_pri: { required: true, message: "功能权限必选" },
          data_pri_prof: { required: true, message: "专业权限必选" },
          data_pri_company: { required: true, message: "公司权限必选" },
        },
      };
    },
    computed: {
      ...mapState({
        professions: (state) => state.globalRequest.professions,
        professionsKeyVal: (state) => state.globalRequest.professionsKeyVal,
        companyLists: (state) => state.globalRequest.companyLists,
        companyListsKeyVal: (state) => state.globalRequest.companyListsKeyVal,
      }),
    },
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = "添加管理员";
        } else {
          this.title = "编辑管理员";
          row.towPwd = row.pwd;
          if (!Array.isArray(row.data_pri_company)) {
            row.data_pri_company = row.data_pri_company
              .split(",")
              .map((item) => Number(item));
          }

          if (!Array.isArray(row.data_pri_prof)) {
            row.data_pri_prof = row.data_pri_prof
              .split(",")
              .map((item) => Number(item));
          }

          console.log(row);
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
