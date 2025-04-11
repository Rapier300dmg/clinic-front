<template>
  <div class="profile-container">
    <h2>Профиль пользователя</h2>

    <div v-if="user">
      <p><strong>Имя:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Роль:</strong> {{ user.role }}</p>
    </div>

    <div v-if="appointments.length">
      <h3>Ваши записи:</h3>
      <ul>
        <li v-for="appointment in appointments" :key="appointment.id">
          Врач: {{ appointment.doctorName || appointment.doctor?.name }},
          Дата: {{ appointment.date }},
          Время: {{ appointment.time }}
        </li>
      </ul>
    </div>

    <div v-if="!appointments.length && user">
      <p>У вас пока нет записей.</p>
    </div>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserProfilePage',
  data() {
    return {
      user: null,
      appointments: [],
      error: ''
    }
  },
  async mounted() {
    try {
      const token = localStorage.getItem('token');

      // Получаем пользователя
      const userRes = await axios.get('http://localhost:3000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.user = userRes.data;

      // Получаем записи по ID
      const appRes = await axios.get(`http://localhost:3000/api/appointments/${this.user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.appointments = appRes.data;

    } catch (err) {
      this.error = err.response?.data?.message || 'Ошибка загрузки профиля';
    }
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 2rem auto;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>
