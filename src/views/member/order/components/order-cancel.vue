<template>
  <PkkDialog title="取消订单" :visible="visibleDialog" v-model="visibleDialog">
    <!-- 组件内容 -->
    <div class="cancel-info">
      <p>是否继续取消订单？</p>
      <p class="tip">请选择取消订单的原因（必选）：</p>
      <div class="btn">
        <a
          @click="curText = item"
          v-for="item in cancelReason"
          :key="item"
          href="javascript:;"
          :class="{ active: curText === item }"
        >
          {{ item }}
        </a>
      </div>
    </div>
    <!-- 按钮操作 -->
    <template #footer>
      <PkkButton
        type="gray"
        @click="visibleDialog = false"
        style="margin-right: 20px"
        >取消</PkkButton
      >
      <PkkButton type="primary" @click="submit">确认</PkkButton>
    </template>
  </PkkDialog>
</template>
<script>
import { ref } from "vue";
import { cancelReason } from "@/api/constants";
import Message from "@/components/library/Message";
import { changeOrderState } from "@/api/order";
export default {
  name: "OrderCancel",
  setup() {
    const visibleDialog = ref(false);
    // 打开对话框，提供给其他组件调用
    const order = ref(null);
    const open = (item) => {
      visibleDialog.value = true;
      // 记录订单ID
      order.value = item;
      // 清除之前选中原因
      curText.value = "";
    };
    // 选中的取消原因
    const curText = ref("");
    // 确认函数
    const submit = () => {
      // 1. 根据订单ID和取消原因发请求
      if (!curText.value) return Message({ text: "请选择取消订单的原因" });
      //修改订单状态为待评价
      order.value.or_state = 4;
      changeOrderState(order.value)
        .then(() => {
          // 取消订单成功
          Message({ text: "取消订单成功", type: "success" });
          // 更新订单状态
          order.value.or_state = 4;
          // 关闭对话框
          visibleDialog.value = false;
        })
        .catch((err) => {
          console.log("PayIndex-payOrder修改状态失败");
        });
    };

    return { visibleDialog, submit, cancelReason, curText, open };
  },
};
</script>
<style scoped lang="less">
.pkk-dialog ::v-deep .wrapper {
  width: 620px;
}
.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;
    &.tip {
      color: #999;
    }
  }
  .btn {
    padding-top: 21px;
    display: flex;
    flex-wrap: wrap;
    a {
      width: 256px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;
      &:nth-child(2n) {
        margin-right: 0;
      }
      &:hover,
      &.active {
        background-color: #e3f9f4;
        border-color: @pkkColor;
      }
    }
  }
}
</style>
