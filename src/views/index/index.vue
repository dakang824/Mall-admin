<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12">
        <el-card shadow="never">
          <div slot="header">
            <span>昨日关键指标</span>
          </div>
          <ul
            style="
              display: flex;
              align-items: center;
              justify-content: space-around;
              color: #0099ff;
              list-style-type: none;
              text-align: center;
              font-size: 20px;
              min-height: 243px;
            "
          >
            <li>
              <span>订单数</span>
              <p style="font-weight: bold; font-size: 40px">
                {{ yesterdayData.total_count | toFixed }}
              </p>
            </li>
            <li>
              <span>订单金额(元)</span>
              <p style="font-weight: bold; font-size: 40px">
                {{ yesterdayData.total_amount | toFixed }}
              </p>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12">
        <el-card class="card" shadow="never">
          <div slot="header">
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
            >
              按月统计
              <el-form ref="elForm" :model="orderByMonth" inline>
                <!-- <el-form-item>
                  <el-input
                    v-model.lazy="orderByMonth.store_account"
                    placeholder="请输入店铺账号"
                    clearable
                    :style="{ width: '140px' }"
                    @keyup.enter.native="statOrderByMonth"
                    @clear="statOrderByMonth"
                  />
                </el-form-item> -->
                <el-date-picker
                  v-model="orderByMonth.time"
                  type="monthrange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始月份"
                  end-placeholder="结束月份"
                  :picker-options="monthPickerOptions"
                  format="yyyy-MM"
                  :style="{ width: '200px' }"
                  value-format="yyyy-MM"
                  @change="statOrderByMonth"
                ></el-date-picker>
              </el-form>
            </div>
          </div>
          <div>
            <vab-chart autoresize :options="chart2" />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24">
        <el-card class="card" shadow="never">
          <div slot="header">
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
            >
              按日统计
              <el-form ref="elForm" :model="orderByDay" inline>
                <!-- <el-form-item>
                  <el-input
                    v-model.lazy="orderByDay.store_account"
                    placeholder="请输入店铺账号"
                    clearable
                    :style="{ width: '140px' }"
                    @keyup.enter.native="getDaysData"
                    @clear="getDaysData"
                  />
                </el-form-item> -->
                <el-date-picker
                  v-model="orderByDay.time"
                  type="daterange"
                  align="right"
                  unlink-panels
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :style="{ width: '220px' }"
                  :picker-options="dayPickerOptions"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @change="getDaysData"
                ></el-date-picker>
              </el-form>
            </div>
          </div>
          <div>
            <vab-chart autoresize :options="chart1" />
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :xs="24" :sm="24" :md="12">
        <el-card shadow="never">
          <div slot="header">
            <span>依赖信息</span>
            <div style="float: right">部署时间:{{ updateTime }}</div>
          </div>
          <div class="bottom-btn">
            <a @click="handleChangeTheme">
              <el-button type="danger">修改主题和布局</el-button>
            </a>
          </div>
          <table class="table">
            <tr>
              <td>@vue/cli版本</td>
              <td>{{ devDependencies["@vue/cli-service"] }}</td>
              <td>vue版本</td>
              <td>{{ dependencies["vue"] }}</td>
            </tr>
            <tr>
              <td>vuex版本</td>
              <td>{{ dependencies["vuex"] }}</td>
              <td>vue-router版本</td>
              <td>{{ dependencies["vue-router"] }}</td>
            </tr>
            <tr>
              <td>element-ui版本</td>
              <td>{{ dependencies["element-ui"] }}</td>
              <td>axios版本</td>
              <td>{{ dependencies["axios"] }}</td>
            </tr>
            <tr>
              <td>eslint版本</td>
              <td>{{ devDependencies["eslint"] }}</td>
              <td>prettier版本</td>
              <td>{{ devDependencies["prettier"] }}</td>
            </tr>
            <tr>
              <td>sass版本</td>
              <td>{{ devDependencies["sass"] }}</td>
              <td>mockjs版本</td>
              <td>{{ devDependencies["mockjs"] }}</td>
            </tr>
            <tr>
              <td>zx-layouts版本</td>
              <td>{{ dependencies["zx-layouts"] }}</td>
              <td>lodash版本</td>
              <td>{{ dependencies["lodash"] }}</td>
            </tr>
          </table>
        </el-card>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
  import * as echarts from "echarts";
  import VabChart from "@/plugins/echarts";
  const dayjs = require("dayjs");
  import { statOrderByDay, statOrderByMonth } from "@/api/index";
  import { dependencies, devDependencies } from "../../../package.json";
  export default {
    name: "Index",
    components: {
      VabChart,
    },
    data() {
      return {
        updateTime: process.env.VUE_APP_UPDATE_TIME,
        nodeEnv: process.env.NODE_ENV,
        dependencies: dependencies,
        devDependencies: devDependencies,
        yesterdayData: {
          total_amount: 0,
          total_count: 0,
        },
        // 按日统计
        chart1: {
          grid: {
            top: "20%",
            bottom: "8%",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              label: {
                show: true,
              },
            },
          },
          legend: {
            data: ["菜品金额", "菜盒金额", "菜品数量", "菜盒数量"],
          },
          xAxis: {
            data: [],
            axisLine: {
              show: true, //隐藏X轴轴线
            },
            axisTick: {
              show: true, //隐藏X轴刻度
            },
            axisLabel: {
              show: true,
            },
          },
          yAxis: [
            {
              type: "value",
              name: "元",
              splitLine: {
                show: true,
              },
              axisTick: {
                show: true,
              },
              axisLine: {
                show: true,
              },
              axisLabel: {
                show: true,
              },
            },
          ],
          series: [
            {
              name: "菜品金额",
              type: "bar",
              barWidth: 15,
              stack: "1",
              itemStyle: {
                normal: {
                  color: "#0099ff",
                },
              },
              data: [],
            },
            {
              name: "菜盒金额",
              type: "bar",
              barWidth: 15,
              stack: "1",
              itemStyle: {
                color: "#33ccff",
              },
              areaStyle: {
                color: "rgba(5,140,255, 0.2)",
              },
              data: [],
            },
            {
              name: "菜品数量",
              type: "line",
              barWidth: 15,
              smooth: true,
              itemStyle: {
                color: "#00b19d",
              },

              data: [],
            },
            {
              name: "菜盒数量",
              type: "line",
              barWidth: 15,
              itemStyle: {
                color: "#ff4d4f",
              },
              smooth: true, //平滑曲线显示
              data: [],
            },
          ],
        },
        // 按月统计
        chart2: {
          grid: {
            top: "20%",
            bottom: "8%",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              label: {
                show: true,
              },
            },
          },
          legend: {
            data: ["菜品金额", "菜盒金额", "菜品数量", "菜盒数量"],
          },
          xAxis: {
            data: [],
            axisLine: {
              show: true, //隐藏X轴轴线
            },
            axisTick: {
              show: true, //隐藏X轴刻度
            },
            axisLabel: {
              show: true,
            },
          },
          yAxis: [
            {
              type: "value",
              name: "元",
              splitLine: {
                show: true,
              },
              axisTick: {
                show: true,
              },
              axisLine: {
                show: true,
              },
              axisLabel: {
                show: true,
              },
            },
          ],
          series: [
            {
              name: "菜品金额",
              type: "bar",
              barWidth: 15,
              stack: "1",
              itemStyle: {
                normal: {
                  color: "#0099ff",
                },
              },
              data: [],
            },
            {
              name: "菜盒金额",
              type: "bar",
              barWidth: 15,
              stack: "1",
              itemStyle: {
                color: "#33ccff",
              },
              areaStyle: {
                color: "rgba(5,140,255, 0.2)",
              },
              data: [],
            },
            {
              name: "菜品数量",
              type: "line",
              barWidth: 15,
              smooth: true,
              itemStyle: {
                color: "#00b19d",
              },

              data: [],
            },
            {
              name: "菜盒数量",
              type: "line",
              barWidth: 15,
              itemStyle: {
                color: "#ff4d4f",
              },
              smooth: true, //平滑曲线显示
              data: [],
            },
          ],
        },

        //其他信息
        userAgent: navigator.userAgent,
        orderByDay: {
          store_account: "",
          time: [],
        },
        orderByMonth: {
          store_account: "",
          time: [],
        },
        dayPickerOptions: {
          shortcuts: [
            {
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "最近三个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              },
            },
          ],
        },
        monthPickerOptions: {
          shortcuts: [
            {
              text: "本月",
              onClick(picker) {
                picker.$emit("pick", [new Date(), new Date()]);
              },
            },
            {
              text: "今年至今",
              onClick(picker) {
                const end = new Date();
                const start = new Date(new Date().getFullYear(), 0);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "最近六个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setMonth(start.getMonth() - 6);
                picker.$emit("pick", [start, end]);
              },
            },
          ],
        },
      };
    },
    created() {
      this.orderByDay = {
        store_account: this.$store.state.user.store[0].account,
        time: [
          dayjs().add(-30, "day").format("YYYY-MM-DD"),
          dayjs().format("YYYY-MM-DD"),
        ],
      };
      this.orderByMonth = {
        store_account: this.$store.state.user.store[0].account,
        time: [
          dayjs().startOf("year").format("YYYY-MM-DD"),
          dayjs().format("YYYY-MM-DD"),
        ],
      };
      this.getYesterdayData();
      this.getDaysData();
      this.statOrderByMonth();
    },
    mounted() {},
    methods: {
      async getYesterdayData() {
        const {
          data: { dayStat },
        } = await statOrderByDay({
          from: dayjs().add(-1, "day").format("YYYY-MM-DD"),
          to: dayjs().add(-1, "day").format("YYYY-MM-DD"),
          store_account: this.orderByDay.store_account,
        });
        this.yesterdayData = dayStat[0];
      },
      async getDaysData() {
        const orderByDay = JSON.parse(JSON.stringify(this.orderByDay));
        orderByDay.from = orderByDay.time[0];
        orderByDay.to = orderByDay.time[1];
        const {
          data: { dayStat },
        } = await statOrderByDay(orderByDay);
        this.chart1.xAxis.data = dayStat.map((item) => item.day.slice(5));
        this.chart1.series[0].data = dayStat.map((item) => item.caipin_amount);
        this.chart1.series[1].data = dayStat.map((item) => item.caihe_amount);
        this.chart1.series[2].data = dayStat.map((item) => item.caipin_count);
        this.chart1.series[3].data = dayStat.map((item) => item.caihe_count);
      },
      async statOrderByMonth() {
        const orderByMonth = JSON.parse(JSON.stringify(this.orderByMonth));
        orderByMonth.from = orderByMonth.time[0] + "-01";
        orderByMonth.to = orderByMonth.time[1] + "-01";
        const {
          data: { monthStat },
        } = await statOrderByMonth(orderByMonth);
        this.chart2.xAxis.data = monthStat.map((item) => item.month);
        this.chart2.series[0].data = monthStat.map(
          (item) => item.caipin_amount
        );
        this.chart2.series[1].data = monthStat.map((item) => item.caihe_amount);
        this.chart2.series[2].data = monthStat.map((item) => item.caipin_count);
        this.chart2.series[3].data = monthStat.map((item) => item.caihe_count);
      },
      handleChangeTheme() {
        this.$baseEventBus.$emit("theme");
      },
    },
  };
