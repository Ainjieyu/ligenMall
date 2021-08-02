<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp = "loadMore"
    >
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view></feature-view>
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
// 首页子组件
import HomeSwiper from "./childComps/homeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";
// 公共组件
import GoodsList from "components/content/goods/GoodsList.vue";
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop";
// 网络请求
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    GoodsList,
    NavBar,
    TabControl,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop:false
    };
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2、请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    //1. 网络请求方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp()
      });
    },
    // 2.事件监听方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      this.isShowBackTop = (-position.y) >1000
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background: var(--color-tint);
  color: aliceblue;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 51px;
} */
.content {
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>
