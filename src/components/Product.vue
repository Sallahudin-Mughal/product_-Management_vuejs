<template>
  <div>
    <div class="card" @click="viewProduct(product.id)">
      <img :src="product.thumbnail" class="image">
      <h3>{{ product.title }}</h3>
      <div class="description">{{ product.description }}</div>
      <b>{{ product.price }} $</b>
      <p><b>Brand: </b> {{ product.brand }}</p>
      <p><b>Rating: </b> {{ product.rating }}</p>

      <div class="buttons">
        <ButtonComponent buttonWidth="25px" backColor="transparent" @click.stop="$emit('edit-product', product)">
          <i class="fa-solid fa-pen-to-square" style="color: green; font-size: 20px;"></i>
        </ButtonComponent>
        <ButtonComponent buttonWidth="25px" backColor="transparent" @click.stop="$emit('delete-Product', product.id)">
          <i class="fa-solid fa-trash" style="color: red;font-size: 20px;"></i>
        </ButtonComponent>

      </div>
    </div>
  </div>
</template>

<script>
import ButtonComponent from './ButtonComponent.vue';

export default {
  name: 'Product',
  components: {
    ButtonComponent,
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    async viewProduct(id) {
      this.$router.push({ name: 'ViewProduct', params: { id } })
    },
  }
}
</script>

<style>
* {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.card {
  width: 300px;
  height: 500px;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: rgb(250, 249, 249);
  border: 0.5px solid rgba(123, 188, 123, 0.393);
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
}

.description {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 10px 0px;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  bottom: 10px;
  width: 90%;
}

.image {
  height: 50%;
  width: 100%;
}
</style>