<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-10-03 11:27:37
 * @LastEditTime: 2020-10-03 14:30:43
-->
<template>
  <el-drawer
    :title="title"
    :visible.sync="dialogFormVisible"
    :before-close="close"
    size="600px"
  >
    <div class="form">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="medium"
        label-width="100px"
      >
        <el-form-item label="商品类型" prop="type">
          <el-select
            v-model="form.type"
            placeholder="请选择商品类型"
            filterable
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in typeOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入商品名称"
            :maxlength="60"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品简述" prop="desc">
          <el-input
            v-model="form.desc"
            placeholder=" 显示在商品标题下面的一行小字"
            :maxlength="60"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品类目" prop="category">
          <el-cascader
            v-model="form.category"
            :options="categoryOptions"
            :props="categoryProps"
            :style="{ width: '100%' }"
            placeholder="请选择商品类目"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="商品产地" prop="area">
          <el-select
            v-model="form.area"
            placeholder="请选择商品产地"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in areaOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品规格" prop="sku">
          <el-radio-group v-model="form.sku" size="medium">
            <el-radio
              v-for="(item, index) in skuOptions"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="原价" prop="ori_price">
          <el-input
            v-model="form.ori_price"
            placeholder="请输入原价"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="销售价" prop="sale_price">
          <el-input
            v-model="form.sale_price"
            placeholder="请输入销售价"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="单前库存" prop="stock">
          <el-input
            v-model="form.stock"
            placeholder="请输入单前库存"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="重量（Kg）" prop="weight">
          <el-input
            v-model="form.weight"
            placeholder="请输入重量（Kg）"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="good_img" required>
          <el-upload
            ref="good_img"
            :file-list="good_imgfileList"
            :action="good_imgAction"
            :before-upload="good_imgBeforeUpload"
            list-type="picture"
            accept="image/*"
          >
            <el-button size="small" type="primary" icon="el-icon-upload">
              添加图片
            </el-button>
            <div slot="tip" class="el-upload__tip">
              上传ZIP格式压缩包，单张尺寸建议？？*？？？，？？？像素以上，单张图片大小1M以下，最多5张图片，01-05，顺序从小到大
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述" prop="describe_img" required>
          <el-upload
            ref="describe_img"
            :file-list="describe_imgfileList"
            :action="describe_imgAction"
            :before-upload="describe_imgBeforeUpload"
            list-type="picture"
            accept="image/*"
          >
            <el-button size="small" type="primary" icon="el-icon-upload">
              添加图片
            </el-button>
            <div slot="tip" class="el-upload__tip">
              上传ZIP格式压缩包，单张尺寸建议？？*？？？，？？？像素以上，单张图片大小1M以下，01-50，顺序从小到大
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="运费模板" prop="freight">
          <el-select
            v-model="form.freight"
            placeholder="请选择运费模板"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in freightOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="106px" label="库存计算方式" prop="mode">
          <el-radio-group v-model="form.mode" size="medium">
            <el-radio
              v-for="(item, index) in modeOptions"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row type="flex">
          <el-col :span="10">
            <el-form-item label="菜品名称" prop="food_name">
              <el-input
                v-model="form.food_name"
                placeholder="请输入菜品名称"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="重量" prop="food_weight">
              <el-input
                v-model="form.food_weight"
                placeholder="请输入重量"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="" prop="field123" class="add-btn">
              <el-button type="primary" icon="el-icon-plus" size="small">
                添加配方
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column
            prop="id"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="菜品名称"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="weight"
            label="重量"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="small"
                @click.native.prevent="deleteRow(scope.$index, tableData)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>

    <div class="dialog-footer">
      <el-button size="medium" @click="close">取 消</el-button>
      <el-button size="medium" type="primary" @click="save">保 存</el-button>
    </div>
  </el-drawer>
</template>

