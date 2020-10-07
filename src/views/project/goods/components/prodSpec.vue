<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 产品多规格
 * @Date: 2020-10-07 14:01:31
 * @LastEditTime: 2020-10-07 22:56:36
-->
<template>
  <div class="prodSpec">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix" style="text-align: right">
        <el-button type="primary" @click="handleAdd('form')">
          添加规格
        </el-button>
      </div>
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-row type="flex">
          <el-col :span="8">
            <el-form-item label="规格名称" prop="name">
              <el-input
                v-model="form.name"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售价" prop="sellPrice">
              <el-input
                v-model="form.sellPrice"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="原价" prop="oriPrice">
              <el-input
                v-model="form.oriPrice"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="8">
            <el-form-item label="库存" prop="stock">
              <el-input
                v-model="form.stock"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="重量（Kg）" prop="weight">
              <el-input
                v-model="form.weight"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="几个标准份" prop="recipeRate">
              <el-input
                v-model="form.recipeRate"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="name" label="规格名称" align="center" />
      <el-table-column
        prop="sellPrice"
        label="销售价"
        align="center"
        width="80"
      />
      <el-table-column prop="oriPrice" label="原价" width="80" align="center" />
      <el-table-column prop="stock" label="库存" width="80" align="center" />
      <el-table-column
        prop="weight"
        label="重量（Kg）"
        align="center"
        width="100"
      />
      <el-table-column
        prop="recipeRate"
        label="几个标准份"
        width="100"
        align="center"
      />
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="small"
            @click.native.prevent="deleteRow(scope.$index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      model: {
        type: Object,
        default: () => {
          return {};
        },
      },
      //判断是不是添加商品
      isAdd: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        tableData: [],
        rules: {
          name: [
            { required: true, message: "请输入规格名称", trigger: "blur" },
          ],
          sellPrice: [
            { required: true, message: "请输入销售价", trigger: "blur" },
          ],
          oriPrice: [
            { required: true, message: "请输入原价", trigger: "blur" },
          ],
          stock: [{ required: true, message: "请输入库存", trigger: "blur" }],
          weight: [{ required: true, message: "请输入重量", trigger: "blur" }],
          recipeRate: [
            { required: true, message: "请输入几个标准份", trigger: "blur" },
          ],
        },
        form: {
          id: 0,
          prodId: 0,
          name: "",
          sellPrice: "",
          oriPrice: "",
          stock: "",
          weight: "",
          recipeRate: "",
        },
      };
    },
    created() {
      if (this.model.spe_type === 2 && !this.isAdd) {
        this.tableData = this.model.specList;
      }
    },
    methods: {
      getData() {
        return this.tableData;
      },
      deleteRow(index) {
        this.tableData.splice(index, 1);
      },
      handleAdd(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.tableData.push(JSON.parse(JSON.stringify(this.form)));
            this.$refs[formName].resetFields();
          } else {
            return false;
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped></style>
