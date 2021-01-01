<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 编辑用户信息表单
 * @Date: 2020-12-06 18:40:37
 * @LastEditTime: 2021-01-01 19:44:52
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
    :order="[
      'user_account',
      'name',
      'test_name',
      'type',
      'prof_id',
      'score',
      'test_time',
    ]"
    @closed="handleClosed"
  ></ele-form-dialog>
</template>

<script>
  import { mapState } from "vuex";
  import { addUserScore, modifyUserScore } from "@/api/userScore";
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
          user_account: {
            type: "input",
            label: "erp账户",
            attrs: {
              clearable: true,
            },
          },
          score: {
            type: "input",
            label: "得分",
            attrs: {
              clearable: true,
            },
          },
          test_time: {
            type: "date",
            label: "考试时间",
            attrs: {
              clearable: true,
              format: "yyyy-MM-dd",
              "value-format": "yyyy-MM-dd",
            },
          },
        },
        rules: {
          name: { required: true, message: "姓名必填" },
          user_account: { required: true, message: "erp账户必填" },
          test_name: { required: true, message: "试卷名称必填" },
          score: { required: true, message: "得分必填" },
          prof_id: { required: true, message: "专业必选" },
          test_time: { required: true, message: "考试时间必填" },
          type: { required: true, message: "类型必选" },
        },
      };
    },
    computed: {
      ...mapState({
        professionsKeyVal: (state) => state.globalRequest.professionsKeyVal,
      }),
    },
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = "添加成绩";
        } else {
          this.title = "编辑成绩";
          this.formData = JSON.parse(JSON.stringify(row));
        }
        delete this.options.formDesc.company_id;
        this.formDesc = { ...this.formDesc, ...this.options.formDesc };
        this.dialogFormVisible = true;
      },
      handleClosed() {
        this.formData = {};
      },

      async handleSubmit(data) {
        const formData = JSON.parse(JSON.stringify(this.formData));
        formData.prof_name = this.professionsKeyVal[formData.prof_id];

        if (this.title.includes("添加")) {
          const {
            msg,
            data: { userScore },
          } = await addUserScore(formData);
          this.$baseMessage(msg, "success");
          this.$emit("fetchData", false);
        } else {
          const {
            msg,
            data: { userScore },
          } = await modifyUserScore(formData);
          this.$baseMessage(msg, "success");
          this.$emit("update", userScore);
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
