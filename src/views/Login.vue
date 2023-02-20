<script lang="ts">
import { useUtilStore } from '@/stores/utils';
import type { AxiosInstance, AxiosResponse } from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    next: String,
  },
  setup(props) {
    props.next;
  },
  data: () => {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      const axiosInst: AxiosInstance = useUtilStore().axiosInst;

      const axiosBody: {} = this.username.includes('@')
        ? {
            email: this.username,
            password: this.password,
          }
        : {
            username: this.username,
            password: this.password,
          };

      axiosInst.post('/auth/signin', axiosBody).then(
        (res: AxiosResponse) => {
          const { user, access_token } = res.data;
          useUtilStore().setUser(user);
          useUtilStore().setToken(access_token);
          axiosInst.defaults.headers.common = {
            Authorization: `bearer ${access_token}`,
          };

          if (this.$route.redirectedFrom) {
            this.$router.push({ path: this.$route.redirectedFrom.path });
          } else {
            this.$router.push({ path: '/home' });
          }
        },
        (rej: any) => {
          alert('Incorrect credentials');
          console.log('Incorrect credentials');
        },
      );
    },
  },
});
</script>

<template>
  <div class="login-view">
    <div class="login-form-container">
      <h1 class="page-title">Login</h1>
      <form id="login-form" @submit.prevent="login">
        <input v-model="username" placeholder="username / email" />
        <input v-model="password" placeholder="password" type="password" />
        <button class="form-submit default-button" type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-view {
  margin: auto;
}

.page-title {
  margin-bottom: 25px;
}

#login-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
}

.form-submit {
  margin-top: 20px;
}

.form-submit:hover {
  background-color: skyblue;
}

input {
  font-size: 14px;
  border-radius: 5px;
  border: none;
  width: auto;
  min-height: 40px;
  padding: 15px;
  transition: all 0.2s;
  box-shadow: 5px 5px 5px 0px rgb(0 0 0 / 54%);
  min-width: 250px;
}

input:hover {
  background-color: #00bd7e;
}

input:focus {
  outline: none;
}
</style>
