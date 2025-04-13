<template>
    <div class="appointment-book">
      <h1>Запись к врачу</h1>
  
      <div v-if="doctor">
        <p><strong>Врач:</strong> {{ doctor.name }} ({{ doctor.specialization }})</p>
      </div>
  
      <div class="form-group">
        <label for="datetime">Дата и время приёма:</label>
        <input
          id="datetime"
          type="datetime-local"
          v-model="appointmentTime"
        />
      </div>
  
      <button
        class="btn-submit"
        :disabled="!appointmentTime"
        @click="submitAppointment"
      >
        Подтвердить запись
      </button>
  
      <p v-if="message" :class="{ success, error: !success }">
        {{ message }}
      </p>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'AppointmentButton',
    data() {
      return {
        doctor: null,
        appointmentTime: '',
        message: '',
        success: false,
        user: null
      }
    },
    async created() {
      const token = localStorage.getItem('token')
      const doctorId = this.$route.params.doctorId
      try {
        // Исправьте URL, убедившись, что он корректный:
        const resDoc = await axios.get(`https://clinic-system-amwk.onrender.com/doctor/${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        this.doctor = resDoc.data
      } catch (err) {
        console.error('Ошибка загрузки врача:', err)
      }
      try {
        // Обратите внимание: правильный URL для получения данных пользователя:
        const resUser = await axios.get(`https://clinic-system-amwk.onrender.com/user/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        this.user = resUser.data
        console.log('Получен пользователь:', this.user)
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
          console.log('Отправляем payload:', payload)
          await axios.post(
            'https://clinic-system-amwk.onrender.com/appointment',
            payload,
            { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
          )
          this.message = 'Запись успешно создана'
          this.success = true
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
  