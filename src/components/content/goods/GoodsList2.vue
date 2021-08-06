<template>
  <div class="goods-list">
    <goods-list-item2
      class="item"
      v-for="item in goods"
      :key="item.id"
      :goods-item="item"
    />
  </div>
</template>
<script>
import GoodsListItem2 from "./GoodsListItem2.vue";

export default {
  name: "GoodsList2",
  components: {
    GoodsListItem2
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}

.goods-list .item {
  padding-bottom: 40px;
  position: relative;
  width: 49%;
}
</style>
