<template>
  <div class="doctor-profile">
    <h2>{{ doctor.name }}</h2>
    <p>{{ doctor.specialty }}</p>
  </div>
</template>

<script>
export default {
  name: 'DoctorProfile',
  props: {
    doctor: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.doctor-profile {
}
</style>
