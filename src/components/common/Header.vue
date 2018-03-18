<template>
  <div id="top">
    <mu-appbar class="title">
        <mu-icon-button slot="left">
            <img src="@/assets/cnodejs_light.svg">
        </mu-icon-button>        
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
      msg: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.title{
    text-align: center;
    img{
        width: 10rem;
    }
}
</style>
