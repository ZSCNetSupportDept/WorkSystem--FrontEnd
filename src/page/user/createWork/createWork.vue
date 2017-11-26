<!-- / 签到／签退页面 -->

<template>
  <div class="create-work">
    <div class="work-info detail">
      <div class="detail__title">
        <h2>值班信息</h2>
      </div><!-- / detail__title -->
      <div class="detail__content">
        <p>值班片区</p>
        <cv-select v-model="choosePlace" :options="options" :disabled="isWorked"></cv-select>

        <cv-check-box label="携带工具箱" v-model="hasTools"></cv-check-box>
      </div><!-- / detail__content -->
    </div><!-- / work-info -->

    <div class="check-tools detail" :class="{ active: hasTools }">
      <div class="detail__title">
        <h2>工具箱</h2>
      </div><!-- / detail__title -->
      <div class="detail__content">
        <cv-check-box-group :options="nowTools" v-model="toolKit"></cv-check-box-group>

        <p>备注</p>
        <cv-text-input type="text" v-model="toolsDetail" placeholder="None"></cv-text-input>
      </div><!-- / detail__content -->
    </div><!-- / check-tools -->

    <cv-button :label="isWorked?'结束值班':'开始值班'" :click="submit"></cv-button>

    <div class="confirm" :class="{ 'open': isOpen }">
      <div class="detail">
        <div class="detail__content">
          <p v-if="!isWorked">现在不是正常值班时间，你是否确定要签到，还是只是随便浏览一下</p>
          <p v-if="isWorked">尚有未解决状态的任务分类：投诉{{ noWorked.fuck }}单，电信{{ noWorked.dianxin }}单，移动{{ noWorked.yidong
            }}单，联通{{ noWorked.liantong }}单，普通{{ noWorked.general }}单</p>
          <cv-button :label="isWorked?'确认签退':'确认签到'" :click="confirm1"></cv-button>
          <cv-button :label="isWorked?'看看任务':'随便看看'" :click="confirm2"></cv-button>
        </div><!-- / detail__content -->
      </div><!-- / detail -->
    </div><!-- / confirm -->
  </div><!-- / create-work -->
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
    data () {
      return {
        tools: ['网线', '水晶头', '压线钳', '螺丝刀', '测线器', '交换机', '端口模块', '钥匙', '寻线器'],
        noWorked: {
          general: 0,
          dianxin: 0,
          yidong: 0,
          liantong: 0,
          fuck: 0
        },
        options: ['香晖苑', '朝晖苑', '北门', '东门', '岐头', '香山别墅', '凤翔']
      }
    },
    computed: {
      ...mapState({
        isWorked: state => state.base.isWorked,
        isOpen: state => state.base.isOpen
      }),
      choosePlace: {
        get () {
          return this.$store.state.createWork.choosePlace
        },
        set (value) {
          this.$store.commit('SET_CHOOSE_PLACE', value)
        }
      },
      toolsDetail: {
        get () {
          return this.$store.state.createWork.toolsDetail
        },
        set (value) {
          this.$store.commit('SET_TOOLS_DETAIL', value)
        }
      },
      hasTools: {
        get () {
          return this.$store.state.createWork.hasTools
        },
        set (value) {
          this.$store.commit('SET_HAS_TOOLS', value)
        }
      },
      toolKit: {
        get () {
          return Array.from(this.$store.state.createWork.toolKit)
        },
        set (value) {
          this.$store.dispatch('updateToolKit', value)
        }
      },
      nowTools: {
        get () {
          let now = []
          this.tools.forEach((tool) => {
            if (!((tool === '钥匙' || tool === '端口模块' || tool === '寻线器') &&
                (!(this.choosePlace === '香晖苑' || this.choosePlace === '朝晖苑' || this.choosePlace === '凤翔') ||
                  (tool === '钥匙' && this.choosePlace === '凤翔') || (tool === '寻线器' && this.choosePlace === '凤翔')))) {
              now.push(tool)
            }
          })
          return now
        }
      }
    },
    methods: {
      postData () {
        let data = {
          type: this.isWorked ? 'out' : 'in',
          data: JSON.stringify({
            area: this.choosePlace,
            toolkit: this.hasTools,
            cable: this.toolKit.indexOf('网线') !== -1,
            crimping_Tool: this.toolKit.indexOf('压线钳') !== -1,
            'switch': this.toolKit.indexOf('交换机') !== -1,
            crystal_Head: this.toolKit.indexOf('水晶头') !== -1,
            measuring_line: this.toolKit.indexOf('测线器') !== -1,
            port_module: (this.choosePlace === '香晖苑' || this.choosePlace === '朝晖苑' || this.choosePlace === '凤翔')
              ? this.toolKit.indexOf('端口模块') !== -1 : true,
            key: (this.choosePlace === '香晖苑' || this.choosePlace === '朝晖苑') ? this.toolKit.indexOf('钥匙') !== -1 : true,
            screwdriver: this.toolKit.indexOf('螺丝刀') !== -1,
            hunt: this.choosePlace === '朝晖苑' ? this.toolKit.indexOf('寻线器') !== -1 : true,
            detailed_description: this.toolsDetail
          })
        }

        this.$store.dispatch('POST_CHECK_WORK', data).then(data => {
          if (data.success) {
            this.$router.push({name: this.isWorked ? 'overview' : 'todayfinish'})
          }
        })
      },
      submit () {
        if (this.isWorked) {
          // 签退
          this.$store.dispatch('FETCH_ALL_TASKS').then(data => {
            data.general.work_order.map(task => {
              if (task.repairStatus === 0 || (task.repairStatus === 2 &&
                  (new Date()).getTime() - (new Date(task.lastChangeTime)).getTime() <= 3600000 * 4)) {
                this.noWorked.general++
              }
            })

            data.dianxin.work_order.map(task => {
              if (task.repairStatus === 0 || (task.repairStatus === 2 &&
                  (new Date()).getTime() - (new Date(task.lastChangeTime)).getTime() <= 3600000 * 4)) {
                this.noWorked.dianxin++
              }
            })

            data.yidong.work_order.map(task => {
              if (task.repairStatus === 0 || (task.repairStatus === 2 &&
                  (new Date()).getTime() - (new Date(task.lastChangeTime)).getTime() <= 3600000 * 4)) {
                this.noWorked.yidong++
              }
            })

            data.liantong.work_order.map(task => {
              if (task.repairStatus === 0 || (task.repairStatus === 2 &&
                  (new Date()).getTime() - (new Date(task.lastChangeTime)).getTime() <= 3600000 * 4)) {
                this.noWorked.liantong++
              }
            })

            data.fuck.work_order.map(task => {
              if (task.repairStatus === 0 || (task.repairStatus === 2 &&
                  (new Date()).getTime() - (new Date(task.lastChangeTime)).getTime() <= 3600000 * 4)) {
                this.noWorked.fuck++
              }
            })

            if (this.noWorked.dianxin === this.noWorked.yidong && this.noWorked.liantong ===
              this.noWorked.fuck && this.noWorked.dianxin === this.noWorked.fuck &&
              this.noWorked.fuck === this.noWorked.general && this.noWorked.general === 0) {
              this.postData()
            } else {
              this.$store.dispatch('openSth')
              this.$store.dispatch('endLoading')
            }
          })
        } else {
          // 签到
          if (new Date().getHours() < 16 || new Date().getHours() > 18) {
            // 不是正常值班时间
            this.$store.dispatch('openSth')
            this.$store.dispatch('endLoading')
          } else {
            // 正常值班时间
            this.postData()
          }
        }
      },
      confirm1 () {
        this.postData()
      },
      confirm2 () {
        this.$store.dispatch('beginLoading')
        if (!this.isWorked) {
          // 签到的情况
          this.$router.push({name: 'searchtoday'})
        } else {
          // 签退的情况
          this.$router.push({name: 'tasks', params: {isp: '投诉'}})
        }

        this.$store.dispatch('closeSth')
        this.$store.dispatch('endLoading')
      }
    }
  }
</script>

<style scoped>

  .check-tools {
    max-height: 0;
    margin: 0;
    transition: max-height .5s linear;
    overflow: hidden;
  }

  .check-tools.active {
    margin: 1rem .5rem;
    transition: max-height 1s linear;
    max-height: 50rem;
  }

  .cv-button {
    width: 100%;
    padding: .6rem .5rem;
    margin-bottom: 10px;
  }

</style>
