<template>
  <div class="admin-order">
    <div class="container">
      <div class="order-item">
        <div class="order-complated">
          <i class="iconfont icon-check-item-filling"></i>
          <p>已完成订单</p>
          <p>3</p>
        </div>
        <div class="order-uncomplated">
          <i class="iconfont icon-clock-filling"></i>
          <p>未完成订单</p>
          <p>12</p>
        </div>
        <div class="order-unchecked">
          <i class="iconfont icon-clock-filling"></i>
          <p>未审核订单</p>
          <p>3</p>
        </div>
      </div>
      <div class="order-search">
        <span>订单查询 ：</span>
        <input type="text" placeholder="请输入名称">
        <select name="order_type" id="">
          <option value="类型">类型</option>
        </select>
        <select name="order_date" id="">
          <option value="日期">日期</option>
        </select>
      </div>
      <!-- 表格 -->
      <table class="order-table">
        <th>ID</th>
        <th>下单时间</th>
        <th>用户</th>
        <th>总金额</th>
        <th>订单状态</th>
        <th>操作</th>
        <th>订单详情</th>

        <tr>
          <td>20220422001</td>
          <td>2022-04-22 21:21:31</td>
          <td>31</td>
          <td>￥799</td>
          <td>待付款</td>
          <td>未完成</td>
          <td><a href="javascript:;">查看订单详情</a></td>
        </tr>
        <tr>
          <td>20220422021</td>
          <td>2022-04-22 21:21:11</td>
          <td>22</td>
          <td>￥33</td>
          <td>已付款</td>
          <td>已完成</td>
          <td><a href="javascript:;">查看订单详情</a></td>
        </tr>
        <tr>
          <td>20220422076</td>
          <td>2022-04-22 21:22:21</td>
          <td>21</td>
          <td>￥223</td>
          <td>待付款</td>
          <td>未完成</td>
          <td><a href="javascript:;">查看订单详情</a></td>
        </tr>
        <tr>
          <td>20220423012</td>
          <td>2022-04-23 22:20:13</td>
          <td>31</td>
          <td>￥239</td>
          <td>已付款</td>
          <td>已完成</td>
          <td><a href="javascript:;">查看订单详情</a></td>
        </tr>
        <tr>
          <td>20220423013</td>
          <td>2022-04-23 22:12:11</td>
          <td>11</td>
          <td>￥299</td>
          <td>已付款</td>
          <td>已完成</td>
          <td><a href="javascript:;">查看订单详情</a></td>
        </tr>
        <tr>
          <td>20220423066</td>
          <td>2022-04-23 22:12:56</td>
          <td>31</td>
          <td>￥199</td>
          <td>待付款</td>
          <td>未完成</td>
          <td><a href="javascript:;">查看订单详情</a></td>
        </tr>
        <tr>
          <td>20220423021</td>
          <td>2022-04-23 22:20:15</td>
          <td>11</td>
          <td>￥79</td>
          <td>待付款</td>
          <td>未完成</td>
          <td><a href="javascript:;">查看订单详情</a></td>
        </tr>
        <tr>
          <td>20220423121</td>
          <td>2022-04-23 22:23:31</td>
          <td>13</td>
          <td>￥699</td>
          <td>待付款</td>
          <td>未完成</td>
          <td><a href="javascript:;">查看订单详情</a></td>
        </tr>
      </table>
          <PkkPagination
      :total="18"
      :currentPage="1"
    />
    </div>
  </div>
</template>

<script>
export default {
  name:'AdminOrder'
}
</script>

<style lang="less" scoped>
.admin-order{
  background: @adminColor;
  height: 720px;
  .container{
    .order-item{
      display: flex;
      .order-complated,.order-uncomplated,.order-unchecked{
        background: @adminColor2;
        text-align: center;
        border-radius: 5px;
        padding: 10px 20px;
        margin:10px 20px;
        i,p{
          font-size: 20px;
          color: #fff;
        }
      }
    }
    .order-search{
      margin-top: 20px;
      margin-left: 20px;
      span{
        color: #fff;
      }
      select,input{
        color: #fff;
        margin-left: 20px;
        border-radius: 6px;
        padding: 5px 10px;
        background: @adminColor;
        border: 1px solid @adminHelpColor;
      }
    }
    .order-table {
      border-collapse: collapse;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      letter-spacing: 1px;
      border: 1px solid #f5f5f566;
      overflow: auto;
      background: @adminColor2;
      margin: 0 20px;
      margin-top: 20px;
      table,
      th,
      tr,
      td {
        color: #fff;
        height: 50px;
        width: 600px;
        text-align: center;
        border-bottom: 1px solid #f5f5f566;
        word-break: keep-all;
        word-wrap: break-word;
      }
      tr {
        height: 50px;
        td {
          padding: 6px 6px 6px 12px;
          img {
            width: 50px;
          }
          a {
            color: rgb(7, 234, 255);
          }
        }
      }
    }
  }
}
</style>
