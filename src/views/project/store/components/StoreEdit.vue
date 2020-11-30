<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-10-03 09:17:16
 * @LastEditTime: 2020-11-30 12:59:45
-->

<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
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
              v-model.number="form.desScore"
              autocomplete="off"
              type="number"
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
              v-model.number="form.desCompare"
              autocomplete="off"
              type="number"
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
              v-model.number="form.serScore"
              autocomplete="off"
              type="number"
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
              v-model.number="form.serCompare"
              autocomplete="off"
              type="number"
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
              v-model.number="form.postStore"
              autocomplete="off"
              type="number"
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
              v-model.number="form.postCompare"
              autocomplete="off"
              type="number"
              max="100"
              min="0"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { addStore, modifyStore } from "@/api/store";
  import {
    provinceAndCityData,
    CodeToText,
    TextToCode,
  } from "element-china-area-data";
  export default {
    name: "StoreEdit",
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
      return {
        options: provinceAndCityData,
        oldPwd: "",
        form: {
          name: "",
          account: "",
          pwd: "",
          address: "",
          mobile: "",
          contact: "",
          prodPri: [],
          status: "",
          desScore: "",
          serScore: "",
          postScore: "",
          desCompare: "",
          serCompare: "",
          postCompare: "",
          province: "",
          city: "",
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
          contact: [
            { required: true, trigger: "blur", message: "请输入联系人" },
          ],
          prodPri: [
            { required: true, trigger: "blur", message: "请选择店铺权限" },
          ],
        },
        title: "",
        dialogFormVisible: false,
      };
    },
    created() {},
    methods: {
      handleAddress(value) {
        let address = value.map((item) => CodeToText[`${item}`]);
        this.form.province = address[0];
        this.form.city = address[1];
      },
      showEdit(row) {
        if (!row) {
          this.title = "添加";
          this.form.status = 1;
        } else {
          this.title = "编辑";
          var row = JSON.parse(JSON.stringify(row));
          row.desScore = row.desScore.toFixed(1);
          row.serScore = row.serScore.toFixed(1);
          row.postStore = row.postStore.toFixed(1);

          row.address = [
            TextToCode[row.province].code,
            TextToCode[row.province][row.city].code,
          ];
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
        this.dialogFormVisible = false;
      },
      save() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            const form = JSON.parse(JSON.stringify(this.form));
            form.prodPri = form.prodPri.reduce((a, b) => a + b);
            form.address = form.province + " " + form.city;
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
              this.$emit("update", store);
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
