<template>
  <div id="home">
    <Top/>

    <Bott/>
  </div>
</template>

<script>
import Top from './common/Header'
import Bott from './common/Footer'
export default {
  name: 'home',
  components:{
     Top, Bott     
  },
  data () {
    return {
      msg: ''
    }
  }
}
</script>

