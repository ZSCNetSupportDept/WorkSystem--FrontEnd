<template>
  <div class="today-finish">
    <div class="detail">
      <div class="detail-title">
        <h2>查询条件</h2>
      </div><!-- / detail-title -->
      <div class="detail-content">
        <select-box v-model="choosePlace" :options="placeOptions" :default="0"></select-box>

        <buttons value="查询" :click="submit"></buttons>
      </div><!-- / detail-title -->
    </div>

    <template v-for="task in search">
      <task :task="task"></task>
    </template>
  </div><!-- / today-finish -->
</template>

<script>
  import task from '../views/task.vue'
  import selectBox from '../views/selectBox.vue'
  import buttons from '../views/button.vue'

  export default {
    components: {
      'task': task,
      'selectBox': selectBox,
      'buttons': buttons
    },
    data () {
      return {
        choosePlace: '',
        placeOptions: ['香晖苑', '朝晖苑', '北门', '东门', '岐头', '香山别墅', '凤翔'],
        search: []
      }
    },
    methods: {
      submit () {
        let postData = JSON.stringify({
          area: this.choosePlace
        })
        this.$store.dispatch('POST_SEARCH_TODAY', postData).then(data => {
          if (data.success) {
            this.search = data.today
          } else {
            this.$store.dispatch('openMsg', '服务器出问题了')
          }

          this.$store.dispatch('endLoading')
        })
      }
    }
  }
</script>

<style scoped>
  .record {
    padding: .5rem 0;
    border-bottom: 1px solid #e6e6e6;
  }

  .record p {
    margin: .2rem !important;
  }
</style>
