<template>
  <div class="goods-detail">
    <!-- 属性 -->
    <ul class="attrs">
      <li v-for="item in detail.properties" :key="item.value">
        <span class="dt">{{ item.name }}</span>
        <span class="dd">{{ item.val }}</span>
      </li>
    </ul>
    <!-- 图片 -->
    <img
      v-for="item in detail.pictures"
      :key="item"
      :src="item"
      alt=""
    />
  </div>
</template>

<script>
import {useStore} from 'vuex'
export default {
  name: "GoodsDetail",
  setup() {
    const store = useStore()
    const detail = store.state.goods.good.pro_detail
    console.log("GoodsDetail-detail",detail);
    return { detail};
  },
};
</script>

<style scoped lang="less">
.goods-detail {
  padding: 40px;
  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;
      .dt {
        width: 100px;
        color: #999;
      }
      .dd {
        flex: 1;
        color: #666;
      }
    }
  }
  > img {
    width: 100%;
  }
}
</style>
