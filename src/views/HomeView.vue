<script setup lang="ts">
import { useUtilStore } from '@/stores/utils';
import { ref } from 'vue';
import TheWelcome from '../components/TheWelcome.vue'

const isLoggedIn = ref(useUtilStore().isLoggedIn);
</script>

<template>
  <main>
    <TheWelcome />
    <router-link v-if="!isLoggedIn" to="/login"><button>Login</button></router-link>
  </main>
</template>
