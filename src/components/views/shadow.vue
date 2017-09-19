<template>
  <div class="shadow" :class="{ 'open': isshadow }" @click="click"></div>
</template>

<script>
  export default {
    name: 'shadows',
    props: [
      'isshadow',
      'click'
    ]
  }
</script>

<style scoped>

  .shadow {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(254, 254, 254, 0.25);
    visibility: hidden;
    z-index: 1;
    transition: visibility .3s linear;
  }

  .shadow.open {
    visibility: visible;
  }

</style>
