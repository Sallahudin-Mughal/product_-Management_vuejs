<template>
    <div>
        <div class="nav">

            <div>
                <h1>Big Deals</h1>
            </div>


            <div class="btns">
                <ButtonComponent backColor="darkgreen" buttonWidth="100px" @click="goToLogin">
                    <i class="fa-solid fa-user" style="margin: 0 7px;"></i>
                    <p>Login</p>
                    </ButtonComponent>
                    
                    <ButtonComponent backColor="red" buttonWidth="100px" @click="Logout">
                    <i class="fa-solid fa-right-from-bracket" style="margin: 0 7px;"></i>
                    <p>Logout</p>
                </ButtonComponent>
            </div>

        </div>
    </div>
</template>

<script>
// import AddNewProduct from './AddNewProduct.vue';
import { LocalStorageMixin } from '../mixins/LocalStorageMixin';
import ButtonComponent from './ButtonComponent.vue';

export default {
    name: 'Header',
    components: {
        ButtonComponent,
    },
    methods: {
        goToLogin() {
            // const userDetails = this.getItemFromLocalStorage('userDetails')
            // if(userDetails){
            // }
            this.$router.push('/login')
        },
        Logout() {
            localStorage.removeItem('userDetails')
            localStorage.removeItem('userToken')
            localStorage.removeItem('cartsData')
            localStorage.removeItem('isActive')
            this.$router.push('/login')

        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
}

.nav {
    background-color: green;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 0px 30px;
    color: #fff;

}

.btns {
    display: flex;
}
</style>