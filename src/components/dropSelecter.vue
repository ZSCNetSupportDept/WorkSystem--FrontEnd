<template>
  <div>
    <p @click="open">{{ selected }}</p>
    <ul :class="{ 'open':isOpen }">
      <li v-for="option in options" v-if="selected!==option" @click="select(option)">{{ option }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'dropSelecter',
    props: {
      options: {
        type: Array,
        require: true
      },
      value: {
        type: String,
        require: true
      }
    },
    beforeMount () {
      this.selected = this.value
    },
    data () {
      return {
        selected: '',
        isOpen: false
      }
    },
    methods: {
      open () {
        this.isOpen = !this.isOpen
      },
      select (option) {
        this.isOpen = false
        this.selected = option
        this.$emit('input', this.selected)
      }
    }
  }
</script>

<style scoped>

  div {
    position: relative;
    font-size: .8em;
    color: #fff;
    background-color: #0079b7;
    text-align: center;
  }

  div p {
    padding: .3rem 0;
  }

  ul {
    position: absolute;
    width: 100%;
    max-height: 0;
    background-color: #0079b7;
    overflow: hidden;
    transition: max-height .3s linear;
  }

  ul.open {
    max-height: 20rem;
  }

  ul li {
    padding: .3rem 0;
  }

</style>
