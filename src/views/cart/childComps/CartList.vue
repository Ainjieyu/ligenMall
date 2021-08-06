<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :item-info="item"
      />
    </scroll>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll.vue";
import cartListItem from "./cartListItem.vue";

export default {
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"])
  },
  components: {
    Scroll,
    cartListItem
  },
  data() {
    return {};
  },
  activated(){
    this.$refs.scroll.refresh()
  }
};
</script>
<style scoped>
.cart-list {
  height: calc(100%);
}
.content {
  height: 80vh;
  overflow: hidden;
}
</style>
