<template>
  <div class="cv-select" :class="{ 'cv-select--disabled': disabled, 'cv-select--selecting': isSelecting }">
    <input type="text" autocomplete="off" readonly="readonly" :value="select" class="cv-select__input"
           @click="toggleList">
    <div class="cv-select-dropdown__wrap">
      <ul class="cv-select-dropdown__list">
        <li v-for="option in options" class="cv-select-dropdown__item"
            :class="{ 'cv-select-dropdown__item--select': option === select,
                      'cv-select-dropdown__item--disabled': disabledOptions.indexOf(option) !== -1 }"
            @click="onClick(option)">{{ option }}
        </li>
      </ul>
    </div>
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
        select: '',
        isSelecting: false
      }
    },
    watch: {
      value () {
        this.select = this.value
      }
    },
    methods: {
      onClick (option) {
        if (this.disabled || this.disabledOptions.indexOf(option) !== -1) {
          return
        }
        this.select = this.select === option ? '' : option
        this.isSelecting = false
        this.$emit('input', this.select)
      },
      toggleList () {
        if (this.disabled) {
          return
        }
        this.isSelecting = !this.isSelecting
      }
    }
  }
</script>
