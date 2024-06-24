<script>
import { LocalStorageMixin } from './mixins/LocalStorageMixin';


export default {
  mixins:[LocalStorageMixin],
    beforeDestroy(){
      this.removeItemFromLocalStorage('isActive')
      this.removeItemFromLocalStorage('products')
    }
}
</script>

<template>
  <div id="app">
        <router-view />
  </div>
</template>

<style scoped>

</style>
