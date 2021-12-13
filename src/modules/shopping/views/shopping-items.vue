<template>
  <!-- add items inputs -->
  <add-new-item />

  <div class="left-container">
    <div class="header-section">
      <p class="product-list-header">{{ message }}</p>
      <div class="button" @click="addNewItem">
        <p>Add New Item ➕</p>
      </div>
    </div>
    <div class="item-list-container">
      <div v-if="products.length == 0">
        <p class="productListEmptyMessage">{{ productListEmptyMessage }}</p>
      </div>
      <transition-group name="product_list">
        <div class="item-list-row" v-for="(product, index) in products" :key="index">
          <div class="product-info-and-index">
            <div class="item-number">
              <p>{{ index + 1 }}</p>
            </div>
            <div class="product-info">
              <p>{{ product.name }} @ 💲{{ product.price }}</p>
            </div>
          </div>
          <div class="quantity">
            Qty:
            <div class="quantity-value">
              <p>{{ product.quantity }}</p>
            </div>
          </div>
          <div class="button-section">
            <div class="button details" @click="showDetails(index)">
              <p>Cart 👉🏻</p>
            </div>
            <div class="button" @click="addToCart(index)">
              <p>Add ➕</p>
            </div>
            <div class="button" @click="removeFromCart(index)">
              <p>Minus ➖</p>
            </div>
          </div>
        </div>
      </transition-group>
      <!-- <p>TODO #1: <strong>Implement ADD NEW ITEM feature</strong></p>
    <p>TODO #2: <strong>Implement DARKMODE/LIGHTMODE SWITCH feature</strong></p>
      <p>TODO #3: <strong>REFACTOR CODE OBVIOUSLY 👀</strong></p>-->
    </div>
  </div>
</template>

<script>
import addNewItem from '../components/addNewItem.vue'
import AddNewItem from '../components/addNewItem.vue';

export default {
  name: "shopping-items",
  components: { addNewItem, AddNewItem },

  data() {
    return {
      message: "Place your Order",
      productListEmptyMessage: "No products added"
    };
  },

  computed: {
    products() {
      return this.$store.getters["GET_PRODUCTS"];
    },
  },

  methods: {
    addToCart(productIndex) {
      this.$store.commit("ADD_QUANTITY", { productInd: productIndex });
    },
    removeFromCart(productIndex) {
      this.$store.commit("DEDUCT_QUANTITY", { productInd: productIndex });
    },
    showDetails(productIndex) {
      this.$store.dispatch('SET_DETAILS_PAGE', { productInd: productIndex })
    },
    addNewItem() {
      this.$store.commit('SHOW_ADD_NEW_ITEM_WINDOW')
    },

  },
};
</script>

<style>
.productListEmptyMessage{
  margin-top: 20px;
}

.product_list-enter-from,
.product_list-leave-to {
  opacity: 0;
  transform: scale(0);
}
.product_list-enter-active,
.product_list-leave-active {
  transition: all 0.5s ease-in-out;
}

.left-container {
  flex: 1;
  height: 100%;
  padding: 50px;
  background-color: #fff5fd;
  text-align: left;
}

.header-section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.close-input-section {
  width: 100px;
}

.product-list-header {
  font-weight: 400;
  font-size: 30px;
  margin-bottom: 20px;
}

.left-container h1 {
  margin-bottom: 20px;
}

.item-list-container {
  width: 100%;
  height: 90%;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.item-list-row {
  width: 100%;
  height: 50px;
  margin-top: 20px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  background-color: whitesmoke;
}

.product-info-and-index {
  flex: 2;
  display: flex;
  align-items: center;
}

.item-number {
  width: 25px;
  height: 25px;
  margin-right: 10px;
  border-radius: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6e6d6d;
  color: #fff;
}

.quantity {
  flex: 1;
  display: flex;
  flex-flow: row;
  align-items: center;
}

.quantity-value {
  width: 30px;
  height: 30px;
  margin-left: 10px;
  border-radius: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #616161;
}

.button-section {
  flex: 2;
  display: flex;
  flex-flow: row-reverse;
  gap: 10px;
}
.button {
  padding: 8px 10px;
  border-radius: 10px;
  background-color: #616161;
  cursor: pointer;
}
.button p {
  user-select: none;
  font-size: 12px;
  color: #fff;
}

.details {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>