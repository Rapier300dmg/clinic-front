import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userInfo: null
  }),
  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },
    logout() {
      this.token = null
      this.userInfo = null
      localStorage.removeItem('token')
    },
    async fetchUser() {
      try {
        const response = await fetch('http://localhost:3000/api/users/me', {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.userInfo = await response.json()
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error)
      }
    }
  }
})
