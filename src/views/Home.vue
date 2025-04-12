<template>
  <div class="home">
    <h1>Наши врачи</h1>
    <div class="doctors-list">
      <DoctorCard
        v-for="doctor in doctors"
        :key="doctor.id"
        :doctor="doctor"
      />
    </div>

    <!-- Эти элементы выводятся только если пользователь авторизован -->
    <div class="modal-section" v-if="isAuthenticated">
      <button @click="showModal = true">Удалить запись</button>
      <Modal v-if="showModal" @close="showModal = false">
        <h3>Вы уверены, что хотите удалить запись?</h3>
        <button @click="confirmDelete">Да, удалить</button>
      </Modal>
    </div>

    <div class="dropdown-section" v-if="isAuthenticated">
      <Dropdown 
        :options="['Хирург', 'Терапевт', 'Педиатр']" 
        @select="handleFilter" 
      />
    </div>
  </div>
</template>

<script>
import DoctorCard from '@/components/DoctorCard.vue'
import Modal from '@/components/Modal.vue'
import Dropdown from '@/components/Dropdown.vue'

export default {
  name: 'HomePage',
  components: {
    DoctorCard,
    Modal,
    Dropdown
  },
  data() {
    return {
      doctors: [],
      showModal: false
    }
  },
  computed: {
    isAuthenticated() {
      // Пользователь считается авторизованным, если в localStorage есть токен
      return !!localStorage.getItem('token')
    }
  },
  created() {
    this.fetchDoctors()
  },
  methods: {
    async fetchDoctors() {
      try {
        const response = await fetch('http://localhost:3000/api/doctors')
        this.doctors = await response.json()
      } catch (error) {
        console.error('Ошибка при загрузке списка врачей:', error)
        // Тестовые данные, если API недоступен
        this.doctors = [
          { id: 1, name: 'Иванов И.И.', specialization: 'Хирург' },
          { id: 2, name: 'Петров П.П.', specialization: 'Терапевт' },
          { id: 3, name: 'Сидоров С.С.', specialization: 'Педиатр' }
        ]
      }
    },
    confirmDelete() {
      this.showModal = false
    },
    handleFilter(option) {
      console.log('Выбрана специализация:', option)
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
  margin-bottom: 2rem;
}

.modal-section,
.dropdown-section {
  margin: 2rem auto;
  text-align: center;
}
</style>

<!-- Глобальные стили для темной темы -->
<style>
.dark-mode {
  background-color: #333;
  color: #fff;
}
</style>
