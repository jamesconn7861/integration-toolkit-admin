<script lang="ts">
import { useUtilStore } from '@/stores/utils';
import type { AxiosInstance, AxiosResponse } from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
    data: () => {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        login() {
            const axiosInst: AxiosInstance = useUtilStore().axiosInst;

            const axiosBody: {} = this.username.includes('@') ? {
                email: this.username,
                password: this.password
            } : {
                username: this.username,
                password: this.password
            }

            axiosInst.post('/auth/signin', axiosBody)
                .then((res: AxiosResponse) => {
                    const { user, access_token } = res.data;
                    useUtilStore().setUser = user;
                    useUtilStore().setToken = access_token;

                    console.log('Login successful.');

                    this.$router.push({ name: 'about' });
                }, (rej: any) => {
                    console.log('Incorrect credentials');
                })
        }
    }
});
</script>

<template>
    <div>
        <h1>LOGIN</h1>
        <form @submit.prevent="login">
            <input v-model="username" placeholder="username" />
            <br />
            <br />
            <input v-model="password" placeholder="password" type="password" />
            <br />
            <br />
            <button type="submit">Login</button>
        </form>
    </div>
</template>