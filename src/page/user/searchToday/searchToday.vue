<template>
  <div class="today-finish">
    <div class="detail">
      <div class="detail__title">
        <h2>查询条件</h2>
      </div><!-- / detail__title -->
      <div class="detail__content">
        <cv-select v-model="choosePlace" :options="placeOptions"></cv-select>

        <cv-button label="查询" :click="submit"></cv-button>
      </div><!-- / detail__title -->
    </div>

    <template v-for="task in search">
      <task :task="task"></task>
    </template>
  </div><!-- / today-finish -->
</template>

<script>
  import task from '@/components/task.vue'
  import cvSelect from '@/components/cv-select.vue'
  import cvButton from '@/components/cv-button.vue'

  export default {
    components: {
      task,
      cvSelect,
      cvButton
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
