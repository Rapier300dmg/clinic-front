<template>
  <!-- Компонент отображается только если пользователь не доктор -->
  <div v-if="!isDoctor" class="appointment-book">
    <h1>Запись к врачу</h1>
    <div v-if="doctor">
      <p><strong>Врач:</strong> {{ doctor.name }} ({{ doctor.specialization }})</p>
    </div>
    <div class="form-group">
      <label for="datetime">Дата и время приёма:</label>
      <input id="datetime" type="datetime-local" v-model="appointmentTime" />
    </div>
    <button class="btn-submit" :disabled="!appointmentTime" @click="submitAppointment">
      Подтвердить запись
    </button>
    <p v-if="message" :class="{ success: success, error: !success }">
      {{ message }}
    </p>
    <div v-if="appointmentDetails">
      <h2>Детали записи</h2>
      <pre>{{ appointmentDetails }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { computed } from 'vue'
import { useAuthStore } from '@/store/authStore'  // если вы используете Pinia для аутентификации

export default {
  name: 'AppointmentButton',
  data() {
    return {
      doctor: null,
      appointmentTime: '',
      message: '',
      success: false,
      user: null,
      appointmentDetails: null
    }
  },
  setup() {
    // Если вы используете Pinia для хранения информации об аутентификации
    const authStore = useAuthStore()
    const isDoctor = computed(() => authStore.role === 'doctor')
    return { isDoctor }
  },
  async created() {
    const token = localStorage.getItem('token')
    const doctorId = this.$route.params.doctorId
    try {
      const resDoc = await axios.get(`${process.env.VUE_APP_API_URL}/doctor/${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      this.doctor = resDoc.data
    } catch (err) {
      console.error('Ошибка загрузки врача:', err)
      this.message = err.response?.data?.message || 'Ошибка загрузки врача'
    }
    try {
      const resUser = await axios.get(`${process.env.VUE_APP_API_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      this.user = resUser.data
    } catch (err) {
      console.error('Ошибка загрузки пользователя:', err)
      this.message = err.response?.data?.message || 'Ошибка загрузки профиля'
    }
  },
  methods: {
    async submitAppointment() {
      if (!this.appointmentTime) {
        this.message = 'Укажите дату и время приёма'
        return
      }
      const token = localStorage.getItem('token')
      try {
        const payload = {
          appointmentTime: new Date(this.appointmentTime).toISOString(),
          doctorId: this.doctor._id || this.doctor.id,
          patientId: this.user ? (this.user._id || this.user.id) : null
        }
        // Создаём запись
        const postRes = await axios.post(`${process.env.VUE_APP_API_URL}/appointment`, payload, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        })
        // Извлекаем ID созданной записи
        const appointmentId = postRes.data._id || postRes.data.id
        this.message = 'Запись успешно создана'
        this.success = true
        this.appointmentTime = ''

        // После создания делаем GET запрос по ID, чтобы получить полные данные записи
        if (appointmentId) {
          const getRes = await axios.get(`${process.env.VUE_APP_API_URL}/appointment/${appointmentId}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          this.appointmentDetails = getRes.data
        }
      } catch (err) {
        console.error('Ошибка при записи:', err.response || err)
        this.message = err.response?.data?.message || 'Не удалось записаться'
        this.success = false
      }
    }
  }
}
</script>

<style scoped>
.appointment-book {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  text-align: center;
}
.form-group {
  margin: 1rem 0;
  text-align: left;
}
label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
input[type="datetime-local"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.btn-submit {
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-submit:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.success {
  margin-top: 1rem;
  color: #28a745;
}
.error {
  margin-top: 1rem;
  color: #dc3545;
}
</style>
