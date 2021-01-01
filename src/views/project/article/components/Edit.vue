<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 编辑用户信息表单
 * @Date: 2020-12-06 18:40:37
 * @LastEditTime: 2021-01-01 22:53:24
-->
<template>
  <ele-form-drawer
    v-model="formData"
    label-position="left"
    :form-desc="formDesc"
    :rules="rules"
    :visible.sync="dialogFormVisible"
    :title="title"
    size="550px"
    :request-fn="handleSubmit"
    :order="[
      'title',
      'author',
      'cover_pic',
      'cate1',
      'nav_id',
      'prof_id',
      'start_time',
      'end_time',
      'group_id',
    ]"
    :form-btns="formBtns"
    @closed="handleClosed"
  ></ele-form-drawer>
</template>

<script>
  import { addArticle, modifyArticle, auditArticle } from "@/api/list";
  import { findAllProfession } from "@/api/professions";
  import { fileUpload } from "@/config/settings";
  import filters from "@/filters";
  export default {
    props: {
      options: { type: Object, default: () => {} },
    },
    data() {
      return {
        title: "添加",
        dialogFormVisible: false,
        formData: {
          title: "",
          author: "",
          cover_pic: "",
          cate1: "",
          nav_id: "",
          prof_id: "",
          start_time: "",
          end_time: "",
          group_id: "",
          content_pic: "",
          cover_pic1: "",
          content_pic1: "",
        },
        formDesc: {
          start_time: {
            type: "datetime",
            label: "开始日期",
            attrs: {
              format: "yyyy-MM-dd HH:mm:ss",
              "value-format": "yyyy-MM-dd HH:mm:ss",
            },
          },
          end_time: {
            type: "datetime",
            label: "结束日期",
            attrs: {
              format: "yyyy-MM-dd HH:mm:ss",
              "value-format": "yyyy-MM-dd HH:mm:ss",
            },
          },
          group_id: {
            type: "radio",
            label: "可见范围",
            options: async () => {
              const {
                data: {
                  professionList: { list },
                },
              } = await findAllProfession({ pageNo: 1, pageSize: 50 });

              return list.map((item) => {
                return { text: item.name, value: item.id };
              });
            },
          },
          cover_pic: {
            label: "封面图片",
            type: "image-uploader",
            attrs: {
              size: 80,
              fileType: ["png", "jpg", "jpeg", "gif"],
              accept: "image/*",
              action: fileUpload,
              responseFn: (response, file) => {
                const url = filters.imgBaseUrl(response.data.tempUrl);
                this.formData.cover_pic1 = response.data.tempUrl;
                return url;
              },
            },
          },
          content_pic: {
            type: "upload-file",
            attrs: {
              fileType: ["zip"],
              accept: "zip/*",
              action: fileUpload,
              limit: 1,
              responseFn: (response, file) => {
                this.formData.content_pic1 = response.data.tempUrl;
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
          title: { required: true, message: "标题必填" },
        },
        formBtns: [],
      };
    },
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = "添加文章";
          this.formBtns = [];
        } else {
          this.title = "编辑文章";
          row.role = row.roles;
          row.pwdTwo = row.pwd;
          this.formBtns = [
            {
              text: "提交审核",
              type: "primary",
              attrs: {
                disabled: false,
              },
              click: async () => {
                const { id, status } = this.formData;
                const {
                  msg,
                  data: { user },
                } = await auditArticle({ id, status });
                this.$baseMessage(msg, "success");
                this.$emit("fetchData", false);
              },
            },
          ];
          this.formData = JSON.parse(JSON.stringify(row));
        }
        const formDesc = this.options.formDesc;
        delete formDesc.status;
        this.formDesc = {
          ...this.formDesc,
          ...formDesc,
        };
        this.dialogFormVisible = true;
      },
      handleClosed() {
        this.formData = {};
      },

      async handleSubmit(data) {
        const formData = JSON.parse(JSON.stringify(this.formData));
        if (formData.cover_pic1 !== "") {
          formData.cover_pic = formData.cover_pic1;
        }
        if (formData.content_pic1 !== "") {
          formData.content_pic = formData.content_pic1;
        }

        if (this.title.includes("添加")) {
          const {
            msg,
            data: { article },
          } = await addArticle(formData);
          this.$baseMessage(msg, "success");
          this.$emit("add", article);
        } else {
          const {
            msg,
            data: { article },
          } = await modifyArticle(formData);
          this.$baseMessage(msg, "success");
          this.$emit("update", article);
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
  .ele-form-drawer {
    ::v-deep {
      .el-drawer__body {
        margin: 20px 0 0 0;
        padding: 0;
      }
      .el-form,
      .el-form > .el-row {
        min-height: calc(100vh - 68px);
        max-height: calc(100vh - 68px);
        position: relative;
      }
      .el-drawer__header {
        padding-bottom: 15px;
        margin-bottom: 0;
        border-bottom: 1px solid $base-border-color;
      }
      .el-row {
        margin: 0;
      }
      .el-row .el-col {
        padding: 0 20px;
      }
      .el-row .ele-form-btns {
        width: 106%;
        position: absolute;
        right: 0;
        bottom: 0;
        left: -20px;
        padding: 14px 20px 10px;
        text-align: right;
        border-top: 1px solid $base-border-color;
        background: #fff;
      }
      .el-radio-group {
        line-height: inherit;
      }
    }
  }
</style>
