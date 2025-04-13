<template>
  <nav class="navbar">
    <router-link to="/" class="nav-logo">МедСистема</router-link>
    
    <div class="nav-links">
      <router-link to="/">Главная</router-link>

      <router-link v-if="isAuthenticated" to="/appointment" class="nav-link">Запись к врачу</router-link>
      <router-link v-if="isAuthenticated" to="/appointmentList">Ваши записи</router-link>
      <router-link v-if="!isAuthenticated" to="/login">Войти</router-link>
      <router-link v-if="!isAuthenticated" to="/register">Регистрация</router-link>

      <router-link v-if="isAuthenticated" to="/profile">Профиль</router-link>
      <button
        v-if="isAuthenticated"
        @click="logout"
        class="btn-logout"
      >Выход</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'MainNavbar',
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.$router.push({ name: 'Home' }).then(() => {
        window.location.reload();
      });
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

.btn-logout {
  padding: 0;
}

.nav-links a:hover,
.nav-links button:hover {
  text-decoration: underline;
}
</style>
