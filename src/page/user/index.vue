<template>
  <div :class="{ active: isActive }" class="home">
    <nav>
      <div class="info">
        <h1>{{ info.name }} <span>ID: {{ info.ID }}</span></h1>
        <p>
          工作职位: {{ info.job === 'intern' ? '实习成员' : info.job === 'worker' ? '正式成员' : info.job === 'leader' ? '组长' : '科长'}}</p>
        <p>
          工作日期: {{ info.workDay === 0 ? '周一' : info.workDay === 1 ? '周二' : info.workDay === 2 ? '周三' :
          info.workDay === 3 ? '周四' : info.workDay === 4 ? '周五' : info.workDay === 5 ? '周六' : info.workDay === 6 ? '周日' : '每天'
          }}</p>
        <p>值班片区: {{ info.workPlace }}</p>
      </div><!-- / info -->
      <ul>
        <li>
          <router-link :to="{ name:'creatework'}" @click.native="closeAll">{{ isWorked ? '签退' : '签到' }}</router-link>
        </li>
        <li v-if="info.job === 'leader'|| info.job === 'boss'" :class="{ 'open': navOpen ==='权限' }">
          <a @click="clickNav('权限')">权限<span class="drop-flag"></span></a>
          <ul>
            <li>
              <router-link :to="{ name:'newtask'}" @click.native="closeAll">新增任务</router-link>
            </li>
            <li>
              <router-link :to="{ name:'searchwork'}" @click.native="closeAll">查询签到情况</router-link>
            </li>
            <li>
              <router-link :to="{ name:'searchoverview'}" @click.native="closeAll">查询报修概览</router-link>
            </li>
            <li>
              <router-link :to="{ name:'searchuser'}" @click.native="closeAll">查询用户</router-link>
            </li>
            <li>
              <router-link :to="{ name:'searchid'}" @click.native="closeAll">查询工号</router-link>
            </li>
            <li>
              <router-link :to="{ name:'searchday'}" @click.native="closeAll">查询报修单</router-link>
            </li>
            <li>
              <router-link :to="{ name:'resregister'}" @click.native="closeAll">蹭班审核</router-link>
            </li>
            <li>
              <router-link :to="{ name:'editan'}" @click.native="closeAll">编辑公告</router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link :to="{ name:'createrepair'}" @click.native="closeAll">完成纸质报修</router-link>
        </li>
        <li :class="{ 'open': navOpen ==='任务' }">
          <a @click="clickNav('任务')">任务<span class="drop-flag"></span></a>
          <ul>
            <li>
              <router-link :to="{ name:'tasks', params: {isp: '投诉'}}" @click.native="closeAll">投诉任务</router-link>
            </li>
            <li>
              <router-link :to="{ name:'tasks', params: {isp: '普通'}}" @click.native="closeAll">普通任务</router-link>
            </li>
            <li>
              <router-link :to="{ name:'tasks', params: {isp: '中国电信'}}" @click.native="closeAll">电信任务</router-link>
            </li>
            <li>
              <router-link :to="{ name:'tasks', params: {isp: '中国移动'}}" @click.native="closeAll">移动任务</router-link>
            </li>
            <li>
              <router-link :to="{ name:'tasks', params: {isp: '中国联通'}}" @click.native="closeAll">联通任务</router-link>
            </li>
          </ul>
        </li>
        <li :class="{ 'open': navOpen ==='查询' }">
          <a @click="clickNav('查询')">查询<span class="drop-flag"></span></a>
          <ul>
            <li>
              <router-link :to="{ name:'todayfinish'}" @click.native="closeAll">今日完成情况</router-link>
            </li>
            <li>
              <router-link :to="{ name:'searchtoday'}" @click.native="closeAll">查询各片区任务</router-link>
            </li>
          </ul>
        </li>
        <hr color="#3e3d3a">
        <li>
          <router-link :to="{ name:'overview'}" @click.native="closeAll">概览</router-link>
        </li>
        <li :class="{ 'open': navOpen ==='工具' }">
          <a @click="clickNav('工具')">工具<span class="drop-flag"></span></a>
          <ul>
            <li>
              <router-link :to="{ name:'contacts'}" @click.native="closeAll">常用联系电话</router-link>
            </li>
            <li>
              <a href="http://util.sola.love/yue" target="_blank" @click="closeAll">宽带余额查询</a>
              <!--<router-link :to="{ name:'searchaccount'}" @click.native="closeAll">宽带余额查询</router-link>-->
            </li>
            <li><a href="http://wiki.sola.love" target="_blank" @click="closeAll">网维wiki</a></li>
          </ul>
        </li>
        <li :class="{ 'open': navOpen ==='经验' }">
          <a @click="clickNav('经验')">经验<span class="drop-flag"></span></a>
          <ul>
            <li>
              <router-link :to="{ name:'searchexp'}" @click.native="closeAll">经验概览</router-link>
            </li>
            <li>
              <router-link :to="{ name:'addexp'}" @click.native="closeAll">添加经验</router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link :to="{ name:'register'}" @click.native="closeAll">蹭班申请</router-link>
        </li>
        <li :class="{ 'open': navOpen ==='个人中心' }">
          <a @click="clickNav('个人中心')">
            个人中心<span class="drop-flag"></span>
          </a>
          <ul>
            <li>
              <router-link :to="{ name:'setinfo'}" @click.native="closeAll">修改个人资料</router-link>
            </li>
            <li>
              <router-link :to="{ name:'setpassword'}" @click.native="closeAll">修改密码</router-link>
            </li>
          </ul>
        </li>
        <li><a @click="logout">退出登录</a></li>
      </ul>
    </nav>

    <div class="main">
      <header>
        <div @click="openNav" class="menu-btn">
          <span></span>
        </div><!-- / menu-btn -->
        <p>{{ nowPlace + date }}</p>
      </header>
      <router-view class="child-view"></router-view>

      <shadows :isshadow="isShadow" :click="closeAll"></shadows>
    </div><!-- / main -->

    <loading :loading="loading"></loading>

    <div :class="{ openmsg: openMsg }" class="confirm">
      <div class="detail">
        <div class="detail__title">
          <h2>提示信息</h2>
        </div><!-- / detail__title -->
        <div class="detail__content">
          <p>{{ message }}</p>
        </div><!-- / detail__content -->
        <div class="detail__footer">
          <a @click="iKnow" href="javascript:void(0);">{{Math.random() < .5 ? '我知道了~' : '朕知道啦~'}}</a>
        </div><!-- /detail__footer -->
      </div><!-- / detail -->
    </div><!-- / confirm -->
  </div><!-- / home -->
