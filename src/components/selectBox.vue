<template>
  <div>
    <label v-bind:for="label">{{ label }}</label>
    <select v-model="check" v-on:change="onCheck" v-bind:id="label" :disabled="disabled">
      <option v-for="option in options">{{ option }}</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'selectBox',
    mounted () {
      this.check = (this.default && this.default !== -1) ? this.options[this.default] : this.options[0]
      this.onCheck()
    },
    props: [
      'options',
      'default',
      'disabled',
      'label'
    ],
    data () {
      return {
        check: ''
      }
    },
    watch: {
      default () {
        this.check = (this.default && this.default !== -1) ? this.options[this.default] : this.options[0]
      }
    },
    methods: {
      onCheck () {
        this.$emit('input', this.check)
      }
    }
  }
</script>

<style scoped>
  select {
    display: block;
    width: 100%;
    margin: .5rem 0;
    padding: .4rem .5rem;
    border: 1px solid #cacaca;
    border-radius: 5px;
    background-color: #f8f8f8;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='32' height='24' viewBox='0 0 32 24'><polygon points='0,0 32,0 16,24' style='fill: rgb%28138, 138, 138%29'></polygon></svg>");
    background-position: right .5rem center;
    background-size: 9px 6px;
    background-repeat: no-repeat;
    font-size: 1rem;
    box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
    outline: none;
  }

</style>
