<template>
  <div class="cv-checkbox-group">
    <template v-for="option in options">
      <cv-checkbox @input="onCheck(option)" :value="checked.indexOf(option) !== -1" :label="option"
                   :disabled="disabled.indexOf(option) !== -1"></cv-checkbox>
    </template>
  </div>
</template>

<script>
  import cvCheckbox from './cv-checkBox.vue'

  export default {
    name: 'checkBoxGroup',
    components: {
      cvCheckbox
    },
    props: {
      options: {
        type: Array,
        require: true
      },
      value: {
        type: Array,
        require: true
      },
      disabled: {
        type: Array,
        'default': () => []
      }
    },
    data () {
      return {
        checked: [],
        id: Math.random().toString().slice(2)
      }
    },
    watch: {
      value () {
        this.checked = this.value
      }
    },
    methods: {
      onCheck (option) {
        let index = this.checked.indexOf(option)
        if (index !== -1) {
          this.checked.splice(index, 1)
        } else {
          this.checked.push(option)
        }

        this.$emit('input', this.checked)
      }
    },
    beforeMount () {
      this.checked = this.value
    }
  }
</script>
