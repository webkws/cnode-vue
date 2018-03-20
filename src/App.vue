<template>
  <div id="app">        
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
  @import './assets/common.scss';
  html{
  font-size: 10px;font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;background-color:#f8f8f8;
  -webkit-overflow-scrolling : touch;
  }
  
::-webkit-scrollbar {
    width: 2px;
    height: 2px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,.1);
}

</style>
