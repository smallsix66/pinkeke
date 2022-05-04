<template>
  <div class="pkk-item-col">
    <div class="item-img">
      <a href="#">
        <img :src="item.pro_main_images.images[0]" :alt="item.title" />
      </a>
    </div>
    <div class="item-wrapper">
      <span class="meta-category-dot">
        <a href="#" class="lable">{{item.tag }}</a>
        <a href="#" class="lable">{{ item.pro_detail.properties[0].val }}</a>
        <a href="#" class="lable">{{ item.pro_detail.properties[1].val }}</a>
      </span>
      <header>
        <h3>{{ item.pro_name }}</h3>
      </header>
      <div class="item-describe">
        {{ item.pro_subtitle }}
      </div>
      <div class="item-footer">
        <div class="item-meta">
          <span class="meta-author">
            <a href="#">
              <i class="iconfont icon-yonghu"></i>
              <span>{{ item.pro_admin_name }}</span>
            </a>
          </span>
          <span class="meta-date">
            <i class="iconfont icon-clock-filling"></i>
            {{ item.pro_create_time }}
          </span>
          <span class="meta-shopped">
            <i class="iconfont icon-remen"></i>
            {{ item.pro_salesCount }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PkkItemCol",
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  setup(props) {
    // console.log("PkkItemCol-item",props.item);
    return {  }
  },
};
</script>

<style scoped lang="less">
.pkk-item-col {
  width: 255px;
  height: 340px;
  border-radius: 10px;
  background-color: #fff;
  margin: 10px;
}
.item-img {
  img {
    width: 100%;
    height: 170px;
    border-radius: 10px 10px 0 0;
  }
}
.item-wrapper {
  padding: 10px 10px;
  .meta-category-dot .lable {
    margin-top: 10px;
    font-size: 8px;
    color: #fff;
    display: inline-block;
    padding: 3px 10px;
    background-color: @pkkColor;
    border-radius: 10px;
    margin-right: 5px;
  }
  header {
    margin-top: 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .item-describe {
    height: 38px;
    margin-top: 5px;
    color: #888;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-indent: 2em;
  }
  .item-footer {
    bottom: 0;
    left: 0;
    margin-top: 10px;
    color: #bdbdbd;
    .item-meta {
      .meta {
        &-author a {
          margin-right: 10px;
          color: #bdbdbd;
          text-align: center;
          i {
            font-size: 20px;
            margin-right: 3px;
          }
          span {
            display: inline-block;
            width: 32px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 12px;
          }
        }
        &-date {
          font-size: 12px;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
