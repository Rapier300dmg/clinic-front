<template>
  <nav class="navbar">
    <!-- Логотип или ссылка на главную -->
    <router-link to="/" class="nav-logo">МедСистема</router-link>
    
    <!-- Навигационные ссылки -->
    <div class="nav-links">
      <router-link to="/">Главная</router-link>
      <!-- Если пользователь не авторизован, показываем Логин и Регистрацию -->
      <router-link v-if="!isAuthenticated" to="/login">Войти</router-link>
      <router-link v-if="!isAuthenticated" to="/register">Регистрация</router-link>
      <!-- Если пользователь авторизован, показываем ссылку на Профиль -->
      <router-link v-if="isAuthenticated" to="/profile">Профиль</router-link>
      <button v-if="isAuthenticated" @click="logout">Выход</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'MainNavbar',
  computed: {
    isAuthenticated() {
      // Пользователь считается авторизованным, если в localStorage есть токен
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      // При выходе перенаправляем на главную страницу
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #007bff;
  color: #fff;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-links a,
.nav-links button {
  color: #fff;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.nav-links a:hover,
.nav-links button:hover {
  text-decoration: underline;
}
</style>
