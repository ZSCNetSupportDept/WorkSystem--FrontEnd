<template>
  <input type="button" :value="value" @click="click"/>
</template>

<script>
  export default {
    name: 'buttons',
    props: [
      'click',
      'value'
    ]
  }
</script>

<style scoped>

  input {
    display: block;
    width: 100%;
    margin: 10px auto;
    padding: .5rem;
    color: #fff;
    background-color: #44d97a;
  }

</style>
