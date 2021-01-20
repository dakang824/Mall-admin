<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-10-03 09:17:16
 * @LastEditTime: 2021-01-20 17:23:20
-->

<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <div
      style="
        height: 540px;
        overflow-y: auto;
        overflow-x: hidden;
        padding-right: 8px;
      "
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="店铺名称" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺账号" prop="account">
          <el-input v-model="form.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input
            v-model="form.pwd"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="prodPri" label="店铺权限">
          <el-select
            v-model="form.prodPri"
            placeholder="请选择权限"
            multiple
            style="width: 100%"
          >
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-cascader
            v-model="form.address"
            style="width: 100%"
            :options="options"
            @change="handleAddress"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input v-model="form.contact" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-select
            v-model="form.status"
            placeholder="请选择店铺状态"
            style="width: 100%"
          >
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="描述相符" prop="desScore" label-width="89px">
              <el-input
                v-model="form.desScore"
                autocomplete="off"
                max="5"
                min="0"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="与同行业相比"
              prop="desCompare"
              label-width="100px"
            >
              <el-input
                v-model="form.desCompare"
                autocomplete="off"
                max="100"
                min="0"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="服务态度" prop="serScore" label-width="89px">
              <el-input
                v-model="form.serScore"
                autocomplete="off"
                max="5"
                min="0"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="与同行业相比"
              prop="serCompare"
              label-width="100px"
            >
              <el-input
                v-model="form.serCompare"
                autocomplete="off"
                max="100"
                min="0"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="物流服务" prop="postStore" label-width="89px">
              <el-input
                v-model="form.postScore"
                autocomplete="off"
                max="5"
                min="0"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="与同行业相比"
              prop="postCompare"
              label-width="100px"
            >
              <el-input
                v-model="form.postCompare"
                autocomplete="off"
                max="100"
                min="0"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="店铺资质" prop="account">
          <ele-upload-image
            v-model="path1"
            :action="fileUpload"
            :response-fn="handleResponse"
            :before-remove="handleDelete"
            multiple
            :size="100"
          />
        </el-form-item>
        <el-form-item label="食品安全" prop="account">
          <ele-upload-image
            v-model="path2"
            :action="fileUpload"
            :response-fn="handleResponse"
            :before-remove="handleDelete"
            multiple
            :size="100"
          />
        </el-form-item>
        <el-form-item label="溯源" prop="account">
          <ele-upload-image
            v-model="path3"
            :action="fileUpload"
            :response-fn="handleResponse"
            :before-remove="handleDelete"
            multiple
            :size="100"
          />
        </el-form-item>
        <el-form-item label="运营" prop="account">
          <ele-upload-image
            v-model="path4"
            :action="fileUpload"
            :response-fn="handleResponse"
            :before-remove="handleDelete"
            multiple
            :size="100"
          />
        </el-form-item>
        <el-form-item label="其他" prop="account">
          <ele-upload-image
            v-model="path5"
            :action="fileUpload"
            :response-fn="handleResponse"
            :before-remove="handleDelete"
            multiple
            :size="100"
          />
        </el-form-item>
      </el-form>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {
    addStore,
    modifyStore,
    addStorePic,
    deleteStorePic,
  } from "@/api/store";
  import EleUploadImage from "vue-ele-upload-image";
  import { fileUpload } from "@/config/settings";
  import filters from "@/filters";
  import {
    provinceAndCityData,
    CodeToText,
    TextToCode,
  } from "element-china-area-data";
  export default {
    name: "StoreEdit",
    components: { EleUploadImage },
    props: {
      roles: {
        type: Array,
        default: () => {
          return [];
        },
      },
      status: {
        type: Array,
        default: () => {
          return [];
        },
      },
    },
    data() {
      var validNumber = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("不能为空"));
        } else if (value > 5) {
          callback(new Error("分值不能大于5"));
        } else if (isNaN(value)) {
          callback(new Error("请输入数字"));
        } else {
          callback();
        }
      };
      return {
        options: provinceAndCityData,
        oldPwd: "",
        fileUpload,
        form: {
          name: "",
          account: "",
          pwd: "",
          address: "",
          mobile: "",
          contact: "",
          prodPri: [],
          status: "",
          desScore: "5.0",
          serScore: "5.0",
          postScore: "5.0",
          desCompare: "95",
          serCompare: "95",
          postCompare: "95",
          province: "",
          city: "",
          storePics: [],
        },
        rules: {
          name: [
            { required: true, trigger: "blur", message: "请输入店铺名称" },
          ],
          account: [
            { required: true, trigger: "blur", message: "请输入店铺账号" },
          ],
          pwd: [{ required: true, trigger: "blur", message: "请输入密码" }],
          address: [{ required: true, trigger: "blur", message: "请输入地址" }],
          mobile: [
            { required: true, trigger: "blur", message: "请输入电话" },
            {
              pattern: /^[0-9]*$/,
              message: "请输入数字",
              trigger: "blur",
            },
          ],
          desScore: [
            {
              validator: validNumber,
              trigger: "blur",
            },
          ],
          serScore: [
            {
              validator: validNumber,
              trigger: "blur",
            },
          ],
          postScore: [
            {
              validator: validNumber,
              trigger: "blur",
            },
          ],
          contact: [
            { required: true, trigger: "blur", message: "请输入联系人" },
          ],
          prodPri: [
            { required: true, trigger: "blur", message: "请选择店铺权限" },
          ],
        },
        title: "",
        dialogFormVisible: false,
        path1: [],
        path2: [],
        path3: [],
        path4: [],
        path5: [],
      };
    },
    created() {},
    methods: {
      handleResponse(response, file, fileList) {
        return filters.imgBaseUrl(response.data.tempUrl);
      },
      handleAddress(value) {
        let address = value.map((item) => CodeToText[`${item}`]);
        this.form.province = address[0];
        this.form.city = address[1];
      },
      async handleDelete(e) {
        const len = filters.imgBaseUrl("").length;
        console.log(e, this.form.storePics);
        const current = this.form.storePics.find(
          (item) => item.pic_path === e.substr(len)
        );
        await deleteStorePic({ id: current.id });
        this.$emit("fetchData", false);
      },
      showEdit(row) {
        if (!row) {
          this.title = "添加店铺";
          this.form.status = 1;
        } else {
          this.title = "编辑店铺";
          var row = JSON.parse(JSON.stringify(row));
          row.desScore = row.desScore?.toFixed(1);
          row.serScore = row.serScore?.toFixed(1);
          row.postScore = row.postStore?.toFixed(1);
          Array.from(
            { length: 5 },
            (e, i) =>
              (this[`path${i + 1}`] = row.storePics
                .filter((item) => item.type === i + 1)
                .map((item) => filters.imgBaseUrl(item.pic_path)))
          )
            .filter((item) => item.length)
            .flat();
          const t = !row.province && !row.city;
          if (t) {
            const a = row.address?.split(" ") || [null, null];
            row.province = a[0];
            row.city = a[1];
          }
          row.province && row.city
            ? (row.province = row.address = [
                TextToCode[row.province].code,
                TextToCode[row.province][row.city].code,
              ])
            : "";

          const prodPri = this.roles
            .map((item) => {
              if ((row.prodPri & item.value) > 0) {
                return item.value;
              }
            })
            .filter((item) => item !== undefined);
          row.prodPri = prodPri;
          this.oldPwd = row.pwd;
          this.form = Object.assign({}, row);
        }
        this.dialogFormVisible = true;
      },
      close() {
        this.$refs["form"].resetFields();
        this.form = this.$options.data().form;
        this.path1 = [];
        this.path2 = [];
        this.path3 = [];
        this.path4 = [];
        this.path5 = [];
        this.$emit("fetchData", false);
        this.dialogFormVisible = false;
      },
      getImgPath(arr, type) {
        const len = filters.imgBaseUrl("").length;
        return arr.map((item) => {
          return {
            type,
            pic_path: item.substr(len),
          };
        });
      },
      save() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            const len = filters.imgBaseUrl("").length;
            const form = JSON.parse(JSON.stringify(this.form));
            form.prodPri = form.prodPri.reduce((a, b) => a + b);

            if (Array.isArray(form.province)) {
              form.address = form.province
                .map((item) => CodeToText[`${item}`])
                .join(" ");
            } else {
              form.address = form.province + " " + form.city;
            }

            const arr = Array.from({ length: 5 }, (e, i) =>
              this.getImgPath(this[`path${i + 1}`], i + 1)
            )
              .filter((item) => item.length)
              .flat();

            // 判断哪些图片是新添加的
            if (this.title.includes("编辑")) {
              const storePics = form.storePics.map((item) => {
                const arr = item.pic_path.split("/");
                return arr[arr.length - 1];
              });
              const currentData = arr.map((item) => {
                const arr = item.pic_path.split("/");
                return arr[arr.length - 1];
              });
              const newData = currentData.filter(
                (item) => !storePics.includes(item)
              );

              newData.map((item) => {
                arr
                  .filter((i) => i.pic_path.endsWith(item))
                  .map(async (e) => {
                    await addStorePic({
                      store_id: form.id,
                      ...e,
                      ignoreStoreId: true,
                    });
                  });
              });
            }

            form.storePics = JSON.stringify(arr);
            if (this.oldPwd === form.pwd) {
              delete form.pwd;
            }
            if (this.title.includes("添加")) {
              const {
                msg,
                data: { store },
              } = await addStore(form);
              this.$baseMessage(msg, "success");
              this.$emit("add", store);
              this.close();
            } else {
              const {
                msg,
                data: { store },
              } = await modifyStore(form);
              this.$baseMessage(msg, "success");
              this.close();
              this.$emit("update", store);
            }
          } else {
            return false;
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  ::v-deep {
    .el-dialog__body {
      padding: 20px 0px 0 20px;
    }
  }
</style>
