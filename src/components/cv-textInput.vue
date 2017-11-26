<template>
  <div class="cv-text-input" :class="{ 'cv-text-input--disabled': disabled }">
    <label v-bind:for="text">{{ label }}</label>
    <template v-if="type === 'text'">
      <input type="text" :disabled="disabled" :placeholder="placeholder" :id="text" :value="text" @input="onInput"/>
    </template>
    <template v-else-if="type === 'password'">
      <input type="password" :disabled="disabled" :placeholder="placeholder" :id="text" :value="text" @input="onInput"/>
    </template>
    <p class="cv-text-input--error" v-show="haserror">{{ errormsg }}</p>
  </div>
</template>

<script>
  export default {
    name: 'cv-textInput',
    props: {
      type: {
        type: String,
        require: true
      },
      value: {
        type: String,
        require: true
      },
      placeholder: {
        type: String
      },
      label: {
        type: String
      },
      haserror: {
        type: Boolean
      },
      errormsg: {
        type: String
      },
      disabled: {
        type: Boolean,
        'default': false
      }
    },
    data () {
      return {
        text: ''
      }
    },
    watch: {
      value () {
        this.text = this.value
      }
    },
    methods: {
      onInput () {
        this.text = event.target.value
        this.$emit('input', this.text)
      }
    },
    beforeMount () {
      this.text = this.value
    }
  }
</script>
