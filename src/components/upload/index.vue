<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 上传图片组件
 * @Date: 2020-12-02 19:13:46
 * @LastEditTime: 2020-12-02 20:01:37
-->
<template>
  <div class="upload">
    <el-upload
      :action="fileUpload"
      :list-type="listType"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      v-bind="$attrs"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog
      :visible.sync="dialogVisible"
      modal-append-to-body
      append-to-body
      title="图片详情"
    >
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
  import { fileUpload } from "@/config/settings";
  export default {
    components: {},
    props: {
      listType: {
        type: String,
        default: "picture-card",
      },
    },
    data() {
      return {
        dialogImageUrl: "",
        dialogVisible: false,
        fileUpload,
      };
    },
    methods: {
      handleSuccess(e) {
        this.$emit("success", e);
      },
      handleRemove(file, fileList) {
        this.$emit("delect", file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      beforeUpload(file) {
        const isJPG = file.type === "image/jpeg";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error("上传头像图片只能是 JPG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
      },
    },
  };
</script>

<style lang="scss" scoped></style>
