<template>
  <div class="search-user">
    <div class="detail">
      <div class="detail-title">
        <h2>查询条件</h2>
      </div><!-- / detail-title -->
      <div class="detail-content">
        <select-box v-model="type" :options="statusOptions" :default="0"></select-box>

        <label for="begin">起始日期</label>
        <input v-model="beginDate" type="date" id="begin" :value="beginDate">
        <label for="end">结束日期</label>
        <input v-model="endDate" type="date" id="end" :value="endDate">

        <buttons value="查询" :click="submit"></buttons>
      </div><!-- / detail-content -->
    </div><!-- / detail -->

    <template v-for="task in search">
      <task :task="task" v-on:dosth="watchTask"></task>
    </template>

    <div class="watchsth" :class="{ 'open': isOpen }">
      <div class="detail">
        <div class="detail-title">{{ '#' + currentTask }}</div><!-- / detail-title -->
        <div class="detail-content">
          <template v-for="task in search" v-if="task.id === currentTask">
            <template v-for="record in task.history">
              <div class="record">
                <p>维修日期：{{ record.time.slice(0, 10) + ' ' + record.time.slice(11, 16) }}</p>
                <p>维修人员：{{ record.name + ' ' + record.work_number }}</p>
                <p>
                  维修状态：{{ record.record[record.record.indexOf('status=') + 7] === '0' ? '未解决'
                  : record.record[record.record.indexOf('status=') + 7] === '1' ? '已解决'
                    : record.record[record.record.indexOf('status=') + 7] === '2' ? '推迟' : '已上报'
                  }}</p>
                <p>
                  维修简述：{{ record.record[0] === 'a' ?
                  record.record.slice(record.record.indexOf('introduction=') + 13, record.record.indexOf('operator='))
                  : record.record.slice(record.record.indexOf('introduction') + 13)
                  }}</p>
              </div><!-- / record -->
            </template>
          </template>
        </div><!-- / detail-content -->
      </div><!-- / detail -->
    </div><!-- / watchsth -->
  </div><!-- / search-user -->
</template>

<script>
  import task from '../views/task.vue'
  import selectBox from '../views/selectBox.vue'
  import buttons from '../views/button.vue'
  import {mapState} from 'vuex'

  export default {
    components: {
      'task': task,
      'selectBox': selectBox,
      'buttons': buttons
    },
    data () {
      return {
        currentTask: '',
        statusOptions: ['全部', '已解决', '推迟', '已上报', '未解决'],
        search: [],
        beginDate: new Date().getFullYear() + '-' +
        (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + '-' +
        (new Date().getDate() < 10 ? '0' : '') + new Date().getDate(),
        endDate: new Date().getFullYear() + '-' +
        (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + '-' +
        (new Date().getDate() < 10 ? '0' : '') + new Date().getDate(),
        type: ''
      }
    },
    computed: {
      ...mapState({
        isOpen: state => state.base.isOpen
      })
    },
    methods: {
      closeChanging () {
        this.$store.dispatch('closeSth')
      },
      watchTask (id) {
        this.currentTask = id
        this.$store.dispatch('openSth')
      },
      submit () {
        if (this.beginDate > this.endDate) {
          this.$store.dispatch('openMsg', '日期选择有误')
          return
        }

        let postData = JSON.stringify({
          model: 5,
          status: this.type === '未解决' ? 0 : this.type === '已解决' ? 1 : this.type === '推迟'
            ? 2 : this.type === '已上报' ? 3 : 4,
          start_date: this.beginDate,
          end_date: this.endDate
        })
        this.$store.dispatch('POST_SEARCH', postData).then(data => {
          if (data.success) {
            this.search = data.return
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

</style>
