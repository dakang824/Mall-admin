<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-11-11 21:20:15
 * @LastEditTime: 2020-11-19 11:24:52
-->
<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="form.name"
          autocomplete="off"
          placeholder="请输入广告名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="ad_no">
        <el-input
          v-model="form.ad_no"
          autocomplete="off"
          placeholder="请输入广告编号"
        ></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="url">
        <el-input
          v-model="form.url"
          autocomplete="off"
          placeholder="请输入要跳转的地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="pic_path">
        <el-upload
          ref="pics_img"
          :file-list="form.pic_path"
          :action="fileUpload"
          :before-upload="imgBeforeUpload"
          list-type="picture"
          accept="image/*"
          :on-success="handlePicsSuccess"
          :before-remove="handlePicsRemove"
          :limit="1"
        >
          <el-button size="small" type="primary" icon="el-icon-upload">
            添加图片
          </el-button>
          <div slot="tip" class="el-upload__tip">建议尺寸300px*573px</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { addBanner, modifyAds } from "@/api/ads";
  import { fileUpload } from "@/config/settings";
  import filters from "@/filters";
  export default {
    name: "BannerEdit",
    data() {
      return {
        fileUpload,
        form: {
          name: "",
          pos: "",
          url: "",
          pic_path: [],
        },
        rules: {
          name: [
            { required: true, trigger: "blur", message: "请输入banner名称" },
          ],
          ad_no: [
            { required: true, trigger: "blur", message: "请输入广告编号" },
            {
              pattern: /^[0-9]*$/,
              message: "请输入数字",
              trigger: "blur",
            },
          ],
          pic_path: [
            { required: true, trigger: "blur", message: "请上传图片" },
          ],
        },
        title: "",
        dialogFormVisible: false,
      };
    },
    created() {},
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = "添加Banner";
        } else {
          this.title = "编辑Banner";
          row.pic_path = [{ url: filters.imgBaseUrl(row.img_path) }];
          this.form = JSON.parse(JSON.stringify(row));
        }
        this.dialogFormVisible = true;
      },
      close() {
        this.$refs["form"].resetFields();
        this.form = this.$options.data().form;
        this.dialogFormVisible = false;
      },
      handlePicsRemove(file) {
        this.form.pic_path.splice(0, 1);
      },
      handlePicsSuccess(e) {
        this.form.pic_path = [{ url: filters.imgBaseUrl(e.data.tempUrl) }];
        this.form.img_path = e.data.tempUrl;
        if (e.code === 500) {
          this.$baseAlert(e.msg, "温馨提示");
        }
        this.$refs.form.clearValidate("pics");
      },
      imgBeforeUpload(file) {
        let isRightSize = file.size / 1024 / 1024 < 2;
        if (!isRightSize) {
          this.$message.error("文件大小超过 2MB");
        }
        let isAccept = new RegExp("image/*").test(file.type);
        if (!isAccept) {
          this.$message.error("应该选择image/*类型的文件");
        }
        return isRightSize && isAccept;
      },
      save() {
        this.$refs["form"].validate(async (valid) => {
          let form = Object.assign({}, this.form);
          form.pic_path = form.img_path;
          if (valid) {
            if (this.title.includes("添加")) {
              const {
                msg,
                data: { banner },
              } = await addBanner(form);
              this.$baseMessage(msg, "success");
              banner.img_path = banner.pic_path;
              this.$emit("add", banner);
              this.close();
            } else {
              const {
                msg,
                data: { banner },
              } = await modifyAds(form);
              this.$baseMessage(msg, "success");
              banner.img_path = banner.pic_path;
              this.$emit("update", banner);
              this.close();
            }
          } else {
            return false;
          }
        });
      },
    },
  };
</script>
