<template>
  <div class="editor-container">
    <el-page-header :content="content" title="返回" @back="goBack" />
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="form.title"
            maxlength="20"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="title">
          <el-input
            v-model="form.title"
            maxlength="20"
            placeholder="请输入作者"
          ></el-input>
        </el-form-item>

        <el-row :gutter="24">
          <el-col :md="24" :lg="4" :xl="3">
            <el-form-item label="上传封面" prop="module">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="10">
            <el-form-item
              label="请选择一级栏目"
              prop="module"
              label-width="140px"
            >
              <el-select v-model="form.module" :style="{ width: '100%' }">
                <el-option label="新闻动态" value="1"></el-option>
                <el-option label="实时热点" value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="请选择三级栏目"
              prop="module"
              label-width="140px"
            >
              <el-select v-model="form.module" :style="{ width: '100%' }">
                <el-option label="新闻动态" value="1"></el-option>
                <el-option label="实时热点" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="10">
            <el-form-item
              label="请选择二级栏目"
              prop="module"
              label-width="140px"
            >
              <el-select v-model="form.module" :style="{ width: '100%' }">
                <el-option label="新闻动态" value="1"></el-option>
                <el-option label="实时热点" value="2"></el-option>
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

        <el-form-item label="内容" prop="content" style="margin-bottom: 30px">
          <Tinymce ref="editor" v-model="form.content" :height="400" />
        </el-form-item>
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
  import Tinymce from "@/components/Tinymce";
  export default {
    name: "Editor",
    components: { Tinymce },
    data() {
      return {
        borderColor: "#dcdfe6",
        dialogTableVisible: false,
        form: {
          title: "",
          module: "",
          content: "",
          time: [],
        },
        content: "添加文章",
        checkedUsers: [],
        users: [
          "用户类型A",
          "用户类型B",
          "用户类型C",
          "用户类型D",
          "用户类型E",
        ],
        rules: {
          title: [
            {
              required: true,
              message: "请输入标题",
              trigger: "blur",
            },
          ],
          module: [
            {
              required: true,
              message: "请选择模块",
              trigger: "change",
            },
          ],
          content: [
            {
              required: true,
              message: "请输入内容",
              trigger: "blur",
            },
          ],
        },
      };
    },
    created() {
      this.content = this.$route.query.id ? "编辑文章" : "添加文章";
    },
    methods: {
      goBack() {
        this.$router.back(-1);
      },
      handleCheckedUsersChange(e) {
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
