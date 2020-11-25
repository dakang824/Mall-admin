<template>
  <div class="login-container">
    <el-alert
      v-if="nodeEnv !== 'development'"
      :title="'欢迎使用' + title + '管理系统'"
      type="success"
      :closable="false"
    ></el-alert>
    <el-carousel height="100vh" indicator-position="none" arrow="never">
      <el-carousel-item v-for="(item, index) in bgs" :key="index">
        <el-image :src="item" fit="cover"></el-image>
      </el-carousel-item>
    </el-carousel>
    <el-row>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        class="login-form"
        label-position="left"
      >
        <div class="header">{{ title }}管理系统界面</div>
        <div class="box">
          <div class="title">管理系统界面</div>
          <el-form-item prop="account">
            <span class="svg-container svg-container-admin">
              <vab-icon :icon="['fas', 'user']" />
            </span>
            <el-input
              v-model.trim="form.account"
              v-focus
              placeholder="请输入用户名"
              tabindex="1"
              type="text"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <vab-icon :icon="['fas', 'key']" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model.trim="form.pwd"
              :type="passwordType"
              tabindex="2"
              placeholder="请输入密码"
              @keyup.enter.native="handleLogin"
            />
            <span
              v-if="passwordType === 'password'"
              class="show-password"
              @click="handlePassword"
            >
              <vab-icon :icon="['fas', 'eye-slash']"></vab-icon>
            </span>
            <span v-else class="show-password" @click="handlePassword">
              <vab-icon :icon="['fas', 'eye']"></vab-icon>
            </span>
          </el-form-item>
          <el-form-item prop="code">
            <span class="svg-container">
              <vab-icon :icon="['fas', 'qrcode']" />
            </span>
            <el-input
              ref="code"
              v-model.trim="form.code"
              type="text"
              tabindex="3"
              placeholder="请输入验证码"
              @keyup.enter.native="handleLogin"
            />

            <span class="show-code" @click="handleRefreshCode">
              <identifyCode
                :content-height="39"
                :identify-code="identifyCode"
              ></identifyCode>
            </span>
          </el-form-item>
          <el-button
            :loading="loading"
            class="login-btn"
            type="danger"
            @click="handleLogin"
          >
            登录
          </el-button>
        </div>
        <div class="footer">
          Copyright © 2020-2023 技术支持：{{ copyright }}
        </div>
      </el-form>
    </el-row>
  </div>
</template>

