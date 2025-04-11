<template>
  <div class="doctor-details" v-if="doctor">
    <h1>{{ doctor.name }}</h1>
    <p><strong>Специализация:</strong> {{ doctor.specialization }}</p>
    <p><strong>Email:</strong> {{ doctor.email }}</p>
    <router-link to="/">Назад к списку врачей</router-link>
  </div>
  <div v-else>
    <p>Загрузка информации...</p>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'

export default {
  name: 'DoctorDetailsPage',
  setup() {
    const route = useRoute()
    const doctor = ref(null)
    const error = ref('')

    onMounted(async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/doctors/${route.params.id}`)
        doctor.value = response.data
      } catch (err) {
        error.value = err.response?.data?.message || 'Ошибка при загрузке информации о враче'
      }
    })

    return { doctor, error }
  }
}
</script>

<style scoped>
.doctor-details {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  text-align: center;
}
</style>
