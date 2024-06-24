<template>
  <div>

    <Header />
    <main>
      <AllProducts />
    </main>
  </div>
</template>


<script>
import AllProducts from '../components/AllProducts.vue';
import Header from '../components/Header.vue';

export default {
  name: 'HomeView',
  components: {
    AllProducts,
    Header,
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>