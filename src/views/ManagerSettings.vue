<template>
    <div class="manager-settings">
      <h1>Панель менеджера</h1>
  
      <div class="tabs">
        <button
          :class="{ active: activeTab === 'users' }"
          @click="activeTab = 'users'"
        >Пользователи</button>
        <button
          :class="{ active: activeTab === 'doctors' }"
          @click="activeTab = 'doctors'"
        >Врачи</button>
      </div>
  
      <div class="tab-content">
        <div v-if="activeTab === 'users'">
          <h2>Управление пользователями</h2>
          <ul v-if="users.length">
            <li v-for="u in users" :key="u.id">
              {{ u.firstName }} {{ u.lastName }} ({{ u.email }})
              <button @click="deleteUser(u.id)">Удалить</button>
            </li>
          </ul>
          <p v-else>Пользователи не найдены.</p>
        </div>
  
        <div v-if="activeTab === 'doctors'">
          <h2>Управление врачами</h2>
  
          <button class="btn-add" @click="goToRegister">
            Добавить врача
          </button>
  
          <ul v-if="doctors.length">
            <li v-for="d in doctors" :key="d.id">
              dr{{ d.name }} - {{ d.specialization }}
              <button @click="deleteDoctor(d.id)">Удалить</button>
            </li>
          </ul>
          <p v-else>Врачи не найдены.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'ManagerSettings',
    data() {
      return {
        activeTab: 'users',
        users: [],
        doctors: [],
        error: ''
      }
    },
    async created() {
      await this.fetchUsers()
      await this.fetchDoctors()
    },
    methods: {
      goToRegister() {
        this.$router.push({ name: 'ManagerRegisterDoctors' })
      },
  
      async fetchUsers() {
        try {
          const token = localStorage.getItem('token')
          const res = await axios.get(`${process.env.VUE_APP_API_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          this.users = res.data
        } catch (err) {
          console.error('Ошибка загрузки пользователей:', err)
          this.error = 'Не удалось загрузить пользователей'
        }
      },
  
      async deleteUser(id) {
        if (!confirm('Удалить этого пользователя?')) return
        try {
          const token = localStorage.getItem('token')
          await axios.delete(`${process.env.VUE_APP_API_URL}/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          this.users = this.users.filter(u => u.id !== id)
        } catch (err) {
          console.error('Ошибка удаления пользователя:', err)
          alert('Не удалось удалить пользователя')
        }
      },
  
      async fetchDoctors() {
        try {
          const token = localStorage.getItem('token')
          const res = await axios.get(`${process.env.VUE_APP_API_URL}/doctor`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          this.doctors = res.data
        } catch (err) {
          console.error('Ошибка загрузки врачей:', err)
          this.error = 'Не удалось загрузить врачей'
        }
      },
  
      async deleteDoctor(id) {
        if (!confirm('Удалить этого врача?')) return
        try {
          const token = localStorage.getItem('token')
          await axios.delete(`${process.env.VUE_APP_API_URL}/doctor/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          this.doctors = this.doctors.filter(d => d.id !== id)
        } catch (err) {
          console.error('Ошибка удаления врача:', err)
          alert('Не удалось удалить врача')
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .manager-settings {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
  }
  
  .tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .tabs button {
    padding: 0.5rem 1rem;
    background: #eee;
    border: none;
    cursor: pointer;
  }
  
  .tabs button.active {
    background: #007bff;
    color: white;
  }
  
  .tab-content h2 {
    margin-top: 0;
  }
  
  .btn-add {
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-add:hover {
    background: #218838;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #ddd;
  }
  
  li button {
    background: #dc3545;
    color: white;
    border: none;
    padding: 0.3rem 0.6rem;
    cursor: pointer;
    border-radius: 4px;
  }
  
  li button:hover {
    opacity: 0.9;
  }
  </style>
  