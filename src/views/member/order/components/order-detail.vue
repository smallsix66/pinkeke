<template>
  <div class="order-list">
    <OrderItem
      v-for="(order, i) in orderList"
      :key="i"
      :order="order"
      @on-cancel-order="onCancelOrder(order)"
      @on-delete-order="onDeleteOrder(order)"
      @on-confirm-order="onConfirmOrder(order)"
    />
    <!-- 对于像：对话框，消息提示，确认提示，通知组件 适合使用传送门 Teleport -->
    <Teleport to="#dailog">
      <OrderCancel ref="orderCancelCom" />
    </Teleport>
  </div>
</template>

<script>
import OrderItem from "./order-item.vue";
import OrderCancel from "./order-cancel.vue";
import { ref } from "vue";
import Confirm from "@/components/library/Confirm";
import { delteOrder, changeOrderState } from "@/api/order";
import Message from "@/components/library/Message";
export default {
  name: "MemberOrderDetail",
  components: {
    OrderItem,
    OrderCancel,
  },
  props: {
    orderList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    // 封装逻辑-取消订单
    const useCancelOrder = () => {
      const orderCancelCom = ref(null);
      const onCancelOrder = (order) => {
        // item 就是你要取消的订单
        // console.log("OrderDetail-orderCancelCom", orderCancelCom.value);
        orderCancelCom.value.open(order);
      };
      return { onCancelOrder, orderCancelCom };
    };

    // 删除订单
    const onDeleteOrder = (order) => {
      Confirm({ text: "您确认删除该条订单吗？" })
        .then(() => {
          delteOrder([order.or_id])
            .then(() => {
              Message({ text: "删除订单成功", type: "success" });
            })
            .catch((err) => {
              Message({ text: "删除订单失败", type: "error" });
            });
            //重新查询列表
          emit("findOrderList");
        })
        .catch((e) => {});
    };

    // 封装逻辑-确认收货
    const useConfirmOrder = () => {
      const onConfirmOrder = (item) => {
        // item 就是你要确认收货的订单
        Confirm({ text: "您确认收到货吗？" }).then(
          () => {
            // 确认收货后状态变成 待评价
            item.or_state = 3;
            changeOrderState(item).then(() => {
              Message({ text: "确认收货成功", type: "success" });
            });
          }
        );
      };
      return { onConfirmOrder };
    };
    return { ...useCancelOrder(), onDeleteOrder, ...useConfirmOrder() };
  },
};
</script>

<style lang="less" scoped>
.order-list {
  background: #fff;
  padding: 20px;
}
</style>
