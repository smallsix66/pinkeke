<template>
  <p class="g-name">{{ good.pro_name }}</p>
  <p class="g-desc">{{ good.pro_subtitle }}</p>
  <p class="g-price">
    <span>{{ good.pro_price===0?"免费":good.pro_price }}</span>
    <span v-if="good.pro_price!=0">{{ good.pro_price+100 }}</span>
  </p>
  <div class="g-service">
    <dl>
      <dt>类型</dt>
      <dd>{{ good.tag }}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: "GoodsName",
  props: {
    good: {
      type: Object,
      default: () => ({
        pro_name: "2件装 粉釉花瓣心意点缀 点心盘*2 碟子盘子",
        pro_subtitle: "瓣造型干净简约 多功能使用堆叠方便",
        pro_price: 99.0,
        tag: "拼课",
      }),
    },
  },
};
</script>

<style scoped lang="less">
.g-name {
  font-size: 22px;
}
.g-desc {
  color: #999;
  margin-top: 10px;
}
.g-price {
  margin-top: 10px;
  span {
    &::before {
      content: "¥";
      font-size: 14px;
    }
    &:first-child {
      color: @priceColor;
      margin-right: 10px;
      font-size: 22px;
    }
    &:last-child {
      color: #999;
      text-decoration: line-through;
      font-size: 16px;
    }
  }
}
.g-service {
  background: #f5f5f5;
  width: 500px;
  padding: 20px 10px 0 10px;
  margin-top: 10px;
  dl {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      color: #666;
      &:last-child {
        span {
          margin-right: 10px;
          &::before {
            content: "•";
            color: @pkkColor;
            margin-right: 2px;
          }
        }
        a {
          color: @pkkColor;
        }
      }

    }
  }
}
</style>
