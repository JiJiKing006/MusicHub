<template>
  <div class="top">
    <div class="logo">
      Music
      <span>Hub</span>
    </div>
    <div class="histroy">
      <span class="el-icon-arrow-left" @click="back"></span>
      <span class="el-icon-arrow-right" @click="forward"></span>
    </div>
    <el-input
      type="text"
      class="search"
      v-model="inputVal"
      @keyup.enter.native="toResult"
      @blur="toResult"
      placeholder="请输入歌名或歌手"
      prefix-icon="el-icon-search"
      size="small"
      clearable
    ></el-input>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "Top",
  data() {
    return {
      // 搜索的关键词
      inputVal: sessionStorage.getItem("inputVal"),
    };
  },
  methods: {
    // 前进后退
    back() {
      this.$router.back();
    },
    forward() {
      this.$router.forward();
    },
    toResult() {
      // 非空判断
      if (this.inputVal.trim()) {
        sessionStorage.setItem("inputVal", this.inputVal);
        this.$router.push({
          name: "Result",
          query: {
            // 发送搜索词给result
            title: this.inputVal,
          },
        });
      } else {
        this.$message.warning("请输入信息");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  position: relative;
  min-height: 60px;
  height: 10%;
  display: flex;
  align-items: center;
  background-color: rgb(249, 249, 249);
  .logo {
    margin-left: 10px;
    background-color: rgb(55, 55, 55);
    border-radius: 10px;
    width: 120px;
    height: 50px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 550;
    span {
      background-color: #409eff;
      color: #000;
      border-radius: 10px;
      padding: 5px;
    }
  }
  .histroy {
    position: absolute;
    top: 40%;
    left: 150px;
    span {
      font-size: 20px;
      margin-right: 15px;
      padding: 5px;
      border-radius: 100px;
      background-color: rgb(237, 237, 237);

      &:hover {
        cursor: pointer;
        background-color: #ccc;
      }
    }
  }
  .search {
    position: absolute;
    right: 50px;
    width: 200px;
  }
}
</style>