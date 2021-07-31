<template>
 <tabbar>
    <tabBarItem path="/home" activeColor='red'>
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-text" >首页</div>  
    </tabBarItem>
    <tabBarItem path="/category" >
       <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
       <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-text" >分类</div>  
    </tabBarItem>
    <tabBarItem path="/cart" >
       <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
       <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
      <div slot="item-text" >购物车</div>  
    </tabBarItem>
    <tabBarItem path="/profile" >
       <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
       <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="item-text" >我的</div>  </tabBarItem>      
  </tabbar>
</template>

<script>
import tabbar from 'components/common/tabbar/tabbar.vue'
import tabBarItem from 'components/common/tabbar/TabBarItem.vue'
export default {
  name: 'MainTabBar',
  components:{
    tabbar,tabBarItem
  }
}
</script>

<style>

</style>
