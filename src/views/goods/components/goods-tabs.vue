<template>
  <div class="goods-tabs">
    <nav>
      <a :class="{active:activeName==='detail'}" href="javascript:;" @click="clickTab('detail')">商品详情</a>
      <a :class="{active:activeName==='comment'}" href="javascript:;" @click="clickTab('comment')">商品评价</a>
    </nav>
     <!-- 这个位置显示对应的组件 GoodsDetail 或者 GoodsComment -->
    <component :is="'goods-'+activeName" />
  </div>
</template>

<script>
import {ref} from 'vue'
import GoodsDetail from './goods-detail'
import GoodsComment from './goods-comment'
export default {
  name:"GoodsTabs",
  components:{GoodsDetail, GoodsComment},
  setup(){
    const activeName = ref("detail")
    const clickTab = (tabName)=>{
      activeName.value = tabName
    }
    return {activeName, clickTab}
  }
}
</script>

<style scoped lang="less">
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @pkkColor;
        }
      }
    }
  }
}
</style>
