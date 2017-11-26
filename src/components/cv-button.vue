<template>
  <button class="cv-button" :disabled="disabled" @click="click">{{ label }}</button>
</template>

<script>
  export default {
    name: 'cv-button',
    props: {
      click: {
        type: Function,
        'default': () => {}
      },
      label: {
        type: [String, Number],
        required: true
      },
      disabled: {
        type: Boolean,
        'default': false
      }
    }
  }
</script>
