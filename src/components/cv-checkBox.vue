<template>
  <div class="cv-checkbox" :class="{ 'cv-checkbox--select': checked }">
    <input type="checkbox" :id="this.label + id" :value="checked" @click="onCheck"
           :disabled="disabled" :checked="checked">
    <label v-bind:for="this.label + id">{{ label }}</label>
  </div>
</template>

<script>
  export default {
    name: 'cv-checkBox',
    beforeMount () {
      this.checked = this.value
    },
    props: {
      value: {
        type: Boolean,
        require: true
      },
      label: {
        type: String,
        require: true
      },
      disabled: {
        type: Boolean,
        'default': false
      }
    },
    data () {
      return {
        checked: null,
        id: Math.random().toString().slice(2)
      }
    },
    watch: {
      value () {
        this.checked = this.value
      }
    },
    computed: {
      isGroup () {
        let parent = this.$parent
        return parent.$options.name === 'checkBoxGroup'
      }
    },
    methods: {
      onCheck () {
        this.checked = !this.checked

        if (this.isGroup) {
          this.$emit('input', this.label)
        } else {
          this.$emit('input', this.checked)
        }
      }
    }
  }
</script>
