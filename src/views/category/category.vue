<template>
  <div class="wrapper">
    <h2>分类</h2>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "category",
  methods: {
    aa() {
      console.log("aaa");
    }
  },
  mounted() {
    const bs = new BScroll(".wrapper", {
      movable: true,
      zoom: true,
      probeType: 3,
      pullUpLoad: true
    });

    bs.on("scroll", position => {
      // console.log(position);
    });
    bs.on("pullingUp", () => {
      console.log("上拉加载更多");
    });
  }
};
</script>

<style scoped>
.wrapper {
  height: 150px;
  /* background: red; */
  text-align: center;
  margin-top: 10px;
  overflow: hidden;
}
</style>
