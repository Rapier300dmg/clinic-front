<template>
  <div class="form-container">
    <h2>Регистрация пациента</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="name" type="text" placeholder="Имя" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <button type="submit">Зарегистрироваться</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async handleRegister() {
      try {
        await axios.post('http://localhost:3000/api/auth/register/user', {
          name: this.name,
          email: this.email,
          password: this.password
        });

        this.$router.push('/login');
      } catch (err) {
        this.error = err.response?.data?.message || 'Ошибка регистрации';
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
