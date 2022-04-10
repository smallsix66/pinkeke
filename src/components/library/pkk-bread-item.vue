<template>
  <div class="pkk-bread-item">
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <span v-else><slot /></span>
  </div>
</template>

<script>
export default {
  name: "PkkBreadItem",
  props: {
    to: {
      type: [String, Object],
    },
  },
};
</script>

<style scoped lang="less">
</style>
