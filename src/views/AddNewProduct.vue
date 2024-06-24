<template>
  <div>
    <div class="main-container">
      <div class="form-cont">
        <i class="fa-solid fa-xmark close" @click="gobackToHome"></i>
        <h1>{{ isEdit ? 'Edit Product' : 'Add Product' }}</h1>
        <form @submit.prevent="validation">
          <div>
            <label for="title">Title:</label>
            <input type="text" id="title" v-model="product.title" />
            <span v-if="errors.title">{{ errors.title }}</span>
          </div>
          <div>
            <label for="description">Description:</label>
            <textarea id="description" v-model="product.description"></textarea>
            <span v-if="errors.description">{{ errors.description }}</span>
          </div>
          <div>
            <label for="price">Price:</label>
            <input type="number" id="price" v-model="product.price" min="0" />
            <span v-if="errors.price">{{ errors.price }}</span>
          </div>
          <button type="submit">{{ isEdit ? 'Update' : 'Add' }} Product</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getSingleProduct, updateProduct, addProduct } from '@/services/API.js';

export default {
  props: {
    productId: {
      default: null,
    },
  },
  data() {
    return {
      product: {
        title: '',
        description: '',
        price: null,
      },
      errors: {
        title: '',
        description: '',
        price: null,
      },
      isEdit: false,
    };
  },
  async created() {
    if (this.productId) {
      this.isEdit = true;
      try {
        const productData = await getSingleProduct(this.productId);
        this.product = productData.data;
      } catch (error) {
        console.error(error.message);
      }
    }
  },
  watch: {
    'product.title'(value) {
      if (value) {
        this.errors.title = '';
      }
    },
    'product.description'(value) {
      if (value) {
        this.errors.description = '';
      }
    },
    'product.price'(value) {
      if (value) {
        this.errors.price = '';
      }
    },
  },
  methods: {
    validation() {
      this.resetErrors();

      if (!this.product.title) {
        this.errors.title = 'Enter Product Title';
      }

      if (!this.product.description) {
        this.errors.description = 'Enter Product Description';
      }

      if (!this.product.price) {
        this.errors.price = 'Enter Price of Product';
      }

      if (!this.errors.title && !this.errors.description && !this.errors.price) {
        this.handleSubmit();
      }
    },
    async handleSubmit() {
      try {
        if (this.isEdit) {
          this.product.id = String(this.product.id);
          const res = await updateProduct(this.product.id, this.product);
          console.log(res);
          alert("Product Updated Successfully");
        } else {
          const res = await addProduct(this.product);
          console.log(res);
          alert("Product Added Successfully");
        }
      } catch (error) {
        console.error("Failed to update product:", error);
      }
    },
    gobackToHome() {
      this.$router.push('/');
    },
    resetErrors() {
      this.errors = {
        title: '',
        description: '',
        price: '',
      };
    }
  }
}
</script>

<style scoped>
.main-container {
  width: 100%;
  padding: 50px 7px;
  box-sizing: border-box;
}

.close {
  position: absolute;
  color: red;
  font-size: 25px;
  right: 20px;
  top: 20px;
  cursor: pointer;
}

form div {
  margin-bottom: 1em;
}

h1 {
  color: green;
  margin: 10px 0;
  text-align: center;
}

label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bolder;
  color: green;
  margin-left: 10px;
}

input,
textarea {
  width: 100%;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: #eeeeee;
  padding: 10px 20px;
  border-radius: 10px;
  resize: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

button {
  padding: 0.6em 1em;
  color: rgb(1, 154, 1);
  border: none;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  box-sizing: border-box;
  background-color: transparent;
  border: 1px dashed rgb(1, 154, 1);
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
}
button:hover{
  color: white;
  background-color: rgb(1, 154, 1);
  border: none;
  transition: .2s ease-in-out;
}
.form-cont {
  width: 60%;
  margin: auto;
  background-color: #F9F9F9;
  padding: 30px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 0.5px solid #e5e5e5;
  position: relative;
}

span {
  color: red;
  font-size: 12px;
  margin-left: 10px;
}
</style>
