<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-12-13 18:47:13
 * @LastEditTime: 2020-12-19 17:05:54
-->
<template>
  <el-dialog
    title="菜品明细"
    :visible.sync="dialogFormVisible"
    width="600px"
    class="table"
  >
    <table id="table" border="1">
      <tr v-if="caiheList.length">
        <th colspan="3">菜盒明细</th>
      </tr>
      <tr v-if="caiheList.length">
        <th>菜盒名称</th>
        <th>菜盒规格</th>
        <th>菜盒数量</th>
      </tr>
      <tr v-for="(item, index) in caiheList" :key="index">
        <td>{{ item.name }}</td>
        <td>{{ item.spe_name }}</td>
        <td>{{ item.quantity }}</td>
      </tr>

      <tr v-if="caipinList.length">
        <th colspan="3">菜品明细</th>
      </tr>
      <tr v-if="caipinList.length">
        <th>菜品名称</th>
        <th>菜品规格</th>
        <th>菜品数量</th>
      </tr>
      <tr v-for="(item, index) in caipinList" :key="'m' + index">
        <td>{{ item.name }}</td>
        <td>{{ item.spe_name }}</td>
        <td>{{ item.quantity }}</td>
      </tr>
      <tr v-if="keys">
        <th colspan="3">合计菜品明细</th>
      </tr>
      <tr v-if="keys">
        <th>菜品名称</th>
        <th colspan="2">重量(g)</th>
      </tr>
      <tr v-for="(v, k, i) in billMap" :key="'t' + i">
        <td>{{ k }}</td>
        <td colspan="2">{{ v }}</td>
      </tr>
    </table>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleExport">导出菜品明细</el-button>
      <el-button type="primary" @click="save">确认采购</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { getOrderBill, conformBuyBill } from "@/api/purchase";
  import XLSX from "xlsx";
  import FileSaver from "file-saver";
  export default {
    data() {
      return {
        form: {
          id: "",
        },
        rules: {
          id: [{ required: true, trigger: "blur", message: "请输入id" }],
        },
        dialogFormVisible: false,
        caipinList: [],
        caiheList: [],
        billMap: {},
        keys: 0,
        ids: "",
      };
    },
    created() {},
    methods: {
      async showEdit(ids) {
        this.ids = ids;
        const { data } = await getOrderBill({ ids });
        this.caipinList = data.caipinList;
        this.caiheList = data.caiheList;
        this.billMap = data.billMap;
        this.keys = Object.keys(data.billMap);
        this.dialogFormVisible = true;
      },
      handleExport() {
        let table = XLSX.utils.table_to_book(document.querySelector("#table"));
        let tb = XLSX.write(table, {
          bookType: "xlsx",
          bookSST: true,
          type: "array",
        });
        FileSaver.saveAs(
          new Blob([tb], { type: "application/octet-stream" }),
          "菜品明细.xlsx"
        );
        return tb;
      },
      async save() {
        const { msg } = await conformBuyBill({ ids: this.ids });
        this.$baseMessage(msg, "success");
        this.$emit("fetchData", false);
        this.dialogFormVisible = false;
      },
    },
  };
</script>

<style>
  table {
    width: 100%;
    border-color: #ebeef5;
    border: 0px solid #999;
  }
  th {
    background: #f5f7fa;
  }
  td,
  th {
    text-align: center;
    padding: 10px;
    border-color: #ebeef5;
  }
  .el-dialog__body {
    max-height: 600px;
    overflow: auto;
  }
</style>
