<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    // 1.创建scroll实例
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      pullUpLoad: this.pullUpLoad,
      click: true,
      probeType: this.probeType
    });
    // 2.实时监听位置
    this.scroll.on('scroll',position => {
      this.$emit('scroll', position);
    })
    // 3.上拉加载数据
    this.scroll.on('pullingUp',() => {
      this.$emit('pullingUp');
    })
  }
};
</script>
<style scoped></style>
