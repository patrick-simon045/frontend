export default {
  state: {
    items: ["🥑 avocado", "🍉 watermelon"],
    products: [
      { name: "🥑 avocado", price: 10, quantity: 1, id: 1 },
      { name: "🍉 watermelon", price: 12, quantity: 1, id: 2 },
    ],
    productDetailsPage: { visible: false, productIndex: 0 },
    product: {},
    cart: new Set(),
    shipping: [
      { countryName: "Tanzania", assetPath: "@/assets/tz.png", price: 22 },
      { countryName: "Kenya", assetPath: "@/assets/kenya.png", price: 23.1 },
      { countryName: "Brazil", assetPath: "@/assets/braz.png", price: 34.5 },
      { countryName: "Argentina", assetPath: "@/assets/arg.png", price: 29.4 },
    ],
    shippingCountry: Number(0)
  },
  getters: {
    GET_ITEMS: (state) => {
      return state.items;
    },
    GET_PRODUCTS: (state) => {
      return state.products;
    },
    GET_DETAILS_VISIBILITY: (state) => {
      return state.productDetailsPage.visible;
    },
    GET_DETAILS_PRODUCT_INDEX: (state) => {
      return state.productDetailsPage.productIndex;
    },
    GET_PRODUCT: (state) => {
      return state.product;
    },
    GET_CART_ITEMS: (state) => {
      return state.cart;
    },
    GET_SHIPPING_ITEMS: (state) => {
        return state.shipping
    },
    GET_SHIPPING_COUNTRY: (state) => {
        return state.shippingCountry
    }
  },
  mutations: {
    // items
    ADD_ITEM(state, payload) {
      state.items.push(payload);
    },

    // products
    ADD_QUANTITY(state, { productInd }) {
      state.products[productInd].quantity =
        state.products[productInd].quantity + 1;
    },
    DEDUCT_QUANTITY(state, { productInd }) {
      if (state.products[productInd].quantity === 1) {
        state.products[productInd].quantity = 1;
        return;
      }

      state.products[productInd].quantity =
        state.products[productInd].quantity - 1;
    },

    // productDetailsPage
    SET_PRODUCT_VISIBILITY(state) {
      state.productDetailsPage.visible = true;
    },
    SET_PRODUCT_TO_SHOW(state, payload) {
      state.productDetailsPage.productIndex = payload;
      state.product = state.products[payload];
    },
    RESET_PRODUCT_VISIBILITY(state) {
      state.productDetailsPage.visible = false;
    },

    // cart
    ADD_ITEM_TO_CART(state, payload) {
      state.cart.add(payload);
    },
    REMOVE_ITEM_FROM_CART(state, payload) {
      state.cart.delete(payload);
    },

    // shipping country
    SET_SHIPPING_COUNTRY(state, payload) {
        state.shippingCountry = Number(payload)
    }
  },
  actions: {
    // items
    ADD_ITEM({ commit }) {
      commit("ADD_ITEM");
    },

    // products
    ADD_QUANTITY_ACTION({ commit }, { productInd }) {
      commit("ADD_QUANTITY", productInd);
    },

    // productDetailsPage
    SET_DETAILS_PAGE({ commit, state }, { productInd }) {
      commit("SET_PRODUCT_VISIBILITY");
      //   commit("SET_PRODUCT_TO_SHOW", productInd);

      const payload = state.products[productInd];
      commit("ADD_ITEM_TO_CART", payload);
    },

    REMOVE_ITEM_FROM_CART({ commit, state }, { productId }) {
      const payload = state.products.filter(product => product.id === productId);
      commit("REMOVE_ITEM_FROM_CART", payload[0]);
    },

    SET_SHIPPING_COUNTRY({ commit}, { shippingCountryInd }) {
        commit('SET_SHIPPING_COUNTRY', shippingCountryInd)
    }
  },
};
