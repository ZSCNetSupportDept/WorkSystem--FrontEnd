<!-- / 常用联系方式页面 -->

<template>
  <div class="contacts detail">
    <div class="detail-title">
      <h2>常用联系电话</h2>
    </div><!-- / detail-title -->
    <div class="detail-content">
      <div>
        <table>
          <thead>
          <tr>
            <th>联系人</th>
            <th>联系方式</th>
          </tr>
          </thead>

          <tbody>
          <tr>
            <td>信息中心</td>
            <td>88332760</td>
          </tr>
          <tr>
            <td>移动解绑</td>
            <td>18807601086 接通按1</td>
          </tr>
          <tr>
            <td>联通解绑</td>
            <td>23771601、23616997、87947452</td>
          </tr>
          <tr>
            <td>电信阿泉</td>
            <td>13318271848</td>
          </tr>
          <tr>
            <td>科长王广鹏</td>
            <td>18928187471</td>
          </tr>
          <tr>
            <td>周一麦晓达</td>
            <td>18928187466</td>
          </tr>
          <tr>
            <td>周二刘越</td>
            <td>18928187469</td>
          </tr>
          <tr>
            <td>周三许佳培</td>
            <td>18928187459</td>
          </tr>
          <tr>
            <td>周四朱宇超</td>
            <td>18928187463</td>
          </tr>
          <tr>
            <td>周五周文娣</td>
            <td>18928187460</td>
          </tr>
          <tr>
            <td>周六叶江南</td>
            <td>18928187450</td>
          </tr>
          <tr>
            <td>周日曾家兴</td>
            <td>18928187455</td>
          </tr>
          </tbody>
        </table>
      </div><!-- / -->
    </div><!-- / detail-content -->
  </div><!-- / contacts -->
</template>

<script>
  export default{}
</script>

<style scoped>
  .contacts .detail-content div {
    border: 1px solid #e6e6e6;
    border-top: none;
    width: 100%;
    overflow-x: scroll;
  }

  .contacts th {
    padding: 0.825rem;
    font-weight: bold;
    background-color: #f8f8f8;
    border: .15rem solid #fefefe;
  }

  .contacts td {
    padding: 0.825rem;
    border: .15rem solid #fefefe;
  }

  .contacts tr:nth-of-type(odd) {
    background-color: #fefefe;
  }

  .contacts tr:nth-of-type(even) {
    background-color: #f8f8f8;
  }
</style>
