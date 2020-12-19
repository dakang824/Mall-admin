/* eslint-disable vue/no-mutating-props */
<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 可填写的标签
 * @Date: 2020-12-03 20:15:41
 * @LastEditTime: 2020-12-14 21:08:37
-->
<template>
  <div class="addTag">
    <el-tag
      v-for="(tag, index) in val"
      :key="tag.name + index"
      class="tag"
      closable
      type="success"
      :disable-transitions="false"
      @close="handleDelTag(index)"
    >
      {{ tag.name }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="saveTagInput"
      v-model="inputValue"
      class="input-new-tag"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    ></el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">
      + {{ txt }}
    </el-button>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      val: {
        type: Array,
        default: () => [],
      },
      verify: {
        //是否开启输入验证
        type: Boolean,
        default: false,
      },
      txt: {
        type: String,
        default: "添加小分类",
      },
    },
    data() {
      return {
        inputVisible: false,
        inputValue: "",
      };
    },
    methods: {
      showInput() {
        this.inputVisible = true;
        this.$nextTick((_) => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleDelTag(e) {
        this.$emit("delect", this.val[e]);
        this.val.splice(e, 1);
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          if (this.verify) {
            const arr = this.val.filter((item) => item.name === inputValue);
            if (arr.length) {
              this.$baseMessage("截止重复添加", "error");
              this.inputValue = "";
              return;
            }
            this.$emit("enter", inputValue, (v) => {
              if (v) {
                this.val.push({ name: inputValue });
              }
            });
          } else {
            this.val.push({ name: inputValue });
          }
        }
        this.inputVisible = false;
        this.inputValue = "";
      },
    },
  };
</script>

<style lang="scss" scope>
  .el-select {
    width: 100%;
  }

  .el-tag + .el-tag {
    margin-left: 0 !important;
  }

  .tag {
    margin: 0 10px 10px 0;
  }

  .button-new-tag {
    height: 25px;
    padding: 10px;
    padding-top: 0;
    padding-bottom: 0;
    line-height: 25px;
  }

  .input-new-tag {
    width: 80px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
