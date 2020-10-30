<template>
  <span v-if="themeBar">
    <vab-icon
      title="主题配置"
      :icon="['fas', 'palette']"
      @click="handleOpenThemeBar"
    />
    <div v-if="false" class="theme-bar-setting">
      <div @click="handleOpenThemeBar">
        <vab-icon :icon="['fas', 'palette']" />
        <p>主题配置</p>
      </div>
    </div>

    <el-drawer
      title="主题配置"
      :visible.sync="drawerVisible"
      direction="rtl"
      append-to-body
      size="470px"
    >
      <el-scrollbar style="height: 94vh; overflow: hidden">
        <div class="el-drawer__body">
          <el-form ref="form" :model="theme">
            <el-form-item label="主题">
              <el-radio-group v-model="theme.name">
                <el-radio-button label="dark">默认</el-radio-button>
                <el-radio-button label="ocean">海洋之心</el-radio-button>
                <el-radio-button label="green">绿荫草场</el-radio-button>
                <el-radio-button label="glory">荣耀典藏</el-radio-button>
                <el-radio-button label="default">暗黑之子</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="布局">
              <el-radio-group v-model="theme.layout">
                <el-radio-button label="vertical">纵向布局</el-radio-button>
                <el-radio-button label="horizontal">横向布局</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="头部">
              <el-radio-group v-model="theme.header">
                <el-radio-button label="fixed">固定头部</el-radio-button>
                <el-radio-button label="noFixed">不固定头部</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="多标签">
              <el-radio-group v-model="theme.tabsBar">
                <el-radio-button label="true">开启</el-radio-button>
                <el-radio-button label="false">不开启</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button @click="handleSetDfaultTheme">恢复默认</el-button>
              <el-button type="primary" @click="handleSaveTheme">
                保存
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
    </el-drawer>
  </span>
</template>

<script>
  import variables from "@/styles/variables.scss";
  import { mapGetters } from "vuex";
  import { layout as defaultLayout } from "@/config/settings";
  export default {
    name: "ThemeBar",
    data() {
      return {
        drawerVisible: false,
        theme: {
          name: "dark",
          layout: "",
          header: "",
          tabsBar: "",
        },
      };
    },
    computed: {
      ...mapGetters({
        layout: "settings/layout",
        header: "settings/header",
        tabsBar: "settings/tabsBar",
        themeBar: "settings/themeBar",
      }),
    },
    mounted() {},
    created() {
      this.$baseEventBus.$on("theme", () => {
        this.handleOpenThemeBar();
      });
      const theme = localStorage.getItem("vue-admin-beautiful-theme");
      if (null !== theme) {
        this.theme = JSON.parse(theme);
        this.handleSetTheme();
      } else {
        this.theme.layout = this.layout;
        this.theme.header = this.header;
        this.theme.tabsBar = this.tabsBar;
        document.getElementsByTagName(
          "body"
        )[0].className = `vue-admin-beautiful-theme-${this.theme.name}`;
      }
    },
    methods: {
      handleIsMobile() {
        return document.body.getBoundingClientRect().width - 1 < 992;
      },
      handleOpenThemeBar() {
        this.drawerVisible = true;
      },
      handleSetTheme() {
        let { name, layout, header, tabsBar } = this.theme;
        localStorage.setItem(
          "vue-admin-beautiful-theme",
          `{
            "name":"${name}",
            "layout":"${layout}",
            "header":"${header}",
            "tabsBar":"${tabsBar}"
          }`
        );
        if (!this.handleIsMobile()) {
          this.$store.dispatch("settings/changeLayout", layout);
        }
        this.$store.dispatch("settings/changeHeader", header);
        this.$store.dispatch("settings/changetabsBar", tabsBar);
        document.getElementsByTagName(
          "body"
        )[0].className = `vue-admin-beautiful-theme-${name}`;
        this.drawerVisible = false;
      },
      handleSaveTheme() {
        this.handleSetTheme();
      },
      handleSetDfaultTheme() {
        let { name } = this.theme;
        document
          .getElementsByTagName("body")[0]
          .classList.remove(`vue-admin-beautiful-theme-${name}`);
        localStorage.removeItem("vue-admin-beautiful-theme");
        this.$refs["form"].resetFields();
        Object.assign(this.$data, this.$options.data());
        this.$store.dispatch("settings/changeLayout", defaultLayout);
        this.theme.name = "dark";
        this.theme.layout = this.layout;
        this.theme.header = this.header;
        this.theme.tabsBar = this.tabsBar;
        this.drawerVisible = false;

        document.getElementsByTagName(
          "body"
        )[0].className = `vue-admin-beautiful-theme-${this.theme.name}`;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @mixin right-bar {
    position: fixed;
    right: 0;
    z-index: $base-z-index;
    width: 60px;
    min-height: 60px;
    text-align: center;
    cursor: pointer;
    background: $base-color-blue;
    border-radius: $base-border-radius;

    > div {
      padding-top: 10px;
      border-bottom: 0 !important;

      &:hover {
        opacity: 0.9;
      }

      & + div {
        border-top: 1px solid $base-color-white;
      }

      p {
        padding: 0;
        margin: 0;
        font-size: $base-font-size-small;
        line-height: 30px;
        color: $base-color-white;
      }
    }
  }

  .theme-bar-setting {
    @include right-bar;

    top: calc((100vh - 110px) / 2);

    ::v-deep {
      svg:not(:root).svg-inline--fa {
        display: block;
        margin-right: auto;
        margin-left: auto;
        color: $base-color-white;
      }

      .svg-icon {
        display: block;
        margin-right: auto;
        margin-left: auto;
        font-size: 20px;
        color: $base-color-white;
        fill: $base-color-white;
      }
    }
  }

  .el-drawer__body {
    padding: 20px;
  }
</style>
<style lang="scss">
  .el-drawer__wrapper {
    outline: none !important;

    * {
      outline: none !important;
    }
  }

  .vab-color-picker {
    .el-color-dropdown__link-btn {
      display: none;
    }
  }
</style>
