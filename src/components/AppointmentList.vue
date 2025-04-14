<template>
  <div class="appointments-list">
    <h1 v-if="!appointmentId">Ваши записи</h1>
    <h1 v-else>Детали записи</h1>

    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <div v-else>
      <ul v-if="appointments.length">
        <li
          v-for="appointment in appointments"
          :key="appointment._id || appointment.id"
        >
          <p><strong>Дата и время:</strong> {{ appointment.appointmentTime }}</p>
          <p><strong>ID врача:</strong> {{ appointment.doctorId }}</p>
          <p v-if="appointment.patientId">
            <strong>ID пациента:</strong> {{ appointment.patientId }}
          </p>
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
      appointments: [],
      error: ''
    }
  },
  computed: {
    appointmentId() {
      return this.$route.params.appointmentId || null
    }
  },
  async created() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.error = 'Пользователь не авторизован'
      return
    }

    try {
      let res
      if (this.appointmentId) {
        res = await axios.get(
          `${process.env.VUE_APP_API_URL}/appointment/${this.appointmentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        this.appointments = [res.data]
      } else {
        const role = localStorage.getItem('role')
        const idKey = role === 'doctor' ? 'doctorId' : 'userId'
        const id = localStorage.getItem(idKey)
        if (!id) throw new Error('Не удалось определить идентификатор пользователя')

        const endpoint =
          role === 'doctor'
            ? `/appointment/doctor/${id}`
            : `/appointment/patient/${id}`

        res = await axios.get(
          `${process.env.VUE_APP_API_URL}${endpoint}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        this.appointments = res.data
      }
    } catch (err) {
      console.error('Ошибка загрузки записей:', err)
      this.error =
        err.response?.data?.message || err.message || 'Ошибка загрузки записей'
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
