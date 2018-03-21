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
#app{
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
