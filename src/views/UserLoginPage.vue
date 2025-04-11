<template>
  <div class="form-container">
    <h2>Вход</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="login" type="text" placeholder="Логин" required />
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
      login: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          login: this.login,  
          password: this.password
        });
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
  max-width: 500px;               /* Увеличенная ширина формы */
  margin: -200px auto 3rem auto;     /* Верхний отступ 50px, горизонтальное центрирование, нижний отступ 2rem */
  padding: 4rem;                  /* Увеличенный внутренний отступ для "коробки" */
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  color: black;
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;        /* Выравниваем по левому краю, а не по центру */
  text-align: left;               /* Текст выравнивается по левому краю */
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

