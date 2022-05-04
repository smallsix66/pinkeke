<template>
  <div class="order-item">
    <div class="head">
      <span>下单时间：{{ order.or_create_time }}</span>
      <span>订单编号：{{ order.or_id }}</span>
      <!-- 未付款，倒计时时间还有 -->
      <span class="down-time" v-if="order.or_state === 1">
        <i class="iconfont icon-down-time"></i>
        <!-- <b>付款截止：{{timeText}}</b> -->
      </span>
      <!-- 已完成 已取消 -->
      <a
        @click="$emit('on-delete-order')"
        v-if="[4, 5].includes(order.or_state)"
        href="javascript:;"
        class="del"
        >删除</a
      >
    </div>
    <div class="body">
      <div class="column goods">
        <ul>
          <li v-for="(good, i) in order.goods" :key="i">
            <a class="image" href="javascript:;">
              <img :src="good[0].pro_main_images" alt="" />
            </a>
            <div class="info">
              <p class="name ellipsis-2">{{ good[0].pro_name }}</p>
            </div>
            <div class="price">¥{{ good[0].pro_price }}</div>
            <div class="count">x{{ order.or_num }}</div>
          </li>
        </ul>
      </div>
      <div class="column state">
        <p>{{ orderStatus[order.or_state].label }}</p>
        <!-- 待评价：评价商品 -->
        <!-- 已完成：查看评价 -->
        <p v-if="order.or_state === 3">
          <a href="javascript:;" class="green">评价商品</a>
        </p>
        <p v-if="order.or_state === 4">
          <a href="javascript:;" class="green">查看评价</a>
        </p>
      </div>
      <div class="column amount">
        <p class="red">¥{{ order.or_total_money }}</p>
        <p>在线支付</p>
      </div>
      <div class="column action">
        <!-- 1待支付：立即付款，查看详情，取消订单 -->
        <!-- 2待收货：确认收货，查看详情，再次购买 -->
        <!-- 3待评价：查看详情，再次购买，申请售后 -->
        <!-- 4已完成：查看详情，再次购买，申请售后 -->
        <!-- 5已取消：查看详情 -->
        <PkkButton
          v-if="order.or_state === 1"
          type="primary"
          @click="payRightnow()"
          >立即付款</PkkButton
        >
        <PkkButton
           v-if="order.or_state===2"
          type="primary"
          @click="$emit('on-confirm-order')"
          >确认收货</PkkButton
        >
        <p>
          <a
            @click="$router.push(`/member/order/${order.or_id}`)"
            href="javascript:;"
            >查看详情</a
          >
        </p>
        <p @click="cancelClick()" v-if="order.or_state === 1">
          <a href="javascript:;">取消订单</a>
        </p>
        <p v-if="[2, 3, 4].includes(order.or_state)">
          <a href="javascript:;">再次购买</a>
        </p>
        <p v-if="[3, 4].includes(order.or_state)">
          <a href="javascript:;">申请售后</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { orderStatus } from "@/api/constants";
import { computed, ref } from "vue";
import { usePayTime } from "@/hooks";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "OrderItem",
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
  },
  // 组件本身触发的自定义事件可以在这里申明
  emits: ["on-cancel-order", "on-delete-order", 'on-confirm-order'],
  setup(props, { emit }) {
    const { start, timeText } = usePayTime();
    start(props.order.or_countdown);
    const router = useRouter();
    const route = useRoute();
    //立即付款
    const payRightnow = () => {
      router.push({
        path: "/member/pay",
        query: { order_id: props.order.or_id },
      });
    };

    //点击取消订单按钮
    const cancelClick = () => {
      emit("on-cancel-order");
      console.log("点击了取消订单按钮");
    };
    return { orderStatus, timeText, payRightnow, cancelClick };
  },
};
</script>

<style lang="less" scoped>
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;
    span {
      margin-right: 20px;
      &.down-time {
        margin-right: 0;
        float: right;
        i {
          vertical-align: middle;
          margin-right: 3px;
        }
        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }
    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }
  .body {
    display: flex;
    align-items: stretch;
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      > p {
        padding-top: 10px;
      }
      &:first-child {
        border-left: none;
      }
      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            &:last-child {
              border-bottom: none;
            }
            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }
            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;
              p {
                margin-bottom: 5px;
                &.name {
                  height: 38px;
                }
                &.attr {
                  color: #999;
                  font-size: 12px;
                  span {
                    margin-right: 5px;
                  }
                }
              }
            }
            .price {
              width: 100px;
            }
            .count {
              width: 80px;
            }
          }
        }
      }
      &.state {
        width: 120px;
        .green {
          color: @pkkColor;
        }
      }
      &.amount {
        width: 200px;
        .red {
          color: @priceColor;
        }
      }
      &.action {
        width: 140px;
        a {
          display: block;
          &:hover {
            color: @pkkColor;
          }
        }
      }
    }
  }
}
</style>
