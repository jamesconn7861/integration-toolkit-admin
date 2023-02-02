<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useUtilStore } from './stores/utils';
import LoadingComponent from './components/Loading.vue';

const router = useRouter();

function handleLogout(_e: MouseEvent) {
  useUtilStore().setToken(undefined);
  useUtilStore().setUser(undefined);
  document.cookie =
    'access_token' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

  router.push('/login');
}
</script>

<template>
  <nav>
    <RouterLink to="/home" class="nav-link">Home</RouterLink>
    <RouterLink to="/vlans" class="nav-link">Vlans</RouterLink>
    <RouterLink to="/benches" class="nav-link">Benches</RouterLink>
    <RouterLink to="/login" class="nav-link" v-if="!useUtilStore().isLoggedIn"
      >Login</RouterLink
    >
    <button
      class="nav-link"
      v-if="useUtilStore().isLoggedIn"
      @click="handleLogout"
      id="logout"
    >
      Logout
    </button>
  </nav>
  <RouterView v-slot="{ Component }">
    <Suspense timeout="0">
      <template #default>
        <component :is="Component" :key="$route.path"></component>
      </template>
      <template #fallback>
        <LoadingComponent />
      </template>
    </Suspense>
  </RouterView>
</template>

<style scoped>
nav {
  width: 100%;
  font-size: 24px;
  text-align: left;
  position: sticky;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

#logout {
  border: 0px;
  background: transparent;
  text-decoration: none;
  color: #00bd7e;
  transition: 0.4s;
  font-size: 24px;
  padding: 0 1rem;
  height: 100%;
  border-left: 1px solid var(--color-border);
}

#logout:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
  cursor: pointer;
}
</style>
