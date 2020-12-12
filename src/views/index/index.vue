<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card shadow="never">
          <div slot="header">
            <span>昨日关键指标</span>
          </div>
          <ul
            style="
              display: flex;
              justify-content: space-around;
              color: #0099ff;
              list-style-type: none;
              text-align: center;
              font-size: 20px;
            "
          >
            <li>
              <span>订单数</span>
              <p style="font-weight: bold; font-size: 40px">100</p>
            </li>
            <li>
              <span>订单金额(元)</span>
              <p style="font-weight: bold; font-size: 40px">100</p>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card shadow="never">
          <div slot="header">
            <span>用户名称</span>
          </div>
          <vab-chart
            :autoresize="true"
            theme="vab-echarts-theme"
            :options="cy"
            @zr:click="handleZrClick"
            @click="handleClick"
          />
          <div class="bottom">
            <span>用户总数量:</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>GDP分布图</span>
          </div>
          <vab-chart
            :autoresize="true"
            theme="vab-echarts-theme"
            :options="zgdt"
          />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12">
        <el-card class="card" shadow="never">
          <div slot="header">环形图</div>
          <div>
            <vab-chart
              ref="myCircle"
              theme="vab-echarts-theme"
              :options="chart2"
              class="my-circle"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12">
        <el-card class="card" shadow="never">
          <div slot="header">柱状图</div>
          <div>
            <vab-chart autoresize :options="chart1" />
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12">
        <el-card class="card" shadow="never">
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
              <td>{{ dependencies["mockjs"] }}</td>
            </tr>
            <tr>
              <td>zx-layouts版本</td>
              <td>{{ dependencies["zx-layouts"] }}</td>
              <td>lodash版本</td>
              <td>{{ dependencies["lodash"] }}</td>
            </tr>
          </table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as echarts from "echarts";
  import VabChart from "@/plugins/echarts";

  import { dependencies, devDependencies } from "../../../package.json";
  export default {
    name: "Index",
    components: {
      VabChart,
    },
    data() {
      return {
        timer: 0,
        updateTime: process.env.VUE_APP_UPDATE_TIME,
        nodeEnv: process.env.NODE_ENV,
        dependencies: dependencies,
        devDependencies: devDependencies,
        config1: {
          startVal: 0,
          endVal: this.$baseLodash.random(20000, 60000),
          decimals: 0,
          prefix: "",
          suffix: "",
          separator: ",",
          duration: 8000,
        },
        config2: {
          startVal: 0,
          endVal: this.$baseLodash.random(1000, 20000),
          decimals: 0,
          prefix: "",
          suffix: "",
          separator: ",",
          duration: 8000,
        },
        startVal: 0,
        endVal: 111,
        decimals: 2,
        prefix: "$",
        suffix: "美元",
        separator: ",",
        duration: 3000,
        config3: {
          startVal: 0,
          endVal: this.$baseLodash.random(1000, 20000),
          decimals: 0,
          prefix: "",
          suffix: "",
          separator: ",",
          duration: 8000,
        },
        chart1: {
          grid: {
            top: "25%",
            bottom: "10%",
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
            data: ["菜盒", "菜谱"],
          },
          xAxis: {
            data: [
              "当年完成水量",
              "去年同期水量",
              "滚动目标值水量",
              "全年目标值水量",
              "当年完成金额",
              "去年同期金额",
              "滚动目标金额",
              "全年目标值",
            ],
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
              name: "亿元",
              splitLine: {
                show: false,
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
            {
              type: "value",
              name: "同比",
              position: "right",
              splitLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisLabel: {
                show: true,
                formatter: "{value} %", //右侧Y轴文字显示
              },
            },
            {
              type: "value",
              gridIndex: 0,
              min: 50,
              max: 100,
              splitNumber: 8,
              splitLine: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              splitArea: {
                show: true,
                areaStyle: {
                  color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"],
                },
              },
            },
          ],
          series: [
            {
              name: "菜谱",
              type: "bar",
              barWidth: 15,
              stack: "1",
              itemStyle: {
                normal: {
                  color: "#0099ff",
                },
              },
              data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5],
            },
            {
              name: "菜盒",
              type: "bar",
              stack: "1",
              smooth: true, //平滑曲线显示
              itemStyle: {
                color: "#33ccff",
              },
              areaStyle: {
                color: "rgba(5,140,255, 0.2)",
              },
              data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5],
            },
          ],
        },
        chart2: {
          tooltip: {
            show: true,
            formatter: "{b} : {c}",
          },
          legend: {
            show: true,
            icon: "circle",
            top: "10%",
            left: "10%",
            width: 50,
            padding: [0, 5],
            itemGap: 25,
            data: ["已婚已育", "已婚未育", "未婚", "学生"],
            selectedMode: true,
            orient: "vertical",
          },
          series: [
            {
              name: "Line 4",
              type: "pie",
              clockWise: true,
              hoverAnimation: false,
              radius: ["65%", "75%"],
              data: [
                {
                  value: 7645434,
                  name: "已婚已育",
                },
                {
                  value: 3612343,
                  name: "总数",
                  tooltip: {
                    show: false,
                  },
                  itemStyle: {
                    normal: {
                      color: "rgba(0,0,0,0)",
                      label: {
                        show: false,
                      },
                      labelLine: {
                        show: false,
                      },
                    },
                    emphasis: {
                      color: "rgba(0,0,0,0)",
                    },
                  },
                },
              ],
            },
            {
              name: "Line 3",
              type: "pie",
              clockWise: true,
              radius: ["50%", "60%"],
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                  // shadowBlur: 15,
                  // shadowColor: 'white',
                },
              },
              hoverAnimation: false,
              data: [
                {
                  value: 2632321,
                  name: "已婚未育",
                },
                {
                  value: 2212343,
                  name: "总数",
                  tooltip: {
                    show: false,
                  },
                  itemStyle: {
                    normal: {
                      color: "rgba(0,0,0,0)",
                      label: {
                        show: false,
                      },
                      labelLine: {
                        show: false,
                      },
                    },
                    emphasis: {
                      color: "rgba(0,0,0,0)",
                    },
                  },
                },
              ],
            },
            {
              name: "Line 2",
              type: "pie",
              clockWise: true,
              hoverAnimation: false,
              radius: ["35%", "45%"],
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                  // shadowBlur: 15,
                  // shadowColor: 'white',
                },
              },
              data: [
                {
                  value: 1823323,
                  name: "未婚",
                },
                {
                  value: 1812343,
                  name: "总数",
                  tooltip: {
                    show: false,
                  },
                  itemStyle: {
                    normal: {
                      color: "rgba(0,0,0,0)",
                      label: {
                        show: false,
                      },
                      labelLine: {
                        show: false,
                      },
                    },
                    emphasis: {
                      color: "rgba(0,0,0,0)",
                    },
                  },
                },
              ],
            },
            {
              name: "Line 1",
              type: "pie",
              clockWise: true,
              radius: ["20%", "30%"],
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                  // shadowBlur: 15,
                  // shadowColor: 'white',
                },
              },
              hoverAnimation: false,
              data: [
                {
                  value: 1342221,
                  name: "学生",
                },
                {
                  value: 1912343,
                  name: "总数",
                  tooltip: {
                    show: false,
                  },
                  itemStyle: {
                    normal: {
                      color: "rgba(0,0,0,0)",
                      label: {
                        show: false,
                      },
                      labelLine: {
                        show: false,
                      },
                    },
                    emphasis: {
                      color: "rgba(0,0,0,0)",
                    },
                  },
                },
              ],
            },
          ],
        },

        //访问量
        fwl: {
          grid: {
            top: "4%",
            left: "2%",
            right: "4%",
            bottom: "0%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: [],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "访问量",
              type: "line",
              data: [],
              smooth: true,
              areaStyle: {},
            },
          ],
        },
        //授权数
        sqs: {
          grid: {
            top: "4%",
            left: "2%",
            right: "4%",
            bottom: "0%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              /*boundaryGap: false,*/
              data: ["0时", "4时", "8时", "12时", "16时", "20时", "24时"],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "授权数",
              type: "bar",
              barWidth: "60%",
              data: [10, 52, 20, 33, 39, 33, 22],
            },
          ],
        },
        //词云
        cy: {
          grid: {
            top: "4%",
            left: "2%",
            right: "4%",
            bottom: "0%",
          },
          series: [
            {
              type: "wordCloud",
              gridSize: 15,
              sizeRange: [12, 40],
              rotationRange: [0, 0],
              width: "100%",
              height: "100%",
              textStyle: {
                normal: {
                  color() {
                    const arr = [
                      "#1890FF",
                      "#36CBCB",
                      "#4ECB73",
                      "#FBD437",
                      "#F2637B",
                      "#975FE5",
                    ];
                    let index = Math.floor(Math.random() * arr.length);
                    return arr[index];
                  },
                },
              },
              data: [
                {
                  name: "张三",
                  value: 15000,
                },
                {
                  name: "李四",
                  value: 10081,
                },
                {
                  name: "王五",
                  value: 9386,
                },

                {
                  name: "麻子",
                  value: 6500,
                },
                {
                  name: "二狗子",
                  value: 6000,
                },
                {
                  name: "小李子",
                  value: 4500,
                },
                {
                  name: "张三",
                  value: 15000,
                },
                {
                  name: "李四",
                  value: 10081,
                },
                {
                  name: "王五",
                  value: 9386,
                },

                {
                  name: "麻子",
                  value: 6500,
                },
                {
                  name: "二狗子",
                  value: 6000,
                },
                {
                  name: "小李子",
                  value: 4500,
                },
                {
                  name: "张三",
                  value: 15000,
                },
                {
                  name: "李四",
                  value: 10081,
                },
                {
                  name: "王五",
                  value: 9386,
                },

                {
                  name: "麻子",
                  value: 6500,
                },
                {
                  name: "二狗子",
                  value: 6000,
                },
                {
                  name: "小李子",
                  value: 4500,
                },
              ],
            },
          ],
        },
        //中国地图
        zgdt: {
          title: {
            text: "2099年全国GDP分布",
            subtext: "数据来自vue-admin-beautiful杜撰",
          },
          tooltip: {
            trigger: "item",
          },
          dataRange: {
            orient: "horizontal",
            min: 0,
            max: 55000,
            text: ["高", "低"],
            splitNumber: 0,
          },
          series: [
            {
              name: "2099年全国GDP分布",
              type: "map",
              roam: false,
              zoom: 1.25,
              mapType: "china",
              mapLocation: {
                x: "center",
              },
              selectedMode: "multiple",
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                },
                emphasis: {
                  label: {
                    show: true,
                  },
                },
              },
              data: [
                { name: "西藏", value: 605.83 },
                { name: "青海", value: 1670.44 },
                { name: "宁夏", value: 2102.21 },
                { name: "海南", value: 2522.66 },
                { name: "甘肃", value: 5020.37 },
                { name: "贵州", value: 5701.84 },
                { name: "新疆", value: 6610.05 },
                { name: "云南", value: 8893.12 },
                { name: "重庆", value: 10011.37 },
                { name: "吉林", value: 10568.83 },
                { name: "山西", value: 11237.55 },
                { name: "天津", value: 11307.28 },
                { name: "江西", value: 11702.82 },
                { name: "广西", value: 11720.87 },
                { name: "陕西", value: 12512.3 },
                { name: "黑龙江", value: 12582 },
                { name: "内蒙古", value: 14359.88 },
                { name: "安徽", value: 15300.65 },
                { name: "北京", value: 16251.93 },
                { name: "福建", value: 17560.18 },
                { name: "上海", value: 19195.69 },
                { name: "湖北", value: 19632.26 },
                { name: "湖南", value: 19669.56 },
                { name: "四川", value: 21026.68 },
                { name: "辽宁", value: 22226.7 },
                { name: "河北", value: 24515.76 },
                { name: "河南", value: 26931.03 },
                { name: "浙江", value: 32318.85 },
                { name: "山东", value: 45361.85, selected: true },
                { name: "江苏", value: 49110.27 },
                { name: "广东", value: 53210.28 },
              ],
            },
          ],
        },

        //其他信息
        userAgent: navigator.userAgent,
      };
    },
    created() {
      this.fetchData();
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    mounted() {
      let base = +new Date(2020, 1, 1);
      let oneDay = 24 * 3600 * 1000;
      let date = [];

      let data = [Math.random() * 1500];
      let now = new Date(base);

      const addData = (shift) => {
        now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/");
        date.push(now);
        data.push(this.$baseLodash.random(20000, 60000));

        if (shift) {
          date.shift();
          data.shift();
        }

        now = new Date(+new Date(now) + oneDay);
      };

      for (let i = 1; i < 6; i++) {
        addData();
      }
      addData(true);
      this.fwl.xAxis[0].data = date;
      this.fwl.series[0].data = data;
      this.timer = setInterval(() => {
        addData(true);
        this.fwl.xAxis[0].data = date;
        this.fwl.series[0].data = data;
      }, 3000);
    },
    methods: {
      handleClick(e) {
        this.$baseMessage(`点击了${e.name},这里可以写跳转`);
      },
      handleZrClick(e) {},
      handleChangeTheme() {
        this.$baseEventBus.$emit("theme");
      },
      async fetchData() {},
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
        .echarts {
          width: 100%;
          height: 125px;
        }
      }
    }

    .card {
      min-height: 400px;

      ::v-deep {
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
