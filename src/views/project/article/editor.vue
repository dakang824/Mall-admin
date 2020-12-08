<template>
  <div class="editor-container">
    <el-page-header :content="content" title="返回" @back="goBack" />
    <ele-form
      v-model="form"
      class="clear-col-6"
      v-bind="formConfig"
      is-show-reset-btn
      :request-fn="queryData"
    />
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="form.title"
            maxlength="20"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input
            v-model="form.author"
            maxlength="20"
            placeholder="请输入作者"
          ></el-input>
        </el-form-item>

        <el-row :gutter="24">
          <el-col :md="24" :lg="4" :xl="3">
            <el-form-item label="上传封面" prop="cover_pic">
              <el-upload
                class="avatar-uploader"
                :action="fileUpload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="handleBeforeUpload"
                accept="image/*"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="10">
            <el-form-item
              label="请选择一级栏目"
              prop="cate1"
              label-width="140px"
            >
              <el-select v-model="form.cate1" :style="{ width: '100%' }">
                <el-option
                  v-for="(item, index) in cate1"
                  :key="index"
                  :label="item.text"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="请选择三级栏目"
              prop="cate3"
              label-width="140px"
            >
              <el-select v-model="form.cate3" :style="{ width: '100%' }">
                <el-option
                  v-for="(item, index) in cate3"
                  :key="index"
                  :label="item.text"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="10">
            <el-form-item
              label="请选择二级栏目"
              prop="cate2"
              label-width="140px"
            >
              <el-select v-model="form.cate2" :style="{ width: '100%' }">
                <el-option
                  v-for="(item, index) in cate2"
                  :key="index"
                  :label="item.text"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布日期" prop="field101">
              <el-date-picker
                v-model="form.time"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                range-separator="至"
                clearable
                :style="{ width: '100%' }"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="可见范围">
          <el-checkbox-group
            v-model="checkedUsers"
            @change="handleCheckedUsersChange"
          >
            <el-checkbox v-for="item in users" :key="item" :label="item">
              {{ item }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- <el-form-item label="内容" prop="content" style="margin-bottom: 30px">
          <Tinymce ref="editor" v-model="form.content" :height="400" />
        </el-form-item> -->
        <el-form-item>
          <el-button type="success" @click="handleSave">保存</el-button>
          <el-button type="primary" @click="handleSave">提交审核</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="预览效果" :visible.sync="dialogTableVisible">
        <div style="min-height: 60vh">
          <h1 class="news-title">{{ form.title }}</h1>
          <div class="news-content" v-html="form.content"></div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  // import Tinymce from "@/components/Tinymce";
  import { mapState } from "vuex";
  import { fileUpload } from "@/config/settings";
  import filters from "@/filters";
  export default {
    name: "Editor",
    components: {
      //  Tinymce
    },
    data() {
      return {
        fileUpload,
        borderColor: "#dcdfe6",
        dialogTableVisible: false,
        form: {
          title: "",
          author: "",
          module: "",
          content: "",
          time: [],
        },
        content: "添加文章",
        formConfig: {
          formDesc: {
            title: {
              type: "input",
              label: "文章标题",
              attrs: {
                clearable: true,
              },
            },
            author: {
              type: "input",
              label: "文章作者",
              attrs: {
                clearable: true,
              },
            },
            status: {
              type: "select",
              label: "文章状态",
              isOptions: true,
              attrs: {
                clearable: true,
              },
              options: () => {
                return this.$store.state.article.status;
              },
            },
            cate1: {
              type: "select",
              label: "一级栏目",
              attrs: {
                clearable: true,
              },
              options: () => {
                return this.$store.state.article.cate1;
              },
            },
            cate2: {
              type: "select",
              label: "二级栏目",
              attrs: {
                clearable: true,
              },
              options: () => {
                return this.$store.state.article.cate2;
              },
            },
            cate3: {
              type: "select",
              label: "三级栏目",
              attrs: {
                clearable: true,
              },
              options: () => {
                return this.$store.state.article.cate3;
              },
            },
          },
        },
        rules: {
          title: [
            {
              required: true,
              message: "请输入标题",
              trigger: "blur",
            },
          ],
          author: [
            {
              required: true,
              message: "请输入作者",
              trigger: "change",
            },
          ],
          cover_pic: [
            {
              required: true,
              message: "请上传封面",
              trigger: "blur",
            },
          ],
          cate1: [
            {
              required: true,
              message: "请选择一级栏目",
              trigger: "blur",
            },
          ],
          cate2: [
            {
              required: true,
              message: "请选择二级栏目",
              trigger: "blur",
            },
          ],
          cate3: [
            {
              required: true,
              message: "请选择三级栏目",
              trigger: "blur",
            },
          ],
        },
      };
    },
    computed: {
      ...mapState({
        articleList: (state) => state.article.articleList,
        cate1: (state) => state.article.cate1,
        cate2: (state) => state.article.cate2,
        cate3: (state) => state.article.cate3,
      }),
    },
    created() {
      this.content = this.$route.query.id ? "编辑文章" : "添加文章";
      if (this.$route.query.id) {
        const current = this.articleList.find(
          (x) => this.$route.query.id == x.id
        );
        this.form = current;
      }
    },
    methods: {
      goBack() {
        this.$router.back(-1);
      },
      handleCheckedUsersChange(e) {
        console.log(e);
      },
      handleBeforeUpload(e) {
        console.log(e);
      },
      handleSave() {
        this.$refs["form"].validate((valid) => {
          this.$refs.form.validateField("content", (errorMsg) => {
            this.borderColor = "#dcdfe6";
            if (errorMsg) {
              this.borderColor = "#F56C6C";
            }
          });
          if (valid) {
            this.$baseMessage("submit!", "success");
          } else {
            return false;
          }
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  .editor-container {
    .el-page-header {
      padding-bottom: 30px;
    }
    .news {
      &-title {
        text-align: center;
      }

      &-content {
        ::v-deep {
          p {
            line-height: 30px;

            img {
              display: block;
              margin-right: auto;
              margin-left: auto;
            }
          }
        }
      }
    }

    .vab-quill-content {
      ::v-deep {
        .el-form-item__content {
          line-height: normal;
        }
      }
    }
  }

  ::v-deep {
    .avatar-uploader {
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        height: 80px;
        display: flex;
        width: 80px;
        justify-content: center;
        align-items: center;
      }
      .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 24px;
        color: #8c939d;
        width: 80px;
        text-align: center;
      }
      .avatar {
        width: 80px;
        height: 80px;
        display: block;
      }
    }
  }
</style>
