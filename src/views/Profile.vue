<template>
  <div>
    <div v-if="user" class="profile-container">
      <h2>Профиль пользователя</h2>
      <p><strong>Имя:</strong> {{ user.firstName }} {{ user.lastName }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <!-- Добавьте дополнительные поля, которые пользователь вводил при регистрации -->
    </div>
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    <div v-else class="loading">
      <p>Загрузка профиля...</p>
    </div>
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
        if (!token) {
          throw new Error('Пользователь не авторизован')
        }
        const response = await fetch('https://clinic-system-amrender.com/user/me', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Ошибка загрузки профиля');
        }
        this.user = await response.json();
      } catch (err) {
        this.error = err.message || 'Ошибка загрузки профиля';
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
  color: black;
}

.error {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  color: red;
  text-align: center;
}

.loading {
  text-align: center;
  margin-top: 2rem;
}
</style>
