<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-10-03 11:27:37
 * @LastEditTime: 2020-10-07 22:55:36
-->
<template>
  <el-drawer
    :title="title"
    :visible.sync="dialogFormVisible"
    :before-close="close"
    size="700px"
  >
    <div v-if="dialogFormVisible" class="form">
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
              v-for="(item, index) in goodsType"
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
        <el-form-item v-if="form.type === 1" label="所属菜谱" prop="menuId">
          <el-input
            v-model="form.menuId"
            placeholder="所属菜谱必须是已经上架的菜谱"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品简述" prop="summary">
          <el-input
            v-model="form.summary"
            placeholder=" 显示在商品标题下面的一行小字"
            :maxlength="60"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品类目" prop="cateId">
          <el-cascader
            v-model="form.cateId"
            :options="category"
            :props="categoryProps"
            :style="{ width: '100%' }"
            placeholder="请选择商品类目"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="商品产地" prop="address_id">
          <el-select
            v-model="form.address_id"
            placeholder="请选择商品产地"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in areaOptions"
              :key="index"
              :label="item.address"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品规格" prop="spe_type">
          <el-radio-group v-model="form.spe_type" size="medium">
            <el-radio
              v-for="(item, index) in skuOptions"
              :key="index"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="form.spe_type === 1">
          <unifySpec
            ref="unifySpec"
            :model="form"
            :is-add="isAdd"
            @getData="handleGetData"
          ></unifySpec>
        </div>
        <div v-if="form.spe_type === 2">
          <prodSpec ref="prodSpec" :model="form" :is-add="isAdd"></prodSpec>
        </div>

        <el-form-item label="商品图片" prop="pics">
          <el-upload
            ref="pics_img"
            :file-list="form.pics_list"
            :action="fileUpload"
            :before-upload="good_imgBeforeUpload"
            list-type="picture"
            accept="zip/*"
            :on-success="handlePicsSuccess"
            :before-remove="handlePicsRemove"
            :limit="getLimit"
          >
            <el-button size="small" type="primary" icon="el-icon-upload">
              添加图片
            </el-button>
            <div slot="tip" class="el-upload__tip">
              上传ZIP格式压缩包，单张尺寸建议？？*？？？，？？？像素以上，单张图片大小1M以下，最多5张图片，01-05，顺序从小到大
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述" prop="introPics">
          <el-upload
            ref="introPics_img"
            :file-list="form.introPics_list"
            :action="fileUpload"
            :before-upload="describe_imgBeforeUpload"
            list-type="picture"
            accept="zip/*"
            :on-success="handleIntroPicsSuccess"
            :before-remove="handleIntroPicsRemove"
            :limit="getLimit"
          >
            <el-button size="small" type="primary" icon="el-icon-upload">
              添加图片
            </el-button>
            <div slot="tip" class="el-upload__tip">
              上传ZIP格式压缩包，单张尺寸建议？？*？？？，？？？像素以上，单张图片大小1M以下，01-50，顺序从小到大
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="运费模板" prop="postTempId">
          <el-select
            v-model="form.postTempId"
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
        <el-form-item
          label-width="106px"
          label="库存计算方式"
          prop="dealStockType"
        >
          <el-radio-group v-model="form.dealStockType" size="medium">
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
        <div v-if="form.type === 4">
          <prodRecipes
            ref="prodRecipes"
            :model="form"
            :is-add="isAdd"
          ></prodRecipes>
        </div>
      </el-form>
    </div>

    <div class="dialog-footer">
      <el-button size="medium" @click="close">取 消</el-button>
      <el-button size="medium" type="primary" @click="save">保 存</el-button>
    </div>
  </el-drawer>