<script>
  import { isPassword } from "@/utils/validate";
  import { random } from "@/utils";
  import identifyCode from "@/components/identify-code";
  import { copyright, title, loginRSA } from "@/config/settings";
  export default {
    name: "Login",
    components: { identifyCode },
    directives: {
      focus: {
        inserted(el) {
          el.querySelector("input").focus();
        },
      },
    },
    data() {
      const validateusername = (rule, value, callback) => {
        if ("" == value) {
          callback(new Error("用户名不能为空"));
        } else {
          callback();
        }
      };
      const validatePassword = (rule, value, callback) => {
        if (!isPassword(value)) {
          callback(new Error("密码不能少于6位"));
        } else {
          callback();
        }
      };
      const validateCode = (rule, value, callback) => {
        if ("" == value) {
          callback(new Error("验证码不能为空"));
        } else if (value !== this.identifyCode) {
          callback(new Error("验证码错误"));
        } else {
          callback();
        }
      };
      return {
        nodeEnv: process.env.NODE_ENV,
        copyright,
        title,
        identifyCode: "",
        loading: false,
        passwordType: "password",
        redirect: undefined,
        form: {
          account: "",
          pwd: "",
          code: "",
        },
        bgs: [
          require("@/assets/login_images/login_bg1.jpg"),
          require("@/assets/login_images/login_bg2.jpg"),
        ],
        rules: {
          account: [
            {
              required: true,
              trigger: "blur",
              validator: validateusername,
            },
          ],
          pwd: [
            {
              required: true,
              trigger: "blur",
              validator: validatePassword,
            },
          ],
          code: [
            {
              required: true,
              trigger: "blur",
              validator: validateCode,
            },
          ],
        },
      };
    },
    watch: {
      $route: {
        handler(route) {
          this.redirect = (route.query && route.query.redirect) || "/";
        },
        immediate: true,
      },
    },
    created() {
      document.body.style.overflow = "hidden";
      this.handleRefreshCode();
    },
    beforeDestroy() {
      document.body.style.overflow = "auto";
    },
    mounted() {
      if ("production" !== process.env.NODE_ENV) {
        this.form.account = "xiaoming";
        this.form.pwd = "123456";
      }
    },
    methods: {
      handlePassword() {
        this.passwordType === "password"
          ? (this.passwordType = "")
          : (this.passwordType = "password");
        this.$nextTick(() => {
          this.$refs.password.focus();
        });
      },
      handleLogin() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.loading = true;
            const form = JSON.parse(JSON.stringify(this.form));
            if (loginRSA) {
              form.pwd = new this.$md5().update(form.pwd).digest("hex");
            }
            this.$store
              .dispatch("user/login", form)
              .then(() => {
                const routerPath =
                  this.redirect === "/404" || this.redirect === "/401"
                    ? "/"
                    : this.redirect;
                this.$router.push(routerPath).catch(() => {});
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
          } else {
            return false;
          }
        });
      },
      handleRefreshCode() {
        this.identifyCode = "";
        for (let i = 0; i < 4; i++) {
          this.identifyCode += random(0, 9);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .login-container {
    position: relative;
    height: 100vh;

    .el-alert {
      position: relative;
    }

    .el-alert,
    .el-row {
      z-index: 3;
    }

    .el-carousel {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;

      .el-image {
        width: 100%;
        height: 100%;
      }
    }

    .login-btn {
      width: 100%;
      height: 50px;
      margin-top: 5px;
      font-size: 15px;
      border: 0;

      &:hover {
        opacity: 0.9;
      }
    }

    .login-form {
      position: absolute;
      top: 200px;
      right: 0;
      left: 0;
      width: 600px;
      margin: 0 auto;
      overflow: hidden;
      background: #fff;
      border-radius: 8px;

      .header,
      .footer {
        padding: 15px;
        font-size: 15px;
        color: #fff;
        text-align: center;
        background: #3c4658;
      }

      .box {
        width: 300px;
        margin: 0 auto 50px;

        .title {
          padding: 20px 0;
          font-size: 30px;
          text-align: center;
        }
      }

      .forget-password {
        width: 100%;
        margin-top: 40px;
        text-align: left;

        .forget-pass {
          width: 129px;
          height: 19px;
          font-size: 20px;
          font-weight: 400;
          color: rgba(92, 102, 240, 1);
        }
      }
    }

    .svg-container {
      position: absolute;
      top: 5px;
      left: 15px;
      z-index: $base-z-index;
      font-size: 16px;
      color: #ccc;
      cursor: pointer;
      user-select: none;
    }

    .show-code {
      position: absolute;
      top: 0;
      right: 1px;
      bottom: 0;
      height: 38px;
      margin: auto;
      overflow: hidden;
    }

    .show-password {
      position: absolute;
      top: 5px;
      right: 25px;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    ::v-deep {
      .el-form-item {
        padding-right: 0;
        color: #454545;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 2px;

        &__content {
          min-height: $base-input-height;
          line-height: $base-input-height;
        }

        &__error {
          position: absolute;
          top: 100%;
          left: 18px;
          font-size: $base-font-size-small;
          line-height: 18px;
          color: $base-color-red;
        }
      }

      .el-input {
        box-sizing: border-box;

        input {
          height: 40px;
          padding-left: 45px;
          font-size: $base-font-size-default;
          color: $base-font-color;
          caret-color: $base-font-color;
        }
      }
    }
  }
</style>
