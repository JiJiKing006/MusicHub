import Vue from "vue";
import VueRouter from "vue-router";
// 引入相关路由组件
// import Login from "../views/Login.vue"
import Discover from "../views/Discover.vue";
import Recommend from "../views/Recommend.vue";
import Songs from "../views/Songs.vue";
import Mv from "../views/Mv.vue";
import Result from "../views/Result.vue";
import SongList from "../views/SongList.vue";
import MvList from "../views/MvList.vue";

//解决重复点击路由报错bug'
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  // 默认页面
  { path: "/", redirect: "/discover" },
  {
    path: "/discover",
    name: "Discover",
    component: Discover,
  },
  {
    path: "/recommend",
    name: "Recommend",
    component: Recommend,
  },
  {
    path: "/songs",
    name: "Songs",
    component: Songs,
  },
  {
    path: "/mv",
    name: "Mv",
    component: Mv,
  },
  {
    path: "/result",
    name: "Result",
    component: Result,
  },
  { path: "/songlist", name: "SongList", component: SongList },
  { path: "/mvlist", name: "MvList", component: MvList },
];

export default new VueRouter({
  routes,
});
