<template>
  <div class="res-register">
    <div v-for="man in registerMan" @click="change(man.id,man.name)" class="detail">
      <div class="detail__content">
        <p>申请人：{{ man.work_number + ' ' + man.name }}</p>
        <p>申请日期：{{ man['extra_work_time'] }}</p>
      </div><!-- / detail__content -->
    </div><!-- / detail -->

    <div class="watchsth" :class="{ 'open': isOpen }">
      <div class="detail">
        <div class="detail__title">
          <h2>{{ currentID + ' ' + currentName}}</h2>
        </div><!-- / detail__title -->
        <div class="detail__content">
          <cv-check-box v-model="resPass" label="是否通过"></cv-check-box>

          <p v-if="resPass">分配片区</p>
          <cv-select v-if="resPass" v-model="resPlace" :options="placeOptions"></cv-select>

          <cv-text-input v-if="!resPass" v-model="resWhy" label="拒绝理由" type="text"></cv-text-input>

          <cv-button label="提交" :click="submit"></cv-button>
        </div><!-- / detail__content -->
      </div><!-- / detail -->
    </div><!-- / watchsth -->
  </div><!-- / res-register -->
</template>

<script>
  import cvSelect from '@/components/cv-select.vue'
  import cvCheckBox from '@/components/cv-checkBox.vue'
  import cvTextInput from '@/components/cv-textInput.vue'
  import {mapState} from 'vuex'
  import cvButton from '@/components/cv-button.vue'

  export default {
    components: {
      cvSelect,
      cvCheckBox,
      cvTextInput,
      cvButton
    },
    mounted () {
      this.fetchData()
    },
    data () {
      return {
        placeOptions: ['香晖苑', '朝晖苑', '北门', '东门', '岐头', '香山别墅', '凤翔'],
        registerMan: [],
        currentID: null,
        currentName: null,
        resPlace: '',
        resPass: true,
        resWhy: ''
      }
    },
    computed: {
      ...mapState({
        isOpen: state => state.base.isOpen
      })
    },
    methods: {
      change (id, name) {
        if (id !== this.currentID) {
          this.resWhy = ''
          this.resPlace = '香晖苑'
          this.currentID = id
          this.currentName = name
        }

        this.$store.dispatch('openSth')
      },
      fetchData () {
        this.$store.dispatch('FETCH_EXTRA_WORK').then(data => {
          if (data.success) {
            this.registerMan = data['extra_work']
            this.$store.dispatch('endLoading')
          } else {
            this.$store.dispatch('openMsg', '服务器出问题了，请重试')
            this.$store.dispatch('endLoading')
          }
        })
      },
      submit () {
        if (!this.resPass && this.resWhy.length === 0) {
          this.$store.dispatch('openMsg', '拒绝理由未填写')
          this.$store.dispatch('endLoading')
          return
        }

        let postData = JSON.stringify({
          id: this.currentID,
          status: this.resPass ? 1 : 2,
          reason: this.resWhy,
          area: this.resPlace
        })
        this.$store.dispatch('POST_RES_SIGN_WORK', postData).then(data => {
          if (data.success) {
            this.$store.dispatch('openMsg', '提交成功')
          } else if (data.error === 'no change') {
            this.$store.dispatch('openMsg', '提交失败')
          } else {
            this.$store.dispatch('openMsg', '服务器好像出问题了')
          }

          this.$store.dispatch('closeSth')
          this.fetchData()
        })
      }
    }
  }
</script>

<style scoped>
  .cv-button {
    margin-top: 15px;
    width: 100%;
  }
</style>