</script>
<style lang="scss" scoped>
  .index-container {
    padding: 0 !important;
    margin: 0 !important;
    background: #f5f7f8 !important;

    ::v-deep {
      .el-alert {
        padding: $base-padding;

        &--info.is-light {
          min-height: 82px;
          padding: $base-padding;
          margin-bottom: 15px;
          color: #909399;
          background-color: $base-color-white;
          border: 1px solid #ebeef5;
        }
      }

      .el-card__body {
        min-height: 305px;
        .echarts {
          width: 100%;
        }
      }
    }

    .card {
      min-height: 400px;

      ::v-deep {
        .el-card__header {
          .el-form-item {
            margin-bottom: 0;
          }
          padding: 11px 20px;
        }
        .el-card__body {
          .echarts {
            width: 100%;
            height: 305px;
          }
        }
      }
    }

    .bottom {
      padding-top: 20px;
      margin-top: 5px;
      color: #595959;
      text-align: left;
      border-top: 1px solid $base-border-color;
    }

    .table {
      width: 100%;
      color: #666;
      border-collapse: collapse;
      background-color: #fff;

      td {
        position: relative;
        min-height: 20px;
        padding: 9px 15px;
        font-size: 14px;
        line-height: 20px;
        border: 1px solid #e6e6e6;

        &:nth-child(odd) {
          width: 20%;
          text-align: right;
          background-color: #f7f7f7;
        }
      }
    }

    .icon-panel {
      height: 100px;
      text-align: center;
      cursor: pointer;

      svg {
        font-size: 40px;
      }

      p {
        margin-top: 10px;
      }
    }

    .bottom-btn {
      button {
        margin: 5px 10px 15px 0;
      }
    }
  }
</style>
