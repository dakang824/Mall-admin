<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-10-03 16:12:52
 * @LastEditTime: 2020-11-06 22:18:40
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
        <el-form-item label="店铺地址" prop="address">
          <el-cascader
            v-model="formData.address"
            style="width: 100%"
            :options="options"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="店铺logo" prop="logoPath" required>
          <el-upload
            ref="field117"
            :file-list="fileList"
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
  import { regionData, CodeToText, TextToCode } from "element-china-area-data";
  import { modifyStore } from "@/api/store";
  import { mapState } from "vuex";
  import filters from "@/filters";
  export default {
    name: "StoreSet",
    components: {},
    data() {
      return {
        action: fileUpload,
        options: regionData,
        formData: {
          name: "",
          address: "",
          logoPath: "",
        },
        rules: {
          name: [
            {
              required: true,
              message: "将展示为前台店铺名称",
              trigger: "blur",
            },
          ],
          address: [
            {
              required: true,
              message: "将展示为前台店铺地址",
              trigger: "blur",
            },
          ],
          logoPath: [
            {
              required: true,
              message: "将展示为前台店铺logo",
              trigger: "blur",
            },
          ],
        },
        fileList: [],
      };
    },
    created() {
      this.formData = this.$store.state.user.store[0];
      const { logoPath, address } = this.formData;
      if (logoPath) {
        this.formData.fileList.push({
          url: filters.imgBaseUrl(logoPath),
        });
      }
      const addr =
        address && typeof address === "string" ? address.split("/") : [];
      if (addr.length) {
        const province = TextToCode[addr[0]];
        const city = province[addr[1]];
        const county = city[addr[2]];
        this.formData.address = [];
        this.formData.address.push(province.code, city.code, county.code);
      }
    },
    methods: {
      handleSuccess(response, file, fileList) {
        let {
          data: { tempUrl },
        } = response;
        if (tempUrl) {
          this.formData.logoPath = tempUrl;
          this.fileList.push({
            url: filters.imgBaseUrl(tempUrl),
          });
        }
      },
      handelConfirm() {
        this.$refs["elForm"].validate(async (valid) => {
          if (valid) {
            const form = JSON.parse(JSON.stringify(this.formData));
            form.address = `${CodeToText[form.address[0]]}/${
              CodeToText[form.address[1]]
            }/${CodeToText[form.address[2]]}`;
            const { msg } = await modifyStore(form);
            this.$baseMessage(msg, "success");
          } else {
            return;
          }
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
