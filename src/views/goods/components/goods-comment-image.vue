<template>
  <div class="goods-comment-iamge">
    <div class="small">
      <a
        v-for="(img, i) in comPictures"
        :key="i"
        href="javascript:;"
        :class="{ active: currImg === img }"
        @click="currImg = img"
      >
        <img :src="img" alt="" />
      </a>
    </div>
    <div class="layer" v-if="currImg">
      <img :src="currImg" alt="" />
      <i @click="currImg=null" class="iconfont icon-close"></i>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "GoodsCommentImage",
  props: {
    comPictures: {
      type: Array,
      default: () => [
        "./images/productImg/kaochong1.png",
        "./images/productImg/kaochong2.png",
      ],
    },
  },
  setup() {
    let currImg = ref("");
    return { currImg };
  },
};
</script>

<style scoped lang="less">
.goods-comment-iamge {
  .small{
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    a {
      width: 120px;
      height: 120px;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      &.active{
        border-color: @pkkColor;
      }
    }
  }
  .layer {
    position: relative;
    width: 480px;
    height: 480px;
    border: 1px solid #e4e4e4;
    background: #f8f8f8;
    margin-bottom: 20px;
    i {
      position: absolute;
      right: 0;
      top: 0;
      width: 30px;
      height: 30px;
      line-height: 30px;
      background-color: rgba(0,0,0,0.2);
      text-align: center;
      color: #fff;
    }
  }
}
</style>
