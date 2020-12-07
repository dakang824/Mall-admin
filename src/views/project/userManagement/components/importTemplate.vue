<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 导入文件模板
 * @Date: 2020-12-07 15:16:44
 * @LastEditTime: 2020-12-07 16:20:00
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
    :form-btns="formBtns"
    :is-show-cancel-btn="false"
    @closed="handleClosed"
  ></ele-form-dialog>
</template>

<script>
  import filters from "@/filters";
  import { fileUpload } from "@/config/settings";
  export default {
    components: {},
    props: {
      title: {
        type: String,
        default: "导入文件",
      },
    },
    data() {
      return {
        dialogFormVisible: false,
        formData: {},
        formBtns: [
          {
            text: "下载模板",
            click: () => {
              alert("点击下一步了!");
            },
          },
        ],
        formDesc: {
          files: {
            label: "选择文件:",
            type: "upload-file",
            attrs: {
              action: filters.imgBaseUrl(fileUpload),
              responseFn(response, file) {
                return {
                  name: file.name,
                  url: URL.createObjectURL(file.raw),
                  size: file.size,
                };
              },
            },
          },
        },
        rules: {
          files: { required: true, message: "请选择文件" },
        },
      };
    },
    methods: {
      showImport(e) {
        this.formDesc = { ...e, ...this.formDesc };
        this.dialogFormVisible = true;
      },
      handleClosed() {
        this.dialogFormVisible = false;
      },
      handleSubmit(e) {
        console.log(e);
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
