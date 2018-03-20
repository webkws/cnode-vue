<template>
  <div id="home">    
    <Top/>
    <TabBar/>
    <Bott/>
  </div>
</template>

<script>
import Top from './common/Header'
import TabBar from './common/TabBar'
import Bott from './common/Footer'
export default {
  name: 'home',
  components:{
     Top, Bott, TabBar   
  },
  data () {
    return {
      msg: ''
    }
  }
}
</script>

