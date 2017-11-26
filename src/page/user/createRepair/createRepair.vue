<!-- / 完成纸质报修页面 -->

<template>
  <div class="create-repair">
    <div class="repair-status detail">
      <div class="detail__title">
        <h2>报修状态</h2>
      </div><!-- / detail__title -->
      <div class="detail__content">
        <cv-select v-model="repairStatus" :options="statusOptions"></cv-select>
      </div><!-- / detail__content -->
    </div><!-- / repair-status -->

    <div class="user-info detail">
      <div class="detail__title">
        <h2>用户信息</h2>
      </div><!-- / detail__title -->
      <div class="detail__content">
        <cv-text-input v-model="userPhone" type="text" label="联系电话" placeholder="电话(必填)"></cv-text-input>

        <cv-select v-model="userPlace" :options="placeOptions" label="宿舍" :disabled="true"></cv-select>

        <cv-text-input v-model="userHouse" type="text" placeholder="宿舍号(必填)"></cv-text-input>
      </div><!-- / detail__content -->
    </div><!-- / user-info -->

    <div class="net-info detail">
      <div class="detail__title">
        <h2>宽带信息</h2>
      </div><!-- / detail__title -->
      <div class="detail__content">
        <cv-select v-model="netInfo" :options="netOptions"></cv-select>

        <cv-text-input v-model="netAccount" type="text" placeholder="不需要输入任何前缀后缀"></cv-text-input>
      </div><!-- / detail__content -->
    </div><!-- / net-info -->

    <div class="repair-record detail">
      <div class="detail__title">
        <h2>维护记录</h2>
      </div><!-- / detail__title -->
      <div class="detail__content">
        <cv-text-input v-model="repairDetail" type="text" placeholder="必填"></cv-text-input>

        <p>维护人员</p>
        <cv-check-box-group v-model="repairWorkers" :options="workers"></cv-check-box-group>
      </div><!-- / detail__content -->
    </div><!-- / repair-record -->

    <buttons value="创建报修单" :click="verify"></buttons>

    <div class="confirm" :class="{ 'open': isOpen }">
      <div class="detail">
        <div class="detail__title">
          <h2>信息确认</h2>
        </div><!-- / detail__title -->
        <div class="detail__content">
          <p>报修状态：{{ repairStatus }}</p>
          <p>联系电话：{{ userPhone }}</p>
          <p>宿舍片区：{{ userPlace }}</p>
          <p>宿舍号：{{ userHouse }}</p>
          <p>运营商：{{ netInfo }}</p>
          <p>宽度账号：{{ netAccount }}</p>
          <p>维修简介：{{ repairDetail }}</p>
          <cv-button label="确认提交" :click="submit"></cv-button>
          <cv-button label="进行修改" :click="cancel"></cv-button>
        </div><!-- / detail__content -->
      </div><!-- / detail -->
    </div><!-- / confirm -->
  </div><!-- / create-repair -->
</template>

<script>
  import {mapState} from 'vuex'
  import cvTextInput from '@/components/cv-textInput.vue'
  import cvCheckBoxGroup from '@/components/cv-checkBoxGroup.vue'
  import cvCheckBox from '@/components/cv-checkBox.vue'
  import cvSelect from '@/components/cv-select.vue'
  import cvButton from '@/components/cv-button.vue'

  export default {
    components: {
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
        this.$store.dispatch('FETCH_WORKERS').then(data => {
          if (data.workers) {
            this.workers = data.workers
          }

          this.$store.dispatch('endLoading')
        })
      }
    },
    data () {
      return {
        workers: [],
        statusOptions: ['已解决', '推迟', '已上报', '未解决'],
        placeOptions: ['香晖苑', '朝晖苑', '北门', '东门', '岐头', '香山别墅', '凤翔'],
        netOptions: ['中国电信', '中国移动', '中国联通']
      }
    },
    computed: {
      ...mapState({
        isWorked: state => state.base.isWorked,
        isOpen: state => state.base.isOpen,
        nowPlace: state => state.base.nowPlace
      }),
      repairStatus: {
        get () {
          return this.$store.state.createRepair.repairStatus
        },
        set (value) {
          this.$store.commit('SET_REPAIR_STATUS', value)
        }
      },
      userPhone: {
        get () {
          return this.$store.state.createRepair.userPhone
        },
        set (value) {
          this.$store.commit('SET_USER_PHONE', value)
        }
      },
      userPlace: {
        get () {
          return this.$store.state.createRepair.userPlace
        },
        set (value) {
          this.$store.commit('SET_USER_PLACE', value)
        }
      },
      userHouse: {
        get () {
          return this.$store.state.createRepair.userHouse
        },
        set (value) {
          this.$store.commit('SET_USER_HOUSE', value)
        }
      },
      netInfo: {
        get () {
          return this.$store.state.createRepair.netInfo
        },
        set (value) {
          this.$store.commit('SET_NET_INFO', value)
        }
      },
      netAccount: {
        get () {
          return this.$store.state.createRepair.netAccount
        },
        set (value) {
          this.$store.commit('SET_NET_ACCOUNT', value)
        }
      },
      repairDetail: {
        get () {
          return this.$store.state.createRepair.repairDetail
        },
        set (value) {
          this.$store.commit('SET_REPAIR_DETAIL', value)
        }
      },
      repairWorkers: {
        get () {
          return this.$store.state.createRepair.repairWorkers
        },
        set (value) {
          this.$store.commit('SET_REPAIR_WORKERS', value)
        }
      }
    },
    methods: {
      verify () {
        let isError = false
        let message = ''
        if (!(this.userPhone.search(/\d{11}/) !== -1 && this.userPhone.length === 11)) {
          isError = true
          message += '用户手机号码输入有误  '
        }
        if (this.userPlace === '朝晖苑') {
          if (!(this.userHouse.search(/\d{3,4}/) !== -1 &&
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
        if (this.repairDetail.length === 0) {
          isError = true
          message += '维修简介未填  '
        }
        if (this.repairWorkers.length === 0) {
          isError = true
          message += '尚未选择维修人员'
        }
        if (isError) {
          this.$store.dispatch('openMsg', message)
          return
        }

        this.$store.dispatch('openSth')
      },
      submit () {
        let postData = {
          type: '普通',
          data: JSON.stringify({
            work_area: this.userPlace,
            account_number: this.netAccount,
            telephone_number: this.userPhone,
            dormitory_number: this.userHouse,
            status: this.repairStatus === '未解决' ? 0 : this.repairStatus === '已解决' ? 1
              : this.repairStatus === '推迟' ? 2 : 3,
            introduction: this.repairDetail,
            who: this.repairWorkers.map(worker => {
              return worker.slice(0, 4)
            }),
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
            this.repairDetail = ''
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

  .create-repair .confirm input {
    margin: .5rem auto;
  }

</style>
