<template>
  <div class="doctor-profile">
    <h1>Профиль врача</h1>
    <div v-if="doctor">
      <p><strong>Имя:</strong> {{ doctor.doctorName }}</p>
      <p><strong>Email:</strong> {{ doctor.email }}</p>
      <p><strong>Специализация:</strong> {{ doctor.speciality.speciality }}</p>
      <p><strong>Стаж:</strong> {{ doctor.speciality.experience }} лет</p>
      <!-- Список записей -->
      <div class="appointments" v-if="appointments.length">
        <h2>Записи к вам</h2>
        <ul>
          <li v-for="appointment in appointments" :key="appointment.id">
            {{ appointment.appointmentTime }}
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>Загрузка профиля врача...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DoctorProfile',
  data() {
    return {
      doctor: null,
      appointments: [],
      error: ''
    }
  },
  async created() {
    const token = localStorage.getItem('token')
    const doctorId = localStorage.getItem('doctorId') 
    try {
      const resDoctor = await axios.get(`${process.env.VUE_APP_API_URL}/doctor/${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      this.doctor = resDoctor.data
      const resAppointments = await axios.get(`${process.env.VUE_APP_API_URL}/appointment/${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      this.appointments = resAppointments.data
    } catch (err) {
      console.error('Ошибка загрузки профиля врача:', err)
      this.error = err.response?.data?.message || 'Ошибка загрузки профиля'
    }
  }
}
</script>

<style scoped>
.doctor-profile {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
</style>
