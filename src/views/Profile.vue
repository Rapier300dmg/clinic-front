<template>
  <div class="profile-container" v-if="user">
    <h2>Профиль пользователя</h2>
    <p><strong>Имя:</strong> {{ user.name }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <!-- Добавьте нужные поля, например, список записей -->
  </div>
  <div v-else>
    <p>Загрузка профиля...</p>
  </div>
</template>

<script>
export default {
  name: 'UserProfilePage',
  data() {
    return {
      user: null,
      error: ''
    }
  },
  created() {
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:3000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
        this.user = await response.json()
      } catch (err) {
        this.error = 'Ошибка загрузки профиля'
      }
    }
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
}
</style>
