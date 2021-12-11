<template>
  <!-- add items inputs -->
  <transition name="fade">
    <div class="add-items-inputs" v-if="show">
      <div class="button close-input-section" @click="closeDropDown">
        <p>Close ✖</p>
      </div>
    </div>
  </transition>
  <div class="left-container">
    <div class="header-section">
      <p class="product-list-header">{{ message }}</p>
      <div class="button" @click="addNewItem">
        <p>Add New Item ➕</p>
      </div>
    </div>
    <div class="item-list-container">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "shopping-items",

  data() {
    return {
      message: "Place your Order",
      show: false,
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
      this.show = true
    },
    closeDropDown() {
      this.show = false
    }
  },
};
</script>

<style>
.fade-enter-from {
  transform: translateY(-500px);
}

.fade-enter-active {
  transition: all 0.5s ease-in-out;
}

.fade-leave-to {
  transform: translateY(-500px);
  opacity: 1;
}

.fade-leave-active {
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

.add-items-inputs {
  z-index: 50;
  height: 500px;
  width: 50%;
  top: 0;
  left: 25%;
  padding: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  position: absolute;
  background-color: whitesmoke;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
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