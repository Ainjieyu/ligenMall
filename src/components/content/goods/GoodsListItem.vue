<template>
  <div class="goods-parent">
    <div class="goods-item" v-for="item in goodsItem" :key="item.id">
      <img    :src="item.show.img" alt="" />
      <div class="goods-info">
        <p>{{item.title}}</p>
        <span class="price">{{item.price}}</span>
        <span class="collect">{{item.cfav}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style scoped>
.goods-parent{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 49%;
    
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }</style>
