<template>
  <div class="freight-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          添加运费
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          批量删除
        </el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="12">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <!-- <el-form-item>
            <el-input
              v-model.trim="queryForm.id"
              placeholder="请输入查询条件"
              clearable
            />
          </el-form-item> -->
          <el-form-item>
            <el-button icon="el-icon-refresh" type="primary" @click="queryData">
              刷新
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      row-key="id"
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
        prop="name"
        label="名称"
        align="center"
      />
      <el-table-column show-overflow-tooltip label="可配送区域" align="center">
        <template v-slot="scope">
          {{ scope.row.areas | getName(province) }}
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template v-slot="scope">
          <div v-if="'areas' in scope.row">
            <el-button type="primary" @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-button type="danger" @click="handleDelete(scope.row)">
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="false"
      background
      :current-page="queryForm.pageNo"
      :page-size="queryForm.pageSize"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <edit ref="edit" :province="province" @fetchData="fetchData"></edit>
  </div>
</template>

<script>
  import {
    findAllPostTemplate,
    deletePostTemplate,
    findAllProvinceCode,
  } from "@/api/freight";
  import Edit from "./components/FreightEdit";
  import { decode } from "@/utils";
  export default {
    name: "Freight",
    components: {
      Edit,
    },
    filters: {
      getName(val, code) {
        return val.map((item) => decode(item.area, code, "code")).join();
      },
    },
    data() {
      return {
        province: [],
        list: null,
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        selectRows: "",
        elementLoadingText: "正在加载...",
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          id: "",
        },
      };
    },
    computed: {},
    created() {
      this.fetchData();
      this.getAllProvinceCode();
    },
    methods: {
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
          this.$baseConfirm("你确定要删除当前项吗?", null, async () => {
            const { msg } = await deletePostTemplate({ ids: row.id });
            this.$baseMessage(msg, "success");
            this.list.splice(
              this.list.findIndex((item) => item.id === row.id),
              1
            );
          });
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join();
            this.$baseConfirm("你确定要删除选中项吗?", null, async () => {
              const { msg } = await deletePostTemplate({ ids });
              this.$baseMessage(msg, "success");
              this.selectRows.map((item) => {
                this.list.splice(
                  this.list.findIndex((it) => it.id === item.id),
                  1
                );
              });
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
      async getAllProvinceCode() {
        const {
          data: { province },
        } = await findAllProvinceCode();
        this.province = province;
      },
      async fetchData(listLoading = true) {
        this.listLoading = listLoading;
        const { data, totalCount } = await findAllPostTemplate(
          this.queryForm,
          {}
        );
        this.list = data.postTemps;
        this.total = data.postTemps.length;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      },
    },
  };
</script>
