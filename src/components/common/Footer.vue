<template>
  <div id="bott">
     <mu-paper>
        <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
            <mu-bottom-nav-item to="/" value="home" title="首页" icon="home"/>            
            <mu-bottom-nav-item to="/publish" value="msg" title="发布" icon="subject"/>  
            <mu-bottom-nav-item to="/msg" value="publish" title="消息" icon="message"/>          
            <mu-bottom-nav-item to="/person" value="person" title="我的" icon="person"/>
        </mu-bottom-nav>
    </mu-paper>
  </div>
</template>

<script>
export default {
  name: 'bott',
  data () {
    return {
      msg: '',
      bottomNav:'home'
    }
  },
  watch:{
    '$route':'fetchData'
  },
  methods:{
    handleChange (val) {
        this.bottomNav = val
    },
    fetchData(){
       
    }
  }
}
</script>
<style lang="scss" scoped>
#bott > *{
  position:fixed;bottom:0;width:100%;
}
</style>


