<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 编辑模拟考配置表单
 * @Date: 2020-12-06 18:40:37
 * @LastEditTime: 2021-03-05 22:58:01
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
    :order="['user_name', 'prof_id', 'module_id', 'company_id']"
    @closed="handleClosed"
  ></ele-form-dialog>
</template>

<script>
  import { mapState } from "vuex";
  import { addPlan, modifyPlan } from "@/api/planSum";
  export default {
    props: {
      options: { type: Object, default: () => {} },
    },
    data() {
      return {
        title: "添加计划",
        dialogFormVisible: false,
        formData: {},
        formDesc: {
          content: {
            type: "input",
            label: "实操内容",
          },
          project: {
            type: "input",
            label: "项目名称",
          },
          user_account: {
            type: "input",
            label: "用户erp账户",
          },
        },
        rules: {
          time: { required: true, message: "考试时间必选" },
          user_name: { required: true, message: "考试名称必填" },
          module_id: { required: true, message: "模块必选" },
          prof_id: { required: true, message: "专业必选" },
          company_id: { required: true, message: "专业必选" },
          tea_name: { required: true, message: "带教老师必选" },
          status: { required: true, message: "计划结果必选" },
          content: { required: true, message: "实操内容必填" },
          project: { required: true, message: "项目名称必填" },
          user_account: { required: true, message: "用户erp账号必填" },
        },
      };
    },
    computed: {
      ...mapState({
        moduleLists: (state) => state.globalRequest.moduleLists,
      }),
    },
    methods: {
      async showEdit(row) {
        await this.$store.dispatch("globalRequest/findModule");
        if (!row) {
          this.title = "添加计划";
        } else {
          this.title = "编辑计划";
          row.time = [row.time_from.slice(0, 19), row.time_to.slice(0, 19)];
          row.tea_name = row.teas.split(",");
          this.formData = JSON.parse(JSON.stringify(row));
        }
        delete this.options.formDesc.status;
        this.formDesc = { ...this.options.formDesc, ...this.formDesc };
        this.formData.moduleLists = this.moduleLists;
        this.dialogFormVisible = true;
      },
      handleClosed() {
        this.formData = {};
      },

      async handleSubmit(data) {
        const formData = JSON.parse(JSON.stringify(this.formData));
        formData.time_from = formData.time[0];
        formData.time_to = formData.time[1];
        formData.teas = formData.tea_name.join();
        if (this.title.includes("添加")) {
          const {
            msg,
            data: { plan },
          } = await addPlan(formData);
          this.$baseMessage(msg, "success");
          this.$emit("fetchData", false);
        } else {
          const {
            msg,
            data: { plan },
          } = await modifyPlan(formData);
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
