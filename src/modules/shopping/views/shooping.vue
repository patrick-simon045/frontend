<template>
  <div class="main-container">
    <shopppingItems />
    <shopppingItem />
  </div>
</template>

<script>
import shopppingItems from './shopping-items.vue'
import shopppingItem from './shopping-item.vue'

export default {
  components: {
    shopppingItems, shopppingItem
  },
};
</script>

<style scoped>
.main-container {
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  row-gap: 20px;
  background-color: #fff5fd;
}
</style>