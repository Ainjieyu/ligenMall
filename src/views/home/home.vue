<template>
<div id="home">
  <nav-bar class="home-nav">
    <div slot="center">购物街</div>
  </nav-bar>
  <home-swiper :banners="banners"/>
  <recommend-view :recommends='recommends' ></recommend-view>
  
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/homeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'

import {getHomeMultidata} from 'network/home'

export default {  
  name: 'home',
  components:{
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data(){
    return{
     banners:[],
     recommends:[]
    }
  },
  created(){
    getHomeMultidata().then(res =>{
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  }
}
</script>

<style>
.home-nav{
  background: var(--color-tint);
  color: aliceblue;
}
</style>