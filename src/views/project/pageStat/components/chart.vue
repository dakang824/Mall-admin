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
            formatter: (params) => {
              var tar = params[0];
              let value = tar.value;
              if (tar.name !== "用户总数") {
                value = this.GetDateTime(tar.value);
              }
              return (
                tar.axisValue +
                "<br/>" +
                value +
                `${tar.name === "用户总数" ? "人" : ""}`
              );
            },
          },
          yAxis: {
            type: "category",
            data: ["总时间", "用户总数"],
          },
          xAxis: {
            type: "value",
            name: "秒",
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
        this.list = data.map((item) => {
          item.time_count = `${this.GetDateTime(
            parseInt(item.time_count / 1000)
          )}`;
          return item;
        });
      },

      GetDateTime(time) {
        if (time >= 60 && time <= 3600) {
          time = parseInt(time / 60) + "分" + (time % 60) + "秒";
        } else {
          if (time > 3600) {
            time =
              parseInt(time / 3600) +
              "小时" +
              parseInt((time % 3600) / 60) +
              "分" +
              (time % 60) +
              "秒";
          } else {
            time = time + "秒";
          }
        }
        return time;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .chart {
    &__title {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      span {
        font-size: 14px;
        font-weight: bold;
        display: block;
        text-align: center;
      }
      .el-button {
        position: absolute;
        right: 60px;
      }
    }
    .echarts {
      width: 100%;
    }
  }
</style>
