<template>
  <!-- 列表 -->
  <div class="list">
    <div v-for="(comment, i) in commentList" :key="i" class="item">
      <div class="user">
        <img :src="comment.u_avatar" alt="" />
        <span>{{ formatNickname(comment.u_nickname) }}</span>
      </div>
      <div class="body">
        <div class="score">
          <i
            v-for="i in comment.com_score"
            :key="i + '1'"
            class="iconfont icon-favorite-filling"
          ></i>
          <i
            v-for="i in 5 - comment.com_score"
            :key="i + '2'"
            class="iconfont icon-favorite"
          ></i>
        </div>
        <div class="text">
          {{ comment.com_content }}
        </div>
        <div class="com-picture">
          <GoodsCommentImage :comPictures="comment.com_pictures.pictures" />
        </div>
        <div class="time">
          <span>{{ comment.com_create_time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsCommentImage from "./goods-comment-image.vue";
import { watch, ref } from "vue";
import { useStore } from "vuex";
import { findProdComment } from "@/api/product";
export default {
  name: "GoodsComment",
  components: { GoodsCommentImage },
  setup() {
    const store = useStore();
    const commentList = ref([]);
    const total = ref(0);
    let pro_id = store.state.goods.good.pro_id;
    findProdComment(pro_id)
      .then((res) => {
        commentList.value = res.list;
        total.value = res.list.length;
        console.log("GoodsComment-commentList", res.list);
      })
      .catch((err) => {
        console.log(err);
      });

    // 定义转换数据的函数（对应vue2.0的过滤器）
    const formatNickname = (nickName) => {
      return nickName.substr(0, 1) + "****" + nickName.substr(-1);
    };

    return { commentList, formatNickname };
  },
};
</script>

<style scoped lang="less">
.list {
  padding: 0 20px;
}
.item {
  display: flex;
  padding: 25px 10px;
  border-bottom: 1px solid #f5f5f5;
  .user {
    width: 160px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      // overflow: hidden;
    }
    span {
      padding-left: 10px;
      color: #666;
    }
  }
  .body {
    flex: 1;
    .score {
      line-height: 40px;
      i {
        color: #ff9240;
        padding-right: 3px;
      }
      .attr {
        padding-left: 10px;
        color: #666;
      }
    }
    .text {
      color: #666;
      line-height: 24px;
    }
    .time {
      color: #999;
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
    }
  }
}
</style>
