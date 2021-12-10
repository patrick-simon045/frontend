import { createStore } from "vuex";
import shoppingModule from '@/modules/shopping/store'

export default createStore({
  modules: {
    shopping: shoppingModule
  },
});
