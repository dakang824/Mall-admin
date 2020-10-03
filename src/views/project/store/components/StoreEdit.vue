<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-10-03 09:17:16
 * @LastEditTime: 2020-10-03 10:30:28
-->

<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="店铺名称" prop="storeName">
        <el-input v-model="form.storeName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="店铺账号" prop="account">
        <el-input v-model="form.account" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="role" label="店铺权限">
        <el-select
          v-model="form.role"
          placeholder="请选择权限"
          multiple
          style="width: 100%"
        >
          <el-option
            v-for="item in roleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="password">
        <el-cascader
          v-model="selectedOptions"
          style="width: 100%"
          size="large"
          :options="options"
          @change="handleAddress"
        ></el-cascader>
      </el-form-item>
      <el-form-item prop="state" label="状态">
        <el-select
          v-model="form.state"
          placeholder="请选择店铺状态"
          style="width: 100%"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="描述相符" prop="kg" label-width="89px">
            <el-input v-model.number="form.kg" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="与同行业相比" prop="money" label-width="100px">
            <el-input v-model.number="form.money" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="服务态度" prop="kg" label-width="89px">
            <el-input v-model.number="form.kg" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="与同行业相比" prop="money" label-width="100px">
            <el-input v-model.number="form.money" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="物流服务" prop="kg" label-width="89px">
            <el-input v-model.number="form.kg" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="与同行业相比" prop="money" label-width="100px">
            <el-input v-model.number="form.money" autocomplete="off"></el-input>
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
  import { doEdit } from "@/api/store";
  import { provinceAndCityDataPlus, CodeToText } from "element-china-area-data";
  export default {
    name: "StoreEdit",
    data() {
      return {
        options: provinceAndCityDataPlus,
        selectedOptions: [],
        roleOptions: [
          {
            value: "菜品",
            label: "菜品",
          },
          {
            value: "菜盒",
            label: "菜盒",
          },
        ],
        statusOptions: [
          {
            value: 1,
            label: "启用",
          },
          {
            value: 0,
            label: "禁用",
          },
        ],
        form: {
          id: "",
        },
        rules: {
          id: [{ required: true, trigger: "blur", message: "请输入id" }],
        },
        title: "",
        dialogFormVisible: false,
      };
    },
    created() {},
    methods: {
      handleAddress(value) {
        let address = value.map((item) => CodeToText[`${item}`]).join();
        console.log(address);
      },
      showEdit(row) {
        if (!row) {
          this.title = "添加";
        } else {
          this.title = "编辑";
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
            const { msg } = await doEdit(this.form);
            this.$baseMessage(msg, "success");
            this.$emit("fetchData");
            this.close();
          } else {
            return false;
          }
        });
      },
    },
  };
</script>
