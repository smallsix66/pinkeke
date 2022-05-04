<template>
  <div class="cart-page">
    <div class="container">
      <PkkBread>
        <PkkBreadItem to="/">首页</PkkBreadItem>
        <PkkBreadItem>购物车</PkkBreadItem>
      </PkkBread>

      <div v-if="$store.getters['cart/validList'].length === 0">
        <CartNone />
      </div>
      <div v-else>
        <div class="cart">
          <table>
            <thead>
              <tr>
                <th width="120">
                  <PkkCheckbox
                    @change="checkAll"
                    :modelValue="$store.getters['cart/isCheckAll']"
                    >全选</PkkCheckbox
                  >
                </th>
                <th width="400">商品信息</th>
                <th width="220">单价</th>
                <th width="180">数量</th>
                <th width="180">小计</th>
                <th width="140">操作</th>
              </tr>
            </thead>
            <!-- 有效商品 -->
            <tbody>
              <tr
                v-for="(item, i) in $store.getters['cart/validList']"
                :key="i"
              >
                <td>
                  <PkkCheckbox
                    @change="($event) => checkOne(item, $event)"
                    :modelValue="item.selected"
                  />
                </td>
                <td>
                  <div class="goods">
                    <RouterLink :to="`/product/${item.pro_id}`"
                      ><img :src="item.pro_main_images.images[0]" alt=""
                    /></RouterLink>
                    <div>
                      <p class="name ellipsis">{{ item.pro_name }}</p>
                    </div>
                  </div>
                </td>
                <td class="tc">
                  <p>&yen;{{ item.pro_price }}</p>
                </td>
                <td class="tc">
                  <!-- 数量选择器 -->
                  <PkkNumbox
                    @change="($event) => changeCount(item, $event)"
                    :modelValue="item.count"
                    :max="item.store"
                  />
                  <!-- <XtxNumbox :modelValue="item.count"/> -->
                </td>
                <td class="tc">
                  <p class="f16 red">
                    &yen;{{ (item.pro_price * 100 * item.count) / 100 }}
                  </p>
                </td>
                <td class="tc">
                  <p><a href="javascript:;">移入收藏夹</a></p>
                  <p>
                    <button @click="deleteCart(item.pro_id)">删除</button>
                  </p>
                  <p><a href="javascript:;">找相似</a></p>
                </td>
              </tr>
            </tbody>
            <!-- 无效商品 -->
            <tbody>
              <tr>
                <td colspan="6"><h3 class="tit">失效商品</h3></td>
              </tr>
              <tr
                v-for="(item, i) in $store.getters['cart/invalidList']"
                :key="i"
              >
                <td><PkkCheckbox style="color: #eee" /></td>
                <td>
                  <div class="goods">
                    <RouterLink :to="`/product/${item.pro_id}`"
                      ><img :src="item.pro_main_images.images[0]" alt=""
                    /></RouterLink>
                    <div>
                      <p class="name ellipsis">{{ item.pro_name }}</p>
                    </div>
                  </div>
                </td>
                <td class="tc">
                  <p>&yen;{{ item.pro_price }}</p>
                </td>
                <td class="tc">1</td>
                <!-- <td class="tc"><p>&yen;200.00</p></td> -->
                <td class="tc">
                  <p>
                    <a
                      @click="deleteCart(item.pro_id)"
                      class="green"
                      href="javascript:;"
                      >删除</a
                    >
                  </p>
                  <p><a href="javascript:;">找相似</a></p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 操作栏 -->
        <div class="action">
          <div class="batch">
            <PkkCheckbox :modelValue="$store.getters['cart/isCheckAll']"
              >全选</PkkCheckbox
            >
            <a @click="batchDeleteCart(false)" href="javascript:;">删除商品</a>
            <a href="javascript:;">移入收藏夹</a>
            <a @click="batchDeleteCart(true)" href="javascript:;"
              >清空失效商品</a
            >
          </div>
          <div class="total">
            共 {{ $store.getters["cart/validTotal"] }} 件商品，已选择
            {{ $store.getters["cart/selectedTotal"] }} 件，商品合计：
            <span class="red"
              >¥{{ $store.getters["cart/selectedAmount"] }}</span
            >
            <!-- <RouterLink to="/member/checkout" class="btn-buy">下单结算</RouterLink> -->
            <button @click="goCheckout()" class="btn-buy">下单结算</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import CartNone from "./components/cart-none.vue";
import Confirm from "@/components/library/Confirm";
import Message from "@/components/library/Message";
export default {
  name: "CartPage",
  components: { CartNone },
  setup() {
    const store = useStore();
    const router = useRouter();
    //单选
    const checkOne = (good, selected) => {
      // console.log("CartPage-checkOne-selected",selected);
      good.selected = selected;
      store.dispatch("cart/updateCart", good);
    };

    //全选
    const checkAll = (selected) => {
      store.dispatch("cart/checkAllCart", selected);
    };

    //删除
    const deleteCart = (pro_id) => {
      Confirm({ text: "您确定从购物车删除该商品吗？" })
        .then(() => {
          console.log("点击确认");
          store.dispatch("cart/deleteCart", pro_id);
        })
        .catch((e) => {
          console.log("点击取消");
        });
    };

    //批量删除
    const batchDeleteCart = (isClear) => {
      Confirm({
        text: `您确定从购物车删除${isClear ? "失效" : "选中"}的商品嘛？`,
      })
        .then(() => {
          store.dispatch("cart/batchDeleteCart", isClear);
        })
        .catch((e) => {});
    };

    //修改数量
    const changeCount = (good, count) => {
      good.count = count;
      // console.log("CartPage-点击了数量选择器",good);
      store.dispatch("cart/updateCart", good);
    };

    //跳转到结算页面
    const goCheckout = () => {
      // 1. 判断是否选择有效商品
      // 2. 判断是否已经登录，未登录 弹窗提示
      // 3. 进行跳转 （需要做访问权限控制）
      if (store.getters["cart/selectedTotal"] === 0)
        return Message({ text: "至少选中一件商品才能结算" });
      if (!store.state.user.user.u_id) {
        Confirm({ text: "下单结算需登录，您是否先去登录？" })
          .then(() => {
            //点击确认
            router.push("/login");
          })
          .catch((e) => {});
      } else {
        router.push("/member/checkout");
      }
    };
    return {
      checkOne,
      checkAll,
      deleteCart,
      batchDeleteCart,
      changeCount,
      goCheckout,
    };
  },
};
</script>

<style lang="less" scoped>
button {
  background: none;
}
.btn-buy {
  background: @pkkColor;
  padding: 10px 20px;
  // color: #fff;
  border-radius: 5px;
}
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @pkkColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
