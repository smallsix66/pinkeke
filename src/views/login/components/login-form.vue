<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-yonghu"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else>
        <i class="iconfont icon-duanxin"></i> 使用短信登录
      </a>
    </div>
    <Form
      ref="formCom"
      class="form"
      :validation-schema="scheam"
      v-slot="{ errors }"
      autocomplete="off"
    >
      <div class="form-item">
        <div class="input">
          <i class="iconfont icon-yonghu"></i>
          <Field
            :class="{ error: errors.mobile }"
            v-model="form.mobile"
            name="mobile"
            type="text"
            placeholder="请输入手机号"
          />
        </div>
        <div class="error" v-if="errors.mobile">
          <i class="iconfont icon-warning-circle-fill" />{{ errors.mobile }}
        </div>
      </div>
      <div class="form-item" v-if="!isMsgLogin">
        <div class="input">
          <i class="iconfont icon-mima"></i>
          <Field
            :class="{ error: errors.password }"
            v-model="form.password"
            name="password"
            type="password"
            placeholder="请输入密码"
          />
        </div>
        <div class="error" v-if="errors.password">
          <i class="iconfont icon-warning-circle-fill" />{{ errors.password }}
        </div>
      </div>
      <div class="form-item" v-else>
        <div class="input">
          <i class="iconfont icon-yanzhengma"></i>
          <Field
            :class="{ error: errors.code }"
            v-model="form.code"
            name="code"
            type="password"
            placeholder="请输入验证码"
          />
          <span class="code">发送验证码</span>
        </div>
        <div class="error" v-if="errors.code">
          <i class="iconfont icon-warning-circle-fill" />{{ errors.code }}
        </div>
      </div>
      <!-- <PkkMessage text="手机号或密码错误" type="error" /> -->
      <div class="form-item">
        <div class="agree">
          <!-- <PkkCheckbox v-model="form.isAgree" /> -->
          <Field
            as="PkkCheckbox"
            name="isAgree"
            v-model:modelValue="form.isAgree"
          />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
      </div>
      <a @click="submit()" href="javascript:;" class="btn">登录</a>
    </Form>
    <div class="action">
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt=""
      />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from "vue";
import { Field, Form } from "vee-validate";
import veeSchema from "@/utils/vee-validate-schema";
import Message from "@/components/library/Message";
import { userAccountLogin } from "@/api/user";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "LoginForm",
  components: {
    Field,
    Form,
  },
  setup() {
    // 是否短信登录
    const isMsgLogin = ref(false);
    // 表单对象数据
    const form = reactive({
      isAgree: true,
      account: null,
      password: null,
      mobile: null,
      code: null,
    });
    // 校验规则对象
    const mySchema = {
      account: veeSchema.account,
      password: veeSchema.password,
      mobile: veeSchema.mobile,
      code: veeSchema.code,
      isAgree: veeSchema.isAgree,
    };

    // 切换表单元素，还原数据和清除校验效果
    const formCom = ref(null);
    watch(isMsgLogin, () => {
      // 还原数据
      form.isAgree = true;
      form.account = null;
      form.password = null;
      form.mobile = null;
      form.code = null;
      // 补充校验效果清除，Form组件提供resetForm()
      formCom.value.resetForm();
    });

    // // 需要在点击登录的时候对整体表单进行校验
    // const login = async () => {
    //   // Form组件提供了一个 validate 函数作为整体表单校验，当是返回的是一个promise
    //   const valid = await formCom.value.validate();
    //   if (!valid.valid) {
    //     Message({ type: "error", text: "登录失败" });
    //   }
    //   console.log(valid);
    // };

    // 使用store
    const store = useStore();
    // 使用router
    const router = useRouter();
    // 使用route
    const route = useRoute();
    // 登录提交
    const submit = async () => {
      // 整体校验
      const valid = await formCom.value.validate();
      console.log(valid);
      if (valid) {
        // 发送请求
        if (!isMsgLogin.value) {
          // 帐号密码登录
          userAccountLogin(form)
            .then((data) => {
              // console.log("LoginForm-data.list[0]",data.list[0]);
              // 成功
              // 1. 存储用户信息
              const {
                u_avatar,
                u_email,
                u_id,
                u_idcard,
                u_name,
                u_nickname,
                u_sex,
                u_tel,
              } = data.list[0];
              store.commit("user/setUser", {
                u_avatar,
                u_email,
                u_id,
                u_idcard,
                u_name,
                u_nickname,
                u_sex,
                u_tel,
              });
              // console.log("LoginForm-store.state.user.user",store.state.user.user);
              //登陆成功后合并购物车操作
              store.dispatch('cart/mergeLocalCart').then(()=>{
                // 2. 提示
                Message({ type: "success", text: "登录成功" });
                // 3. 跳转
                router.push(route.query.redirectUrl || "/");
              })
            })
            .catch((e) => {
              console.log(e);
              // 失败
              Message({
                type: "error",
                text: e.response.list || "登录失败",
              });
            });
        } else {
          // 短信登录(弃用)
        }
      }
    };
    return { isMsgLogin, form, scheam: mySchema, formCom, submit };
  },
};
</script>

<style lang="less" scoped>
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @pkkColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @pkkColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @pkkColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
