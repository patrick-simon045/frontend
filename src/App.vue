<template>
  <Shopping />
</template>

<script>
import Shopping from './modules/shopping/views/shooping.vue'

export default {
  name: "App",
  components: {
     Shopping
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
