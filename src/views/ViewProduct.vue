<template>
    <div>
        <!-- this is container having card-->
        <div class="container">
            <!-- the view-card having product details-->
            <div class="view-card">
                <div class="img">
                    <img :src="product.thumbnail" alt="" style="width: 100%;">
                </div>
                <div class="details">
                    <h1>{{ product.title }}</h1>
                    <span>{{ product.description }}</span>
                    <span><b>Price: {{ product.price }} $</b> </span>
                    <span> <b>Brand:</b> {{ product.brand }} </span>
                    <span> <b>Stock:</b> {{ product.availabilityStatus }} </span>
                    <span> <b>Rating:</b> {{ product.rating }} </span>

                    <div class="quantity-field">
                        <button @click="decreaseQuantity"><i class="fa-solid fa-minus"></i></button>
                        <input type="number" v-model.number="quantity" @input="updateQuantity($event.target.value)">
                        <button @click="increaseQuantity"><i class="fa-solid fa-plus"></i></button>
                    </div>

                    <p>Total Price: {{ product.price * quantity }}</p>
                    <!-- Button component import from ButtonComponent take a 
                 props background color and with of button and inner html puts in slot-->
                    <div class="btn-wrapper">
                        <button @click="userAuthenticate" class="add-cart-btn">
                            <p>Add to cart</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getSingleProduct, getCartByUserID, addNewCart, updateCart, getCurrentAuthUser } from '../services/API.js';
import { LocalStorageMixin } from '@/mixins/LocalStorageMixin.js';
import ButtonComponent from '../components/ButtonComponent.vue';

export default {
    name: 'ViewProduct',
    mixins: [LocalStorageMixin],
    components: {
        ButtonComponent,
    },
    props: {
        id: {
            required: true,
        }
    },

    data() {
        return {
            product: {},
            cartDetails: {},
            quantity: 1,
            totalPrice: null,
        }
    },
    created() {
        const isActive = this.getItemFromLocalStorage('isActive');
        console.log(isActive);
    },
    // beforeDestroy() {
    //     isActive = false
    // },
    watch: {
        quantity(newQuantity) {
            if (newQuantity < 1) {
                this.quantity = 1;
            }
        }
    },
    async created() {
        try {
            const viewSingleProduct = await getSingleProduct(this.id);
            this.product = viewSingleProduct.data;
            this.product.quantity = 1; // default quantity
        } catch (error) {
            console.error("Product View Error", error);
        }
    },
    methods: {
        async userAuthenticate() {
            const userToken = this.getItemFromLocalStorage('userToken');
            const headers = {
                Authorization: `Bearer ${userToken.token}`
            };

            try {
                const response = await getCurrentAuthUser(headers);
                const data = response.data;

                this.AddtoCart();
            } catch (error) {
                console.error("Not Authenticate OR token Expired", error);
                alert("login required")

            }
        },

        async AddtoCart() {
            const userDetails = this.getItemFromLocalStorage('userDetails');
            let cartsData = this.getItemFromLocalStorage('cartsData');
            const headers = {
                'Content-Type': 'application/json'
            };

            if (!cartsData || !cartsData.products || cartsData.products.length === 0) {
                try {
                    const body = {
                        userId: userDetails.id,
                        products: [
                            {
                                id: this.id,
                                quantity: this.quantity,
                            }
                        ]
                    };
                    const response = await addNewCart(body, headers);
                    cartsData = response.data;
                    console.log("New cart created:", response.data);
                    this.setItemInLocalStorage('cartsData', cartsData);
                    alert("New cart created and product added");
                } catch (error) {
                    console.error("Failed to create new cart", error);
                }
                return;
            }

            const cartId = cartsData.id;
            console.log("this is cart id", cartId);

            const body = {
                merge: true,
                userId: userDetails.id,
                products: [
                    {
                        id: this.id,
                        quantity: this.quantity,
                    }
                ]
            };

            try {
                const response = await updateCart(cartId, body, headers);
                const updatedCartsData = response.data;
                console.log(response.data);
                alert("Product added to cart");
                this.setItemInLocalStorage('cartsData', updatedCartsData);
            } catch (error) {
                console.error("Cart Data Not updated", error);
            }
        },
        increaseQuantity() {
            if (this.quantity && this.quantity < 5)
                this.quantity++;
        },
        decreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },
        updateQuantity(value) {
            let newValue = parseInt(value, 10);
            if (newValue < 1) {
                this.quantity = 1;
            } else {
                this.quantity = newValue;
            }
        },
    }
}
</script>

<style>
* {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 80px;
}

.view-card {
    border: 1px solid rgba(10, 58, 10, 0.404);
    width: 70%;
    height: 500px;
    padding: 20px;
    display: flex;
    box-sizing: border-box;
    border-radius: 20px;
    position: relative;
}

.img {
    width: 30%;
    margin-right: 10px;
}

.details {
    width: 70%;
    margin: 0 10px;
    box-sizing: border-box;
}

.details h1 {
    margin: 10px 0;
}

.details span {
    margin: 10px 0;
    display: block;
    font-size: 20px;
}

.quantity-field {
    width: 150px;
    display: flex;
    border: 1px solid green;
    border-radius: 30px;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 6px 10px;
}

.quantity-field button {
    background-color: transparent;
    border: none;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    color: rgb(1, 154, 1);
}

.quantity-field input {
    width: 100px;
    border: none;
    padding: 5px 0;
    text-align: center;
}

.quantity-field input:focus {
    outline: none;
}

.quantity-field input::-webkit-outer-spin-button,
.quantity-field input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.btn-wrapper {
    position: absolute;
    width: 50%;
    bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.add-cart-btn {
    width: 300px;
    background-color: transparent;
    border: 1px dashed rgb(1, 154, 1);
    padding: 10px;
    border-radius: 30px;
    cursor: pointer;
    font-size: 16px;
    box-sizing: border-box;
    font-weight: 700;
    color: green;
}

.add-cart-btn:hover {
    background-color: rgb(1, 154, 1);
    border: none;
    color: #fff;
    transition: .2s ease-in-out;
}
</style>
