<template>
  <div class="banner-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <!-- <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          添加
        </el-button> -->
        <!-- <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          批量删除
        </el-button> -->
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="24">
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
      :element-loading-text="elementLoadingText"
      border
      @selection-change="setSelectRows"
    >
      <!-- <el-table-column show-overflow-tooltip type="selection"></el-table-column> -->
      <el-table-column
        show-overflow-tooltip
        prop="ad_no"
        label="广告编号"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="name"
        label="名称"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="pic_path"
        label="图片"
        align="center"
      >
        <template v-slot="scope">
          <el-image :src="scope.row.pic_path | imgBaseUrl"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="url"
        label="地址"
        align="center"
      />
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template v-slot="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <!-- <el-button type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button> -->
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
    <edit ref="edit" @fetchData="fetchData" @update="update" @add="add"></edit>
  </div>
</template>

<script>
  import { getAds, deleteBanner } from "@/api/ads";
  import Edit from "./components/AdsEdit";

  export default {
    name: "Banner",
    components: { Edit },
    data() {
      return {
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
    created() {
      this.fetchData();
    },
    methods: {
      setSelectRows(val) {
        this.selectRows = val;
      },
      add(e) {
        this.list.push(e);
      },
      update(e) {
        const index = this.list.findIndex((item) => item.id === e.id);
        this.$set(this.list, index, e);
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
            const { msg } = await deleteBanner({ id: row.id });
            this.$baseMessage(msg, "success");
            this.list.splice(
              this.list.findIndex((item) => item.id === row.id),
              1
            );
          });
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join();
            this.$baseConfirm("你确定要删除选中项吗", null, async () => {
              const { msg } = await doDelete({ ids });
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
        const { data, totalCount } = await getAds(this.queryForm);
        this.list = data.ads;
        // this.total = totalCount;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      },
    },
  };
</script>
