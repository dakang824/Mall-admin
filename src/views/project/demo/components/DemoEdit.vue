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
          date: {
            type: "date",
            label: "年龄",
            valueFormatter(value) {
              const date = new Date(value * 1000);
              return (
                date.getFullYear() +
                "/" +
                date.getMonth() +
                "/" +
                date.getDate()
              );
            },
          },
          address: {
            type: "input",
            label: "地址",
          },
        },
        // 校检规则
        rules: {
          name: { required: true, message: "姓名必填" },
          date: { required: true, message: "日期必填" },
          address: { required: true, message: "地址必填" },
        },
      };
    },
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = "添加";
        } else {
          this.title = "编辑";
          row.name = "测试";
          this.formData = Object.assign({}, row);
        }
        this.dialogFormVisible = true;
      },
      handleClosed() {
        this.formData = {};
      },
      handleSuccess(data) {
        console.log(data);
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
