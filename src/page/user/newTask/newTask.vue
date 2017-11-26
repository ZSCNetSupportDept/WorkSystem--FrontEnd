<template>
  <div class="newtask">
    <div class="task-property detail">
      <div class="detail__title">
        <h2>任务性质</h2>
      </div><!-- / detail__title -->
      <div class="detail__content">
        <cv-select v-model="taskProperty" :options="taskOptions"></cv-select>
      </div><!-- / detail__content -->
    </div><!-- task-property -->

    <div class="repair-status detail">
      <div class="detail__title">
        <h2>报修状态</h2>
      </div><!-- / detail__title -->
      <div class="detail__content">
        <cv-select v-model="taskStatus" :options="statusOptions"></cv-select>
      </div><!-- / detail__content -->
    </div><!-- / repair-status -->

    <div class="user-info detail">
      <div class="detail__title">
        <h2>用户信息</h2>
      </div><!-- / detail__title -->
      <div class="detail__content">
        <p>联系电话</p>
        <cv-text-input v-model="userPhone" type="text" placeholder="电话(必填)"></cv-text-input>

        <p>宿舍</p>
        <cv-select v-model="userPlace" :options="placeOptions"></cv-select>

        <cv-text-input v-model="userHouse" type="text" placeholder="宿舍号(必填)"></cv-text-input>
      </div><!-- / detail__content -->
    </div><!-- / user-info -->

    <div class="net-info detail">
      <div class="detail__title">
        <h2>宽带信息</h2>
      </div><!-- / detail__title -->
      <div class="detail__content">
        <p>运营商</p>
        <cv-select v-model="netInfo" :options="netOptions"></cv-select>

        <p>宽带账号</p>
        <cv-text-input v-model="netAccount" type="text" placeholder="选填,不需要前缀后缀"></cv-text-input>
      </div><!-- / detail__content -->
    </div><!-- / net-info -->

    <div class="detail">
      <div class="detail__title">
        <h2>任务简述</h2>
      </div><!-- / detail__title -->
      <div class="detail__content">
        <cv-text-input v-model="introduction" type="text"></cv-text-input>
      </div><!-- / detail__content -->
    </div><!-- / detail -->

    <cv-button label="新增任务" :click="verify"></cv-button>

    <div class="confirm" :class="{ 'open': isOpen }">
      <div class="detail">
        <div class="detail__title">
          <h2>信息确认</h2>
        </div><!-- / detail__title -->
        <div class="detail__content">
          <p>报修状态：{{ taskStatus }}</p>
          <p>联系电话：{{ userPhone }}</p>
          <p>宿舍片区：{{ userPlace }}</p>
          <p>宿舍号：{{ userHouse }}</p>
          <p>运营商：{{ netInfo }}</p>
          <p>宽度账号：{{ netAccount }}</p>
          <p>维修简介：{{ introduction }}</p>
          <cv-button label="确认提交" :click="submit"></cv-button>
          <cv-button label="进行修改" :click="cancel"></cv-button>
        </div><!-- / detail__content -->
      </div><!-- / detail -->
    </div><!-- / confirm -->
  </div><!-- / newtask -->
</template>

<script>
  import cvTextInput from '@/components/cv-textInput.vue'
  import cvCheckBox from '@/components/cv-checkBox.vue'
  import cvSelect from '@/components/cv-select.vue'
  import cvButton from '@/components/cv-button.vue'
  import {mapState} from 'vuex'

  export default {
    components: {
      cvTextInput,
      cvCheckBox,
      cvSelect,
      cvButton
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
  .cv-button {
    width: 100%;
  }
</style>
