<template>
  <div class="tasks">
    <div class="tag">
      <ul>
        <li>
          <cv-select v-model="sortStatus" :options="sortStatusOptions"></cv-select>
        </li>
        <li>
          <cv-select v-model="sortProperty" :options="sortPropertyOptions"></cv-select>
        </li>
        <li>
          <cv-select v-model="sortDorm" :options="sortDormOptions"></cv-select>
        </li>
        <li>
          <cv-select v-model="sortShowDelay" :options="sortShowDelayOptions"></cv-select>
        </li>
      </ul>
    </div><!-- / tag-btn -->

    <div class="tasks-list">
      <template v-for="task in tasks">
        <task :task="task" v-on:dosth="changeTask"
              v-if="judgeShow(task)"></task>
      </template>
    </div>

    <div class="watchsth" :class="{ 'open': isOpen }">
      <div class="detail">
        <div class="detail__title">{{ '#' + currentTask }}</div><!-- / detail__title -->
        <div class="detail__content">
          <p>维修状态</p>
          <cv-select v-model="repairStatus" :options="statusOptions"></cv-select>

          <cv-text-input v-model="repairDetail" type="text" placeholder="None" label="维修简介"></cv-text-input>

          <p>维护人员</p>
          <cv-check-box-group v-model="repairWorkers" :options="workers"></cv-check-box-group>

          <cv-button label="提交修改" :click="submit"></cv-button>
        </div><!-- / detail__content -->
      </div><!-- / detail -->
    </div><!-- / watchsth -->
  </div><!-- / tasks -->
</template>

