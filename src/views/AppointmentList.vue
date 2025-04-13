<template>
  <div class="appointments-list">
    <h1>Ваши записи</h1>
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    <div v-else>
      <ul v-if="appointments.length">
        <li v-for="appointment in appointments" :key="appointment._id || appointment.id">
          <p><strong>Дата и время:</strong> {{ appointment.appointmentTime }}</p>
          <p><strong>ID врача:</strong> {{ appointment.doctorId }}</p>
          <!-- Дополнительно можно вывести статус записи или другие детали -->
        </li>
      </ul>
      <p v-else>Записи не найдены.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AppointmentList',
  data() {
    return {
      appointments: [], // Исправлено название свойства
      error: ''
    }
  },
  async created() {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error("Пользователь не авторизован")
      }
      const role = localStorage.getItem('role')
      const id = localStorage.getItem(role === 'doctor' ? 'doctorId' : 'userId')
      if (!id) {
        throw new Error("Не удалось определить идентификатор пользователя")
      }
      let endpoint = ''
      if (role === 'doctor') {
        endpoint = `${process.env.VUE_APP_API_URL}/appointment/doctor/${id}`
      } else {
        endpoint = `${process.env.VUE_APP_API_URL}/appointment/patient/${id}`
      }
      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      })
      this.appointments = res.data
    } catch (err) {
      console.error("Ошибка загрузки записей:", err)
      this.error = err.response?.data?.message || err.message || "Ошибка загрузки записей"
    }
  }
}
</script>

<style scoped>
.appointments-list {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

.appointments-list h1 {
  text-align: center;
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.error {
  color: red;
  text-align: center;
}
</style>
