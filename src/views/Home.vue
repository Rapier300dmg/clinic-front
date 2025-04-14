<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <h1>Наши врачи</h1>
    <div class="doctors-list">
      <DoctorCard
        v-for="doctor in doctors"
        :key="doctor._id || doctor.id"
        :doctor="doctor"
      />
    </div>
  </div>
</template>

<script>
import DoctorCard from '@/components/DoctorCard.vue'

export default {
  name: 'HomePage',
  components: { DoctorCard },
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
        const res = await fetch('https://clinic-system-amwk.onrender.com/doctor')
        this.doctors = await res.json()
      } catch (err) {
        console.error('Ошибка при загрузке списка врачей:', err)
      }
    }
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 1rem;
}
.doctors-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}
</style>