</template>
<script>
  import { addProduct, modifyProduct } from "@/api/goods";
  import { mapState } from "vuex";
  import { fileUpload } from "@/config/settings";
  import { findAllProdAddress } from "@/api/produce";
  import prodSpec from "./prodSpec";
  import prodRecipes from "./prodRecipes";
  import unifySpec from "./unifySpec";
  export default {
    name: "GoodsEdit",
    components: {
      prodSpec,
      prodRecipes,
      unifySpec,
    },
    data() {
      return {
        isAdd: true,
        fileUpload,
        form: {
          storeId: 1,
          name: "",
          type: "",
          summary: "",
          cateId: "",
          address_id: "",
          subCateId: "",
          spe_type: 1,
          prodSpec: [
            {
              id: 0,
              prodId: 0,
              oriPrice: "",
              sellPrice: "",
              stock: "",
              weight: "",
            },
          ],
          postTempId: "",
          dealStockType: "",
          prodRecipes: "",
          pics: "",
          introPics: "",
          menuId: "",
          storeId: "",
          introPics_list: [],
          pics_list: [],
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
          summary: [
            {
              required: true,
              message: " 请输入商品简述,显示在商品标题下面的一行小字",
              trigger: "blur",
            },
          ],
          cateId: [
            {
              required: true,
              type: "array",
              message: "请选择一个商品类目",
              trigger: "change",
            },
          ],
          address_id: [
            {
              required: true,
              message: "请选择商品产地",
              trigger: "change",
            },
          ],
          postTempId: [
            {
              required: true,
              message: "请选择运费模板",
              trigger: "change",
            },
          ],
          dealStockType: [
            {
              required: true,
              message: "请选择库存计算方式",
              trigger: "blur",
            },
          ],
          pics: [
            {
              required: true,
              message: "请上传商品图片",
            },
          ],
          introPics: [
            {
              required: true,
              message: "请上传商品描述图片",
            },
          ],
        },
        good_imgfileList: [],
        describe_imgfileList: [],

        areaOptions: [],
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
          label: "name",
          value: "id",
          children: "subCategoryList",
        },
        title: "",
        dialogFormVisible: false,
      };
    },
    computed: mapState({
      goodsType: (state) => state.goods.goodsType,
      category: (state) => state.goods.category,
      getLimit() {
        return this.isAdd ? 1 : 10;
      },
    }),
    async created() {
      const {
        data: { prodAddress },
      } = await findAllProdAddress();
      this.areaOptions = prodAddress;
      this.copyData = JSON.parse(JSON.stringify(this.form));
    },
    mounted() {},
    methods: {
      handleIntroPicsRemove(file, fileList) {
        if (!this.isAdd) {
          const index = this.form.introPics.findIndex(
            (item) => item.id === file.id
          );
          this.form.introPics.splice(index, 1);
        } else {
          this.form.introPics = "";
        }
      },
      handlePicsRemove(file) {
        if (!this.isAdd) {
          const index = this.form.pics.findIndex((item) => item.id === file.id);
          this.form.pics.splice(index, 1);
        } else {
          this.form.pics = "";
        }
      },
      handlePicsSuccess(e) {
        this.form.pics = e.data.tempUrl;
        if (e.code === 500) {
          this.$baseAlert(e.msg, "温馨提示");
        }
        this.$refs.form.clearValidate("pics");
      },
      handleIntroPicsSuccess(e) {
        this.form.introPics = e.data.tempUrl;
        if (e.code === 500) {
          this.$baseAlert(e.msg, "温馨提示");
        }
        this.$refs.form.clearValidate("introPics");
      },
      showEdit(row) {
        if (!row) {
          this.title = "添加商品";
          this.isAdd = true;
        } else {
          this.title = "编辑商品";
          this.isAdd = false;
          var row = JSON.parse(JSON.stringify(row));
          row.spe_type = row.speType;
          row.prodSpec = row.specList;
          row.address_id = row.addressId;
          row.cateId = [row.cateId, row.subCateId];
          row.pics_list = row.pics.map((item) => {
            return {
              name: item.path.substr(item.path.lastIndexOf("/") + 1),
              url: "/service/" + item.path,
              id: item.id,
            };
          });
          row.introPics_list = row.introPics.map((item) => {
            return {
              name: item.path.substr(item.path.lastIndexOf("/") + 1),
              url: "/service/" + item.path,
              id: item.id,
            };
          });

          this.form = Object.assign(this.form, row);
        }
        this.dialogFormVisible = true;
      },
      close() {
        this.$refs["form"].resetFields();
        this.form = this.$options.data().form;
        this.dialogFormVisible = false;
      },
      handleGetData(e) {
        this.form.prodSpec = JSON.stringify([e]);
      },
      async save() {
        if (this.form.spe_type === 2) {
          this.form.prodSpec = JSON.stringify(this.$refs.prodSpec.getData());
        } else {
          await this.$refs.unifySpec.getData();
        }
        if (this.form.type === 4) {
          this.form.prodRecipes = JSON.stringify(
            this.$refs.prodRecipes.getData()
          );
        }

        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            const form = JSON.parse(JSON.stringify(this.form));
            let category = form.cateId;
            form.cateId = category[0];
            form.subCateId = category[1];

            if (this.title.includes("添加")) {
              const { msg } = await addProduct(form);
              this.$baseMessage(msg, "success");
            } else {
              const { msg } = await modifyProduct(form);
              this.$baseMessage(msg, "success");
            }
            this.form = this.copyData;
            this.$emit("fetchData");
            this.close();
          } else {
            return false;
          }
        });
      },
      good_imgBeforeUpload(file) {
        let isRightSize = file.size / 1024 / 1024 < 2;
        if (!isRightSize) {
          this.$message.error("文件大小超过 2MB");
        }
        let isAccept = new RegExp("zip/*").test(file.type);
        if (!isAccept) {
          this.$message.error("应该选择zip/*类型的文件");
        }
        return isRightSize && isAccept;
      },
      describe_imgBeforeUpload(file) {
        let isRightSize = file.size / 1024 / 1024 < 2;
        if (!isRightSize) {
          this.$message.error("文件大小超过 2MB");
        }
        let isAccept = new RegExp("zip/*").test(file.type);
        if (!isAccept) {
          this.$message.error("应该选择zip/*类型的文件");
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
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: $base-padding;
    text-align: center;
    text-align: right;
    border-top: 1px solid $base-border-color;
  }

  ::v-deep {
    .el-card__header {
      padding: 10px 20px;
    }

    .el-upload {
      &-list__item-status-label,
      &-list__item .el-icon-close {
        display: none !important;
      }
    }

    .el-card__body {
      padding: 20px 10px 0 0;
    }

    .add-btn {
      .el-form-item__content {
        margin-left: 10px !important;
      }
    }

    .el-upload__tip {
      line-height: 20px;
    }

    .el-drawer__header {
      padding-bottom: 15px;
      margin-bottom: 0;
      border-bottom: 1px solid $base-border-color;
    }

    .el-drawer {
      &__body {
        flex: inherit;
        padding-top: 10px;

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
