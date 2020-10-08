<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-10-03 16:12:52
 * @LastEditTime: 2020-10-06 22:44:52
-->
<template>
  <div class="storeSet-container">
    <el-card class="box-card" shadow="never">
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="small"
        label-width="101px"
      >
        <el-form-item label="店铺名称" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="将展示为前台店铺名称"
            :maxlength="11"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="店铺地址" prop="field116">
          <el-cascader
            v-model="formData.address"
            style="width: 100%"
            :options="options"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="店铺logo" prop="field117" required>
          <el-upload
            ref="field117"
            :file-list="field117fileList"
            :action="action"
            :before-upload="handleBeforeUpload"
            list-type="picture-card"
            :limit="1"
            :on-success="handleSuccess"
          >
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">将展示为前台店铺logo</div>
          </el-upload>
        </el-form-item>
        <el-button
          type="primary"
          size="medium"
          style="width: 140px; margin-left: 100px"
          @click="handelConfirm"
        >
          保存
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { getList, doDelete } from "@/api/storeSet";
  import { fileUpload } from "@/config/settings";
  import { regionData } from "element-china-area-data";
  export default {
    name: "StoreSet",
    components: {},
    data() {
      return {
        action: fileUpload,
        options: regionData,
        formData: {
          name: "",
          field116: "",
          field117: "",
        },
        rules: {
          name: [
            {
              required: true,
              message: "将展示为前台店铺名称",
              trigger: "blur",
            },
            {
              pattern: /^1(3|4|5|7|8|9)\d{9}$/,
              message: "手机号格式错误",
              trigger: "blur",
            },
          ],
          field116: [
            {
              required: true,
              message: "将展示为前台店铺名称",
              trigger: "blur",
            },
            {
              pattern: /^1(3|4|5|7|8|9)\d{9}$/,
              message: "手机号格式错误",
              trigger: "blur",
            },
          ],
        },
        field117Action: "https://jsonplaceholder.typicode.com/posts/",
        field117fileList: [],
      };
    },
    created() {},
    methods: {
      handleSuccess(response, file, fileList) {
        console.log(response, file, fileList);
      },
      handelConfirm() {
        this.$refs["elForm"].validate((valid) => {
          if (!valid) return;
          this.close();
        });
      },
      handleBeforeUpload(file) {
        let isRightSize = file.size / 1024 / 1024 < 2;
        if (!isRightSize) {
          this.$message.error("文件大小超过 2MB");
        }
        return isRightSize;
      },
    },
  };
</script>
