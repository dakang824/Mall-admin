<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 菜品明细
 * @Date: 2020-10-30 21:33:18
 * @LastEditTime: 2020-11-25 22:17:48
-->
<template>
  <div>
    <el-dialog
      title="菜品明细"
      :visible="value"
      :modal-append-to-body="false"
      append-to-body
      :lock-scroll="false"
      @close="handleClose"
    >
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          prop="name"
          label="菜品名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="weight"
          label="菜品重量（g）"
          align="center"
        ></el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">导出菜品明细</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import filters from "@/filters";
  import { findOrderRecipe, exportOrderRecipe } from "@/api/order/goods";
  export default {
    components: {},
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      model: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        tableData: [],
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        const model = this.model;
        model.trade_no = model.order_no;
        const {
          data: { recipes },
        } = await findOrderRecipe(model);
        this.tableData = recipes;
      },
      handleClose() {
        this.$emit("input", false);
      },
      async submitForm() {
        const model = this.model;
        model.trade_no = model.order_no;
        const {
          data: { excel_path },
        } = await exportOrderRecipe(model);
        window.open(filters.imgBaseUrl(excel_path), "_parent");
        this.handleClose();
      },
      resetForm() {
        this.$refs["elForm"].resetFields();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .dialog-footer {
    text-align: center;
  }
</style>
