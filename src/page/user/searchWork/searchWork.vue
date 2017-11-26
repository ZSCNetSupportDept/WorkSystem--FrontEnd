<template>
  <div class="search-work">
    <div class="detail">
      <div class="detail__title">
        <h2>查询条件</h2>
      </div><!-- / detail__title -->
      <div class="detail__content">
        <label for="searchdate">查询日期</label>
        <input v-model="searchDate" type="date" id="searchdate">

        <buttons value="查询" :click="submit"></buttons>
      </div><!-- / detail__content -->
    </div>

    <div class="detail day-detail" :class="{ active:isActive }">
      <div class="detail__title">
        <h2>{{ searchDate + '的签到签退情况'}}</h2>
      </div><!-- / detail__title -->
      <div class="detail__content" v-for="item in search">
        <p>{{ item.name + ' ' + item.id }}</p>
        <p>是否签退：{{ item.check ? '是' : '否' }}</p>
        <p>地点：{{ item.check_area }}</p>
        <p>签到时间：{{ item.check_in_time.slice(0, 10) + ' ' + item.check_in_time.slice(11, 16) }}</p>
        <p v-if="item.check">签退时间：{{ item.check_out_time.slice(0, 10) + ' ' + item.check_out_time.slice(11, 16) }}</p>
        <p>是否携带工具包：{{ item.taken_toolkit ? '是' : '否' }}</p>
        <p v-if="item.taken_toolkit">
          工具包缺失情况：{{ (item.toolkit.cable ? '' : '网线,') + (item.toolkit.crimping_Tool ? ''
          : '压线钳,') + (item.toolkit.switch ? '' : '交换机,') + (item.toolkit.crystal_Head ? ''
          : '水晶头,') + (item.toolkit.measuring_line ? '' : '测线器,') + (item.toolkit.port_module ? ''
          : '端口模块,') + (item.toolkit.key ? '' : '钥匙')
          }}</p>
        <p v-if="item.taken_toolkit && item.toolkit.detailed_description">工具包详细：{{ item.toolkit.detailed_description
          }}</p>
      </div><!-- / detail__content -->
    </div><!-- / detail -->
  </div><!-- / search-work -->
</template>

<script>
  import buttons from '../../../components/button.vue'

  export default {
    components: {
      'buttons': buttons
    },
    data () {
      return {
        isActive: false,
        search: [],
        searchDate: new Date().getFullYear() + '-' +
        (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + '-' +
        (new Date().getDate() < 10 ? '0' : '') + new Date().getDate()
      }
    },
    methods: {
      submit () {
        let postData = JSON.stringify({
          model: 1,
          date: this.searchDate
        })
        this.$store.dispatch('POST_SEARCH', postData).then(data => {
          if (data.success) {
            this.search = data.inquire
            this.isActive = true
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
  .day-detail .detail__content {
    border-bottom: 1px solid #f1f1f1;
  }
</style>
