<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 编辑用户信息表单
 * @Date: 2020-12-06 18:40:37
 * @LastEditTime: 2020-12-08 21:09:07
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
      'cate2',
      'cate3',
      'start_time',
      'end_time',
      'group_id',
    ]"
    @closed="handleClosed"
  ></ele-form-drawer>
</template>

<script>
  import { addArticle, modifyArticle } from "@/api/list";
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
          cate2: "",
          cate3: "",
          start_time: "",
          end_time: "",
          group_id: "",
          content_pic: "",
        },
        formDesc: {
          cover_pic: {
            label: "封面图片",
            type: "image-uploader",
            attrs: {
              size: 80,
              fileType: ["png", "jpg", "jpeg"],
              accept: "image/*",
              action: filters.imgBaseUrl(fileUpload),
              handleResponse(response, file, fileList) {
                return "https://xxx.xxx.com/image/" + response.id;
              },
            },
          },
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
          content_pic: {
            type: "upload-file",
            attrs: {
              fileType: ["zip"],
              accept: "zip/*",
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
          title: { required: true, message: "标题必填" },
        },
      };
    },
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = "添加文章";
        } else {
          this.title = "编辑文章";
          row.role = row.roles;
          row.pwdTwo = row.pwd;
          this.formData = JSON.parse(JSON.stringify(row));
        }
        const formDesc = this.options.formDesc;
        delete formDesc.status;
        console.log(formDesc);
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
        if (this.title.includes("添加")) {
          const {
            msg,
            data: { user },
          } = await addArticle(this.formData);
          this.$baseMessage(msg, "success");
          this.$emit("fetchData", false);
        } else {
          const {
            msg,
            data: { user },
          } = await modifyArticle(this.formData);
          this.$baseMessage(msg, "success");
          this.$emit("update", user);
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
        line-height: auto;
      }
    }
  }
</style>
