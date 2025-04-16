<template>
  <div>
    <h2>Мои записи</h2>
    <ul v-if="appointments.length">
      <li v-for="appointment in appointments" :key="appointment._id">
        {{ formatDate(appointment.appointmentTime) }} с доктором {{ appointment.doctorName }}
      </li>
    </ul>
    <p v-else>Нет доступных записей.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PatientAppointments',
  data() {
    return {
      appointments: [],
    };
  },
  methods: {
    async fetchAppointments() {
      try {
        const patientId = localStorage.getItem('userId'); // Убедись, что userId сохранён в localStorage
        const response = await axios.get(`https://clinic-system-amwk.onrender.com/appointment/patient/${patientId}`);
        this.appointments = response.data;
      } catch (error) {
        console.error('Ошибка при получении записей:', error);
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('ru-RU', options);
    },
  },
  mounted() {
    this.fetchAppointments();
  },
};
</script>


<style scoped>
.patient-appointments {
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
}
.loading,
.error,
.no-appointments {
  text-align: center;
  margin: 1rem 0;
}
.appointments-list {
  list-style: none;
  padding: 0;
}
.appointment-item {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
}
.appointment-item p {
  margin: 0.2rem 0;
}
</style>
