<template>
  <div class="newtask">
    <div class="task-property detail">
      <div class="detail-title">
        <h2>任务性质</h2>
      </div><!-- / detail-title -->
      <div class="detail-content">
        <select-box v-model="taskProperty" :options="taskOptions"></select-box>
      </div><!-- / detail-content -->
    </div><!-- task-property -->

    <div class="repair-status detail">
      <div class="detail-title">
        <h2>报修状态</h2>
      </div><!-- / detail-title -->
      <div class="detail-content">
        <select-box v-model="taskStatus" :options="statusOptions"></select-box>
      </div><!-- / detail-content -->
    </div><!-- / repair-status -->

    <div class="user-info detail">
      <div class="detail-title">
        <h2>用户信息</h2>
      </div><!-- / detail-title -->
      <div class="detail-content">
        <text-input v-model="userPhone" :data="userPhone" type="text" label="联系电话" placeholder="电话(必填)"></text-input>

        <select-box v-model="userPlace" :options="placeOptions" label="宿舍"></select-box>

        <text-input v-model="userHouse" :data="userHouse" type="text" placeholder="宿舍号(必填)"></text-input>
      </div><!-- / detail-content -->
    </div><!-- / user-info -->

    <div class="net-info detail">
      <div class="detail-title">
        <h2>宽带信息</h2>
      </div><!-- / detail-title -->
      <div class="detail-content">
        <select-box v-model="netInfo" :options="netOptions"></select-box>

        <text-input v-model="netAccount" :data="netAccount" type="text" placeholder="不需要输入任何前缀后缀"></text-input>
      </div><!-- / detail-content -->
    </div><!-- / net-info -->

    <div class="detail">
      <div class="detail-title">
        <h2>任务简述</h2>
      </div><!-- / detail-title -->
      <div class="detail-content">
        <text-input v-model="introduction" :data="introduction" type="text"></text-input>
      </div><!-- / detail-content -->
    </div><!-- / detail -->

    <buttons value="新增任务" :click="verify"></buttons>

    <div class="confirm" :class="{ 'open': isOpen }">
      <div class="detail">
        <div class="detail-title">
          <h2>信息确认</h2>
        </div><!-- / detail-title -->
        <div class="detail-content">
          <p>报修状态：{{ taskStatus }}</p>
          <p>联系电话：{{ userPhone }}</p>
          <p>宿舍片区：{{ userPlace }}</p>
          <p>宿舍号：{{ userHouse }}</p>
          <p>运营商：{{ netInfo }}</p>
          <p>宽度账号：{{ netAccount }}</p>
          <p>维修简介：{{ introduction }}</p>
          <buttons value="确认提交" :click="submit"></buttons>
          <buttons value="进行修改" :click="cancel"></buttons>
        </div><!-- / detail-content -->
      </div><!-- / detail -->
    </div><!-- / confirm -->
  </div><!-- / newtask -->
</template>

