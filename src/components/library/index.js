import PkkCarousel from './pkk-carousel.vue'
import PkkSearch from './pkk-search.vue'
import PkkItemCol from './pkk-item-col.vue'
import PkkPagination from './pkk-pagination.vue'

export default {
  install (app) {
    app.component(PkkCarousel.name, PkkCarousel)
    app.component(PkkSearch.name, PkkSearch)
    app.component(PkkItemCol.name, PkkItemCol)
    app.component(PkkPagination.name, PkkPagination)
  }
}
