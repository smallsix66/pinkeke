<template>
  <div class="pkk-pay-page">
    <div class="container">
      <PkkBread>
        <PkkBreadItem to="/">首页</PkkBreadItem>
        <PkkBreadItem to="/cart">购物车</PkkBreadItem>
        <PkkBreadItem>支付订单</PkkBreadItem>
      </PkkBread>
      <!-- 付款信息 -->
      <div class="pay-info" v-if="order">
        <span class="icon iconfont icon-check-item-filling"></span>
        <div class="tip">
          <p>订单提交成功！请尽快完成支付。</p>
          <p v-if="order.or_countdown > -1">
            支付还剩 <span>{{ timeText }}</span
            >, 超时后将取消订单
          </p>
          <p v-else>订单已经超时</p>
        </div>
        <div class="amount">
          <span>应付总额：</span>
          <span>¥{{ order.or_total_money }}</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type">
        <p class="head">选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a @click="payOrder()" class="btn wx" href="javascript:;"></a>
          <a @click="payOrder()" class="btn alipay" href="javascript:;"></a>
        </div>
      </div>
    </div>
    <PkkDialog title="正在支付..." v-model:visible="visibleDialog">
      <div class="pay-wait">
        <img src="@/assets/images/reward.png" alt="" />
        <div v-if="order">
          <p>如果支付成功：</p>
          <RouterLink :to="`/member/order/${order.id}`"
            >查看订单详情></RouterLink
          >
          <p>如果支付失败：</p>
          <RouterLink to="/">查看相关疑问></RouterLink>
        </div>
      </div>
    </PkkDialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { findOrder, changeOrderState } from "@/api/order";
import { useRoute,useRouter } from "vue-router";
import { usePayTime } from "@/hooks";
import PkkDialog from "@/components/library/pkk-dialog.vue";
export default {
  name: "PayPage",
  components: {
    PkkDialog,
  },
  setup() {
    // 订单
    const order = ref(null);
    // 路由信息
    const route = useRoute();
    const router = useRouter();
    // 查询订单
    console.log("PayPage-route.query.order_id", route.query.order_id);
    findOrder(route.query.order_id).then((data) => {
      // 设置订单
      console.log("PayPage-findOrder-data.result", data.result);
      order.value = data.result;
      // 后端提供 countdown 倒计时秒数
      if (data.result.or_countdown > -1) {
        start(data.result.or_countdown);
      }
    });

    const { start, timeText } = usePayTime();
    // 支付提示
    const visibleDialog = ref(false);
    let timer = null;

    const payOrder = ()=>{
      visibleDialog.value = true;
      clearInterval(timer)
      timer = setInterval(()=>{
        console.log("支付成功");
        visibleDialog.value = false;
        //修改订单状态为待评价
        order.value.or_state = 2;
        changeOrderState(order.value).then(()=>{
          //跳转到订单详情页
          router.push('/member/order')
        }).catch(err=>{
          console.log("PayIndex-payOrder修改状态失败");
        })
        clearInterval(timer)
      },3000)
    }
    return { order, timeText, visibleDialog, payOrder };
  },
};
</script>

<style lang="less" scoped>
.pay-info {
  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;
  .icon {
    font-size: 80px;
    color: #1dc779;
  }
  .tip {
    padding-left: 10px;
    flex: 1;
    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }
      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }
  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }
      &:last-child {
        color: @priceColor;
        font-size: 20px;
      }
    }
  }
}
.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;
  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;
    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }
  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;
    &.active,
    &:hover {
      border-color: @pkkColor;
    }
    &.alipay {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png)
        no-repeat center / contain;
    }
    &.wx {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg)
        no-repeat center / contain;
    }
  }
}
.pay-wait {
  display: flex;
  justify-content: space-around;
  img{
    width: 200px;
    height: 200px;
  }
  p {
    margin-top: 30px;
    font-size: 14px;
  }
  a {
    color: @pkkColor;
  }
}
</style>
