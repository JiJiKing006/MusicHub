<template>
  <div class="index">
    <!-- 左侧导航区域 -->
    <nav>
      <ul>
        <router-link to="/discover" active-class="active" tag="li"
          ><i class="el-icon-house"></i>发现音乐</router-link
        >
        <router-link to="/recommend" active-class="active" tag="li"
          ><i class="el-icon-folder-checked"></i>推荐歌单</router-link
        >
        <router-link to="/songs" active-class="active" tag="li"
          ><i class="el-icon-headset"></i>最新音乐</router-link
        >
        <router-link to="/mv" active-class="active" tag="li"
          ><i class="el-icon-video-play"></i>最新M V</router-link
        >
      </ul>
    </nav>
    <!-- 右侧容器 -->
    <div class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!-- 播放器 -->
    <audio
      @pause="pause"
      @play="play"
      :src="this.$store.state.musicUrl"
      controls
      style="width: 100%"
      autoplay
    ></audio>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {};
  },
  watch: {},
  methods: {
    pause() {
      document.title = "MusicHub";
    },
    play() {
      document.title = `▶ ${this.$store.state.musicName}`;
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  display: flex;
  height: 90%;
  nav {
    width: 200px;
    min-width: 200px;
    height: 90%;
    background-color: rgb(238, 237, 239);
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 55px;
      font-size: 18px;
      text-align: center;
      cursor: pointer;
      i {
        font-size: 18px;
        margin-right: 10px;
      }
      &:hover {
        background: rgb(213, 213, 213);
      }
    }
    .active {
      color: #409eff;
    }
  }
  .main {
    width: 80%;
    min-width: 1000px;

    height: 90%;
    overflow: auto;
    margin: 0 auto;
  }
  audio {
    position: fixed;
    bottom: 0;
  }
}
</style>