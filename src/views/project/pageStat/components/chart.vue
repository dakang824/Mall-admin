<template>
  <div class="chart">
    <div class="chart__title">
      <span>{{ mode.title }}</span>
      <el-button type="text" @click="handleClick">查看详情</el-button>
    </div>
    <vab-chart autoresize :options="chart2" />

    <detailTable :visible.sync="dialogVisible" :mode="list"></detailTable>
  </div>
</template>

<script>
  import { getPageStatDetail } from "@/api/pageStat";
  import * as echarts from "echarts";
  import VabChart from "@/plugins/echarts";
  import DetailTable from "./detailTable";
  export default {
    components: {
      VabChart,
      DetailTable,
    },
    props: {
      mode: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        chart2: {
          grid: {
            top: "6%",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          yAxis: {
            type: "category",
            data: ["总时间", "用户总数"],
          },
          xAxis: {
            type: "value",
          },
          series: [
            {
              data: this.mode.data,
              color: this.mode.color,
              label: {
                show: true,
                position: "right",
              },
              stack: "total",
              type: "bar",
            },
          ],
        },
        dialogVisible: false,
        list: [],
      };
    },
    methods: {
      async handleClick() {
        const {
          data: { data },
        } = await getPageStatDetail(this.mode);
        this.dialogVisible = true;
        this.list = data;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .chart {
    &__title {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 14px;
        font-weight: bold;
        flex: 1;
        display: block;
        text-align: center;
      }
    }
  }
</style>
