<template>
  <div class="search">
    <input type="text" v-model="searchQuery" placeholder="Search products..." />
  </div>
</template>

<script>
import { debounce } from 'lodash';

export default {
  name: 'Search',
  data() {
    return {
      searchQuery: ''
    }
  },
  watch: {
    searchQuery: {
      handler: 'onSearch',
      
    }
  },
  methods: {
    onSearch: debounce(function () {
      this.$emit('search-products', this.searchQuery);
    }, 300)
  }
}
</script>

<style scoped>
* {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.search input {
  width: 500px;
  padding: 10px 20px 10px 20px;
  font-size: 15px;
  border-radius: 50px;
  border: 1px solid white;
  outline: 1px solid rgb(222, 221, 221);
}
</style>