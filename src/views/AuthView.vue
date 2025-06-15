<script setup lang="ts">
</script>

<template>
  <div class="Auth-view">
    <nav class="auth-view__nav">
      <RouterLink :to="{ name: 'login' }">Login</RouterLink>
      <RouterLink :to="{ name: 'register' }">Register</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>