<script>
  import { doEdit } from "@/api/goods";

  export default {
    name: "GoodsEdit",
    data() {
      return {
        tableData: [
          {
            id: 1,
            name: "土豆",
            weight: 1,
          },
          {
            id: 2,
            name: "牛肉",
            weight: 1,
          },
        ],
        form: {
          id: "",
          type: "",
          name: undefined,
          desc: undefined,
          category: [],
          area: undefined,
          sku: 1,
          ori_price: undefined,
          sale_price: undefined,
          stock: undefined,
          weight: undefined,
          good_img: "",
          describe_img: "",
          freight: undefined,
          mode: 1,
          food_name: undefined,
          food_weight: undefined,
          field123: undefined,
        },
        rules: {
          id: [{ required: true, trigger: "blur", message: "请输入id" }],
          type: [
            {
              required: true,
              message: "请选择商品类型",
              trigger: "change",
            },
          ],
          name: [
            {
              required: true,
              message: "请输入商品名称",
              trigger: "blur",
            },
          ],
          desc: [
            {
              required: true,
              message: " 显示在商品标题下面的一行小字",
              trigger: "blur",
            },
          ],
          category: [
            {
              required: true,
              type: "array",
              message: "请至少选择一个商品类目",
              trigger: "change",
            },
          ],
          area: [
            {
              required: true,
              message: "请选择商品产地",
              trigger: "change",
            },
          ],
          sku: [
            {
              required: true,
              message: "商品规格不能为空",
              trigger: "change",
            },
          ],
          ori_price: [
            {
              required: true,
              message: "请输入原价",
              trigger: "blur",
            },
          ],
          sale_price: [
            {
              required: true,
              message: "请输入销售价",
              trigger: "blur",
            },
          ],
          stock: [
            {
              required: true,
              message: "请输入单前库存",
              trigger: "blur",
            },
          ],
          weight: [
            {
              required: true,
              message: "请输入重量（Kg）",
              trigger: "blur",
            },
          ],
          freight: [
            {
              required: true,
              message: "请选择运费模板",
              trigger: "change",
            },
          ],
          mode: [
            {
              required: true,
              message: "库存计算方式不能为空",
              trigger: "change",
            },
          ],
          food_name: [
            {
              required: true,
              message: "请输入菜品名称",
              trigger: "blur",
            },
          ],
          food_weight: [
            {
              required: true,
              message: "请输入重量",
              trigger: "blur",
            },
          ],
        },
        good_imgAction: "https://jsonplaceholder.typicode.com/posts/",
        good_imgfileList: [],
        describe_imgAction: "https://jsonplaceholder.typicode.com/posts/",
        describe_imgfileList: [],
        typeOptions: [
          {
            label: "菜谱",
            value: 1,
          },
          {
            label: "菜盒",
            value: 2,
          },
          {
            label: "菜品",
            value: 3,
          },
          {
            label: "设备",
            value: 4,
          },
        ],
        categoryOptions: [],
        areaOptions: [
          {
            label: "选项一",
            value: 1,
          },
          {
            label: "选项二",
            value: 2,
          },
        ],
        skuOptions: [
          {
            label: "统一规格",
            value: 1,
          },
          {
            label: "多规格",
            value: 2,
          },
        ],
        freightOptions: [
          {
            label: "包邮",
            value: 1,
          },
          {
            label: "江浙沪包邮",
            value: 2,
          },
          {
            label: "首重8元续重8元",
            value: 3,
          },
          {
            label: "偏远地区",
            value: 4,
          },
          {
            label: "生鲜配送",
            value: 5,
          },
        ],
        modeOptions: [
          {
            label: "下单减库存",
            value: 1,
          },
          {
            label: "支付减库存",
            value: 2,
          },
        ],
        categoryProps: {
          multiple: false,
          label: "label",
          value: "value",
          children: "children",
        },
        title: "",
        dialogFormVisible: false,
      };
    },
    created() {},
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = "添加商品";
        } else {
          this.title = "编辑商品";
          this.form = Object.assign({}, row);
        }
        this.dialogFormVisible = true;
      },
      close() {
        this.$refs["form"].resetFields();
        this.form = this.$options.data().form;
        this.dialogFormVisible = false;
      },
      save() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            const { msg } = await doEdit(this.form);
            this.$baseMessage(msg, "success");
            this.$emit("fetchData");
            this.close();
          } else {
            return false;
          }
        });
      },
      getCategoryOptions() {
        // 注意：this.$axios是通过Vue.prototype.$axios = axios挂载产生的
        this.$axios({
          method: "get",
          url:
            "https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/cascaderList",
        }).then((resp) => {
          var { data } = resp;
          this.categoryOptions = data.list;
        });
      },
      good_imgBeforeUpload(file) {
        let isRightSize = file.size / 1024 / 1024 < 2;
        if (!isRightSize) {
          this.$message.error("文件大小超过 2MB");
        }
        let isAccept = new RegExp("image/*").test(file.type);
        if (!isAccept) {
          this.$message.error("应该选择image/*类型的文件");
        }
        return isRightSize && isAccept;
      },
      describe_imgBeforeUpload(file) {
        let isRightSize = file.size / 1024 / 1024 < 2;
        if (!isRightSize) {
          this.$message.error("文件大小超过 2MB");
        }
        let isAccept = new RegExp("image/*").test(file.type);
        if (!isAccept) {
          this.$message.error("应该选择image/*类型的文件");
        }
        return isRightSize && isAccept;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .el-form {
    margin: 0 40px 0 20px;
  }
  .dialog-footer {
    text-align: center;
    padding: $base-padding;
    text-align: right;
    border-top: 1px solid $base-border-color;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
  }

  ::v-deep {
    .add-btn {
      .el-form-item__content {
        margin-left: 10px !important;
      }
    }
    .el-upload__tip {
      line-height: 20px;
    }
    .el-drawer__header {
      border-bottom: 1px solid $base-border-color;
      padding-bottom: 15px;
      margin-bottom: 0;
    }
    .el-drawer {
      &__body {
        padding-top: 10px;
        flex: inherit;
        .form {
          max-height: calc(100vh - 148px);
          overflow: auto;
          .el-table {
            margin-bottom: 20px;
          }
        }
      }
    }
  }
</style>
