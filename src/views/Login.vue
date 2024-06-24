<template>
    <div style="width: 100%;">
        <div class="form-container">
            <form @submit.prevent="validateForm">
                <h2>Login Form</h2>
                <input type="text" name="username" placeholder="Enter username" v-model="username">

                <p class="error">{{ errors.username }}</p>

                <input type="password" name="password" placeholder="Enter password" v-model="password">

                <p class="error">{{ errors.password }}</p>

                <button type="submit">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
import { LocalStorageMixin } from '../mixins/LocalStorageMixin.js';
import { getAuthLogin, refreshToken } from '../services/API.js';
export default {
    name: "LoginForm",
    mixins: [LocalStorageMixin],
    components: {
        // BaseInput,
    },
    data() {
        return {
            username: "",
            password: "",
            errors: {
                username: "",
                password: "",
            },
            isActive: false
        };
    },
    watch: {
        username(value) {
            if (value) {
                this.errors.username = '';
            }
        },
        password(value) {
            if (value) {
                this.errors.password = '';
            }
        },
    },
    methods: {
        validateForm() {
            this.resetErrors();

            if (!this.username) {
                this.errors.username = 'Username is required'
            }
            if (!this.password) {
                this.errors.password = 'Password is required'
            }

            if (!this.errors.username && !this.errors.password) {
                this.Login()
            }
        },
        async Login() {

            const user = {
                username: this.username,
                password: this.password,
                expireInMins: 30,
            }
            const headers = { 'Content-Type': 'application/json' }



            try {
                const response = await getAuthLogin(headers, user)
                this.users = response.data

                this.isActive = true

                const userDetails = {
                    userId: this.users.id,
                    UserName: this.users.username,
                }
                const userToken = {
                    token: this.users.token,
                    refreshToken: this.users.refreshToken,
                }

                this.setItemInLocalStorage('userDetails', userDetails)
                this.setItemInLocalStorage('userToken', userToken)
                this.setItemInLocalStorage('isActive',this.isActive)


                this.$router.push('/')

            } catch (error) {
                console.error("Featching user Error", error)
            }
        },
        resetErrors() {
            this.errors = {
                username: '',
                password: '',
            }
        }
    },
};
</script>

<style scoped>
.form-container {
    margin-top: 40px;
}

form {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    border: 1px solid green;
    height: 400px;
    width: 350px;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

form input {
    width: 300px;
    padding: 10px;
    margin: 10px auto;
}

button {
    padding: 10px;
    margin-top: 20px;
}

.form-container {
    width: 100%;

}

.error {
    color: red;
    margin-left: 30px;
}
</style>