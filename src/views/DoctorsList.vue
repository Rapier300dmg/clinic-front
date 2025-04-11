<template>
  <div class="doctor-list">
    <h1>Список врачей</h1>

    <ul v-if="doctors.length">
      <li v-for="doctor in doctors" :key="doctor.id">
        <strong>{{ doctor.name }}</strong> — {{ doctor.specialization }}
        <router-link :to="`/doctors/${doctor.id}`" class="more-link">Подробнее</router-link>
      </li>
    </ul>

    <p v-else>Загрузка списка врачей...</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DoctorsListPage',
  data() {
    return {
      doctors: []
    }
  },
  async mounted() {
    try {
      const res = await axios.get('http://localhost:3000/api/doctors')
      this.doctors = res.data
    } catch (err) {
      console.error('Ошибка загрузки врачей:', err)
    }
  }
}
</script>

<style scoped>
.doctor-list {
  max-width: 600px;
  margin: 2rem auto;
  background: white;
  padding: 2rem;
  border-radius: 10px;
}

.more-link {
  margin-left: 1rem;
  color: #007bff;
  text-decoration: underline;
}
</style>
