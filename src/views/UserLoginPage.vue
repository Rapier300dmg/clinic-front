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
  name: 'UserLoginPage',
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
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/auth/login`, {
        email: this.email,
        password: this.password
      });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role || '');

        this.$router.push({ name: 'Home' }).then(() => {
          window.location.reload();
        });
      } catch (err) {
        console.error('Ошибка логина:', err.response);
        this.error = err.response?.data?.message || 'Ошибка входа';
      }
    }
  }
}
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: -200px auto 3rem auto;
  padding: 4rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  color: black;
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

input, button {
  display: block;
  width: 100%;
  margin: 1rem 0;
  padding: 0.8rem;
  font-size: 1rem;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
