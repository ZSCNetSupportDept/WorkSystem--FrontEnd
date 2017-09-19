<template>
  <div class="registerwork">
    <div v-if="registerStatus===0">
      <div class="detail">
        <div class="detail-title">
          <h2>蹭班申请</h2>
        </div><!-- / detail-title -->
        <div class="detail-content">
          <select-box v-model="registerDay" :options="dayOptions" label="蹭班日期"></select-box>
        </div><!-- / detail-content -->
      </div><!-- / detail -->

      <buttons value="提交申请" :click="submit"></buttons>
    </div><!-- / 未申请 -->

    <div v-else-if="registerStatus===1">
      <div class="detail">
        <div class="detail-title">
          <h2>蹭班申请</h2>
        </div><!-- / detail-title -->
        <div class="detail-content">
          <p>你的蹭班申请已通过，请于{{ registerDay }}准时前往{{ passPlace }}值班</p>
        </div><!-- / detail-content -->
      </div><!-- / detail -->
      <div class="detail">
        <div class="detail-title">
          <h2>蹭班申请</h2>
        </div><!-- / detail-title -->
        <div class="detail-content">
          <select-box v-model="registerDay" :options="dayOptions" label="蹭班日期"></select-box>
        </div><!-- / detail-content -->

        <buttons value="提交申请" :click="submit"></buttons>
      </div><!-- / detail -->
    </div><!-- / 申请通过 -->

    <div v-else-if="registerStatus===2">
      <div class="detail">
        <div class="detail-title">
          <h2>蹭班申请</h2>
        </div><!-- / detail-title -->
        <div class="detail-content">
          <p>你对于{{ registerDay }}的蹭班申请由于某些原因未通过，请见谅</p>
          <p>组长回复：{{ whyReject }}</p>
        </div><!-- / detail-content -->
      </div><!-- / detail -->
      <div class="detail">
        <div class="detail-title">
          <h2>蹭班申请</h2>
        </div><!-- / detail-title -->
        <div class="detail-content">
          <select-box v-model="registerDay" :options="dayOptions" label="蹭班日期"></select-box>
        </div><!-- / detail-content -->

        <buttons value="提交申请" :click="submit"></buttons>
      </div><!-- / detail -->
    </div><!-- / 申请未通过 -->

    <div v-else-if="registerStatus===3">
      <div class="detail">
        <div class="detail-title">
          <h2>蹭班申请</h2>
        </div><!-- / detail-title -->
        <div class="detail-content">
          <p>你对于{{ registerDay }}的蹭班申请尚在申请中，请耐心等待</p>
        </div><!-- / detail-content -->
      </div><!-- / detail -->
    </div><!-- / 申请未处理 -->
  </div><!-- / registerwork -->
</template>

<script>
  import selectBox from '../views/selectBox.vue'
  import buttons from '../views/button.vue'

  export default {
    components: {
      'selectBox': selectBox,
      'buttons': buttons
    },
    mounted () {
      this.fetchData()
    },
    data () {
      return {
        registerStatus: 0,
        passPlace: '',
        whyReject: '',
        registerDay: ''
      }
    },
    computed: {
      dayOptions: {
        get () {
          let date1 = new Date()
          let temp = new Date().getTime() + 86400000
          let date2 = new Date(temp)
          return [date1.getFullYear() + '-' + (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1) + '-' + (date1.getDate() < 10 ? '0' : '') + date1.getDate(),
            date2.getFullYear() + '-' + (date2.getMonth() + 1 < 10 ? '0' + (date2.getMonth() + 1) : date2.getMonth() + 1) + '-' + (date2.getDate() < 10 ? '0' : '') + date2.getDate()]
        }
      }
    },
    methods: {
      fetchData () {
        this.$store.dispatch('FETCH_PERSON_EXTRA_WORK').then(data => {
          if (data.states === '') {
            // 从未申请过蹭班
            this.registerStatus = 0
            this.registerDay = this.dayOptions[0]
          } else if ((this.dayOptions[0] + ':16.30') > data.registerDay) {
            // 获取到的数据已过期
            this.registerStatus = 0
            this.registerDay = this.dayOptions[0]
          } else {
            // 获取到的数据未过期
            if (data.states === 0) {
              this.registerStatus = 3
            } else {
              this.registerStatus = data.states
            }
            this.registerDay = data.registerDay
            this.passPlace = data.passPlace
            this.whyReject = data.whyReject
          }

          this.$store.dispatch('endLoading')
        })
      },
      submit () {
        let postData = JSON.stringify({
          date: this.registerDay
        })
        this.$store.dispatch('POST_SIGN_WORK', postData).then(data => {
          if (data.error === 'had extra_work') {
            this.$store.dispatch('openMsg', '已经有蹭班申请')
          } else if (data.error === 'time error') {
            this.$store.dispatch('openMsg', '提交的时间错误')
          } else if (data.success) {
            this.$store.dispatch('openMsg', '申请成功')
            this.fetchData()
          } else {
            this.$store.dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
          }

          this.$store.dispatch('endLoading')
        })
      }
    }
  }
</script>

<style scoped>

</style>
