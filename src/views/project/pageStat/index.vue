<template>
  <div class="pageStat-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="24">
        <ele-form
          v-model="queryForm"
          class="clear-col-6"
          v-bind="formConfig"
          is-show-reset-btn
          inline
          :is-show-label="false"
          :request-fn="queryData"
        />
      </vab-query-form-left-panel>
    </vab-query-form>
    <el-row :gutter="20">
      <div :key="key" v-loading="loading" class="pageStat-container__box">
        <chart v-for="(item, index) in list" :key="index" :mode="item"></chart>
      </div>
    </el-row>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import wxPagePath from "@/utils/wxPagePath";
  import { queryPageStat } from "@/api/pageStat";
  import Chart from "./components/chart.vue";
  const dayjs = require("dayjs");
  export default {
    name: "PageStat",
    components: {
      Chart,
    },
    data() {
      return {
        loading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        tableData: {
          data: [],
        },
        wxPages: [],
        formConfig: {
          formDesc: {
            time: {
              type: "daterange",
              attrs: {
                clearable: true,
                startPlaceholder: "开始时间",
                endPlaceholder: "结束时间",
                format: "yyyy-MM-dd HH:mm:ss",
                "value-format": "yyyy-MM-dd HH:mm:ss",
              },
            },
          },
        },

        queryForm: {
          page: "",
          start_time: "",
          end_time: "",
          time: [new Date()],
        },

        list: [],
        key: 1,
      };
    },
    computed: {
      ...mapState({
        professions: (state) => state.globalRequest.professions,
        professionsKeyVal: (state) => state.globalRequest.professionsKeyVal,
      }),
    },
    async created() {
      this.wxPages = Object.entries(wxPagePath).map((item) => ({
        text: item[1],
        value: item[0],
      }));

      this.queryForm.time = [
        dayjs().startOf("month").format("YYYY-MM-DD HH:mm:ss"),
        dayjs().endOf("month").format("YYYY-MM-DD HH:mm:ss"),
      ];
      this.queryData();
    },
    methods: {
      handleResetForm(e) {
        this.$refs[e].resetFields();
      },
      async queryData(loading = true) {
        this.loading = loading;
        const queryForm = JSON.parse(JSON.stringify(this.queryForm));
        queryForm.start_time = "";
        queryForm.end_time = "";
        if (Array.isArray(queryForm.time)) {
          queryForm.start_time = queryForm.time[0];
          queryForm.end_time = queryForm.time[1];
          delete queryForm.time;
        }
        const list = [];
        for (let i = 0; i < this.wxPages.length; i++) {
          const { text: title, value: page } = this.wxPages[i];
          const params = {
            ...queryForm,
            page,
          };
          const {
            data: { data },
          } = await queryPageStat(params);

          list.push({
            data: [Number(data.time_stat), Number(data.user_count)],
            title,
            ...params,
            color: [
              "#5470c6",
              "#91cc75",
              "#fac858",
              "#ee6666",
              "#73c0de",
              "#3ba272",
              "#fc8452",
              "#9a60b4",
              "#ea7ccc",
            ][i],
          });
        }

        this.list = list;
        this.key++;
        setTimeout(() => {
          this.loading = false;
        }, 300);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .pageStat-container {
    &__box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }

  ::v-deep {
    .el-card {
      &__header {
        padding: 10px;
      }
    }
  }
</style>