<script>
  import task from '@/components/task.vue'
  import {mapState} from 'vuex'
  import cvTextInput from '@/components/cv-textInput.vue'
  import cvCheckBoxGroup from '@/components/cv-checkBoxGroup.vue'
  import cvCheckBox from '@/components/cv-checkBox.vue'
  import cvSelect from '@/components/cv-select.vue'
  import cvButton from '@/components/cv-button.vue'

  export default {
    components: {
      task,
      cvTextInput,
      cvCheckBoxGroup,
      cvCheckBox,
      cvSelect,
      cvButton
    },
    mounted () {
      if (!this.isWorked) {
        this.$store.dispatch('openMsg', '尚未签到或数据获取延迟')
        this.$router.push({name: 'creatework'})
      } else {
        this.$store.dispatch('FETCH_TASKS', this.$route.params.isp)
      }
    },
    beforeRouteUpdate (to, from, next) {
      this.$store.dispatch('FETCH_TASKS', to.params.isp)
      next()
    },
    data () {
      return {
        statusOptions: ['已解决', '推迟', '已上报', '未解决'],
        sortStatus: '全部',
        sortStatusOptions: ['全部', '未解决', '已上报', '推迟'],
        sortProperty: '全部',
        sortPropertyOptions: ['全部', '普通', '工单', '新装', '投诉'],
        sortShowDelay: '隐藏最近推迟',
        sortShowDelayOptions: ['显示最近推迟', '隐藏最近推迟'],
        sortDorm: '全部'
      }
    },
    computed: {
      ...mapState({
        currentTask: state => state.tasks.currentTask,
        isWorked: state => state.base.isWorked,
        isOpen: state => state.base.isOpen,
        nowPlace: state => state.base.nowPlace,
        tasks: state => state.tasks.tasks,
        workers: state => state.tasks.workers
      }),
      repairDetail: {
        get () {
          return this.$store.state.tasks.repairDetail
        },
        set (value) {
          this.$store.commit('SET_ISP_REPAIR_DETAIL', value)
        }
      },
      repairWorkers: {
        get () {
          return this.$store.state.tasks.repairWorkers
        },
        set (value) {
          this.$store.commit('SET_ISP_REPAIR_WORKERS', value)
        }
      },
      repairStatus: {
        get () {
          return this.$store.state.tasks.repairStatus
        },
        set (value) {
          this.$store.commit('SET_ISP_REPAIR_STATUS', value)
        }
      },
      sortDormOptions: {
        get () {
          if (this.nowPlace === '北门') {
            return ['全部', '7栋', '8栋', '9栋', '10栋', '11栋']
          } else if (this.nowPlace === '岐头') {
            return ['全部', '16栋', '17栋', '18,19栋']
          } else if (this.nowPlace === '香晖苑') {
            return ['全部', 'AB栋', 'CD栋']
          } else if (this.nowPlace === '朝晖苑') {
            return ['全部']
          } else if (this.nowPlace === '东门') {
            return ['全部', '12栋', '13栋', '14栋', '15栋', '20栋', '21栋']
          } else if (this.nowPlace === '凤翔') {
            return ['全部', '1栋', '2栋', '3栋', '4栋', '5栋', '6栋']
          } else {
            return ['全部']
          }
        }
      }
    },
    methods: {
      judgeShow (task) {
        if (this.sortStatus !== '全部') {
          if (this.sortStatus === '未解决' && task.repairStatus !== 0) {
            return false
          } else if (this.sortStatus === '已上报' && task.repairStatus !== 3) {
            return false
          } else if (this.sortStatus === '推迟' && task.repairStatus !== 2) {
            return false
          }
        }

        if (this.sortProperty !== '全部') {
          if (this.sortProperty === '普通' && task.taskProperty !== 0) {
            return false
          } else if (this.sortProperty === '工单' && task.taskProperty !== 1) {
            return false
          } else if (this.sortProperty === '新装' && task.taskProperty !== 2) {
            return false
          } else if (this.sortProperty === '投诉' && task.taskProperty !== 3) {
            return false
          }
        }

        if (this.sortShowDelay === '隐藏最近推迟' && task.repairStatus === 2 &&
          (new Date()).getTime() - (new Date(task.lastChangeTime)).getTime() <= 3600000 * 4) {
          return false
        }

        if (this.sortDorm !== '全部' && this.sortDorm.indexOf(task.userHouse.split('-')[0].toUpperCase()) === -1) {
          return false
        }

        return true
      },
      changeTask (id) {
        if (id === this.currentTask) {
          this.$store.dispatch('openSth')
        } else {
          this.$store.dispatch('changeCurrentTasks', id)
          this.$store.dispatch('openSth')
        }
      },
      submit () {
        let message = ''
        let isError = false
        if (this.repairDetail.length === 0) {
          isError = true
          message += '维修简介未填 '
        }
        if (this.repairWorkers.length === 0) {
          isError = true
          message += '尚未选择维修人员'
        }
        if (isError) {
          this.$store.dispatch('openMsg', message)
          return
        }

        let postData = {
          isp: this.$route.params.isp,
          data: JSON.stringify(this.$route.params.isp === '普通' ? {
            id: this.currentTask,
            status: this.repairStatus === '未解决' ? 0 : this.repairStatus === '已解决' ? 1 : this.repairStatus === '推迟' ? 2 : 3,
            repairIntro: this.repairDetail,
            who: this.repairWorkers.map(worker => {
              return worker.slice(0, 4)
            })
          } : {
            id: this.currentTask,
            status: this.repairStatus === '未解决' ? 0 : this.repairStatus === '已解决' ? 1 : this.repairStatus === '推迟' ? 2 : 3,
            introduction: this.repairDetail,
            who: this.repairWorkers.map(worker => {
              return worker.slice(0, 4)
            })
          })
        }
        this.$store.dispatch('POST_CHANGE_TASK', postData)
      }
    }
  }
</script>

<style scoped>
  .tasks {
    padding-top: 3rem;
  }

  .tag {
    position: fixed;
    width: 100%;
  }

  ul {
    border-top: .5px solid #3386b7;
    background-color: #0079b7;
  }

  ul li {
    display: inline-block;
    width: 20%;
  }

  ul li:last-of-type {
    width: 35%;
  }

  .tasks-list {
    padding-top: 1rem;
  }

</style>
