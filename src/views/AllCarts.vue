<template>
    <div>
        <div class="cart-container">
            <div class="show-carts">
                <div class="closebtn">
                    <ButtonComponent backColor="red" buttonWidth="60px" @click="deleteCart">
                        <p>Delete</p>
                    </ButtonComponent>
                </div>
                <div v-if="loading">Loading...</div>
                <div v-else>
                    <CartCard v-for="cart in carts" :key="cart.id" :cart="cart" />
                    <div v-if="totalAmount>0" class="total"><strong>Total Amount:</strong> {{ totalAmount }} $</div>
                </div>

                <div>{{ emptyCart }}</div>

            </div>
        </div>
    </div>
</template>

<script>
import { getCurrentAuthUser, getCartByUserID, deleteCart, refreshToken } from '../services/API.js';
import { LocalStorageMixin } from '../mixins/LocalStorageMixin.js'
import CartCard from '../components/CartCard.vue'
import ButtonComponent from '../components/ButtonComponent.vue';

export default {

    name: 'AllCarts',
    mixins: [LocalStorageMixin],
    components: {
        CartCard,
        ButtonComponent
    },
    data() {
        return {
            carts: [],
            loading: true,
            emptyCart: '',
            isActive: false,
            totalAmount: '',
        }
    },
    created() {
        this.userAuthenticate()

    },
    methods: {
        /**
         * method Authenticate user if user logged in and token can't expire
         * if token can't expire get cart data of current uesr
         * 
         * @param none
         * @return  
         */
        async userAuthenticate() {
            const userToken = this.getItemFromLocalStorage('userToken')
            const headers = {
                Authorization: `Bearer ${userToken.token} `
            }

            try {
                const response = await getCurrentAuthUser(headers)
                const data = response.data

                this.getCartData()

            } catch (error) {

                console.error("Not Authenticate OR token Expired", error)
                const headers = {
                    'Content-Type': 'application/json'
                }
                const body = {
                    refreshToken: userToken.refreshToken,
                    expiresInMins: 30,
                }
                if (this.isActive) {
                    const response = refreshToken(body, headers)
                    console.log(response);
                }

            }
        },


        /**
         * method get current user cart data if data are stored in localStorage before API call
         * get the data and set into carts array and if not available fetch data from API
         * 
         * @param none
         * @return Object 
         */

        async getCartData() {
            const userDetails = this.getItemFromLocalStorage('userDetails')
            const cartsData = this.getItemFromLocalStorage('cartsData')
            // console.log("get from local", cartsData);
            
            
            try {
                
                if (cartsData) {
                    //if data already exsist in localStorage then set to the carts Array
                    this.carts = cartsData.products
                    this.totalAmount = cartsData.total
                    this.loading = false
                }
                else {
                    //if data not exsist in LocalStorage then fetch through API
                    const response = await getCartByUserID(userDetails.id)
                    const carts = response.data.carts[0]
                    this.carts = carts.product
                    this.loading = true;
                    this.setItemInLocalStorage('cartsData', carts)
                }
            } catch (error) {
                this.loading = false
                this.emptyCart = 'No items avaiable in cart'
                console.error("Cart Not fetching OR Not  items avaiva", error)
            }
        },


        /**
         * deleteCart method get carts ID from localStorgae and give to API
         * if the API respone is available means product delets and API hits for delete product
         * 
         * @param none
         * @return Array of Objects OR resposne of API
         */
        async deleteCart() {
            const cartsData = this.getItemFromLocalStorage('cartsData')
            if(cartsData){
                localStorage.removeItem('cartsData')
            try {
                const response = await deleteCart(cartsData.id)
                console.log(response);

            } catch (error) {
                console.error("Product Not Deleted", error)
            }
            }
        }

    }
}
</script>

<style scoped>
.cart-container {
    width: 100%;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 50px;
}

.show-carts {
    width: 70%;
    border: 1px solid rgba(43, 59, 43, 0.59);
    height: 100%;
    padding: 20px;
    margin: auto;
    box-sizing: border-box;
    overflow-y: scroll;
    border-radius: 30px;
}

.show-carts::-webkit-scrollbar {
    display: none;
}

.closebtn {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.total{
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px 50px;
    box-sizing: border-box;
}
</style>