</template>

<script>
  import {mapState} from 'vuex'
  import loading from '../../components/loading.vue'
  import shadows from '../../components/shadow.vue'

  export default {
    components: {
      'loading': loading,
      'shadows': shadows
    },
    mounted () {
      this.$store.dispatch('beginLoading')

      if (!this.isLog) {
        this.$store.dispatch('FETCH_IS_LOGIN').then(() => {
          if (this.isLog === false) {
            this.$router.push({name: 'login'})
            return
          }

          this.$store.dispatch('endLoading')
        })
      } else {
        this.$store.dispatch('endLoading')
      }
    },
    data () {
      return {
        isActive: false,
        navOpen: ''
      }
    },
    computed: {
      ...mapState({
        info: state => state.base.info,
        isWorked: state => state.base.isWorked,
        nowPlace: state => state.base.nowPlace,
        isLog: state => state.base.isLog,
        message: state => state.base.message,
        openMsg: state => state.base.openMsg,
        isOpen: state => state.base.isOpen,
        isShadow: state => state.base.isShadow,
        loading: state => state.base.loading
      }),
      date () {
        let aWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        let now = new Date()
        return '  ' + aWeek[now.getDay()] + ' ' + (now.getMonth() + 1) + '月' + now.getDate() + '日'
      }
    },
    methods: {
      openNav () {
        this.$store.dispatch('openShadow')
        this.isActive = true
      },
      closeAll () {
        this.navOpen = ''
        this.isActive = false
        this.$store.dispatch('closeSth')
      },
      iKnow () {
        this.$store.dispatch('closeMsg')
      },
      logout () {
        this.$store.dispatch('FETCH_LOGOUT')
      },
      clickNav (click) {
        this.navOpen = this.navOpen === click ? '' : click
      }
    }
  }

