import { createRouter, createWebHistory } from 'vue-router'
import UserRegister from '@/views/UserRegister.vue'
import UserLoginPage from '@/views/UserLoginPage.vue'
import DoctorProfile from '@/views/DoctorProfile.vue'
import DoctorsList from '@/views/DoctorsList.vue'
import Files from '@/views/Files.vue'
import Profile from '@/views/Profile.vue'
import Home from '@/views/Home.vue'
import NotFoundPage from '@/views/NotFound.vue'
import DoctorDetails from '@/views/DoctorDetails.vue'
import ManagerSettings from '@/views/ManagerSettings.vue'
import Appointment from '@/views/Appointment.vue'
import AppointmentButton from '@/views/AppointmentButton.vue'
import AppointmentList from '@/views/AppointmentList.vue'
import ManagerRegisterDoctors from '@/views/ManagerRegisterDoctors.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/register', name: 'Register', component: UserRegister },
  { path: '/login', name: 'Login', component: UserLoginPage },
  { path: '/doctors/:id', name: 'DoctorDetails', component: DoctorDetails },
  { path: '/doctor-profile', name: 'DoctorProfile', component: DoctorProfile },
  { path: '/doctors', name: 'DoctorsList', component: DoctorsList },
  { path: '/files', name: 'Files', component: Files },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/ManagerSettings', name: 'Manager', component: ManagerSettings },
  { path: '/Appointment', name: 'Appointment', component: Appointment },
  { path: '/AppointmentList', name: 'AppointmentList', component: AppointmentList },
  { path: '/AppointmentButton', name: 'AppointmentButton', component: AppointmentButton },
  { path: '/ManagerRegisterDoctors', name: 'ManagerRegisterDoctors', component: ManagerRegisterDoctors },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
