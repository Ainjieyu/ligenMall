<template>
<div class="check-button" :class="{active:isChecked}">
  <img src="~assets/img/cart/tick.svg" alt="">
</div>
</template>
<script>
export default {
  name: "CheckButton",
  props:{
    isChecked:{
      type:Boolean,
      default:true
    }
  }, 
  components:{
  },
  data () {
    return {
    };
  }
}
</script>
<style scoped>
.check-button{

  border-radius: 50%;
  border: 2px solid #aaa;
}
.active{
  background: pink;
  border-color: pink;
}
</style>