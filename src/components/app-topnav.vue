<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <li><a href="javascript:;"><i class="iconfont icon-yonghu"></i>{{profile.u_nickname}}</a></li>
        <li><a @click="logout()" href="javascript:;">退出登录</a></li>
        <li><RouterLink to="/login">请先登录</RouterLink></li>
        <li><a href="javascript:;">免费注册</a></li>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"
            ><i class="iconfont icon-telephone"></i>手机版</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import {computed} from 'vue';
export default {
  name: "AppTopNav",
  setup(){
      // 获取用户的登录信息才能控制切换导航菜单
    const store = useStore()
    // 使用vuex中的state需要设置计算属性，否则不是响应式
    const profile = computed(() => {
      return store.state.user.user
    })
    const router = useRouter()
    const logout = () => {
      store.commit('user/setUser',{})
      router.push('/login')
    }
    return { profile, logout}
  }
};
</script>

<style scoped lang='less'>
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        // height: 53px;
        // line-height: 53px;
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: white;
        }
      }
    }
    ~ li {
      a {
        border-left: 2px solid #666;
      }
    }
  }
}
</style>
