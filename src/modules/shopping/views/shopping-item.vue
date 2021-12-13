<template>
  <div class="right-container">
    <div class="details-hidden">
      <img src="@/assets/empty-cart.jpg" alt />
    </div>

    <!-- cart items -->
    <transition name="cart">
      <div class="test" v-if="cartItems.size !== 0">
        <div class="test-header">
          <div>
            <p>Cart Items</p>
          </div>
        </div>

        <div class="cart-items-padding">
          <transition-group name="cart_list">
            <div class="item-list-row" v-for="(product, index) in cartItems" :key="index">
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
              <div class="total-price">
                <p>Price: 💲{{ Math.round(product.price * product.quantity).toFixed(2) }}</p>
              </div>
              <div class="button-section">
                <div class="button" @click="removeFromCart(product.id)">
                  <p>Remove 💀</p>
                </div>
              </div>
            </div>
          </transition-group>
        </div>

        <div class="shipping-and-total">
          <!-- shipping -->
          <div class="shipping-section">
            <p>Shipping 🚢</p>
            <div class="shipping-list">
              <div
                class="shipping-item"
                v-bind:class="{ shipping_selected: shippingCountry === index }"
                v-for="(item, index) in shippingItems"
                :key="index"
                @click="setShippingCountry(index)"
              >
                <p>{{ item.countryName }} 💲{{ Number(item.price).toFixed(2) }}</p>
              </div>
            </div>
          </div>

          <!-- total -->
          <div class="total-section">
            <div class="total-items-container">
              <p>
                Total amount is 💲
                <span>{{ total }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'shopping-items',
  computed: {
    detailsVisibility() {
      return this.$store.getters["GET_DETAILS_VISIBILITY"]
    },
    productIndex() {
      return this.$store.getters["GET_DETAILS_PRODUCT_INDEX"]
    },
    cartItems() {
      return this.$store.getters["GET_CART_ITEMS"]
    },
    shippingItems() {
      return this.$store.getters["GET_SHIPPING_ITEMS"]
    },
    shippingCountry() {
      return this.$store.getters["GET_SHIPPING_COUNTRY"]
    },
    total() {
      var totalAmount = 0;
      this.cartItems.forEach(cartItem => {
        return totalAmount = totalAmount + (cartItem.price * cartItem.quantity)
      });
      var shippingCost = this.shippingItems[this.shippingCountry].price

      return Number(totalAmount + shippingCost).toFixed(2);
    }
  },
  methods: {
    removeFromCart(productId) {
      this.$store.dispatch('REMOVE_ITEM_FROM_CART', { productId: productId })
    },
    setShippingCountry(shippingCountryIndex) {
      this.$store.dispatch('SET_SHIPPING_COUNTRY', { shippingCountryInd: shippingCountryIndex })
    }
  }
}
</script>

<style scoped>

.product-info {
  text-align: left;
}
.cart-items-padding {
  width: 100%;
  padding: 0 20px;
}

.cart_list-enter-from,
.cart_list-leave-to {
  opacity: 0;
  transform: scale(0);
}
.cart_list-enter-active,
.cart_list-leave-active {
  transition: all 0.5s ease-in-out;
}

.test {
  height: 98vh;
  width: 100%;
  top: 0;
  right: 1vh;
  /* padding: 20px; */
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  position: absolute;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.test-header {
  width: 100%;
  margin-top: 20px;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.test-header p {
  font-weight: 400;
  font-size: 30px;
}

.cart-enter-from {
  transform: translateY(-98vh);
}

.cart-enter-active {
  transition: all 0.6s ease-in-out;
}

.cart-leave-to {
  transform: translateY(-98vh);
}

.cart-leave-active {
  transition: all 0.6s ease-in-out;
}

.right-container {
  flex: 1;
  height: 100%;
  padding: 20px;
  background-color: #fff5fd;
  position: relative;
}

.cart-list-header {
  font-weight: 400;
  font-size: 30px;
  margin-bottom: 20px;
}

.details-hidden {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff5fd;
}
.details-hidden img {
  height: 80%;
  width: 100%;
}
.details-shown {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

img {
  width: 40px;
  height: 40px;
}

span {
  font-weight: 800;
  font-size: 40px;
}

.button-section {
  flex: 1;
}

.shipping-and-total {
  width: 100%;
  position: absolute;
  bottom: 20px;
  padding: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: whitesmoke;
  border: 1px solid #616161;
}

.shipping-section {
  width: 100%;
  text-align: left;
}

.shipping-list {
  padding-top: 10px;
  gap: 20px;
  display: flex;
  align-items: flex-start;
  font-size: 15px;
}

.shipping-item {
  padding: 10px 20px;
  border-radius: 10px;
  /* color: white; */
  /* background-color: #616161; */
  background-color: #fff5fd;
  border: 1px solid #616161;
  cursor: pointer;
}

.shipping_selected {
  color: #fff;
  background-color: #616161;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.total-section {
  width: 100%;
  margin-top: 50px;
}

.total-items-container {
  text-align: center;
  border-radius: 10px;
  padding: 20px;
  font-size: 30px;
  border: 1px solid #616161;
  /* background-color: #616161; */
}
</style>