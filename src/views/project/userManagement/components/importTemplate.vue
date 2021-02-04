<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 用户导入模板
 * @Date: 2020-12-07 15:16:44
 * @LastEditTime: 2021-02-04 17:27:45
-->
<template>
  <ele-form-dialog
    v-model="formData"
    label-position="left"
    :form-desc="formDesc"
    :rules="rules"
    :dialog-attrs="{ destroyOnClose: true }"
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
  import { getUserTemplate, importUsers } from "@/api/userManagement";
  import { fileUpload } from "@/config/settings";
  export default {
    components: {},
    props: {
      title: {
        type: String,
        default: "用户导入",
      },
    },
    data() {
      return {
        dialogFormVisible: false,
        formData: {},
        file: "",
        formBtns: [
          {
            text: "下载模板",
            click: async () => {
              const {
                data: { excel_path },
              } = await getUserTemplate();
              window.open(filters.imgBaseUrl(excel_path), "_parent");
            },
          },
        ],
        formDesc: {
          files: {
            label: "选择文件:",
            type: "upload-file",
            attrs: {
              action: fileUpload,
              limit: 1,
              accept: ".xlsx",
              responseFn: (response, file) => {
                this.file = response.data.tempUrl;
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
        this.dialogFormVisible = true;
      },
      handleClosed() {
        this.dialogFormVisible = false;
      },
      async handleSubmit(e) {
        const {
          msg,
          data: { exceptionFile = null },
        } = await importUsers({ userFile: this.file });
        if (exceptionFile) {
          window.open(filters.imgBaseUrl(exceptionFile), "_parent");
        } else {
          this.$baseMessage(msg, "success");
          this.handleClosed();
        }
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
