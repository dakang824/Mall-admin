<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 统一规格
 * @Date: 2020-10-07 16:23:22
 * @LastEditTime: 2020-12-19 17:39:07
-->
<template>
  <div class="unifySpec">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      size="medium"
      label-width="100px"
    >
      <el-form-item label="零售价" prop="sellPrice">
        <el-input
          v-model="form.sellPrice"
          placeholder="请输入零售价"
          clearable
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="批发价" prop="w_price">
        <el-input
          v-model="form.w_price"
          placeholder="请输入批发价"
          clearable
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="起批量" prop="w_num">
        <el-input
          v-model="form.w_num"
          placeholder="请输入起批量"
          clearable
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>

      <el-form-item label="单前库存" prop="stock">
        <el-input
          v-model="form.stock"
          placeholder="请输入单前库存"
          clearable
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量（g）" prop="weight">
        <el-input
          v-model="form.weight"
          placeholder="请输入重量（g）"
          clearable
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
    </el-form>
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
    },
    data() {
      return {
        form: {
          id: 0,
          prodId: 0,
          oriPrice: "",
          sellPrice: "",
          stock: "",
          weight: "",
          recipeRate: 1,
        },
        rules: {
          w_price: [
            { required: true, message: "请输入批发价", trigger: "blur" },
          ],
          w_num: [{ required: true, message: "请输入起批量", trigger: "blur" }],
          sellPrice: [
            { required: true, message: "请输入零售价", trigger: "blur" },
          ],
          stock: [
            { required: true, message: "请输入单前库存", trigger: "blur" },
          ],
          weight: [
            { required: true, message: "请输入重量（g）", trigger: "blur" },
          ],
        },
      };
    },
    created() {
      if (this.model.spe_type === 1) {
        this.form = this.model.prodSpec[0];
      }
    },
    methods: {
      async getData() {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            this.$emit("getData", this.form);
          } else {
            return false;
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped></style>
