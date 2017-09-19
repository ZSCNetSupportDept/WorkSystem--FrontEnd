<template>
  <div class="search-user">
    <div class="detail">
      <div class="detail-title">
        <h2>查询条件</h2>
      </div><!-- / detail-title -->
      <div class="detail-content">
        <text-input v-model="userPhone" type="text" label="用户联系电话" placeholder="联系电话"></text-input>

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
  import textInput from '../views/textInput.vue'
  import buttons from '../views/button.vue'
  import {mapState} from 'vuex'

  export default {
    components: {
      'task': task,
      'textInput': textInput,
      'buttons': buttons
    },
    data () {
      return {
        currentTask: '',
        userPhone: '',
        search: []
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
        if (!(this.userPhone.search(/\d{11}/) !== -1 && this.userPhone.length === 11)) {
          this.$store.dispatch('openMsg', '手机号码输入错误')
          return
        }

        let postData = JSON.stringify({
          model: 3,
          telephone_number: this.userPhone
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
  .record {
    padding: .5rem 0;
    border-bottom: 1px solid #e6e6e6;
  }

  .record p {
    margin: .2rem !important;
  }
</style>
