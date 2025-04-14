<template>
    <div class="manager-register-doctors">
      <h1>Регистрация нового врача</h1>
      <form @submit.prevent="registerDoctor" class="register-form">
        <div class="form-group">
          <label for="name">Имя врача</label>
          <input id="name" v-model="doctorName" type="text" placeholder="string" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" placeholder="example@mail.kz" required />
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input id="password" v-model="password" type="password" placeholder="string" required />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Подтвердите пароль</label>
          <input id="confirmPassword" v-model="confirmPassword" type="password" placeholder="string" required />
        </div>
        <div class="form-group">
          <label for="speciality">Специализация</label>
          <input id="speciality" v-model="speciality" type="text" placeholder="Кардиолог" required />
        </div>
        <div class="form-group">
          <label for="experience">Стаж (лет)</label>
          <input id="experience" v-model.number="experience" type="number" min="0" placeholder="10" required />
        </div>
        <button type="submit" class="btn-submit">Зарегистрировать</button>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'ManagerRegisterDoctors',
    data() {
      return {
        doctorName: '',
        email: '',
        password: '',
        confirmPassword: '',
        speciality: '',
        experience: null,
        successMessage: '',
        errorMessage: ''
      }
    },
    methods: {
      async registerDoctor() {
        this.successMessage = ''
        this.errorMessage = ''
        if (this.password !== this.confirmPassword) {
          this.errorMessage = 'Пароли не совпадают'
          return
        }
        try {
          const token = localStorage.getItem('token')
          const payload = {
            doctorName: this.doctorName,
            email: this.email,
            password: this.password,
            speciality: {
              speciality: this.speciality,
              experience: this.experience
            }
          }
          await axios.post(`${process.env.VUE_APP_API_URL}/auth/register/doctor`, payload, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
          this.successMessage = 'Врач успешно зарегистрирован'
          // Сброс полей формы
          this.doctorName = ''
          this.email = ''
          this.password = ''
          this.confirmPassword = ''
          this.speciality = ''
          this.experience = null
        } catch (err) {
          this.errorMessage = err.response?.data?.message || 'Не удалось зарегистрировать врача'
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Стили аналогичны предыдущим формам */
  .manager-register-doctors {
    max-width: 500px;
    margin: 2rem auto;
    padding: 1.5rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
  .manager-register-doctors h1 {
    text-align: center;
    margin-bottom: 1rem;
  }
  .register-form .form-group {
    margin-bottom: 1rem;
  }
  .register-form label {
    display: block;
    margin-bottom: 0.3rem;
    font-weight: bold;
  }
  .register-form input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .btn-submit {
    width: 100%;
    padding: 0.6rem;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }
  .btn-submit:hover {
    background: #0056b3;
  }
  .success {
    margin-top: 1rem;
    color: #28a745;
    text-align: center;
  }
  .error {
    margin-top: 1rem;
    color: #dc3545;
    text-align: center;
  }
  </style>
  