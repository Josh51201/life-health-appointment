export const BOOK_APPOINTMENT = 'BOOK_APPOINTMENT';
export const LOAD_APPOINTMENTS = 'LOAD_APPOINTMENTS';
export const SELECT_APPOINTMENT = 'SELECT_APPOINTMENT';

export const bookAppointment = (response) => ({
  type: BOOK_APPOINTMENT,
  payload: response,
});

export const loadAppointments = (data) => ({
  type: LOAD_APPOINTMENTS,
  payload: data,
});

export const selectedAppointment = (data) => ({
  type: SELECT_APPOINTMENT,
  payload: data,
});
