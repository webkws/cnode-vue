<template>
  <div id="home">
    <mu-appbar class="title" title="个人中心"></mu-appbar>

    <Bott/>
  </div>
</template>

<script>
import Bott from './common/Footer'
export default {
  name: 'person',
  components:{
    Bott
  },
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
    text-align: center;
    height: 100%;
}
</style>
