<template>
  <div class="search">
    <div class="container">
      <button>全站搜<i class="iconfont icon-arrow-down-filling"></i></button>
      <input type="text" placeholder="搜一搜" />
      <div class="layer" :class="{actived:false}">
        <ul>
          <li class="selected"><a href="#">考研</a></li>
          <li><a href="#">考公</a></li>
          <li><a href="#">四六级</a></li>
          <li><a href="#">技能</a></li>
        </ul>
      </div>
    </div>
    <p class="hot-search">
      热门搜索:
      <a href="#">咸鱼带货</a>
      <a href="#">考研</a>
      <a href="#">考公</a>
    </p>
  </div>
</template>
<script>
export default {
  name: "PkkSearch",
};
</script>
<style lang="less" scoped>
.search {
  width: 790px;
  height: 54px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -395px;
  line-height: 32px;
  opacity: 90%;
  .icon-search {
    font-size: 18px;
    margin-left: 5px;
  }
  .hot-search {
    text-align: left;
    margin-top: 10px;
    color: #fff;
    opacity: 0.9;
    a {
      color: #fff;
      opacity: 0.9;
      padding: 0 6px;
    }
  }
}
.container {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 27px;
  button {
    width: 30%;
    height: 100%;
    border: none;
    border-radius: 27px 0 0 27px;
    i{
      margin-left: 100px;
    }
  }
  input {
    display: block;
    width: 70%;
    height: 100%;
    padding: 12px 18px;
    color: #666;
    border-radius: 0 27px 27px 0;
  }
  .layer{
    z-index: 3;
    position: absolute;
    top: 52px;
    left: 0;
    width: 30%;
    background-color: #fff;
    opacity: 1;
    padding: 10px 0;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    opacity: 0;
    .selected{
      background-color: @pkkColor;
    }
    li a{
      display: block;
      width: 100%;
      padding: 0 24px;
      &:hover{
        background-color: #ececec;
      }
    }
  }
  .actived{
    opacity: 1;
  }
}
</style>
