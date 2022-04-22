<template>
  <div class="app-header-cart">
    <RouterLink to="/cart" class="curr">
      <i class="iconfont icon-cart"></i>
      <em v-if="$store.getters['cart/validTotal'] && $route.path !== '/cart'">{{ $store.getters["cart/validTotal"] }}</em>
    </RouterLink>
    <!-- 购物车无商品不显示弹出层,并且不是在购物车页面 -->
    <div
      class="layer"
      v-if="$store.getters['cart/validTotal'] && $route.path !== '/cart'"
    >
      <div class="list">
        <div
          class="item"
          v-for="(item, i) in $store.getters['cart/validList']"
          :key="i"
        >
          <RouterLink :to="`/product/${item.pro_id}`">
            <img :src="item.pro_main_images.images[0]" alt="" />
            <div class="center">
              <p class="name ellipsis-2">
                {{ item.pro_name }}
              </p>
            </div>
            <div class="right">
              <p class="price">&yen;{{ item.pro_price }}</p>
              <p class="count">x{{ item.count }}</p>
            </div>
          </RouterLink>
          <i @click="deleteCart(item.pro_id)" class="iconfont icon-close"></i>
        </div>
      </div>
      <div class="foot">
        <div class="total">
          <p>共 {{ $store.getters["cart/validTotal"] }} 件商品</p>
          <p>&yen;{{ $store.getters["cart/validAmount"] }}</p>
        </div>
        <button class="btn-Cart" @click="$router.push('/cart')">去购物车结算</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import Message from "@/components/library/Message"
export default {
  name: "AppHeaderCart",
  setup() {
    const store = useStore();
    //组件初始化的时候，获取并更新购物车内最新的商品信息，库存、价格等
    store.dispatch("cart/findCartList");

    //购物车的删除操作
    const deleteCart = (pro_id) => {
      store.dispatch("cart/deleteCart",pro_id).then(res=>{
         Message({ type: 'success', text: '删除成功' })
      }).catch(e=>{
        Message({ type: 'error', text: '删除失败' })
      })
    };
    return { deleteCart };
  },
};
</script>

<style lang="less" scoped>
.app-header-cart {
  position: relative;
  width: 50px;
  .curr {
    height: 32px;
    line-height: 32px;
    text-align: center;
    position: relative;
    display: block;
    .icon-cart {
      font-size: 22px;
    }
    em {
      font-style: normal;
      position: absolute;
      right: 0;
      top: 0;
      padding: 3px 6px;
      line-height: 1;
      background: red;
      color: #fff;
      font-size: 12px;
      border-radius: 50%;
      font-family: Arial;
    }
  }
  &:hover {
    .layer {
      opacity: 1;
      transform: none;
    }
  }
}
.layer {
  opacity: 0;
  transition: all 0.4s 0.2s;
  transform: translateY(-200px) scale(1, 0);
  width: 400px;
  height: 400px;
  position: absolute;
  right: 0;
  top: 50px;
  z-index: 3;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding-top: 10px;
  &::before {
    content: "";
    position: absolute;
    right: 14px;
    top: -10px;
    width: 20px;
    height: 20px;
    background: #fff;
    transform: scale(0.6, 1) rotate(45deg);
    box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);
  }
  .foot {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 70px;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background: #f8f8f8;
    align-items: center;
    .total {
      padding-left: 10px;
      color: #999;
      p {
        &:last-child {
          font-size: 18px;
          color: @priceColor;
        }
      }
    }
    .btn-Cart{
      border: none;
      background: none;
      &:hover{
        cursor: pointer;
      }
    }
  }
  .list {
    height: 310px;
    overflow: auto; //显示滚动条
    padding: 0 10px;
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    &::-webkit-scrollbar-track {
      background: #f8f8f8;
      border-radius: 2px;
    }
    &::-webkit-scrollbar-thumb {
      background: #eee;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }
    .item {
      border-bottom: 1px solid #f5f5f5;
      padding: 10px 0;
      position: relative;
      i {
        position: absolute;
        bottom: 38px;
        right: 0;
        opacity: 0;
        color: #666;
        transition: all 0.5s;
      }
      &:hover {
        i {
          opacity: 1;
          cursor: pointer;
        }
      }
      a {
        display: flex;
        align-items: center;
        img {
          height: 80px;
          width: 80px;
        }
        .center {
          padding: 0 10px;
          width: 200px;
          .name {
            font-size: 16px;
          }
          .attr {
            color: #999;
            padding-top: 5px;
          }
        }
        .right {
          width: 100px;
          padding-right: 20px;
          text-align: center;
          .price {
            font-size: 16px;
            color: @priceColor;
          }
          .count {
            color: #999;
            margin-top: 5px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
