<template>
  <div>
    <div v-if="user" class="profile-container">
      <h2>Профиль пользователя</h2>

      <p><strong>Имя:</strong> {{ user.firstName }} {{ user.lastName }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Возраст:</strong> {{ user.age }}</p>
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
import axios from 'axios'

export default {
  name: 'UserProfilePage',
  data() {
    return {
      user: null,
      error: ''
    }
  },
  async created() {
    await this.fetchUser()
  },
  methods: {
    async fetchUser() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('Пользователь не авторизован')
        }
        const res = await axios.get(
          `${process.env.VUE_APP_API_URL}/user/me`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        this.user = res.data
      } catch (err) {
        console.error('Ошибка при загрузке профиля:', err)
        this.error = err.response?.data?.message || err.message
      }
    },

    onFileChange(event) {
      const file = event.target.files[0]
      if (!file) return
      this.uploadAvatar(file)
    },

    async uploadAvatar(file) {
      try {
        const token = localStorage.getItem('token')
        const formData = new FormData()
        formData.append('file', file)
        formData.append('name', 'avatar')

        this.user.avatarUrl = res.data.fileUrl || res.data.url || res.data.publicUrl
      } catch (err) {
        console.error('Ошибка при загрузке аватарки:', err)
        this.error = 'Не удалось загрузить аватарку'
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

.avatar-section {
  margin-bottom: 1.5rem;
}

.avatar {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  margin: 0 auto 1rem;
}

.upload-label {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #007bff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.upload-label input {
  display: none;
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
