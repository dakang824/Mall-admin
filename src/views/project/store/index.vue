<template>
  <div class="store-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="24">
        <el-form
          ref="queryForm"
          :inline="true"
          :model="queryForm"
          @submit.native.prevent
        >
          <el-form-item prop="prodPri">
            <el-select
              v-model="queryForm.prodPri"
              placeholder="请选择权限"
              multiple
            >
              <el-option
                v-for="item in goodsType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="name">
            <el-input
              v-model.trim="queryForm.name"
              placeholder="请输入店铺名称"
              clearable
            />
          </el-form-item>
          <el-form-item prop="account">
            <el-input
              v-model.trim="queryForm.account"
              placeholder="请输入店铺账号"
              clearable
            />
          </el-form-item>
          <el-form-item prop="mobile">
            <el-input
              v-model.trim="queryForm.mobile"
              placeholder="请输入手机号"
              clearable
            />
          </el-form-item>
          <el-form-item prop="status">
            <el-select v-model="queryForm.status" placeholder="请选择店铺状态">
              <el-option
                v-for="item in status"
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
            <el-button @click="resetForm('queryForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-left-panel>
      <vab-query-form-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          添加
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          批量删除
        </el-button>
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="序号"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="name"
        label="店铺名称"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="account"
        label="店铺账号"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="prodPri"
        label="店铺权限"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.prodPri | getProdPri(goodsType) }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="collectCount"
        label="收藏数"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="status"
        label="状态"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 1 ? 'success' : 'danger'"
            disable-transitions
          >
            {{ scope.row.status === 1 ? "启用" : "禁用" }}
          </el-tag>
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
    <edit
      ref="edit"
      :status="status"
      :roles="goodsType"
      @fetchData="fetchData"
    ></edit>
  </div>
</template>

<script>
  import { findStore, deleteStore } from "@/api/store";
  import Edit from "./components/StoreEdit";
  import { mapState } from "vuex";
  export default {
    name: "Store",
    components: { Edit },
    filters: {
      getProdPri: (value, goodsType) => {
        return goodsType
          .map((item) => {
            if ((value & item.value) > 0) {
              return item.label;
            }
          })
          .filter((item) => item !== undefined)
          .join();
      },
    },
    data() {
      return {
        status: [
          {
            value: 1,
            label: "启用",
          },
          {
            value: 0,
            label: "禁用",
          },
        ],
        list: null,
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        selectRows: "",
        elementLoadingText: "正在加载...",
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          name: "",
          account: "",
          mobile: "",
          prodPri: "",
          status: "",
        },
        goodsType: [
          {
            label: "菜盒",
            value: 1,
          },
          {
            label: "菜品",
            value: 2,
          },
          {
            label: "设备",
            value: 4,
          },
          {
            label: "菜谱",
            value: 8,
          },
        ],
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      setSelectRows(val) {
        this.selectRows = val;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
          this.$baseConfirm("你确定要删除当前项吗?", null, async () => {
            const { msg } = await deleteStore({ ids: row.id });
            this.$baseMessage(msg, "success");
            this.fetchData();
          });
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join();
            this.$baseConfirm("你确定要删除选中项吗?", null, async () => {
              const { msg } = await deleteStore({ ids });
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
        this.fetchData();
      },
      async fetchData() {
        this.listLoading = true;
        const queryForm = JSON.parse(JSON.stringify(this.queryForm));
        if (queryForm.prodPri.length) {
          queryForm.prodPri = queryForm.prodPri.reduce((a, b) => a + b);
        }

        const {
          data: { storeList },
        } = await findStore(queryForm);
        this.list = storeList.list;
        this.total = storeList.total;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      },
    },
  };
</script>
