<template>
  <div class="ploygon">
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>

    <el-button type="text" @click="open"
      ><!-- 点击打开 Message Box -->点击新建/修改项目</el-button
    >
    <li class="mingcheng" v-for="i in list" :key="i">
      <div>{{ i }}</div>
      <button @click="del(i)">删除</button>
    </li>

    <DrawPolygons></DrawPolygons>
  </div>
</template>

<script>
import DrawPolygons from "./DrawPolygon/DrawPolygons";
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    open() {
      this.$prompt("请输入名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: "邮箱格式不正确",
      })
        .then(({ value }) => {
          /* this.$message({
            type: "success",
            message: "你的项目名称是: " + value,
          }); */
          // this.list = value;
          // this.list.push(value)
          if (this.list.indexOf(value) == -1) {
            this.list.push(value);
            this.$message({
              type: "success",
              message: "你的项目名称是: " + value,
            });
          } else {
            alert("名称已存在，请换一个名称");
            // type:"error"
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    del(todo){
      const index = this.list.findIndex(i => i.id == todo.id)
      this.list.splice(index,1)
    }

    /* open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    }, */
  },

  components: {
    DrawPolygons,
  },
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
  /* &:last-child {
    margin-bottom: 0;
  } */
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>