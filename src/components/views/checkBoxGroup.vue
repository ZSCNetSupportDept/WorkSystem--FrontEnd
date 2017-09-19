<template>
  <div>
    <div v-for="source in sources" :class="{ 'select': checked.indexOf(source)!==-1 }">
      <input type="checkbox" v-bind:id="source" v-bind:value="source"
             v-on:change="onCheck(source)"/>
      <label v-bind:for="source"><span></span>{{ source }}</label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'checkBoxGroup',
    props: [
      'sources'
    ],
    data () {
      return {
        checked: []
      }
    },
    methods: {
      onCheck (source) {
        if (this.checked.indexOf(source) !== -1) {
          this.checked.splice(this.checked.indexOf(source), 1)
        } else {
          this.checked.push(source)
        }

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
    margin: .2rem 0;
    font-size: 1rem;
  }

  label span {
    position: relative;
    display: inline-block;
    width: 2.9rem;
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
