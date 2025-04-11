<template>
  <div class="form-container">
    <h2>Регистрация</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="name" type="text" placeholder="Имя" required />
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
      name: '',
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
        await axios.post('http://localhost:3000/api/auth/register/user', {
          name: this.name,
          email: this.email,
          password: this.password
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
  max-width: 500px;               /* Увеличенная ширина формы */
  margin: -200px auto 3rem auto;     /* Верхний отступ 50px, горизонтальное центрирование, нижний отступ 2rem */
  padding: 3rem;                  /* Увеличенный внутренний отступ для "коробки" */
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  color: black;
  
  /* Используем flex для расположения элементов по столбцу от верха к низу */
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