</script>

<style scoped>
  .home {
    /*position: relative;*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    background-color: #f9f9f9;
    /*overflow-y: visible;*/
  }

  nav {
    position: fixed;
    left: -250px;
    width: 250px;
    height: 100%;
    text-align: left;
    background-color: #2e353e;
    transition: all .3s linear;
    overflow-y: scroll;
    z-index: 3;
  }

  div.home.active nav {
    /*  支持ios9.3及以上  */
    transform: translateX(250px);
    box-shadow: 0 0 10px rgba(10, 10, 10, 0.7);
  }

  nav h1 {
    font-size: 1.5rem;
  }

  nav h1 span {
    font-size: 1rem;
  }

  .info p {
    margin-top: .8em;
  }

  .info {
    background-color: #e6e6e6;
    padding: 1.5rem 1rem;
  }

  nav ul a {
    display: block;
    width: 100%;
    padding: .8rem 1.5rem;
    color: #a7b1c2;
  }

  nav ul li {
    width: 100%;
  }

  nav > ul > li:first-of-type {
    background-color: #00b870;
  }

  nav > ul > li:last-of-type {
    margin-bottom: 1rem;
  }

  nav > ul > li:first-of-type a {
    color: #fff;
  }

  .drop-flag {
    float: right;
    margin-top: .4rem;
    border-width: .35rem;
    border-style: solid dashed dashed dashed;
    border-color: #a7b1c2 transparent transparent transparent;
  }

  nav > ul > li ul {
    max-height: 0;
    transition: all .6s linear;
    overflow: hidden;
  }

  .open ul {
    max-height: 20rem;
  }

  .open .drop-flag {
    margin-top: 0;
    border-style: dashed dashed solid dashed;
    border-color: transparent transparent #a7b1c2 transparent;
  }

  nav ul ul a {
    padding-left: 2.5rem;
  }

  .main {
    min-height: 100vh;
    text-align: left;
    /*overflow-y: auto;*/
    transition: all .3s linear;
    overflow-y: visible;
  }

  div.home.active .main {
    transform: translateX(250px)
  }

  .main header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3rem;
    padding: 1rem 1.5rem;
    color: #fff;
    background-color: #0079b7;
    overflow-y: scroll;
    z-index: 1;
  }

  .menu-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    vertical-align: middle;
  }

  .menu-btn span {
    position: relative;
    top: 0.5rem;
    display: block;
    width: 1.5rem;
    height: 0;
    margin-right: .3rem;
    border: 2px solid #fff;
    border-radius: 10px;
  }

  .menu-btn span:before {
    position: absolute;
    top: -9px;
    left: -2px;
    width: 1.25rem;
    border: 2px solid #fff;
    border-radius: 10px;
    content: '';
  }

  .menu-btn span:after {
    position: absolute;
    top: 5px;
    left: -2px;
    width: 1.25rem;
    border: 2px solid #fff;
    border-radius: 10px;
    content: '';
  }

  .main header p {
    display: inline-block;
  }

  .child-view {
    padding-top: 3.5rem;
    -webkit-overflow-scrolling: touch;
  }

  .detail__footer a {
    display: block;
    padding: .5rem 0;
    color: #0079b7;
  }

  @media (min-width: 1024px) {
    nav {
      left: 0;
    }

    .main {
      margin-left: 250px;
    }

    .main .menu-btn {
      display: none;
    }
  }

</style>
