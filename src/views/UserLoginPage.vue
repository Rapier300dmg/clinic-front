<template>
  <div class="form-container">
    <h2>Вход</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <button type="submit">Войти</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password
        });

        // Пример: сохраняем токен и редиректим
        localStorage.setItem('token', response.data.token);
        this.$router.push('/profile');
      } catch (err) {
        this.error = err.response?.data?.message || 'Ошибка входа';
      }
    }
  }
}
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
}
input, button {
  display: block;
  width: 100%;
  margin: 1rem 0;
  padding: 0.8rem;
}
.error {
  color: red;
}
</style>
