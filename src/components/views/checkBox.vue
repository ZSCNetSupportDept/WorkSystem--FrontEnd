<template>
  <div :class="{ 'select': checked }">
    <input type="checkbox" v-bind:id="label" v-bind:value="checked"
           v-on:change="onCheck"/>
    <label v-bind:for="label"><span></span>{{ label }}</label>
  </div>
</template>

<script>
  export default {
    name: 'checkBox',
    mounted () {
      this.checked = this.check
    },
    props: [
      'check',
      'label'
    ],
    data () {
      return {
        checked: false
      }
    },
    methods: {
      onCheck () {
        this.checked = !this.checked

        this.$emit('input', this.checked)
      }
    }
  }
</script>

<style scoped>
  div {
    text-align: left;
  }

  input {
    display: none;
  }

  label {
    position: relative;
    display: inline-block;
    font-size: 1rem;
  }

  label span {
    position: relative;
    display: inline-block;
    width:2.9rem;
    height: 1.6rem;
    margin-right: .5rem;
    background-color: #cacaca;
    vertical-align: middle;
  }

  label span::before {
    position: absolute;
    top: .3rem;
    left: .4rem;
    display: block;
    width: 1rem;
    height: 1rem;
    background-color: #fff;
    transition: .1s linear;
    content: '';
  }

  .select span {
    background-color: #0079b7;
  }

  .select label span::before {
    left: 1.5rem;
  }

</style>
