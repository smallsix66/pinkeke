<template>
  <div class="pkk-button">
    <button v-if="type === 'primary'" class="btn-primary"><slot /></button>
    <button v-if="type === 'error'" class="btn-error"><slot /></button>
    <button v-if="type === 'gray'" class="btn-gray"><slot /></button>
  </div>
</template>

<script>
export default {
  name: "PkkButton",
  props: {
    type: {
      type: String,
      default: "primary",
    },
  },
};
</script>
<style lang="less" scoped>
.pkk-button {
  display: inline-block;
  button {
    width: 100px;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    background: none;
    color: #333;
    &.btn-primary {
      background: @pkkColor;
    }
    &.btn-error {
      background: @priceColor;
    }
    &.btn-gray {
      background: rgba(128, 128, 128, 0.7);
      color: #fff;
    }
  }
}
</style>
