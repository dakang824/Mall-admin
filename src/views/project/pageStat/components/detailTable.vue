<template>
  <el-dialog
    :title="title"
    v-bind="$attrs"
    width="750px"
    destroy-on-close
    v-on="$listeners"
    @closed="handleClose"
  >
    <lb-table
      v-loading="loading"
      border
      :column="tableData.column"
      :data="mode"
      align="center"
      max-height="450"
      background
    />
  </el-dialog>
</template>

<script>
  export default {
    components: {},
    props: {
      mode: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        loading: false,
        title: "详情",
        dialogVisible: false,
        downloadLoading: false,
        total: 0,
        tableData: {
          column: [
            {
              prop: "user_id",
              label: "用户id",
              width: "80",
            },
            {
              prop: "account",
              label: "账户",
              showOverflowTooltip: true,
            },
            {
              prop: "name",
              label: "用户名称",
            },
            {
              prop: "time_count",
              label: "用时",
            },
          ],
        },
      };
    },
    methods: {
      handleClose() {
        this.dialogVisible = false;
      },
    },
  };
</script>

<style lang="scss" scoped></style>
