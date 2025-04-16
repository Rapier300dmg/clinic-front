import apiClient from './apiClient';

/**
 * Попытаться получить список по patient endpoint,
 * а при 404 — взять все записи и отфильтровать по patientId.
 */
export async function getAppointmentsForPatient(patientId) {
  try {
    const res = await apiClient.get(`/appointment/patient/${patientId}`);
    return res.data;
  } catch (err) {
    if (err.response?.status === 404) {
      console.warn('Endpoint /appointment/patient не вернул данных, падаем на /appointment');
      const all = await apiClient.get('/appointment');
      // Предполагаем, что все записи доступны и содержат поле patientId
      return all.data.filter(a => a.patientId === patientId);
    }
    throw err;
  }
}

export async function getAppointmentById(appointmentId) {
  const res = await apiClient.get(`/appointment/${appointmentId}`);
  return res.data;
}
