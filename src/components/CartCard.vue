<template>
    <div>
        <div class="cart-card">
            <div class="img">
                <img :src="cart.thumbnail" alt="" style="height: 100%;">
            </div>
            <div class="title">
                <p>{{ cart.title }}</p>
            </div>
            <div class="title">
                <p>{{ cart.quantity }}</p>
            </div>
            <div class="title">
                <p>{{ cart.price }} $</p>
            </div>
            <div class="title">
                <p><strong>Sub Total:</strong> {{ cart.total }} $</p>
            </div>
            
        </div>
    </div>
</template>

<script>

export default {
    name: 'CartCard',
    props: {
        cart: {
            type: Object,
        }
    }
}
</script>

<style scoped>
* {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.cart-card {
    display: flex;
    align-items: center;
    width: 100%;
    height: 150px;
    border-bottom: 1px solid green;
    padding: 20px;
    box-sizing: border-box;
}

.img {
    width: 200px;
    height: 100%;
}

.title {
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>