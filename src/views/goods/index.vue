<template>
  <div class="goods-page" v-if="good">
    <!-- 面包屑 -->
    <PkkBread>
      <PkkBreadItem to="/">首页</PkkBreadItem>
      <PkkBreadItem :to="`/category/${categoryId}`">{{
        good.pro_detail.properties[0].val
      }}</PkkBreadItem>
      <PkkBreadItem>{{ good.pro_name }}</PkkBreadItem>
    </PkkBread>
    <!-- 商品信息 -->
    <div class="goods-info">
      <div class="media">
        <GoodsImage
          :mainImages="good.pro_main_images.images"
        />
      </div>
      <div class="spec">
        <GoodsName :good="good" />
        <button @click="addCart()" class="good-name-btn">加入购物车</button>
        <button class="good-name-btn">立即购买</button>
      </div>
    </div>
    <!-- 商品详情 -->
    <div class="goods-footer">
      <GoodsTabs />
    </div>
  </div>
</template>

<script>
import GoodsImage from "./components/goods-image.vue";
import GoodsName from "./components/goods-name.vue";
import GoodsTabs from "./components/goods-tabs.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { watch, ref, nextTick, computed } from "vue";
import Message from "@/components/library/Message"
export default {
  name: "GoodsPage",
  components: {
    GoodsImage,
    GoodsName,
    GoodsTabs,
  },
  setup() {
    // 出现路由地址商品ID发生变化，但是不会重新初始化组件
    const good = ref(null);
    const route = useRoute();
    const store = useStore();
    store.dispatch("goods/getList", route.params.id);
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && `/product/${newVal}` === route.path) {
          //获取商品详情vuex
          store.dispatch("goods/getList", route.params.id);
          // 让商品数据为null让后使用v-if的组件可以重新销毁和创建
          good.value = null;
          nextTick(() => {
            good.value = store.state.goods.good;
            console.log("商品详情————", good.value);
          });
        }
      },
      { immediate: true }
    );

    //加入购物车函数
    const addCart = () => {
      //是否登录在vuex中判断
      let {pro_id,pro_name,pro_main_images,pro_price,pro_stock} = good.value;

      console.log("GoodsPage-good",good.value);
      store.dispatch("cart/insertCart", {
        pro_id,
        pro_name,
        pro_main_images,
        pro_price,
        count: 1,
        selected: true,
        isEffective: true,
        pro_stock
      }).then(msg=>{
        Message({
          type: "success",
          text: msg,
        });
      }).catch(err=>{
         Message({
          type: "error",
          text: "加入购物车失败",
        });
      })
    };

    return { good, addCart };
  },
};
</script>

<style scoped lang="less">
.goods-info {
  height: 500px;
  min-height: 500px;
  display: flex;
  background: #fff;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
    .good-name-btn {
      display: block;
      padding: 10px 20px;
      margin-top: 30px;
      border: none;
      border-radius: 5px;
      color: #fff;
      background-color: @pkkColorOp;
      &:hover {
        color: #fff;
        background-color: @pkkColor;
      }
    }
  }
}
.goods-footer {
}
</style>
