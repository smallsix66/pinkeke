<template>
  <div class="admin-product">
    <div class="container">
      <!-- 添加商品 -->
      <div class="add-product">
        <p>添加商品</p>
        <dir class="oneline">
          <div class="add-img">
            <p>课程图片：</p>
            <i class="iconfont icon-picture-filling"></i>
          </div>
          <div class="add-detail">
            <p>课程描述：</p>
            <input type="text" />
          </div>
        </dir>
        <ul>
          <li>
            <span>课程名称：</span>
            <input type="text" placeholder="长度<30，必填" />
          </li>
          <li>
            <span>课程价格：</span>
            <input type="text" placeholder="请输入价格" />
          </li>
          <li>
            <span>课程分类：</span>
            <select name="classify" id="">
              <option value="分类">选择分类</option>
            </select>
          </li>
          <li>
            <span>课程品牌：</span>
            <select name="brand" id="">
              <option value="分类" selected>选择品牌</option>
            </select>
          </li>
          <li>
            <span>课程数量：</span>
            <PkkNumbox class="numbox"></PkkNumbox>
          </li>
        </ul>
      </div>
      <!-- 操作 -->
      <div class="product-controll">
        <ul>
          <li>
            <span>课程名称 :</span>
            <input type="text" placeholder="请输入商品名" />
          </li>
          <li>
            <span>分类名称 :</span>
            <input type="text" placeholder="请输入分类名称" />
          </li>
        </ul>
      </div>
      <!-- 表格 -->
      <table class="product-table">
        <th><PkkCheckbox /></th>
        <th>ID</th>
        <th>分类</th>
        <th>名称</th>
        <th>描述</th>
        <th>图片</th>
        <th>价格</th>
        <th>库存</th>
        <th>状态</th>
        <th>品牌</th>
        <th>已售</th>
        <th>发布者</th>
        <th>发布时间</th>
        <th>操作</th>

        <tr v-for="(val, index) in productList.slice(0, 12)" :key="index">
          <td><PkkCheckbox /></td>
          <td>{{ val.pro_id }}</td>
          <td>{{ val.pro_category_id }}</td>
          <td>{{ val.pro_name }}</td>
          <td>{{ val.pro_subtitle }}</td>
          <td><img :src="val.pro_main_images.images[0]" alt="" /></td>
          <td>￥{{ val.pro_price === 0 ? "免费" : val.pro_price }}</td>
          <td>{{ val.pro_stock }}</td>
          <td>{{ val.pro_status === 1 ? "上架" : "下架" }}</td>
          <td>{{ val.pro_detail.properties[0].val }}</td>
          <td>{{ val.pro_salescount }}</td>
          <td>{{ val.pro_admin_name }}</td>
          <td>{{ val.pro_create_time }}</td>
          <td><a href="javascript:;">查看商品详情</a></td>
        </tr>
      </table>
    </div>
    <PkkPagination
      @current-change="changePager"
      :total="total"
      :currentPage="reqParams.page"
    />
  </div>
</template>

<script>
import PkkCheckbox from "@/components/library/pkk-checkbox.vue";
import { getAllProduct, getProductByCateId } from "@/api/home.js";
import { useStore } from "vuex";
import { reactive, ref, watch } from "vue";
export default {
  name: "AdminProduct",
  components: {
    PkkCheckbox,
  },
  setup(props) {
    // 筛选条件准备
    const reqParams = reactive({
      page: 1,
      pageSize: 5,
      // hasPicture: null,
      // tag: null,
      // sortField: null,
    });
    const productList = ref([]); //记录所有商品信息
    const total = ref(0); //记录总条数

    watch(
      reqParams,
      async () => {
        const data = await getProductByCateId(
          1001,
          reqParams.page,
          reqParams.pageSize
        );
        console.log("data.list[0]___________", data.list[0]);
        //服务器返回两条结果，由数组包裹，具体log一下查看返回的结果
        //第一条结果在data.list[0]
        //第二条结果在data.list[1]，sql中count(0)取了别名total，所以结果总数在data.list[1][0].total
        productList.value = data.list[0];
        total.value = data.list[1][0].total;
      },
      { immediate: true }
    ); // 改变分页函数
    const changePager = (np) => {
      // 改变页数
      reqParams.page = np;
    };

    return { reqParams, productList, total, changePager };
  },
};
</script>

<style lang="less" scoped>
.admin-product {
  background: @adminColor2;
  width: 100%;
  height: 720px;
  .container {
    width: 100%;
    padding: 0 10px;
    .add-product {
      color: #fff;
      > p {
        font-size: 20px;
      }
      p {
        padding: 10px 0;
      }
      .oneline {
        display: flex;
        .add-img {
          margin-right: 30px;
          .iconfont {
            display: inline-block;
            width: 120px;
            text-align: center;
            background: @adminColor;
            font-size: 30px;
            padding: 30px 30px;
          }
        }
        .add-detail {
          input {
            display: inline-block;
            width: 300px;
            text-align: center;
            background: @adminColor;
            font-size: 30px;
            padding: 30px 30px;
          }
        }
      }
      ul {
        display: flex;
        li {
          margin: 10px 0;
          margin-right: 30px;
          span,
          input,
          select {
            color: #fff;
            padding: 6px 10px;
            border-radius: 5px;
          }
          select {
            color: #666;
          }
          .numbox {
            display: inline-block;
          }
        }
      }
    }
    .product-controll ul {
      display: flex;
      li {
        margin: 10px 0;
        margin-right: 30px;
        span,
        input {
          color: #fff;
          padding: 6px 10px;
          border-radius: 5px;
        }
      }
    }
    .product-table {
      border-collapse: collapse;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      letter-spacing: 1px;
      border: 1px solid #f5f5f566;
      overflow: auto;
      th,
      tr,
      td {
        height: 50px;
        color: #fff;
        border-bottom: 1px solid #f5f5f566;
        word-break: keep-all;
        word-wrap: break-word;
      }
      tr {
        height: 50px;
        td {
          padding: 6px 6px 6px 12px;
          img {
            width: 50px;
          }
          a {
            color: rgb(7, 234, 255);
          }
        }
      }
    }
  }
}
</style>
