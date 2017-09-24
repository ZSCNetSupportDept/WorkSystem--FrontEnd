<template>
  <div class="today-finish">
    <div class="detail">
      <div class="detail__title">
        <h2>今日完成情况</h2>
      </div><!-- / detail__title -->
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
                <p>维修人员：{{ record.name + ' ' + record.who_do }}</p>
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
  </div><!-- / today-finish -->
</template>

<script>
  import task from '../../../components/task.vue'
  import {mapState} from 'vuex'

  export default {
    components: {
      'task': task
    },
    mounted () {
      this.$store.dispatch('FETCH_PERSON_TODAY').then(data => {
        if (data.success) {
          this.search = data.persons
        } else {
          this.$store.dispatch('openMsg', '服务器出问题了')
        }

        this.$store.dispatch('endLoading')
      })
    },
    data () {
      return {
        currentTask: '',
        search: []
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
