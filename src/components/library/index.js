// import PkkCarousel from './pkk-carousel.vue'
// import PkkSearch from './pkk-search.vue'
// import PkkItemCol from './pkk-item-col.vue'
// import PkkPagination from './pkk-pagination.vue'
// import PkkBread from './pkk-bread.vue'
// import PkkBreadItem from './pkk-bread-item.vue'

// 导入library文件夹下的所有组件
// 批量导入需要使用一个函数 require.context(dir,deep,matching)
// 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
const importFn = require.context('./',false,/\.vue$/)
// console.dir(importFn.keys()) 文件名称数组

export default {
  install (app) {
    // app.component(PkkCarousel.name, PkkCarousel)
    // app.component(PkkSearch.name, PkkSearch)
    // app.component(PkkItemCol.name, PkkItemCol)
    // app.component(PkkPagination.name, PkkPagination)
    // app.component(PkkBread.name, PkkBread)
    // app.component(PkkBreadItem.name, PkkBreadItem)
    importFn.keys().forEach(key => {
      const component = importFn(key).default
      app.component(component.name, component)
    });
  }
}
