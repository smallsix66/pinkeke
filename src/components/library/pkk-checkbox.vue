<template>
  <div class="pkk-checkbox" @click="changeCheck()">
    <i v-if="checked" class="iconfont icon-check-item"></i>
    <i v-else class="iconfont icon-icon_Unchecked"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useVModel } from "@vueuse/core";
export default {
  name: "PkkCheckbox",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    //  const checked = useVModel(props, 'modelValue', emit)

    // const changeCheck = () => {
    //    const newVal = !checked.value
    //   checked.value = newVal
    //   console.log("PkkCheckbox-checked",checked.value);
    //   // 使用emit通知父组件数据的改变
    //   emit("change", newVal);
    // };

    const checked = ref(false);
    const changeCheck = () => {
      checked.value = !checked.value;
      // 使用emit通知父组件数据的改变
      emit("update:modelValue", checked.value);
      emit("change", checked.value);
    };
    // 使用侦听器，得到父组件传递数据，给checked数据
    watch(
      () => props.modelValue,
      () => {
        checked.value = props.modelValue;
      },
      { immediate: true }
    );
    return { checked, changeCheck };
  },
};
</script>

<style lang="less" scoped>
.pkk-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-check-item {
    color: @pkkColor;
    ~ span {
      color: @pkkColor;
    }
  }
  // i{
  //   position: relative;
  //   top: 1px;
  // }
  span {
    margin-left: 2px;
  }
}
</style>
