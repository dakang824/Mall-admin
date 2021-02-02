<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 编辑用户信息表单
 * @Date: 2020-12-06 18:40:37
 * @LastEditTime: 2021-02-02 15:55:27
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
  import { addSkillTree } from "@/api/skills";
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
            label: "名称",
            attrs: {
              clearable: true,
            },
          },
          prof_id: {
            type: "select",
            label: "专业",
            attrs: {
              clearable: true,
            },
            options: async () => {
              await this.$store.dispatch("globalRequest/findAllProfession");
              return this.professions;
            },
          },
        },
        rules: {
          prof_id: { required: true, message: "专业必选" },
          name: { required: true, message: "名称必填" },
        },
      };
    },
    computed: {
      ...mapState({
        professions: (state) => state.globalRequest.professions,
        professionsKeyVal: (state) => state.globalRequest.professionsKeyVal,
      }),
    },
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = "添加技能树";
        } else {
          this.title = "编辑成绩";
          this.formData = JSON.parse(JSON.stringify(row));
        }
        this.dialogFormVisible = true;
      },
      handleClosed() {
        this.formData = {};
      },

      async handleSubmit(data) {
        const formData = JSON.parse(JSON.stringify(this.formData));
        formData.up_id = 0;

        if (this.title.includes("添加")) {
          const {
            msg,
            data: { skillTree },
          } = await addSkillTree(formData);
          this.$baseMessage(msg, "success");
          this.$emit("add", { ...skillTree, status: 0 });
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
