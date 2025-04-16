<template>
  <div class="appointment-book">
    <h1>Подтверждение записи</h1>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">{{ success }}</div>

    <div class="form-group">
      <label for="appointmentTime">Дата и время:</label>
      <input
        type="datetime-local"
        id="appointmentTime"
        v-model="appointmentTime"
      />
    </div>

    <button @click="bookAppointment" :disabled="loading">
      {{ loading ? 'Отправка...' : 'Подтвердить запись' }}
    </button>
    <button @click="$router.back()" :disabled="loading">Отмена</button>
  </div>
</template>

<script>
import apiClient from '@/services/apiClient';

export default {
  name: 'AppointmentButton',
  props: ['doctorId'],
  data() {
    return {
      appointmentTime: '',
      loading: false,
      error: '',
      success: ''
    };
  },
  methods: {
    async bookAppointment() {
      if (!this.appointmentTime) {
        this.error = 'Выберите дату и время.';
        return;
      }
      this.loading = true;
      this.error = '';
      try {
        const patientId = localStorage.getItem('userId');
        const payload = {
          appointmentTime: new Date(this.appointmentTime).toISOString(),
          doctorId: this.doctorId,
          patientId
        };
        console.log('Booking payload:', payload);

        const res = await apiClient.post('/appointment', payload);
        console.log('Booking response full appointment:', res.data.appointment);

        const newAppointment = res.data.appointment;
        const newId = newAppointment._id || newAppointment.id;
        console.log('Extracted new appointment ID:', newId);

        if (!newId) {
          throw new Error('Не удалось получить ID созданной записи');
        }

        this.success = 'Запись успешно создана!';
        this.$router.push({
          name: 'AppointmentList',
          params: { appointmentId: newId }
        });
      } catch (err) {
        console.error('Booking error:', err.response?.data || err);
        this.error = err.response?.data?.message || 'Не удалось оформить запись.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.appointment-book { max-width: 500px; margin: 2rem auto; padding: 1rem; }
.form-group { margin-bottom: 1rem; }
.error { color: red; margin-bottom: 1rem; }
.success { color: green; margin-bottom: 1rem; }
button { margin-right: 0.5rem; }

.appointment-book {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.form-group input {
  padding: 0.4rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.error {
  color: red;
  margin-bottom: 1rem;
}

.success {
  color: green;
  margin-bottom: 1rem;
}

.btn-confirm,
.btn-back {
  margin: 0.5rem;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-confirm {
  background: #28a745;
  color: white;
}

.btn-confirm:hover {
  background: #218838;
}

.btn-back {
  background: #ccc;
  color: #333;
}

.btn-back:hover {
  background: #bbb;
}
</style>
