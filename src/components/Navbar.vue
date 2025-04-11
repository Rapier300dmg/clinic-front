<template>
  <nav class="navbar">
    <router-link to="/" class="nav-logo">МедСистема</router-link>
    <div class="nav-links">
      <router-link to="/">Главная</router-link>
      <!-- Показываем для неавторизованных -->
      <router-link v-if="!isAuthenticated" to="/login">Войти</router-link>
      <router-link v-if="!isAuthenticated" to="/register">Регистрация</router-link>
      <!-- Показываем для авторизованных -->
      <router-link v-if="isAuthenticated" to="/profile">Мой профиль</router-link>
      <button v-if="isAuthenticated" @click="logout">Выйти</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'MainNavbar',
  computed: {
    isAuthenticated() {
      // Пока просто проверяем наличие токена в localStorage
      return !!localStorage.getItem('token')
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #007bff;
  align-items: center;
  color: white;
}
.nav-logo {
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}
.nav-links {
  display: flex;
  align-items: center;
}
.nav-links a,
.nav-links button {
  margin-left: 1rem;
  color: white;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}
.nav-links button:hover,
.nav-links a:hover {
  text-decoration: underline;
}
</style>
