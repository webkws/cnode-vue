<template>
  <div id="top">
    <mu-appbar class="title">
        <div class="svg-title">
          <img src="@/assets/cnodejs_light.svg">
        </div>     
        <mu-icon-menu icon="expand_more" slot="right">
          <mu-menu-item title="主题"/>
          <mu-menu-item title="回复"/>
          <mu-menu-item title="收藏"/>
          <mu-menu-item title="退出"/>
        </mu-icon-menu>
    </mu-appbar>
  </div>
</template>

<script>
export default {
  name: 'top',
  data () {
    return {
      
    }
  }
}
</script>
<style lang="scss">
#top{
  position: fixed;
  width: 100%;
  z-index: 1000;
  top:0;left: 0;right: 0;
  text-align: center;
}
.svg-title{  
  width:10rem;padding-top: 1rem;
}
</style>
