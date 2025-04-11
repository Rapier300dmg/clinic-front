<template>
  <div class="home">
    <h1>Наши врачи</h1>
    <div class="doctors-list">
      <!-- Если у вас нет компонента DoctorProfile, либо создайте его, либо удалите эту часть -->
      <DoctorProfile
        v-for="doctor in doctors"
        :key="doctor.id"
        :doctor="doctor"
      />
    </div>
  </div>
</template>

<script>
import DoctorProfile from '@/components/DoctorProfile.vue' // Если у вас этот компонент есть

export default {
  name: 'HomePage',
  components: {
    DoctorProfile
  },
  data() {
    return {
      doctors: []
    }
  },
  created() {
    this.fetchDoctors()
  },
  methods: {
    async fetchDoctors() {
      try {
        const response = await fetch('http://localhost:3000/api/doctors') // Укажите правильный URL вашего API
        this.doctors = await response.json()
      } catch (error) {
        console.error('Ошибка при загрузке списка врачей:', error)
      }
    }
  }
}
</script>

<style scoped>
.doctors-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
