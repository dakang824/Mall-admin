<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="650px"
    lock-scroll
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="89px">
      <el-form-item label="模板名称" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="首重（KG）" prop="weight" label-width="89px">
            <el-input
              v-model.number="form.weight"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="运费（元）" prop="freight" label-width="89px">
            <el-input
              v-model.number="form.freight"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="续重（KG）" prop="kg" label-width="89px">
            <el-input v-model.number="form.kg" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="运费（元）" prop="money" label-width="89px">
            <el-input v-model.number="form.money" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="可配送区域" prop="area" label-width="89px">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
        <el-checkbox-group
          v-model="checkedCities"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox v-for="city in cities" :key="city" :label="city">
            {{ city }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit } from "@/api/freight";
  import { provinceAndCityDataPlus } from "element-china-area-data";
  export default {
    name: "FreightEdit",
    data() {
      return {
        checkAll: false,
        checkedCities: [],
        cities: [],
        isIndeterminate: true,
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
    computed: {},
    created() {
      this.cities = provinceAndCityDataPlus.map((item) => item.label).slice(1);
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? this.cities : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.cities.length;
      },
      showEdit(row) {
        if (!row) {
          this.title = "添加运费模板";
          this.checkedCities = [];
        } else {
          this.title = "编辑运费模板";
          this.form = Object.assign({}, row);
          this.checkedCities = row.area;
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
