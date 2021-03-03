<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 编辑模拟考配置表单
 * @Date: 2020-12-06 18:40:37
 * @LastEditTime: 2021-03-03 21:05:51
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
  import { addPlan, modifyPlan } from "@/api/mockTest";
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
          // time: {
          //   type: "datetimerange",
          //   label: "考试时间",
          //   attrs: {
          //     clearable: true,
          //     format: "yyyy-MM-dd HH:mm:ss",
          //     "value-format": "yyyy-MM-dd HH:mm:ss",
          //   },
          // },
        },
        rules: {
          time: { required: true, message: "考试时间必选" },
          user_name: { required: true, message: "考试名称必填" },
          module_id: { required: true, message: "模块必选" },
          prof_id: { required: true, message: "专业必选" },
          company_id: { required: true, message: "专业必选" },
          time: { required: true, message: "开始时长必填" },
          judge_count: { required: true, message: "判断题数量必填" },
          judge_score: { required: true, message: "判断题分数必填" },
          radio_count: { required: true, message: "单选题数量必填" },
          radio_score: { required: true, message: "单选题分数必填" },
          check_count: { required: true, message: "多选题数量必填" },
          check_score: { required: true, message: "多选题分数必填" },
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
          row.start_end = [
            row.start_time.slice(0, 19),
            row.end_time.slice(0, 19),
          ];
          this.formData = JSON.parse(JSON.stringify(row));
        }
        this.formDesc = { ...this.options.formDesc, ...this.formDesc };
        this.formData.moduleLists = this.moduleLists;
        this.dialogFormVisible = true;
      },
      handleClosed() {
        this.formData = {};
      },

      async handleSubmit(data) {
        const formData = JSON.parse(JSON.stringify(this.formData));
        formData.start_time = formData.start_end[0];
        formData.end_time = formData.start_end[1];
        if (this.title.includes("添加")) {
          const {
            msg,
            data: { tests },
          } = await addPlan(formData);
          this.$baseMessage(msg, "success");
          this.$emit("fetchData", false);
        } else {
          const {
            msg,
            data: { tests },
          } = await modifyPlan(formData);
          this.$baseMessage(msg, "success");
          this.$emit("update", tests);
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
