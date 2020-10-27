<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 商品配方
 * @Date: 2020-10-07 14:36:06
 * @LastEditTime: 2020-10-27 23:33:32
-->
<template>
  <div class="prodRecipes">
    <el-row type="flex">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix" style="text-align: right">
          <el-button
            :disabled="getDisabled"
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="handleAdd('form')"
          >
            添加配方
          </el-button>
        </div>
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
          <el-col :span="8">
            <el-form-item label="菜品名称" prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入菜品名称"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="类型" prop="type">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="重量" prop="weight">
              <el-input
                v-model="form.weight"
                placeholder="请输入重量"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-card>
    </el-row>

    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="no" label="序号" width="80" align="center" />
      <el-table-column prop="name" label="菜品名称" align="center" />
      <el-table-column prop="weight" label="重量" width="80" align="center" />
      <el-table-column prop="type" label="类型" width="80" align="center">
        <template slot-scope="scope">
          {{
            scope.row.type === 1 ? "主配料" : scope.row.type === 2 ? "辅料" : ""
          }}
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="small"
            :disabled="getDisabled"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
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
        form: {
          name: "",
          weight: "",
          type: 1,
          no: "",
        },
        options: [
          {
            value: 1,
            label: "主配料",
          },
          {
            value: 2,
            label: "辅料",
          },
        ],
        rules: {
          name: [
            { required: true, message: "请输入菜品名称", trigger: "blur" },
          ],
          weight: [{ required: true, message: "请输入重量", trigger: "blur" }],
        },
        tableData: [],
      };
    },
    computed: {
      getDisabled() {
        return this.model.type === 1;
      },
    },
    created() {
      if ((this.model.type === 4 && !this.isAdd) || this.model.type === 1) {
        this.tableData = this.model.prodRecipes;
        this.resetIndex();
      }
    },
    methods: {
      getData() {
        return this.tableData;
      },
      resetIndex() {
        for (let [key, value] of this.tableData.entries()) {
          value.no = key + 1;
        }
      },
      deleteRow(index) {
        this.tableData.splice(index, 1);
        this.resetIndex();
      },
      handleAdd(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.tableData.push(JSON.parse(JSON.stringify(this.form)));
            this.resetIndex();
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
