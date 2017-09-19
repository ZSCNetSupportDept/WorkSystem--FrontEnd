<template>
  <div class="overview">
    <div class="announcement detail">
      <div class="detail-title">
        <h2>公告</h2>
      </div><!-- / detail-title -->
      <div class="detail-content">
        <p>{{ announce }}</p>
      </div><!-- / detail-content -->
    </div><!-- / announcement -->

    <div class="overview-content detail">
      <div class="detail-title">
        <h2>今日概览</h2>
      </div><!-- / detail-title -->
      <div class="detail-content">
        <p>今日投诉工单数量为：{{ overview.complaints }}</p>
        <p>今日电信工单数量为：{{ overview.telecom }}</p>
        <p>今日联通工单数量为：{{ overview.unicom }}</p>
        <p>今日移动工单数量为：{{ overview.mobile }}</p>
      </div><!-- / detail-content -->
    </div><!-- / overview-content -->

    <div class="today-worker detail">
      <div class="detail-title">
        <h2>今日值班人员</h2>
      </div><!-- / detail-title -->
      <div class="detail-content">
        <ul>
          <li v-for="place in places" :class="{'open': selectPlace === place}">
            <a @click="selectPlace = selectPlace===place?'':place">{{ place }}<span>{{ selectPlace === place ? '-' : '+'}}</span></a>

            <div class="tb-workers">
              <div>
                <table>
                  <thead>
                  <tr>
                    <th>工号</th>
                    <th>姓名</th>
                    <th>手机</th>
                    <th>工作号</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="worker in todayWorkers" v-if="worker.area===place">
                    <td>{{ worker.work_number }}</td>
                    <td>{{ worker.name }}</td>
                    <td>{{ worker.person_phone }}</td>
                    <td>{{ worker.work_phone }}</td>
                  </tr>
                  </tbody>
                </table>
              </div><!-- / -->
            </div><!-- / tb-workers -->
          </li>
        </ul>
      </div><!-- / detail-content -->
    </div><!-- / today-worker -->
  </div><!-- / overview -->
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data () {
      return {
        places: ['香晖苑', '朝晖苑', '北门', '东门', '岐头', '香山别墅', '凤翔'],
        selectPlace: this.nowPlace
      }
    },
    computed: {
      ...mapState({
        announce: state => state.overview.announce,
        overview: state => state.overview.overview,
        todayWorkers: state => state.base.todayWorkers,
        nowPlace: state => state.base.nowPlace
      })
    }
  }
</script>

<style scoped>
  .overview {
    padding-bottom: .6rem;
  }

  .overview > div > h2 {
    padding: 1.3rem 1rem;
  }

  .announcement .detail-content {
    padding: 1rem .8rem;
    border-left: .2rem solid #ff3131;
  }

  .today-worker .detail-content {
    padding: 0;
  }

  .today-worker ul li {
    /*display: block;*/
    border-top: 1px solid #e6e6e6;
  }

  .today-worker ul li:first-of-type {
    border: none;
  }

  .today-worker ul li span {
    float: right;
  }

  .today-worker ul a {
    display: block;
    padding: 1rem 1rem;
    font-size: .9rem;
    color: #1779ba;
  }

  li.open a {
    border-left: .2rem solid #1468a0;
  }

  .tb-workers {
    width: 100%;
    max-height: 0;
    overflow-x: scroll;
    transition: max-height .5s linear;
  }

  li.open .tb-workers {
    max-height: 50rem;
  }

  .tb-workers div {
    /*overflow-x: scroll;*/
    margin-bottom: 1rem;
  }

  table {
    overflow-x: scroll;
    word-break: keep-all;
  }

  .tb-workers th {
    padding: 0.825rem;
    font-weight: bold;
    background-color: #f8f8f8;
    border: .15rem solid #fefefe;
  }

  .tb-workers td {
    padding: 0.825rem;
    border: .15rem solid #fefefe;
  }

  .tb-workers tr:nth-of-type(odd) {
    background-color: #fefefe;
  }

  .tb-workers tr:nth-of-type(even) {
    background-color: #f8f8f8;
  }

  .overview-content p {
    margin: .5rem auto;
  }

</style>
