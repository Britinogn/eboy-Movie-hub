<template>
    <div class="bg-indigo-900 min-h-screen flex items-center justify-center  p-34">

        <form class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md space-y-6 text-black" @submit.prevent="signup">
            <h1 class="text-3xl font-bold text-center    mb-6"> Sign Up </h1>

            <div class="flex flex-col">
                <label for="email" class="mb-2 text-sm font-medium ">Email:</label>
                <input
                id="email"
                v-model="email"
                type="email"
                required
                class="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div class="flex flex-col">
                <label for="password" class="mb-2 text-sm font-medium ">Password:</label>
                <input
                id="password"
                v-model="password"
                type="password"
                required
                class="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                class="w-full cursor-pointer py-2 px-4 bg-green-700  hover:bg-blue-700 text-white  font-semibold rounded transition duration-200"
                > 
                <span v-if="loading">Signing Up.....</span>
                <span v-else>Sign Up</span>
            </button>

            <p class="text-center mt-4 text-sm">
                Already have an account?
                <router-link to="/signin" class="text-blue-400 hover:underline">Sign In</router-link>
            </p>

            <p v-if="error" class="text-black text-center capitalize ">{{ error }}</p>

        </form>
        
    </div>
</template>

<script>
import  axios  from 'axios'
// import api from "../services/api";

export default{
    data() {
        return {
           email: '',
           password:'',
           error: '',
           loading: false 
        }
    },

    methods:{
        async signup() {
            this.loading = true;
            this.error = '';
        
            try {
              
                const res = await axios.post('https://reqres.in/api/register', 
                
                { 
                    email: this.email,
                    password: this.password 
                },
                
                {   
                     headers: {
                    'x-api-key': 'reqres-free-v1'
                    }
                });

                localStorage.setItem('token',res.data.token);
                this.$router.push('/dashboard')
                
            } catch (err) {
                // const err = error.response.data.error;
                // this.error = err;

                if (err.response && err.response.data && err.response.data.error) {
                        this.error = err.response.data.error;
                    
                    } else {
                        // Fallback for other types of errors (e.g., network issues)
                        this.error = 'An unexpected error occurred.';
                    }
            }finally{
                this.loading = false;
            }
        
        }
    }
}
</script>

