<template>
  <div class="setinfo">
    <div class="detail">
      <div class="detail__title">
        <h2>修改个人信息</h2>
      </div><!-- / detailt__title -->
      <div class="detail__content">
        <p>工作日</p>
        <cv-select v-model="workDay" :options="dayOptions"></cv-select>

        <p>值班片区</p>
        <cv-select v-model="workPlace" :options="placeOptions"></cv-select>

        <cv-text-input v-model="phone" label="手机号码" type="text"></cv-text-input>

        <cv-text-input v-model="workPhone" label="工作号码" type="text"></cv-text-input>
      </div><!-- / detail__content -->
    </div><!-- / detail -->

    <cv-button value="提交修改" :click="submit"></cv-button>
  </div><!-- / setinfo -->
</template>

<script>
  import cvSelect from '@/components/cv-select.vue'
  import cvTextInput from '@/components/cv-textInput.vue'
  import cvButton from '@/components/cv-button.vue'

  export default {
    components: {
      cvSelect,
      cvTextInput,
      cvButton
    },
    data () {
      return {
        workDay: this.$store.state.base.info.workDay === 0 ? '周一' : this.$store.state.base.info.workDay === 1 ? '周二'
          : this.$store.state.base.info.workDay === 2 ? '周三' : this.$store.state.base.info.workDay === 3 ? '周四'
            : this.$store.state.base.info.workDay === 4 ? '周五' : this.$store.state.base.info.workDay === 5 ? '周六' : '周日',
        workPlace: this.$store.state.base.info.workPlace,
        phone: '',
        workPhone: '',
        dayOptions: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        placeOptions: ['香晖苑', '朝晖苑', '北门', '东门', '岐头', '香山别墅', '凤翔']
      }
    },
    methods: {
      submit () {
        if (this.phone.search(/\d{11}/) === -1 || this.workPhone.search(/\d{11}/) === -1 || this.phone.length !== 11) {
          this.$store.dispatch('openMsg', '手机号码格式错误')
          return
        }

        let postData = JSON.stringify({
          area: this.workPlace,
          work_day: this.workDay === '周一' ? 0 : this.workDay === '周二' ? 1 : this.workDay === '周三' ? 2
            : this.workDay === '周四' ? 3 : this.workDay === '周五' ? 4 : this.workDay === '周六' ? 5 : 6,
          phone_number: this.phone,
          work_number: this.workPhone
        })
        this.$store.dispatch('POST_SET_INFO', postData)
      }
    }
  }
</script>

<style scoped>

</style>
