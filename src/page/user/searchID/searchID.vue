<template>
  <div class="search-user">
    <div class="detail">
      <div class="detail__title">
        <h2>查询条件</h2>
      </div><!-- / detail__title -->
      <div class="detail__content">
        <text-input v-model="id" type="text" label="工号" placeholder="工号"></text-input>

        <label for="begin">起始日期</label>
        <input v-model="beginDate" type="date" id="begin" :value="beginDate">
        <label for="end">结束日期</label>
        <input v-model="endDate" type="date" id="end" :value="endDate">

        <buttons value="查询" :click="submit"></buttons>
      </div><!-- / detail__content -->
    </div><!-- / detail -->

    <template v-for="task in search">
      <task :task="task" v-on:dosth="watchTask"></task>
    </template>

    <div class="watchsth" :class="{ 'open': isOpen }">
      <div class="detail">
        <div class="detail__title">{{ '#' + currentTask }}</div><!-- / detail-title -->
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
  </div><!-- /search-user-->
</template>

<script>
  import task from '../../../components/task.vue'
  import textInput from '../../../components/textInput.vue'
  import {mapState} from 'vuex'
  import buttons from '../../../components/button.vue'

  export default {
    components: {
      'task': task,
      'textInput': textInput,
      'buttons': buttons
    },
    data () {
      return {
        currentTask: '',
        search: [],
        id: '',
        beginDate: new Date().getFullYear() + '-' +
        (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + '-' +
        (new Date().getDate() < 10 ? '0' : '') + new Date().getDate(),
        endDate: new Date().getFullYear() + '-' +
        (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + '-' +
        (new Date().getDate() < 10 ? '0' : '') + new Date().getDate()
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
        if (!(this.id.search(/\d{4}/) !== -1 && this.id.length === 4)) {
          this.$store.dispatch('openMsg', '工号输入有误')
          return
        }
        if (this.beginDate > this.endDate) {
          this.$store.dispatch('openMsg', '日期选择有误')
          return
        }

        let postData = JSON.stringify({
          model: 4,
          work_number: this.id,
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
