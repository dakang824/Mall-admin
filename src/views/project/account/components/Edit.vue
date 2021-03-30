<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 编辑用户信息表单
 * @Date: 2020-12-06 18:40:37
 * @LastEditTime: 2021-03-30 21:45:17
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
  import { asyncRoutes } from "@/router";
  import { mapState } from "vuex";
  import { addPlatAdmin, modifyPlatAdmin } from "@/api/settings";
  var sha1 = require("sha1");
  export default {
    props: {
      options: { type: Object, default: () => {} },
    },
    data() {
      return {
        arrRoute: [],
        oldPwd: "",
        route: [], //所有栏目集合
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
            disabled(data) {
              return data.name === "超级管理员";
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
            type: "checkbox",
            label: "功能权限",
            attrs: {
              clearable: true,
            },
            options: [],
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
    created() {
      this.handleChildren(asyncRoutes);
      let router = this.arrRoute
        .map((item) => {
          return item.children.map((i) => i.meta.title);
        })
        .flat(Infinity);
      router.shift();
      this.formDesc.fun_pri.options = router;
    },
    methods: {
      handleChildren(children = [], parent) {
        if (children === null) children = [];
        const showChildren = children.filter((item) => {
          if (item.hidden) {
            return false;
          } else {
            this.arrRoute.push(item);
            return true;
          }
        });
        if (showChildren.length === 1) {
          return true;
        }

        if (showChildren.length === 0) {
          this.arrRoute.push({
            ...parent,
            path: "",
            notShowChildren: true,
          });
          return true;
        }
        return false;
      },
      showEdit(row) {
        if (!row) {
          this.title = "添加管理员";
        } else {
          this.title = "编辑管理员";
          row.towPwd = row.pwd;
          this.oldPwd = row.pwd;

          this.oldAccount = row.account;
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

          if (!Array.isArray(row.fun_pri)) {
            row.fun_pri = row.fun_pri.split(",").map((item) => item);
          }

          this.formData = JSON.parse(JSON.stringify(row));
        }
        this.dialogFormVisible = true;
      },
      handleClosed() {
        this.formData = {};
      },

      async handleSubmit(data) {
        if (this.formData.pwd !== this.formData.towPwd) {
          this.$baseMessage("两次密码不匹配,请重新输入", "error");
          return false;
        }
        const formData = JSON.parse(JSON.stringify(this.formData));
        formData.fun_pri.unshift("首页");
        formData.fun_pri = formData.fun_pri.join();
        formData.data_pri_prof = formData.data_pri_prof.join();
        formData.data_pri_company = formData.data_pri_company.join();

        const { oldPwd, oldAccount } = this;
        if (oldPwd === formData.pwd) {
          delete formData.pwd;
          delete formData.towPwd;
        } else {
          formData.pwd = sha1(formData.pwd);
        }
        if (oldAccount === formData.account) {
          delete formData.account;
        }
        if (this.title.includes("添加")) {
          const {
            msg,
            data: { admin_info },
          } = await addPlatAdmin(formData);
          this.$baseMessage(msg, "success");
          this.$emit("fetchData", false);
        } else {
          const {
            msg,
            data: { admin_info },
          } = await modifyPlatAdmin(formData);
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
