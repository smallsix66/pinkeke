<template>
  <div class="pkk-carousel">
    <ul class="carousel-body">
      <li class="carousel-item">
        <RouterLink to="/">
          <img
            src="@/assets/images/banner/bg.png"
            alt=""
          />
        </RouterLink>
      </li>
    </ul>
    <a href="#" class="carousel-btn prev"
      ><i class="iconfont icon-arrow-left-filling"></i
    ></a>
    <a href="#" class="carousel-btn next"
      ><i class="iconfont icon-arrow-right-filling"></i
    ></a>
    <div class="carousel-indicator">
      <span v-for="i in 5" :key="i"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PkkCarousel",
};
</script>

<style scoped lang="less">
.pkk-carousel {
  width: 100%;
  height: 420px;
  min-width: 300px;
  min-height: 420px;
  position: relative;
  background: red;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      // opacity: 0;
      transition: opacity 0.5s linear;
      &.fade{
        opacity: 1;
        z-index: 1;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
    &-indicator{
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span{
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0,0,0,0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span{
          margin-left: 12px;
        }
        &.active{
          background: #fff;
        }
      }
    }
    &-btn{
      width: 44px;
      height: 44px;
      background: rgba(0,0,0,0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 210px;
      margin-top: -22px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      // opacity: 0;
      transition: all 0.5s;
      &.prev{
        left: 20px;
      }
      &.next{
        right: 20px;
      }
    }
    &:hover{
      .carousel-btn{
        opacity: 1;
      }
    }
  }
}
</style>
