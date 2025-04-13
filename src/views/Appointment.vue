<template>
    <div class="appointment-page">
      <h1>Запись к врачу</h1>
  
      <div v-if="!isAuthenticated" class="not-auth">
        <p>Пожалуйста, войдите, чтобы записаться на приём.</p>
        <router-link to="/login" class="btn-login">Войти</router-link>
      </div>
  
      <div v-else>
        <div class="filter">
          <label for="spec">Специализация:</label>
          <select id="spec" v-model="selectedSpec">
            <option value="">Все</option>
            <option v-for="spec in specializations" :key="spec" :value="spec">
              {{ spec }}
            </option>
          </select>
        </div>
  
        <div class="doctors-list">
          <div
            class="doctor-item"
            v-for="doctor in filteredDoctors"
            :key="doctor._id || doctor.id"
          >
            <DoctorCard :doctor="doctor" />
  
            <button
              @click="goToBooking(doctor)"
              class="btn-book"
            >
              Записаться
            </button>
          </div>
        </div>
  
        <div class="modal-section">
          <button @click="showModal = true" class="btn-delete">
            Удалить запись
          </button>
          <Modal v-if="showModal" @close="showModal = false">
            <h3>Вы уверены, что хотите удалить запись?</h3>
            <button @click="confirmDelete">Да, удалить</button>
          </Modal>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import DoctorCard from '@/components/DoctorCard.vue'
  import Modal from '@/components/Modal.vue'
  
  export default {
    name: 'AppointmentPage',
    components: {
      DoctorCard,
      Modal
    },
    data() {
      return {
        isAuthenticated: !!localStorage.getItem('token'),
        doctors: [],
        selectedSpec: '',
        showModal: false
      }
    },
    computed: {
      specializations() {
        const specs = this.doctors.map(d => d.specialization)
        return Array.from(new Set(specs))
      },
      filteredDoctors() {
        if (!this.selectedSpec) {
          return this.doctors
        }
        return this.doctors.filter(
          d => d.specialization === this.selectedSpec
        )
      }
    },
    created() {
      if (this.isAuthenticated) {
        this.fetchDoctors()
      }
    },
    methods: {
      async fetchDoctors() {
        try {
          const token = localStorage.getItem('token')
          const res = await axios.get(
            'https://clinic-system-amwk.onrender.com/doctor',
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          )
          this.doctors = res.data
        } catch (err) {
          console.error('Ошибка при загрузке врачей:', err)
        }
      },
      goToBooking(doctor) {
        this.$router.push({
          name: 'AppointmentButton',
          params: { doctorId: doctor._id || doctor.id }
        })
      },
      confirmDelete() {
        this.showModal = false
      }
    }
  }
  </script>
  
  <style scoped>
  .appointment-page {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .appointment-page h1 {
    margin: 0;
    text-align: center;
    font-size: 2rem;
  }
  
  .filter {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  
  .filter label {
    font-weight: bold;
  }
  
  .filter select {
    padding: 0.4rem 0.6rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .doctors-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
  
  .doctor-item {
    background: #fff;
    padding: 1rem;
    border-radius: 6px;
    text-align: center;
    width: calc(33.333% - 1rem);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .btn-book {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.875rem;
    background: #28a745;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
  }
  
  .btn-book:hover {
    background: #218838;
  }
  
  .btn-delete {
    margin-top: 1rem;
    padding: 0.6rem 1.2rem;
    background: #dc3545;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-delete:hover {
    background: #c82333;
  }
  
  .not-auth {
    text-align: center;
  }
  
  .btn-login {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.6rem 1.2rem;
    background: #007bff;
    color: #fff;
    border-radius: 4px;
    text-decoration: none;
    cursor: pointer;
  }
  
  .btn-login:hover {
    background: #0056b3;
  }
  
  .modal-section {
    text-align: center;
  }
  </style>
  