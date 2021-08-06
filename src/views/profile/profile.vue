<template>
<div>
  <scroll class="content">
<h2>我的</h2>
  </scroll>
</div>
  
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
export default {
  name: "profile",
  components: {
    Scroll
  }
};
</script>

<style scoped>
.content{
  /* background: red; */
  height: 300px;
  overflow: hidden;
  text-align: center;
  margin-top: 10px;
}
</style>
