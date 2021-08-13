<template>
  <div class="song_container">
    <div class="listClass">
      <ul>
        <li
          :class="{ active: tag == '全部' }"
          @click="
            tag = '全部';
            typeId = 0;
          "
        >
          全部
        </li>
        <li
          :class="{ active: tag == '欧美' }"
          @click="
            tag = '欧美';
            typeId = 96;
          "
        >
          欧美
        </li>
        <li
          :class="{ active: tag == '华语' }"
          @click="
            tag = '华语';
            typeId = 7;
          "
        >
          华语
        </li>
        <li
          :class="{ active: tag == '日本' }"
          @click="
            tag = '日本';
            typeId = 8;
          "
        >
          日本
        </li>
        <li
          :class="{ active: tag == '韩国' }"
          @click="
            tag = '韩国';
            typeId = 16;
          "
        >
          韩国
        </li>
      </ul>
    </div>
    <table>
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr class="T_row" v-for="(song, index) in songMsg" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="songImg">
              <img :src="song.album.picUrl" /><span
                class="el-icon-video-play iconPlay"
                @click="player(song.id)"
              ></span>
            </div>
          </td>
          <td>{{ song.name }}</td>
          <td>{{ song.artists[0].name }}</td>
          <td>{{ song.album.name }}</td>
          <td>{{ song.duration | formatDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Songs",

  data() {
    return {
      // 点击标签高亮显示
      tag: "全部",

      // 歌曲类型编号
      typeId: 0,
      //歌曲相关信息
      songMsg: [],
    };
  },
  watch: {
    tag: {
      immediate: true,
      handler() {
        this.getSong();
      },
    },
  },
  methods: {
    getSong() {
      axios({
        url: "https://autumnfish.cn/top/song",
        params: {
          type: this.typeId,
        },
      }).then(({ data: { data } }) => {
        // 获取歌曲信息
        this.songMsg = data.slice(0, 10);
      });
    },
    player(id) {
      // 播放歌曲
      axios({
        url: "https://autumnfish.cn/song/url",
        params: {
          id,
        },
      }).then(({ data: { data } }) => {
        if (data[0].url) {
          this.$store.state.musicUrl = data[0].url;
        } else {
          this.$message.error("就是不给听");
        }
      });
    },
  },
  filters: {
    formatDate(val) {
      const all = val / 1000;
      const m = (parseInt(all / 60) + "").padStart(2, "0");
      const s = (parseInt(all % 60) + "").padStart(2, "0");
      return m + ":" + s;
    },
  },
};
</script>
