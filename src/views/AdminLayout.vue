<template>
  <div class="admin-layout">
    <header class="admin-topnav">
      <p>后台管理系统</p>
    </header>
    <!-- 导航栏 -->
    <div class="left">
      <div class="admin-nav">
        <ul>
          <li class="actived">
            <a href="javascript:;">
              <i class="iconfont icon-kecheng"></i>课程管理
            </a>
          </li>
          <li>
            <RouterLink to="/admin/order">
              <i class="iconfont icon-dingdan"></i>订单管理
            </RouterLink>
          </li>
          <li>
            <a href="javascript:;">
              <i class="iconfont icon-qushi"></i>趋势统计
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <i class="iconfont icon-kehu"></i>客户管理
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <i class="iconfont icon-xitong"></i>系统管理
            </a>
          </li>
        </ul>
      </div>
      <div class="admin-user">
        <div class="admin-avatar">
          <img src="../assets/images/avatar/head1.png" alt="" />
        </div>
        <p>六猴猴</p>
        <RouterLink to="/"
          ><i class="iconfont icon-arrow-left-filling"></i>返回首页</RouterLink
        >
      </div>
    </div>
    <div class="right">
      <!-- 二级页面 -->
      <RouterView />
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminLayout",
};
</script>

<style lang="less" scoped>
.admin-layout {
  width: 100%;
  position: relative;
  .admin-topnav {
    height: 50px;
    background: @adminColor;
    p {
      color: #fff;
      font-size: 20px;
      line-height: 50px;
      padding-left: 20px;
    }
  }
  .left {
    position: absolute;
    left: 0;
    top: 50px;
    height: 720px;
    width: 200px;
    background-color: @adminColor;
    border-right: 2px solid #fff;
    text-align: center;
    .admin-nav {
      ul {
        li {
          padding: 0 30px;
          height: 70px;
          line-height: 70px;
          a {
            display: block;
            width: 100%;
            color: #fff;
            border-bottom: 1px solid @adminHelpColor;
            i {
              padding-right: 10px;
              color: #fff;
            }
          }
          &:hover,
          &.actived {
            cursor: pointer;
            background: @adminHelpColor;
            a {
              color: @adminColor;
              font-weight: bold;
              i {
                color: @adminColor;
              }
            }
          }
        }
      }
    }
    .admin-user {
      margin-top: 80px;
      .admin-avatar img {
        width: 60px;
        border-radius: 50%;
      }
      p,
      a {
        color: #fff;
        margin-top: 6px;
        font-size: 16px;
      }
      a {
        display: block;
        margin-top: 20px;
        padding: 3px 10px;
        &:hover {
          background: @adminHelpColor;
          color: @adminColor;
        }
      }
    }
  }
  .right {
    position: absolute;
    left: 200px;
    top: 50px;
  }
}
</style>
