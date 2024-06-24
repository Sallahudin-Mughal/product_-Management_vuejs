<template>
  <div>
    <div class="search-cont">
      <ButtonComponent backColor="orange" buttonWidth="150px" @click="navigateToAddProduct">
        <i class="fa-solid fa-plus size"></i>
        <p>Add Product</p>
      </ButtonComponent>

      <Search @search-products="fetchSearchResults" />


      <ButtonComponent backColor="orange" buttonWidth="50px" @click="showCart">
        <i class="fa-solid fa-cart-shopping size"></i>
      </ButtonComponent>
    </div>

    <div class="container">
      <div v-if="loading">Loading...</div>
      <Product v-else v-for="product in products" :key="product.id" :product="product" @delete-Product="deleteProduct"
        @view-Product="viewProduct" @edit-product="navigateToEditProduct" />
    </div>
    <div class="pagebtn">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>{{ currentPage }} / {{ totalPage }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPage">Next</button>
    </div>
  </div>
</template>

<script>
import Product from './Product.vue';
import Search from './Search.vue';
import ButtonComponent from './ButtonComponent.vue';
import { getAllProducts, addProduct, deleteProduct, getSingleProduct, getProductsByLimit, searchProducts, getCurrentAuthUser, refreshToken, get } from '../services/API.js';
import { LocalStorageMixin } from '../mixins/LocalStorageMixin.js'
import AddNewProduct from '../views/AddNewProduct.vue';
export default {
  name: 'Products',
  mixins: [LocalStorageMixin],
  components: {
    Product,
    Search,
    ButtonComponent,
    AddNewProduct,
  },


  data() {
    return {
      products: [],
      loading: true,
      limit: 12,
      currentPage: 1,
      totalPage: 0,
      paginated: [],
    }
  },
  computed: {
    storedProducts() {
      return this.getItemFromLocalStorage('products');
    }
  },
  created() {
    this.initializeProducts();
    this.fetchProducts()
  },
  watch: {
    currentPage() {
    },
  },
  methods: {
    /**
     * show cart method when click on cart button user Authentication occurs
     * if user Authenticate then check Token if Token is Expired then API hits and 
     * get new refreshToken and replace from localStorage
     * 
     * @param none
     * @return String- new Token 
     */
    async showCart() {
      const userToken = this.getItemFromLocalStorage('userToken')
      const isActive = this.getItemFromLocalStorage('isActive')
      if (!userToken) {
        alert('You are not logged in please login')
        // console.log("You are not logged in");
        // this.$router.push('/login')
        // this.removeItemFromLocalStorage('userDetails')
        // this.removeItemFromLocalStorage('userToken')
        // this.removeItemFromLocalStorage('cartsData')
        // this.removeItemFromLocalStorage('isActive')
        return
      }
      const headers = {
        Authorization: `Bearer ${userToken.token} `
      }

      try {
        isActive = true
        const response = await getCurrentAuthUser(headers)
        const data = response.data

        const userDetails = {
          id: data.id,
          username: data.username,
          role: data.role,
        }


        this.setItemInLocalStorage('userDetails', userDetails)
        this.$router.push('/allcarts')

      } catch (error) {
        console.error("Not Authenticate", error)

        if (isActive) {
          // this.refreshToken()
        }

      }

    },

    /**
     * refresh Token gets expire Token and replace with new token
     * get new refresh token and set into localStorage
     * 
     * @param none
     * @return String - new Token type string
     */
    async refreshToken() {
      let userToken = this.getItemFromLocalStorage('userToken')
      const body = {
        refreshToken: userToken.refreshToken,
        expiresInMins: 30,
      }
      const response = await refreshToken(body)
      console.log(response);
      userToken = {
        token: response.data.token,
        refreshToken: response.data.refreshToken
      }
      this.setItemInLocalStorage('userToken', userToken)
    },


    /**
     * 
     * this method check stored products in computed if stored
     * the set into this.products othervise featch from API
     * 
     * @param none
     * @return Array of Objects
     */
    initializeProducts() {
      if (this.storedProducts) {
        this.products = this.storedProducts;
        this.loading = false;
      } else {
        this.fetchProducts();
      }
    },

    /**
     * 
     * featch products by limits for pagination
     * 
     * @param none
     * @return products Array or error
     */
    async fetchProducts() {
      const skip = (this.currentPage - 1) * this.limit

      const done = (response) => {
        if (response?.status === 200) {
          this.products = response.data.products;
          this.totalPage = Math.ceil(response.data.total / this.limit)
          this.setItemInLocalStorage('products', this.products);
          this.loading = false;
        }
        else {
          console.log('Error fetching products:', response);
          this.loading = false;
        }
      }

      await get(`/products?limit=${this.limit}&skip=${skip}`, done)
    },



    async fetchSearchResults(query) {
      this.loading = true;
      try {
        const response = await searchProducts(query);
        this.products = response.data.products;
        this.setItemInLocalStorage('products', this.products);
        this.loading = false;
      } catch (error) {
        console.error('Error searching products:', error);
        this.loading = false;
      }
    },
    async navigateToAddProduct() {
      // this.$router.push('/addnewproduct')
      this.$router.push({ name: 'addNewProduct', params: { productId: null } });
    },
    // async viewProduct(product) {
    //   try {
    //     const viewSingleProduct = await getSingleProduct(product.id);
    //     console.log(product.id);
    //     console.log("This is view product you selected", viewSingleProduct.data)
    //     this.$router.push('/view')
    //   } catch (error) {
    //     console.error("Product View Error", error)
    //   }


    // },

    /**
     * method takes id as parameter and hit API if response is 200
     * then remove from Array of products and set Array again to localStorage
     * 
     * @param id Number OR String  
     */
    async deleteProduct(id) {
      try {
        const response = await deleteProduct(id)
        console.log(response);
        this.products = this.products.filter(product => product.id !== id);
        this.setItemInLocalStorage('products', this.products)

      } catch (error) {
        console.error("Error deleting product", error)
      }

    },


    /**
     * this method is navigate to AddNewProduct form component
     * 
     * @param product is Object of products
     */
    async navigateToEditProduct(product) {
      this.$router.push({ name: 'addNewProduct', params: { productId: product.id } });

    },
    nextPage() {
      if (this.currentPage < this.totalPage) {
        this.currentPage++;
        this.fetchProducts()
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchProducts()
      }
    },
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px auto;
}

.search-cont {
  width: 100%;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  box-sizing: border-box;
}

.size {
  font-size: 30px;
  padding: 5px;
}

.pagebtn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 50px;
  box-sizing: border-box;
}

.pagebtn button {
  width: 100px;
  margin: 30px;
  padding: 10px;
  border: 1px dotted rgb(1, 154, 1);
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
}
</style>