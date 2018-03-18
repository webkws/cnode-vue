<template>
  <div id="home">
    <Bott/>
  </div>
</template>

<script>
import Bott from './common/Footer'
export default {
  name: 'msg',
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
