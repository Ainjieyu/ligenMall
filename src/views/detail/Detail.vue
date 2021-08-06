<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImgs" />
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list2 ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />

    <toast :message="message" :show="show" />
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";
import GoodsList2 from "components/content/goods/GoodsList2";
import Toast from "components/common/toast/Toast";

import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail.js";
import { debounce } from "common/utils.js";
import { itemListenerMixin, backTopMixin } from "common/mixin";
import { mapActions } from "vuex";

export default {
  name: "Detail",
  components: {
    Scroll,
    GoodsList2,
    Toast,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar
  },
  data() {
    return {
      iid: "",
      topImgs: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      saveY: 0,
      getThemeTopY: null,
      currentIndex: 0,
      message: "",
      show: false
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    this.iid = this.$route.params.iid;

    getDetail(this.iid).then(res => {
      const data = res.result;
      this.topImgs = data.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      // 5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.取出评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
      // 获取到顶部的距离
    });

    getRecommend().then(res => {
      // console.log(res.data.list)
      this.recommends = res.data.list;
    });

    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];

      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },
  updated() {},
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.$refs.scroll.refresh();

      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -(this.themeTopYs[index] - 44), 300);
    },
    contentScroll(position) {
      const py = -(position.y - 44);
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          py >= this.themeTopYs[i] &&
          py < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 是否显示回到顶部
      this.ShowBackTop(position);
    },
    addToCart() {
      const cartGood = {};
      cartGood.img = this.topImgs[0];
      cartGood.title = this.goods.title;
      cartGood.desc = this.goods.desc;
      cartGood.price = this.goods.realPrice;
      cartGood.iid = this.iid;

      this.addCart(cartGood).then(res => {
        // this.show = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 1500);
        this.$toast.show()
      });

      // this.$store.dispatch("addCart", cartGood).then(res => {
      //   console.log(res);
      // });
    }
  }
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background: #fff;
}
.content {
  height: calc(100% - 95px);
  overflow: hidden;
}
</style>
