<template>
  <div class="xtx-pay-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
        <XtxBreadItem>支付结果</XtxBreadItem>
      </XtxBread>
      <!-- 支付结果 -->
      <div class="pay-result">
        <span class="iconfont icon-queren2 green"></span>
        <!-- <span class="iconfont icon-shanchu red" ></span> -->
        <p class="tit">订单支付{{$route.query.payResult?'成功':'失败'}}</p>
        <p>支付方式：<span>微信支付</span></p>
        <p>支付金额：<span>¥{{order.or_total_money}}</span></p>
        <div class="btn">
          <button @click="$router.push('/member/order')" style="margin-right: 20px"
            >查看订单</button>
          <button @click="$router.push('/')">进入首页</button>
        </div>
        <!-- <p class="alert">
          <span class="iconfont icon-tip"></span>
          温馨提示：小兔鲜儿不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作，保护资产、谨慎操作。
        </p> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { findOrder } from '@/api/order'
import { useRoute } from 'vue-router'
export default {
  name: "PayResultPage",
  setup() {
    const order = ref(null);
    const route = useRoute();
    findOrder(route.query.order_id).then((data) => {
      // 设置订单
      // console.log("PayResultPage-findOrder-data.result", data.result);
      order.value = data.result;
    });
    return { order };
  },
};
</script>

<style lang="less" scoped>
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  > .iconfont {
    font-size: 100px;
  }
  .green {
    color: #1dc779;
  }
  .red {
    color: @priceColor;
  }
  .tit {
    font-size: 24px;
  }
  .tip {
    color: #999;
  }
  p {
    line-height: 40px;
    font-size: 16px;
  }
  .btn {
    margin-top: 50px;
  }
  .alert {
    font-size: 12px;
    color: #999;
    margin-top: 50px;
  }
}
</style>
