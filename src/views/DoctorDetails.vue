<template>
  <div class="doctor-details">
    <h2>Информация о враче</h2>

    <div v-if="doctor">
      <p><strong>Имя:</strong> {{ doctor.name }}</p>
      <p><strong>Email:</strong> {{ doctor.email }}</p>
      <p><strong>Специализация:</strong> {{ doctor.specialization }}</p>
    </div>

    <div v-else-if="error">
      <p class="error">{{ error }}</p>
    </div>

    <div v-else>
      <p>Загрузка...</p>
    </div>
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
    const doctorId = route.params.id
    const doctor = ref(null)
    const error = ref('')

    onMounted(async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/doctors/${doctorId}`)
        doctor.value = res.data
      } catch (err) {
        error.value = err.response?.data?.message || 'Ошибка при загрузке врача'
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
  background: white;
  padding: 2rem;
  border-radius: 10px;
}
.error {
  color: red;
}
</style>
