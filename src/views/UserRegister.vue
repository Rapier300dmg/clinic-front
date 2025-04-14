<template>
  <div class="form-container">
    <h2>Регистрация</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="firstName" type="text" placeholder="Имя" required />
      <input v-model="lastName" type="text" placeholder="Фамилия" required />
      <input v-model="age" type="number" placeholder="Возраст" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <input v-model="confirmPassword" type="password" placeholder="Подтвердите пароль" required />
      <button type="submit">Зарегистрироваться</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserRegisterPage',
  data() {
    return {
      firstName: '',
      lastName: '',
      age: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: ''
    }
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        this.error = 'Пароли не совпадают'
        return
      }
      try {
        await axios.post(`${process.env.VUE_APP_API_URL}/auth/register/user`, {
          firstName: this.firstName,
          lastName: this.lastName,
          age: Number(this.age),
          email: this.email,
          password: this.password,
          isManager: false
        })
        this.$router.push('/login')
      } catch (err) {
        this.error = err.response?.data?.message || 'Ошибка регистрации'
      }
    }
  }
}
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: -200px auto 3rem auto;
  padding: 3rem;
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
