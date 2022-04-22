<template>
  <div class="login-page">
    <LoginHeader>欢迎登录</LoginHeader>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a
            @click="activeName = 'account'"
            :class="{ active: activeName === 'account' }"
            href="javascript:;"
            >账户登录</a
          >
          <a
            @click="activeName = 'scancode'"
            :class="{ active: activeName === 'scancode' }"
            href="javascript:;"
            >扫码登录</a
          >
        </nav>
        <!-- 表单 -->
        <LoginForm v-if="activeName === 'account'" class="account-box" />
        <!-- 二维码 -->
        <div v-if="activeName === 'scancode'" class="scancode-box">
          <img src="../../assets/images/reward.png" alt="" />
          <p>打开 <a href="javascript:;">拼课课App</a> 扫码登录</p>
        </div>
      </div>
    </section>
    <LoginFooter />
  </div>
</template>

<script>
import LoginHeader from "./components/login-header.vue";
import LoginFooter from "./components/login-footer.vue";
import LoginForm from "./components/login-form.vue";
import { ref } from "vue";
export default {
  name: "LoginPage",
  components: {
    LoginHeader,
    LoginFooter,
    LoginForm,
  },
  setup() {
    const activeName = ref("account");
    return { activeName };
  },
};
</script>

<style scoped lang="less">
.login-section {
  background: url(../../assets/images/banner/bg.png) no-repeat center /
    cover;
  height: 488px;
  position: relative;
  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }
        &.active {
          color: @pkkColor;
          font-weight: bold;
        }
      }
    }
    // 二维码容器
    .scancode-box {
      width: 100%;
      text-align: center;
      p {
        margin-top: 20px;
        a {
          color: @pkkColor;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
