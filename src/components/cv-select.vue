<template>
  <div class="cv-select" :class="{ 'cv-select--disabled': disabled }">
    <select v-model="select" v-on:change="onCheck" :disabled="disabled">
      <option v-for="option in options" :disabled="disabledOptions.indexOf(option) !== -1">{{ option }}</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'cvSelect',
    beforeMount () {
      this.select = this.value
    },
    props: {
      options: {
        type: Array,
        require: true
      },
      value: {
        type: String,
        require: true
      },
      disabled: {
        type: Boolean,
        'default': false
      },
      disabledOptions: {
        type: Array,
        'default': () => []
      }
    },
    data () {
      return {
        select: ''
      }
    },
    watch: {
      value () {
        this.select = this.value
      }
    },
    methods: {
      onCheck () {
        this.$emit('input', this.select)
      }
    }
  }
</script>
