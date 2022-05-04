<template>
  <div class="member-order-page">
    <PkkTabs v-model="activeName" @tabClick="clickTab">
      <PkkTabsPanel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
        <div v-if="loading" class="loading"></div>
        <div class="none" v-if="!loading && orderList.length === 0">
          暂无数据
        </div>
        <MemberOrderDetail :orderList="orderList" @findOrderList="findOrderListFn()"/>
      </PkkTabsPanel>
    </PkkTabs>
    <PkkPagination
      v-if="total > requestParams.pageSize"
      @current-change="changePager"
      :total="total"
      :currentPage="requestParams.page"
      :pageSize="requestParams.pageSize"
    />
  </div>
</template>
<script>
import { reactive, ref, watch } from "vue";
import { findOrderList } from "@/api/order";
import { orderStatus } from "@/api/constants";
import { useStore } from "vuex";
import MemberOrderDetail from "./components/order-detail.vue";
export default {
  name: "MemberOrder",
  components: {
    MemberOrderDetail,
  },
  setup() {
    const activeName = ref("all");
    const store = useStore();
    let u_id = store.state.user.user.u_id;
    const orderList = ref([]); // 订单列表
    const loading = ref(true); //加载状态
    const total = ref(0);
    // 查询订单参数
    const requestParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0,
    });

    const clickTab = ({ name, index }) => {
      requestParams.orderState = index;
      requestParams.page = 1;
    };

    // 使用侦听器，监听 requestParams 的改变
    const findOrderListFn = () => {
      loading.value = true;
      findOrderList(u_id, requestParams).then((data) => {
        orderList.value = data.list[0];
        loading.value = false;
        total.value = data.list[1][0].total;
        console.log("orderIndex-watch", data.list);
      });
    };
    watch(
      requestParams,
      () => {
        findOrderListFn()
      },
      { immediate: true }
    );

    // 改变分页函数
    const changePager = (np) => {
      // 改变页数
      requestParams.page = np;
    };

    return {
      activeName,
      clickTab,
      orderStatus,
      requestParams,
      orderList,
      loading,
      total,
      changePager,
    };
  },
};
</script>
<style scoped lang="less">
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.9) url(../../../assets/images/loading.gif)
    no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
