<template>
  <div class="search-user">
    <div class="detail">
      <div class="detail__title">
        <h2>查询条件</h2>
      </div><!-- / detail__title -->
      <div class="detail__content">
        <cv-select v-model="type" :options="statusOptions"></cv-select>

        <label for="begin">起始日期</label>
        <input v-model="beginDate" type="date" id="begin">
        <label for="end">结束日期</label>
        <input v-model="endDate" type="date" id="end">

        <cv-button label="查询" :click="submit"></cv-button>
      </div><!-- / detail__content -->
    </div><!-- / detail -->

    <template v-for="task in search">
      <task :task="task" v-on:dosth="watchTask"></task>
    </template>

    <div class="watchsth" :class="{ 'open': isOpen }">
      <div class="detail">
        <div class="detail__title">{{ '#' + currentTask }}</div><!-- / detail__title -->
        <div class="detail__content">
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
        </div><!-- / detail__content -->
      </div><!-- / detail -->
    </div><!-- / watchsth -->
  </div><!-- / search-user -->
</template>

<script>
  import task from '@/components/task.vue'
  import cvSelect from '@/components/cv-select.vue'
  import cvButton from '@/components/cv-button.vue'
  import {mapState} from 'vuex'

  export default {
    components: {
      task,
      cvSelect,
      cvButton
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
        type: '全部'
      }
    },
    computed: {
      ...mapState({
        isOpen: state => state.base.isOpen
      })
    },
    methods: {
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
  .cv-button {
    width: 100%;
  }
</style>
