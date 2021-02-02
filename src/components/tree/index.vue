<template>
  <div class="ly-tree-container">
    <el-tree
      :data="treeData"
      :props="defaultProps"
      :expand-on-click-node="false"
      :render-content="renderContent"
      v-bind="$attrs"
    ></el-tree>
  </div>
</template>

<script>
  import { getServiceTree, delItem, addItem, updateItem } from "./tree.api.js";
  import { getEditContent, getDefaultContent } from "./tree.utils.js";
  import "./tree.scss";

  export default {
    name: "LyTree",
    props: {
      treeData: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        isEdit: false,
        edit_name: "",
        is_superuser: "False",
        defaultProps: {
          children: "child",
          label: "name",
        },
        select_id: null,
        select_level: null,
        select_node: null,
        delDialogVisible: false,
        id: null,
      };
    },

    created() {
      // this.refresh();
    },

    methods: {
      refresh() {
        let res = getServiceTree();
        this.is_superuser = res.is_superuser;
        this.treeData = res.data;
      },

      append(node, data, e) {
        e = event || window.event;
        e.stopPropagation();
        if (!this.isEdit) {
          this.select_id = data.id;
          this.edit_name = "";
          const newChild = {
            name: "",
            level: data.level + 1,
            isEdit: true,
          };
          this.isEdit = true;
          if (!data.child) {
            this.$set(data, "child", []);
          }
          data.child.unshift(newChild);
        } else {
          this.$notify({
            type: "error",
            title: "操作提示",
            message: "有正在编辑或添加的选项未完成！",
            duration: 2000,
          });
        }
      },

      remove(node, data, e) {
        e = event || window.event;
        e.stopPropagation();
        if (this.isEdit) {
          this.$notify({
            type: "error",
            title: "操作提示",
            message: "有正在编辑或添加的选项未完成！",
            duration: 2000,
          });
          return;
        }
        this.select_node = node;

        this.$confirm("是否删除此项?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.delSelect();
          })
          .catch(() => {});
      },

      delSelect() {
        delItem(this.treeData, { id: this.select_node.data.id });
        this.delDialogVisible = false;

        this.$emit("delete", { id: this.select_node.data.id });
      },

      update(node, data, e) {
        e = event || window.event;
        e.stopPropagation();
        if (this.isEdit) {
          this.$notify({
            type: "error",
            title: "操作提示",
            message: "有正在编辑或添加的选项未完成！",
            duration: 2000,
          });
          return;
        }
        this.select_id = data.id;
        this.select_level = data.level;
        this.edit_name = data.name;
        this.isEdit = true;
      },

      async editMsg(data, node, e) {
        e = event || window.event;
        e.stopPropagation();
        if (this.edit_name.replace(/^\s+|\s+$/g, "")) {
          if (!data.id) {
            let virtualNode = node.parent;
            let params = {
              name: this.edit_name,
              id: virtualNode.data.id,
            };
            await this.$emit(
              "add",
              {
                prof_id: this.treeData[0].prof_id,
                name: params.name,
                up_id: this.id || params.id,
              },
              (res) => {
                params.id = res.up_id;
                this.id = res.id;
                node.parent.data.id = res.id;
                let addChild = addItem(this.treeData, res);
                // 如果是用的真api,需要在添加的接口返回添加的节点
                // 添加成功后，将返回的节点加入数据中，然后删除掉没有id的假节点
                virtualNode.data.child.forEach((item, i) => {
                  if (!item.id) {
                    virtualNode.data.child.splice(i, 1);
                  }
                });
                this.isEdit = false;
                this.select_id = null;
                this.select_level = null;
              }
            );
            return;
          }

          let params = {
            name: this.edit_name,
            id: data.id,
          };

          this.$emit("modify", {
            id: data.id,
            prof_id: data.prof_id,
            name: params.name,
            up_id: node.parent.data.id,
          });

          updateItem(this.treeData, params);
          this.isEdit = false;
          this.select_id = null;
          this.select_level = null;
        }
      },

      close(data, node, e) {
        e = event || window.event;
        e.stopPropagation();
        if (!data.id) {
          node.parent.data.child.forEach((item, i) => {
            if (!item.id) {
              node.parent.data.child.splice(i, 1);
            }
          });
        }
        this.select_id = null;
        this.select_level = null;
        this.edit_name = data.name;
        this.isEdit = false;
      },

      nameChange(e) {
        e = event || window.event;
        e.stopPropagation();
        this.edit_name = e.target.value;
      },

      isSelect(data) {
        return data.id === this.select_id && data.level === this.select_level;
      },

      renderContent(h, { node, data }) {
        return (
          <span class="ly-tree-node">
            {(this.isEdit === true && this.isSelect(data)) || data.isEdit ? (
              <input
                placeholder="名称不能为空"
                class="ly-edit__text"
                on-keyup={() => this.nameChange()}
                value={this.edit_name}
              />
            ) : (
              <span>{data.name}</span>
            )}
            {(this.isEdit === true && this.isSelect(data)) || data.isEdit
              ? getEditContent.call(this, h, data, node)
              : getDefaultContent.call(this, h, data, node)}
          </span>
        );
      },
    },
  };
</script>
