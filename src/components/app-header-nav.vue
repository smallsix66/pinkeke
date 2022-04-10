<template>
  <ul class="navs">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li v-for="(cate,i) in list" :key="i">
      <RouterLink :to="`/category/${cate.cate_id}`">{{cate.cate_name}}</RouterLink>
    </li>
  </ul>
</template>

<script>
import { computed } from '@vue/runtime-core';
import {useStore} from 'vuex'
export default {
  name: "AppHeaderNav",
  setup(){
    const store = useStore()
    const list = computed(()=>{
      return store.state.category.list
    })
      console.log("AppHeaderNav-list",list);

    return {list}
  }
};
</script>

<style scoped lang="less">
.navs {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  >li {
    margin-right: 40px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: @pkkColor;
        border-bottom: 1px solid @pkkColor;
      }
      // > .layer{
      //   height: 132px;
      //   opacity: 1;
      // }
    }
  }
  /*// 二级类目
  .layer{
    width: 1240px;
    background-color: #fff;
    position: absolute;
    left: -200px;
    top: 56px;
    height: 0;
    overflow: hidden;
    opacity: 0;
    box-shadow: 0 0 5px #ccc;
    transition: all .2s .1s;
    ul{
      display: flex;
      flex-wrap: wrap;
      padding: 0 70px;
      align-items: center;
      height: 132px;
      li{
        width: 110px;
        text-align: center;
        img{
          width: 60px;
          height: 60px;
        }
        p{
          padding-top: 10px;
        }
        &:hover{
          p{
            color: @pkkColor;
          }
        }
      }
    }
  }
  */
}
</style>
