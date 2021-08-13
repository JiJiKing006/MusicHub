<template>
  <div class="result">
    <h1>
      {{ $route.query.title
      }}<span class="count">共找到 {{ total || "若干" }} 结果</span>
    </h1>
    <div class="musicBox">
      <el-tabs v-model="activeName">
        <!-- 搜索歌曲结果 -->
        <el-tab-pane label="歌曲" name="song">
          <table>
            <thead>
              <th></th>
              <th>音乐标题</th>
              <th>歌手</th>
              <th>专辑</th>
              <th>时长</th>
            </thead>
            <tbody>
              <tr class="T_row" v-for="(song, index) in songs" :key="index">
                <td>{{ index + 1 }}</td>
                <td>
                  <el-link type="info" @click.native="play(song.id)">{{
                    song.name
                  }}</el-link>
                  <!-- 点击mv图案跳转到mv详情页 -->
                  <span
                    v-if="song.mvid != 0"
                    class="pointer mv el-icon-video-camera"
                    @click="toMvList(song.mvid, song.artists[0].id)"
                  ></span>
                </td>
                <!-- @click="play(song.id)" -->
                <td>{{ song.artists[0].name }}</td>
                <td>《{{ song.album.name }}》</td>
                <td>{{ song.duration | formatDate }}</td>
              </tr>
            </tbody>
          </table>
        </el-tab-pane>
        <!-- 搜索歌单结果 -->
        <el-tab-pane label="歌单" name="songList">
          <div class="song_wrap">
            <!-- 点击歌单传id 同时跳转歌单详细路由 -->
            <div
              class="song_box pointer"
              v-for="(item, index) in playlists"
              @click="toSongList(item.id)"
              :key="index"
            >
              <div class="song_boxImg pointer">
                <p>播放量:{{ item.playCount }}</p>
                <img :src="item.coverImgUrl" />
              </div>
              <p class="song_boxTitle">{{ item.name }}</p>
            </div>
          </div>
        </el-tab-pane>
        <!-- 搜索MV结果 -->
        <el-tab-pane label="MV" name="Mv">
          <div class="mv_wrap">
            <div class="mvBox" v-for="(mv, index) in mvList" :key="index">
              <div class="mvBox_Img">
                <img :src="mv.cover" alt="" />
                <i class="el-icon-caret-right">{{
                  mv.playCount > 100000 ? "10w+" : mv.playCount
                }}</i>
                <!-- 点击播放按钮跳转mv详情 -->
                <span
                  class="el-icon-video-play iconPlay"
                  @click="toMvList(mv.id, mv.artistId)"
                ></span>
                <span class="time">{{ mv.duration | formatDate }}</span>
              </div>
              <div class="mvBox_Msg">
                <p>{{ mv.name }}</p>
                <p>{{ mv.artistName }}</p>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 分页器 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="page"
        :total="total"
        @current-change="update"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Result",

  data() {
    return {
      searchVal: this.$route.query.title,
      activeName: "song",
      // 搜索的类型
      type: 1,
      limit: 10,

      // 当前页数
      page: 1,
      // 总页数
      total: 0,

      // ----------歌曲数据开始

      // 存放歌曲
      songs: [],
      // 判断是否有mv
      mvid: 0,

      // ----------歌曲数据结束

      // 歌单数据--------------
      playlists: [],

      // mv数据---------
      mvList: [],
    };
  },
  // 时长格式化
  filters: {
    formatDate(val) {
      const all = val / 1000;
      const m = (parseInt(all / 60) + "").padStart(2, "0");
      const s = (parseInt(all % 60) + "").padStart(2, "0");
      return m + ":" + s;
    },
  },

  watch: {
    // 监视搜索词变化 变化触发搜索
    "$route.query.title": {
      // 首次搜索
      immediate: true,
      handler() {
        this.page = 1;
        this.search();
      },
    },
    activeName: {
      // 根据选中类型来改变type，重新触发类型搜索
      handler(val) {
        if (val == "song") {
          this.type = 1;
        } else if (val == "songList") {
          this.type = 1000;
        } else {
          this.type = 1004;
        }
        this.search();
      },
    },
  },
  methods: {
    search() {
      // 搜索歌曲
      axios({
        url: "https://autumnfish.cn/search",
        params: {
          keywords: this.$route.query.title,
          limit: this.limit,
          type: this.type,
          offset: (this.page - 1) * 10,
        },
      }).then(({ data: { result } }) => {
        // console.log(result);
        // ---------------歌曲调用-------
        if (this.type == 1) {
          // 符合要求歌曲列表
          this.songs = result.songs;
          // 判断歌曲有无mv
          this.mvid = result.mvid;
          if (result.songCount) {
            // 符合要求的歌曲数量
            this.total = result.songCount;
          } else {
            // 关键词模糊默认给300条结果
            this.total = 300;
          }
        } else if (this.type == 1000) {
          // ---------------歌单调用
          this.playlists = result.playlists;
          this.total = result.playlistCount;
        } else {
          // mv-------------调用
          this.mvList = result.mvs;
          this.total = result.mvCount;
        }
      });
    },

    // -------------歌曲事件开始
    play(id) {
      // 播放歌曲
      axios({
        url: "https://autumnfish.cn/song/url",
        params: { id },
      }).then(({ data }) => {
        if (data.data[0].url) {
          this.$store.state.musicUrl = data.data[0].url;
        } else {
          this.$message.error("听不了，真的");
        }
      });
    },
    // 分页页码变化触发搜索
    update(cur) {
      this.page = cur;
      this.search();
    },
    // -------------歌曲事件结束

    // 点击歌单。拿到id传给歌单组件
    toSongList(id) {
      this.$router.push({
        path: "/songlist",
        query: {
          id,
        },
      });
    },
    // 跳转mv详情路由 并且传id
    toMvList(id, artistId) {
      this.$router.push({
        path: "/mvlist",
        query: {
          id,
          artistId,
        },
      });
    },
  },
};
</script>
   
<style lang="less"  scoped>
.result {
  span.count {
    font-size: 14px;
    margin-left: 10px;
    color: #ccc;
  }
  .musicBox {
    margin-top: 30px;
  }
}

// 歌曲列表的css
th:nth-child(1) {
  width: 50px;
}
th:nth-child(2) {
  width: 300px;
}
th:nth-child(3) {
  width: 200px;
}

th:nth-child(4) {
  width: 300px;
}
.T_row td:nth-child(2) {
  position: relative;
  .el-link {
    font-size: 18px;
  }
  span.mv {
    position: absolute;
    color: red;
    font-size: 13px;
    top: 15px;
  }
}
</style>