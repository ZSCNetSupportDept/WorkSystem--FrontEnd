<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  @import "assets/css/cssreset.css";
  @import "assets/css/common.css";

  * {
    box-sizing: border-box;
  }

  body {
    background-color: #f9f9f9;
    font-size: 16px;
  }

  /*body, html {*/
    /*overflow-y: visible;*/
  /*}*/

  #app {
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    overflow-x: hidden;
    /*overflow-y: visible;*/
  }

  input, select, textarea, button {
    -webkit-appearance: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  :focus {
    outline: none;
  }

</style>
