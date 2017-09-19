<template>
  <div>
    <label v-bind:for="text">{{ label }}</label>
    <template v-if="type === 'text'">
      <input type="text" :placeholder="placeholder" v-bind:id="text" v-bind:value="text" v-on:input="onInput"/>
    </template>
    <template v-else-if="type === 'password'">
      <input type="password" :placeholder="placeholder" v-bind:id="text" v-bind:value="text" v-on:input="onInput"/>
    </template>
    <p class="error" v-show="haserror">{{ errormsg }}</p>
  </div>
</template>

<script>
  export default {
    name: 'textInput',
    props: [
      'type',
      'placeholder',
      'label',
      'haserror',
      'errormsg',
      'data'
    ],
    data () {
      return {
        text: ''
      }
    },
    watch: {
      data () {
        this.text = this.data
      }
    },
    methods: {
      onInput () {
        this.$emit('input', event.target.value)
      }
    }
  }
</script>

<style scoped>
  input {
    display: block;
    width: 100%;
    margin: .5rem 0;
    padding: .4rem .5rem;
    border: 1px solid #cacaca;
    border-radius: 5px;
    background-color: #fff;
    font-size: 1.2rem;
    box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
    outline: none;
  }

  input:focus {
    outline: 2px solid #93bde8;
  }

  p {
    margin-left: .5rem;
    text-align: left;
    color: #ff3131;
  }
</style>
