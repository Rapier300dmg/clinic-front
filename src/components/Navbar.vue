<template>
  <nav class="navbar">
    <!-- Левая часть: кнопка переключения темы -->
    <div class="nav-left">
      <div id="theme-toggle" @click="toggleDarkMode">
        <span>{{ darkMode ? 'темный' : 'светлый' }}</span>
      </div>
    </div>

    <!-- Центр: заголовок, выровненный по центру -->
    <div class="nav-center">
      <router-link to="/" class="nav-logo">МедСистема</router-link>
    </div>

    <!-- Правая часть: ссылки навигации -->
    <div class="nav-right">
      <router-link to="/">Главная</router-link>
      <router-link v-if="!isAuthenticated" to="/login">Войти</router-link>
      <router-link v-if="!isAuthenticated" to="/register">Регистрация</router-link>
      <router-link v-if="isAuthenticated" to="/profile">Мой профиль</router-link>
      <button v-if="isAuthenticated" @click="logout">Выйти</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'MainNavbar',
  data() {
    return {
      darkMode: false
    }
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token')
    }
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      if (this.darkMode) {
        document.body.classList.add('dark-mode')
      } else {
        document.body.classList.remove('dark-mode')
      }
    },
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
  align-items: center;
  padding: 1rem 2rem;
  background-color: #007bff;
  color: #fff;
}

/* Разбиваем навбар на три части */
.nav-left, .nav-center, .nav-right {
  flex: 1;
}

/* Центрируем заголовок */
.nav-center {
  display: flex;
  justify-content: center;
}

.nav-left {
  display: flex;
  justify-content: flex-start;
}

.nav-right {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

/* Стили для логотипа */
.nav-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

/* Кнопка переключения темы */
#theme-toggle {
  cursor: pointer;
  background-color: #0056b3;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

/* Стили для ссылок и кнопок в правой части */
.nav-right a,
.nav-right button {
  color: #fff;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}
.nav-right a:hover, .nav-right button:hover {
  text-decoration: underline;
}
</style>
