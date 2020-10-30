<template>
  <div class="goods-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="24">
        <el-form
          ref="queryForm"
          :inline="true"
          :model="queryForm"
          @submit.native.prevent
        >
          <el-form-item prop="name">
            <el-input
              v-model.trim="queryForm.name"
              placeholder="请输入商品名称"
              clearable
            />
          </el-form-item>
          <el-form-item prop="type">
            <el-select v-model="queryForm.type" placeholder="请选择商品类型">
              <el-option
                v-for="item in goodsType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="cateId">
            <el-cascader
              v-model="queryForm.cateId"
              :options="category"
              :props="categoryProps"
              :style="{ width: '100%' }"
              placeholder="请选择商品类目"
              clearable
            ></el-cascader>
          </el-form-item>

          <el-form-item prop="storeId">
            <el-input
              v-model.trim="queryForm.storeId"
              placeholder="请输入商铺id"
              clearable
            />
          </el-form-item>
          <el-form-item prop="status">
            <el-select v-model="queryForm.status" placeholder="请选择状态">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
              查询
            </el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-left-panel>
    </vab-query-form>
    <vab-query-form>
      <vab-query-form-left-panel :span="24">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          添加商品
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          批量删除
        </el-button>
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      border
      @selection-change="setSelectRows"
      @cell-click="handleDblclick"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        align="center"
      ></el-table-column>
      <el-table-column show-overflow-tooltip prop="id" align="center">
        <template slot="header">
          <i class="el-icon-edit"></i>
          排序
        </template>
        <template v-slot="scope">
          <el-input
            v-if="scope.row.edit"
            v-model.number="scope.row.id"
            autofocus
            type="number"
            @blur="handleBlur(scope.row)"
          ></el-input>
          <span v-else>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="name"
        label="商品名称"
        align="center"
        min-width="150"
      />
      <el-table-column
        show-overflow-tooltip
        prop="price"
        label="价格"
        align="center"
      >
        <template v-slot="scope">
          {{ scope.row.specList | minPrice }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="total"
        label="总库存"
        align="center"
      >
        <template v-slot="scope">
          {{ scope.row.specList | totalStock }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="sellCount"
        label="实际销量"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="collectCount"
        label="收藏数"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="onlineTime"
        label="上下架时间"
        align="center"
        min-width="150"
      />
      <el-table-column
        show-overflow-tooltip
        prop="state"
        label="上架状态"
        align="center"
        width="85"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            @change="handleChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template v-slot="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.pageNo"
      :page-size="queryForm.pageSize"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <edit ref="edit" @fetchData="fetchData"></edit>
  </div>
</template>

<script>
  import {
    findProduct,
    deleteProduct,
    modifyProduct,
    onlineProduct,
    offlineProduct,
  } from "@/api/goods";
  import Edit from "./components/GoodsEdit";
  import { mapState } from "vuex";
  export default {
    name: "OrderGoods",
    components: { Edit },
    filters: {
      minPrice: (value) => {
        if (value.length) {
          return JSON.parse(JSON.stringify(value)).sort((a, b) => {
            return a.sellPrice - b.sellPrice;
          })[0].sellPrice;
        }
      },
      totalStock: (value) => {
        if (value.length) {
          let total = 0;
          value.map((item) => {
            total += item.stock;
          });
          return total;
        }
      },
    },
    data() {
      return {
        statusOptions: [
          {
            label: "未发布",
            value: 0,
          },
          {
            label: "已发布",
            value: 1,
          },
          {
            label: "已下架",
            value: 2,
          },
        ],
        categoryProps: {
          multiple: false,
          label: "name",
          value: "id",
          children: "subCategoryList",
        },
        list: null,
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        selectRows: "",
        elementLoadingText: "正在加载...",
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          storeId: "",
          status: "",
          subCateId: "",
          cateId: "",
          type: "",
          name: "",
        },
      };
    },
    computed: mapState({
      goodsType: (state) => state.goods.goodsType,
      category: (state) => state.goods.category,
    }),
    async created() {
      this.fetchData();
      await this.$store.dispatch("goods/findAllCategory");
    },
    methods: {
      handleBlur(e) {
        const index = this.list.findIndex((item) => item.id === e.id);
        this.list[index].edit = false;

        console.log(e.id);
      },
      handleDblclick(row, column, cell, event) {
        this.list.map((item) => {
          item.edit = false;
        });
        if (column.property === "id") {
          row.edit = true;
        }
      },
      async handleChange(e) {
        e.status = e.state === 1 ? 1 : 2;
        e.status == 1
          ? await onlineProduct({ prod_id: e.id })
          : await offlineProduct({ prod_id: e.id });
        await this.fetchData();
      },
      handleReset() {
        this.queryForm.subCateId = "";
        this.$refs["queryForm"].resetFields();
      },
      setSelectRows(val) {
        this.selectRows = val;
      },
      handleEdit(row) {
        if (row.id) {
          this.$refs["edit"].showEdit(row);
        } else {
          this.$refs["edit"].showEdit();
        }
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm("你确定要删除当前项吗", null, async () => {
            const { msg } = await deleteProduct({ ids: row.id });
            this.$baseMessage(msg, "success");
            this.fetchData();
          });
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join();
            this.$baseConfirm("你确定要删除选中项吗", null, async () => {
              const { msg } = await deleteProduct({ ids });
              this.$baseMessage(msg, "success");
              this.fetchData();
            });
          } else {
            this.$baseMessage("未选中任何行", "error");
            return false;
          }
        }
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val;
        this.fetchData();
      },
      queryData() {
        this.queryForm.pageNo = 1;
        let category = this.queryForm.cateId;
        if (category.length) {
          this.queryForm.cateId = category[0];
          this.queryForm.subCateId = category[1];
        }

        this.fetchData();
      },
      async fetchData() {
        this.listLoading = true;
        const {
          data: { product },
          totalCount,
        } = await findProduct(this.queryForm);
        product.list.forEach((item) => {
          item.state = item.status === 0 || item.status === 2 ? 0 : 1;
          item.edit = false;
          if (item.onlineTime)
            item.onlineTime = item.onlineTime.substring(0, 16);
        });
        this.list = product.list;
        this.total = product.total;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      },
    },
  };
</script>
