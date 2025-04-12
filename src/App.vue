<template>
  <MainNavbar />
  <div class="content">
    <router-view />
  </div>
</template>

<script>
import MainNavbar from '@/components/Navbar.vue'
export default {
  name: 'App',
  components: {
    MainNavbar
  }
}
</script>

<style>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px); /* 100vh минус высота Navbar (примерно) */
  padding: 1rem;
}
</style>