<script>
  import textInput from '../views/textInput.vue'
  import checkBoxGroup from '../views/checkBoxGroup.vue'
  import checkBox from '../views/checkBox.vue'
  import selectBox from '../views/selectBox.vue'
  import buttons from '../views/button.vue'
  import {mapState} from 'vuex'

  export default {
    components: {
      'textInput': textInput,
      'checkBoxGroup': checkBoxGroup,
      'checkBox': checkBox,
      'selectBox': selectBox,
      'buttons': buttons
    },
    data () {
      return {
        taskOptions: ['普通', '工单', '新装', '投诉'],
        statusOptions: ['已解决', '推迟', '已上报', '未解决'],
        placeOptions: ['香晖苑', '朝晖苑', '北门', '东门', '岐头', '香山别墅', '凤翔'],
        netOptions: ['中国电信', '中国移动', '中国联通']
      }
    },
    computed: {
      ...mapState({
        isOpen: state => state.base.isOpen,
        info: state => state.base.info
      }),
      taskProperty: {
        get () {
          return this.$store.state.newTask.taskProperty
        },
        set (value) {
          this.$store.commit('SET_NT_PROPERTY', value)
        }
      },
      taskStatus: {
        get () {
          return this.$store.state.newTask.taskStatus
        },
        set (value) {
          this.$store.commit('SET_NT_STATUS', value)
        }
      },
      userPhone: {
        get () {
          return this.$store.state.newTask.userPhone
        },
        set (value) {
          this.$store.commit('SET_NT_USER_PHONE', value)
        }
      },
      userPlace: {
        get () {
          return this.$store.state.newTask.userPlace
        },
        set (value) {
          this.$store.commit('SET_NT_USER_PLACE', value)
        }
      },
      userHouse: {
        get () {
          return this.$store.state.newTask.userHouse
        },
        set (value) {
          this.$store.commit('SET_NT_USER_HOUSE', value)
        }
      },
      netInfo: {
        get () {
          return this.$store.state.newTask.netInfo
        },
        set (value) {
          this.$store.commit('SET_NT_NET_INFO', value)
        }
      },
      netAccount: {
        get () {
          return this.$store.state.newTask.netAccount
        },
        set (value) {
          this.$store.commit('SET_NT_NET_ACCOUNT', value)
        }
      },
      introduction: {
        get () {
          return this.$store.state.newTask.introduction
        },
        set (value) {
          this.$store.commit('SET_NT_INTRODUCTION', value)
        }
      }
    },
    methods: {
      verify () {
        // verify the input
        let isError = false
        let message = ''
        if (!(this.userPhone.search(/\d{11}/) !== -1 && this.userPhone.length === 11)) {
          isError = true
          message += '用户手机号码输入有误  '
        }
        if (this.userPlace === '朝晖苑') {
          if (!(this.userHouse.search(/\d{3,4}/i) !== -1 &&
              this.userHouse.length >= 3 && this.userHouse.length <= 4)) {
            isError = true
            message += '用户宿舍输入有误  '
          }
        } else {
          if (!(this.userHouse.search(/(\d{1,2}|a|b|c|d)-(\d{3,4})/i) !== -1 &&
              this.userHouse.length >= 5 && this.userHouse.length <= 7)) {
            isError = true
            message += '用户宿舍输入有误  '
          }
        }
        if (this.introduction.length === 0) {
          isError = true
          message += '任务简述未填 '
        }
        if (isError) {
          this.$store.dispatch('openMsg', message)
          return
        }

        this.$store.dispatch('openSth')
      },
      submit () {
        let postData = {
          type: this.taskProperty,
          data: JSON.stringify(this.taskProperty === '普通' ? {
            work_area: this.userPlace,
            account_number: this.netAccount,
            telephone_number: this.userPhone,
            dormitory_number: this.userHouse,
            status: this.repairStatus === '未解决' ? 0 : this.repairStatus === '已解决' ? 1
              : this.repairStatus === '推迟' ? 2 : 3,
            introduction: this.introduction,
            who: [this.info.ID],
            operator: this.netInfo
          } : {
            situation_order: this.taskProperty === '新装' ? 2 : this.taskProperty === '工单' ? 1 : 3,
            area: this.userPlace,
            account_number: this.netAccount,
            telephone_number: this.userPhone,
            dormitory_number: this.userHouse,
            status: this.taskStatus === '未解决' ? 0 : this.taskStatus === '已解决' ? 1
              : this.taskStatus === '推迟' ? 2 : 3,
            introduction: this.introduction,
            operator: this.netInfo
          })
        }

        this.$store.dispatch('POST_ADD_TASK', postData).then(data => {
          if (data.error) {
            this.$store.dispatch('openMsg', '服务器好像出了点问题，请重试，若依然这样，请联系管理员')
          } else if (data.success) {
            this.userPhone = ''
            this.userHouse = ''
            this.netAccount = ''
            this.introduction = ''

            this.$store.dispatch('openMsg', '提交成功')
          } else {
            this.$store.dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
          }

          this.$store.dispatch('endLoading')
          this.$store.dispatch('closeSth')
        })
      },
      cancel () {
        this.$store.dispatch('endLoading')
        this.$store.dispatch('closeSth')
      }
    }
  }
</script>

<style scoped>

</style>
