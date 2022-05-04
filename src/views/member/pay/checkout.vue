<template>
  <div class="pay-checkout-page">
    <div class="container">
      <PkkBread>
        <PkkBreadItem to="/">首页</PkkBreadItem>
        <PkkBreadItem to="/cart">购物车</PkkBreadItem>
        <PkkBreadItem>结算页面</PkkBreadItem>
      </PkkBread>
      <div class="wrapper">
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in $store.getters['cart/selectedList']" :key="i">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="item.pro_main_images.images[0]" alt="" />
                    <div class="right">
                      <p>{{ item.pro_name }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ item.pro_price }}</td>
                <td>{{ item.count }}</td>
                <td>&yen;{{ item.pro_price * item.count }}</td>
                <td>&yen;{{ item.pro_price * item.count }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{$store.getters['cart/selectedTotal']}}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{$store.getters['cart/selectedAmount']}}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">¥{{$store.getters['cart/selectedAmount']}}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <button @click="submitOrder()" class="btn-submit">提交订单</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import {createOrder} from '@/api/order'
import {ref} from "vue"
export default {
  name: "PayCheckoutPage",
  setup() {
    const store = useStore();
    const router = useRouter();
    const selectedList = store.getters['cart/selectedList'];
    const selectedTotal = store.getters['cart/selectedTotal'];
    const selectedAmount = store.getters['cart/selectedAmount'];
    let u_id = store.state.user.user.u_id;
    const submitOrder = ()=>{
      createOrder(u_id, selectedList,selectedTotal,selectedAmount).then(res=>{
        console.log("CheckoutPage-submitOrder-res",res.result.order_id);
        router.push({path:'/member/pay',query:{order_id:res.result.order_id}})
      })
    }
    return {submitOrder };
  },
};
</script>
<style scoped lang="less">
.pay-checkout-page {
  .wrapper {
    background: #fff;
    padding: 0 20px;
    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }
    .box-body {
      padding: 20px 0;
    }
  }
}
.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  .info {
    display: flex;
    text-align: left;
    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }
    .right {
      line-height: 24px;
      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }
  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }
    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;
      &:first-child {
        border-left: 1px solid #f5f5f5;
      }
      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}
.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;
    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }
    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;
      &.price {
        font-size: 20px;
        color: @priceColor;
      }
    }
  }
}
.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
  .btn-submit {
    background: @pkkColor;
    padding: 15px 30px;
    border-radius: 10px;
  }
}
</style>
