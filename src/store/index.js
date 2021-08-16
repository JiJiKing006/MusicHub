import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 音乐的地址
    // 刷新之后播放器保留上一首
    musicUrl: sessionStorage.getItem("musicUrl"),
    // 将正在播放歌曲名存入seesion
    musicName: sessionStorage.getItem("musicName"),

    // 登入的相关信息
    login: {
      id: 0,
      avatarUrl: "",
      nickName: "",
    },
  },
  mutations: {
    // 播放歌曲，直接commit
    PLAY(state, songMsg) {
      const id = songMsg[0];
      // 播放歌曲
      axios({
        url: "https://autumnfish.cn/song/url",
        params: { id },
      }).then(({ data: { data } }) => {
        console.log(data);
        if (data[0].url) {
          // 将正在播放歌曲名存入seesion
          sessionStorage.setItem("musicName", songMsg[1]);
          // 播放歌曲后，将网页标题改成歌曲名
          state.musicName = songMsg[1];

          // 刷新之后播放器保留上一首
          sessionStorage.setItem("musicUrl", data[0].url);
          state.musicUrl = data[0].url;
        } else {
          this.$message.error("听不了，真的");
        }
      });
    },
  },
  actions: {},
  modules: {},
});
